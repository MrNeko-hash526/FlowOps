// // controllers/formController.js

// const { v4: uuidv4 } = require("uuid");
// const fs = require("fs");
// const path = require("path");

// const SUBMISSIONS_FILE = path.join(__dirname, "..", "data", "submissions.json");

// function readSubmissions() {
//   try {
//     return JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf8"));
//   } catch (err) {
//     return [];
//   }
// }

// function writeSubmissions(subs) {
//   fs.mkdirSync(path.dirname(SUBMISSIONS_FILE), { recursive: true });
//   fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(subs, null, 2));
// }

// exports.createSubmission = (req, res) => {
//   const { firstName, lastName, emailAddress } = req.body;

//   if (!firstName || !lastName || !emailAddress) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const submissions = readSubmissions();

//   const newSubmission = {
//     id: uuidv4(), // generate unique ID
//     firstName,
//     lastName,
//     emailAddress,
//     files: [],
//     createdAt: new Date().toISOString(),
//   };

//   submissions.push(newSubmission);
//   writeSubmissions(submissions);

//   res.json({ success: true, submission: newSubmission });
// };


exports.handleFileUpload = (req, res) => {
  try {
    const { subject, type, description, submissionId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!subject || !type || !submissionId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    res.json({
      message: "File uploaded successfully!",
      file: {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        sizeKB: Math.round(req.file.size / 1024),
        path: req.file.path,
      },
      formData: { subject, type, description, submissionId }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while uploading" });
  }
};

