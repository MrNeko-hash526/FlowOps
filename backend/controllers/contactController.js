// controllers/contactController.js
const fs = require('fs');
const path = require('path');
const { getPrisma } = require('../config/db');

exports.registerContact = async (req, res) => {
  try {
    console.log('🔍 Starting contact registration...');
    console.log('🔍 Request body:', JSON.stringify(req.body, null, 2));
    
    // Get Prisma client from centralized db config
    const prisma = getPrisma();
    console.log('🔍 Prisma client available:', !!prisma);
    
    if (!prisma) {
      console.log('❌ Prisma client is null/undefined');
      throw new Error('Prisma client not available');
    }

    // Test database connection
    try {
      await prisma.$connect();
      console.log('✅ Database connection successful');
    } catch (dbErr) {
      console.error('❌ Database connection failed:', dbErr.message);
      throw dbErr;
    }

    // Map ONLY the fields that exist in Prisma schema
    const prismaData = {
      type: req.body.type || null,
      existingContacts: req.body.existingContacts || null, // This should be saved
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
      // JSON arrays
      emails: req.body.emailAddress ? [req.body.emailAddress] : [],
      addressLines: req.body.addressLine1 ? [req.body.addressLine1] : [],
      childrensNames: req.body.childrensName ? [req.body.childrensName] : [],
      priorEmployers: req.body.priorEmployer ? [req.body.priorEmployer] : []
    };

    console.log('🔍 Mapped data for Prisma:', JSON.stringify(prismaData, null, 2));
    console.log('🔍 existingContacts value:', prismaData.existingContacts);

    const contact = await prisma.contact.create({
      data: prismaData
    });

    console.log(`✅ Successfully created contact in database: ${contact.id}`);
    
    return res.status(200).json({ 
      message: "Contact registered successfully in database", 
      data: contact 
    });

  } catch (error) {
    console.error('❌ Contact registration error:', error.message);
    console.error('❌ Full error stack:', error.stack);
    
    // IMPORTANT: Don't fall back to file storage - return the error
    return res.status(500).json({ 
      message: "Database error", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
