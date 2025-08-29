const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getPrisma } = require('../config/db')

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json')

function readUsers() {
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    return []
  }
}

function writeUsers(users) {
  fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true })
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8')
}

//            IP ADDRESS

//----------------------------------------------------------------------------------
function normalizeIp(ip) {
  if (!ip) return null;
  if (ip.startsWith('::ffff:')) ip = ip.slice(7);
  if (ip === '::1') return '127.0.0.1';
  return ip.replace(/^\[|\]$/g, '');
}

function isPrivate(ip) {
  return /^(10\.|127\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(ip);
}

function getClientIp(req) {
  // Priority headers from common CDNs/proxies
  const directHeaders = ['cf-connecting-ip', 'true-client-ip', 'x-real-ip'];
  for (const h of directHeaders) {
    const v = req.headers[h];
    if (v) return normalizeIp(v.toString().split(',')[0].trim());
  }

  // Parse X-Forwarded-For (first non-private is usually the client)
  const xff = req.headers['x-forwarded-for'];
  if (xff) {
    const list = xff.toString().split(',').map(s => normalizeIp(s.trim())).filter(Boolean);
    const publicFirst = list.find(ip => !isPrivate(ip));
    if (publicFirst) return publicFirst;
    if (list.length) return list[0];
  }

  // Fallbacks
  return normalizeIp(
    req.ip ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    req.connection?.socket?.remoteAddress
  );
}
//----------------------------------------------------------------------------------------------------


exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, macAddress } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

  // Capture IP address from request headers or socket
  const ipAddress = getClientIp(req);
  
  // Get Prisma client from centralized db config
  const prisma = getPrisma()

  // Prisma path
  if (prisma) {
    try {
      const existing = await prisma.userSignup.findUnique({ where: { email } })
      if (existing) return res.status(409).json({ error: 'User already exists' })

      const hashed = await bcrypt.hash(password, 10)
      const user = await prisma.userSignup.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashed,
          ipAddress,
          macAddress: macAddress || null
        }
      })

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'dev-secret',
        { expiresIn: '7d' }
      )

      return res.json({
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          ipAddress: user.ipAddress,
          macAddress: user.macAddress
        }
      })
    } catch (err) {
      console.error('Prisma signup error:', err)
      return res.status(500).json({ error: 'Server error' })
    }
  }

  // Fallback file store
  const users = readUsers()
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (exists) return res.status(409).json({ error: 'User already exists' })

  const hashed = await bcrypt.hash(password, 10)
  const user = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email,
    password: hashed,
    ipAddress,
    macAddress: macAddress || null
  }
  users.push(user)
  writeUsers(users)

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '7d' }
  )

  res.json({
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      ipAddress: user.ipAddress,
      macAddress: user.macAddress
    }
  })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

  // Get Prisma client from centralized db config
  const prisma = getPrisma()

  if (prisma) {
    try {
      const user = await prisma.userSignup.findUnique({ where: { email } })
      if (!user) return res.status(401).json({ error: 'Invalid credentials' })
      
      const match = await bcrypt.compare(password, user.password)
      if (!match) return res.status(401).json({ error: 'Invalid credentials' })
      
      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET || 'dev-secret', 
        { expiresIn: '7d' }
      )
      
      return res.json({ 
        token, 
        user: { 
          id: user.id, 
          firstName: user.firstName, 
          lastName: user.lastName, 
          email: user.email,
          ipAddress: user.ipAddress,
          macAddress: user.macAddress
        } 
      })
    } catch (err) {
      console.error('Prisma login error:', err)
      return res.status(500).json({ error: 'Server error' })
    }
  }

  // Fallback file store
  const users = readUsers()
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } })
}
