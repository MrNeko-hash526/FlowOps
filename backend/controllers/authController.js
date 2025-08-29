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
  const directHeaders = ['cf-connecting-ip', 'true-client-ip', 'x-real-ip'];
  for (const h of directHeaders) {
    const v = req.headers[h];
    if (v) return normalizeIp(v.toString().split(',')[0].trim());
  }

  const xff = req.headers['x-forwarded-for'];
  if (xff) {
    const list = xff.toString().split(',').map(s => normalizeIp(s.trim())).filter(Boolean);
    const publicFirst = list.find(ip => !isPrivate(ip));
    if (publicFirst) return publicFirst;
    if (list.length) return list[0];
  }

  return normalizeIp(
    req.ip ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    req.connection?.socket?.remoteAddress
  );
}

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, macAddress } = req.body
    
    console.log('🔍 Signup attempt for:', email);
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const ipAddress = getClientIp(req);
    const prisma = getPrisma()

    console.log('🔍 Prisma available:', !!prisma);

    // Try Prisma first
    if (prisma) {
      try {
        console.log('🔍 Checking existing user in database...');
        const existing = await prisma.userSignup.findUnique({ where: { email } })
        if (existing) {
          return res.status(409).json({ error: 'User already exists' })
        }

        console.log('🔍 Hashing password...');
        const hashed = await bcrypt.hash(password, 10)
        
        console.log('🔍 Creating user in database...');
        const user = await prisma.userSignup.create({
          data: {
            firstName: firstName || null,
            lastName: lastName || null,
            email,
            password: hashed,
            ipAddress: ipAddress || null,
            macAddress: macAddress || null
          }
        })

        console.log('✅ User created in database:', user.id);

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
      } catch (dbError) {
        console.error('❌ Database signup error:', dbError.message);
        console.log('📁 Falling back to file storage...');
        // Fall through to file storage
      }
    }

    // Fallback to file storage
    console.log('📁 Using file storage for signup...');
    
    const users = readUsers()
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return res.status(409).json({ error: 'User already exists' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = {
      id: Date.now().toString(),
      firstName: firstName || null,
      lastName: lastName || null,
      email,
      password: hashed,
      ipAddress: ipAddress || null,
      macAddress: macAddress || null,
      createdAt: new Date().toISOString()
    }
    
    users.push(user)
    writeUsers(users)

    console.log('✅ User created in file storage:', user.id);

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

  } catch (error) {
    console.error('💥 Signup error:', error.message);
    res.status(500).json({ error: 'Internal server error: ' + error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const prisma = getPrisma()

    // Try database first
    if (prisma) {
      try {
        const user = await prisma.userSignup.findUnique({ where: { email } })
        if (!user) {
          console.log('User not found in database, checking file storage...');
        } else {
          const match = await bcrypt.compare(password, user.password)
          if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' })
          }
          
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
        }
      } catch (err) {
        console.error('Database login error:', err.message);
        console.log('Falling back to file storage...');
      }
    }

    // Fallback to file storage
    console.log('📁 Using file storage for login...');
    const users = readUsers()
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

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
  } catch (error) {
    console.error('💥 Login error:', error.message);
    res.status(500).json({ error: 'Internal server error: ' + error.message })
  }
}
