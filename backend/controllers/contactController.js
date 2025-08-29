// controllers/contactController.js
const fs = require('fs');
const path = require('path');

// Initialize Prisma client directly in this file
let prisma = null
if (process.env.DATABASE_URL) {
  try {
    const { PrismaClient } = require('@prisma/client')
    prisma = new PrismaClient()
    console.log('✅ Prisma client initialized in contactController')
  } catch (err) {
    console.warn('⚠️ Prisma client not available in contactController:', err.message)
  }
}

exports.registerContact = async (req, res) => {
  try {
    console.log('🔍 Starting contact registration...');
    console.log('🔍 Request body:', JSON.stringify(req.body, null, 2));
    
    // Prisma path - use lowercase 'contact' to match schema
    if (prisma) {
      try {
        console.log('🔍 Using database storage...');
        
        // Generate ID for the contact
        const contactId = Date.now().toString()
        
        // Map request body to Prisma contact schema fields
        const contactData = {
          id: contactId,
          type: req.body.type || null,
          existingContacts: req.body.existingContacts || null,
          firstName: req.body.firstName || null,
          lastName: req.body.lastName || null,
          suffix: req.body.suffix || null,
          title: req.body.title || null,
          status: req.body.status || "Active",
          goesBy: req.body.goesBy || null,
          pronouns: req.body.pronouns || null,
          emailAddress: req.body.emailAddress || null,
          officeNumber: req.body.officeNumber || null,
          countryCode: req.body.countryCode || null,
          cellNumber: req.body.cellNumber || null,
          addressLine2: req.body.addressLine2 || null,
          city: req.body.city || null,
          state: req.body.state || null,
          zip: req.body.zip || null,
          dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : null,
          workAnniversary: req.body.workAnniversary ? new Date(req.body.workAnniversary) : null,
          maritalStatus: req.body.maritalStatus || null,
          spouseName: req.body.spouseName || null,
          college: req.body.college || null,
          degree: req.body.degree || null,
          priorEmployer: req.body.priorEmployer || null,
          endDate: req.body.endDate ? new Date(req.body.endDate) : null,
          notes: req.body.notes || null,
          sportsTeam: req.body.sportsTeam || null,
          favorites: req.body.favorites || null,
          group: req.body.group || null,
          report: req.body.report || null,
          // Handle JSON arrays
          emails: req.body.emailAddress ? [req.body.emailAddress] : [],
          addressLines: req.body.addressLine1 ? [req.body.addressLine1] : [],
          childrensNames: req.body.childrensName ? [req.body.childrensName] : [],
          priorEmployers: req.body.priorEmployer ? [req.body.priorEmployer] : []
        };

        console.log('🔍 Final contact data for database:', JSON.stringify(contactData, null, 2));

        const contact = await prisma.contact.create({
          data: contactData
        });

        console.log(`✅ Successfully created contact in database: ${contact.id}`);
        
        return res.status(200).json({ 
          message: "Contact registered successfully in database", 
          data: contact 
        });
      } catch (err) {
        console.error('❌ Prisma contact creation error:', err.message);
        console.error('❌ Full error:', err);
        console.log('📁 Falling back to file storage...');
        // Fall through to file storage
      }
    }

    // Fallback to file storage
    console.log('📁 Using file storage for contact...');
    
    const contactData = {
      id: Date.now().toString(),
      type: req.body.type || "",
      existingContacts: req.body.existingContacts || "",
      firstName: req.body.firstName || "",
      lastName: req.body.lastName || "",
      suffix: req.body.suffix || "",
      title: req.body.title || "",
      status: req.body.status || "Active",
      goesBy: req.body.goesBy || "",
      pronouns: req.body.pronouns || "",
      emailAddress: req.body.emailAddress || "",
      officeNumber: req.body.officeNumber || "",
      cellNumber: req.body.cellNumber || "",
      addressLine1: req.body.addressLine1 || "",
      addressLine2: req.body.addressLine2 || "",
      city: req.body.city || "",
      state: req.body.state || "",
      zip: req.body.zip || "",
      dateOfBirth: req.body.dateOfBirth || "",
      workAnniversary: req.body.workAnniversary || "",
      maritalStatus: req.body.maritalStatus || "",
      spouseName: req.body.spouseName || "",
      childrensName: req.body.childrensName || "",
      college: req.body.college || "",
      degree: req.body.degree || "",
      priorEmployer: req.body.priorEmployer || "",
      endDate: req.body.endDate || "",
      notes: req.body.notes || "",
      sportsTeam: req.body.sportsTeam || "",
      favorites: req.body.favorites || "",
      group: req.body.group || "",
      report: req.body.report || "",
      createdAt: new Date().toISOString()
    };

    const dataDir = path.join(__dirname, '..', 'data');
    const filePath = path.join(dataDir, 'contacts.json');

    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Read existing contacts
    let contacts = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      contacts = fileContent ? JSON.parse(fileContent) : [];
    }

    // Add new contact
    contacts.push(contactData);

    // Save updated contacts
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    console.log('📁 Contact saved to file storage');
    res.status(200).json({ message: "Contact registered successfully in file", data: contactData });
  } catch (error) {
    console.error('💥 Contact registration error:', error.message);
    res.status(500).json({ message: "Error registering contact", error: error.message });
  }
};
