const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json')

// If DATABASE_URL is set, use Prisma client
let prisma = null
if (process.env.DATABASE_URL) {
  try {
    const { PrismaClient } = require('@prisma/client')
    prisma = new PrismaClient()
  } catch (err) {
    console.warn('Prisma client not installed or prisma generate not run; falling back to file store')
  }
}

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

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

  // Prisma path
  if (prisma) {
    try {
      const existing = await prisma.user.findUnique({ where: { email } })
      if (existing) return res.status(409).json({ error: 'User already exists' })

      const hashed = await bcrypt.hash(password, 10)
      const user = await prisma.user.create({ data: { firstName, lastName, email, password: hashed } })
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
      return res.json({ token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Server error' })
    }
  }

  // Fallback file store
  const users = readUsers()
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (exists) return res.status(409).json({ error: 'User already exists' })

  const hashed = await bcrypt.hash(password, 10)
  const user = { id: Date.now().toString(), firstName, lastName, email, password: hashed }
  users.push(user)
  writeUsers(users)

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, firstName, lastName, email } })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

  if (prisma) {
    try {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) return res.status(401).json({ error: 'Invalid credentials' })
      const match = await bcrypt.compare(password, user.password)
      if (!match) return res.status(401).json({ error: 'Invalid credentials' })
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
      return res.json({ token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Server error' })
    }
  }

  const users = readUsers()
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } })
}
