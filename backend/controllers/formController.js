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
    const fields = req.body || {}

    // Basic validation: ensure at least one field is present
    if (!fields || Object.keys(fields).length === 0) {
      return res.status(400).json({ error: 'Form data required' })
    }

    // Remove any unexpected 'files' property coming from client
    if (fields && Object.prototype.hasOwnProperty.call(fields, 'files')) {
      delete fields.files
    }

    // Map incoming fields to schema fields
    const mapped = {
      type: fields.type || null,
      existingContacts: fields.existingContacts || null,
      firstName: fields.firstName || null,
      lastName: fields.lastName || null,
      email: fields.email || (fields.Email || null),
      confirmEmail: fields.confirmEmail || null,
      phoneNo: fields.phoneNo || null,
      role: fields.role || null,
      userGroup: fields.userGroup || 'None Selected'
    }

    // Ensure mapped object does not accidentally include files
    if (Object.prototype.hasOwnProperty.call(mapped, 'files')) {
      delete mapped.files
    }

    // Server-side validation: mirror client-side rules
    const errors = {}
    const requiredFields = ["type", "firstName", "lastName", "email", "confirmEmail", "role"]
    for (const f of requiredFields) {
      const v = mapped[f]
      if (!v || String(v) === "") {
        errors[f] = `${f} is required`
      } else if (String(v) !== String(v).trim()) {
        errors[f] = `${f} must not have leading or trailing spaces`
      }
    }

    // simple email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (mapped.email && !emailRegex.test(String(mapped.email))) {
      errors.email = 'Please enter a valid email address'
    }
    if (mapped.email && mapped.confirmEmail && String(mapped.email) !== String(mapped.confirmEmail)) {
      errors.confirmEmail = 'Email and Confirm Email do not match'
    }

    // Names must not contain digits
    const nameHasDigits = /\d/
    if (mapped.firstName && nameHasDigits.test(String(mapped.firstName))) {
      errors.firstName = 'Names must not contain numbers'
    }
    if (mapped.lastName && nameHasDigits.test(String(mapped.lastName))) {
      errors.lastName = 'Names must not contain numbers'
    }

    // phone: allow E.164 or numeric; require at least 10 digits
    if (mapped.phoneNo) {
      const digits = String(mapped.phoneNo).replace(/\D/g, '')
      if (digits.length < 10) {
        errors.phoneNo = 'Phone number must have at least 10 digits'
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors })
    }

    // Get Prisma client from centralized db config
    const prisma = getPrisma()

    // Prisma path - use UserRegisteration model
    if (prisma) {
      try {
        const created = await prisma.userRegisteration.create({
          data: {
            type: mapped.type,
            existingContacts: mapped.existingContacts,
            firstName: mapped.firstName,
            lastName: mapped.lastName,
            email: mapped.email || '',
            confirmEmail: mapped.confirmEmail,
            phoneNo: mapped.phoneNo,
            role: mapped.role,
            userGroup: mapped.userGroup
          }
        })
        console.log(`Created user registration for: ${mapped.email}`)
        return res.json({ success: true, submission: created })
      } catch (err) {
        console.error('Prisma error creating user registration:', err)
        return res.status(500).json({ error: 'Server error' })
      }
    }

    // Fallback: File storage
    const submissions = readSubmissions()
    const submission = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      fields: mapped
    }

    // Extra safeguard: ensure no `files` property exists on the submission
    if (Object.prototype.hasOwnProperty.call(submission, 'files')) {
      delete submission.files
    }

    submissions.push(submission)
    writeSubmissions(submissions)

    res.json({ success: true, submission })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to submit form' })
  }
}
