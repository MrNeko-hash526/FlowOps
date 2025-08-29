const fs = require('fs')
const path = require('path')
const { getPrisma } = require('../config/db')

const SUBMISSIONS_FILE = path.join(__dirname, '..', 'data', 'submissions.json')

function readSubmissions() {
  try {
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    return []
  }
}

function writeSubmissions(submissions) {
  fs.mkdirSync(path.dirname(SUBMISSIONS_FILE), { recursive: true })
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf8')
}

exports.submit = async (req, res) => {
  try {
    console.log('🔍 Starting user registration submission...')
    console.log('🔍 Request body:', JSON.stringify(req.body, null, 2))

    const fields = req.body || {}

    // Basic validation
    if (!fields || Object.keys(fields).length === 0) {
      return res.status(400).json({ error: 'Form data required' })
    }

    if (!fields.email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Get Prisma client
    const prisma = getPrisma()
    console.log('🔍 Prisma client available:', !!prisma)

    // Database path - use userregisteration table
    if (prisma) {
      try {
        console.log('🔍 Testing database connection...')
        await prisma.$connect()
        console.log('✅ Database connection successful')

        // Generate ID
        const userId = Date.now().toString()

        // Map to userregisteration schema
        const userData = {
          id: userId,
          type: fields.type || null,
          existingContacts: fields.existingContacts || null,
          firstName: fields.firstName || null,
          lastName: fields.lastName || null,
          email: fields.email,
          confirmEmail: fields.confirmEmail || null,
          phoneNo: fields.phoneNo || null,
          role: fields.role || null,
          userGroup: fields.userGroup || 'None Selected'
        }

        console.log('🔍 Creating user registration in database...')
        console.log('🔍 User data:', JSON.stringify(userData, null, 2))

        const user = await prisma.userregisteration.create({
          data: userData
        })

        console.log(`✅ Successfully created user registration in database: ${user.id}`)
        
        return res.status(200).json({
          message: 'User registered successfully in database',
          data: user
        })
      } catch (err) {
        console.error('❌ Database error:', err.message)
        console.error('❌ Full error:', err)
        console.log('📁 Falling back to file storage...')
        // Fall through to file storage
      }
    } else {
      console.log('❌ Prisma client not available')
    }

    // Fallback to file storage
    console.log('📁 Using file storage for user registration...')
    
    const submissions = readSubmissions()
    const submission = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      fields: {
        type: fields.type || '',
        existingContacts: fields.existingContacts || '',
        firstName: fields.firstName || '',
        lastName: fields.lastName || '',
        email: fields.email || '',
        confirmEmail: fields.confirmEmail || '',
        phoneNo: fields.phoneNo || '',
        role: fields.role || '',
        userGroup: fields.userGroup || 'None Selected'
      }
    }

    submissions.push(submission)
    writeSubmissions(submissions)

    console.log('📁 User registration saved to file storage')
    res.status(200).json({ 
      message: 'User registered successfully in file storage', 
      data: submission 
    })

  } catch (error) {
    console.error('💥 User registration error:', error.message)
    console.error('💥 Error stack:', error.stack)
    res.status(500).json({ 
      message: 'Error registering user', 
      error: error.message 
    })
  }
}
