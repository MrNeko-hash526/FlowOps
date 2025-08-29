// controllers/contactController.js
const fs = require('fs');
const path = require('path');
const { getPrisma } = require('../config/db');

exports.registerContact = async (req, res) => {
  try {
    console.log('🔍 Starting contact registration...');
    
    const prisma = getPrisma();
    
    if (prisma) {
      try {
        // Simple contact data mapping - no complex operations
        const contactData = {
          type: req.body.type || null,
          existingContacts: req.body.existingContacts || null,
          firstName: req.body.firstName || null,
          lastName: req.body.lastName || null,
          emailAddress: req.body.emailAddress || null,
          cellNumber: req.body.cellNumber || null,
          city: req.body.city || null,
          state: req.body.state || null,
          notes: req.body.notes || null,
          group: req.body.group || null,
          status: "Active",
          // Simple arrays
          emails: [],
          addressLines: [],
          childrensNames: [],
          priorEmployers: []
        };

        console.log('🔍 Creating contact...');
        
        const contact = await prisma.contact.create({
          data: contactData
        });

        console.log(`✅ Contact created: ${contact.id}`);
        
        return res.status(200).json({ 
          message: "Contact saved to database", 
          data: contact 
        });
        
      } catch (dbError) {
        console.error('❌ Database error:', dbError.message);
        return res.status(500).json({ error: dbError.message });
      }
    }

    // Fallback to file
    console.log('📁 Using file storage...');
    
    const fileData = {
      type: req.body.type || "",
      existingContacts: req.body.existingContacts || "",
      firstName: req.body.firstName || "",
      lastName: req.body.lastName || "",
      emailAddress: req.body.emailAddress || "",
      createdAt: new Date().toISOString()
    };

    const dataDir = path.join(__dirname, '..', 'data');
    const filePath = path.join(dataDir, 'contacts.json');

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    let contacts = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      contacts = content ? JSON.parse(content) : [];
    }

    contacts.push(fileData);
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    res.status(200).json({ message: "Contact saved to file", data: fileData });

  } catch (error) {
    console.error('💥 Server error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
