// controllers/formController.js

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const SUBMISSIONS_FILE = path.join(__dirname, "..", "data", "submissions.json");

function readSubmissions() {
  try {
    return JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf8"));
  } catch (err) {
    return [];
  }
}

function writeSubmissions(subs) {
  fs.mkdirSync(path.dirname(SUBMISSIONS_FILE), { recursive: true });
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(subs, null, 2));
}

exports.createSubmission = (req, res) => {
  const { firstName, lastName, emailAddress } = req.body;

  if (!firstName || !lastName || !emailAddress) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const submissions = readSubmissions();

  const newSubmission = {
    id: uuidv4(), // generate unique ID
    firstName,
    lastName,
    emailAddress,
    files: [],
    createdAt: new Date().toISOString(),
  };

  submissions.push(newSubmission);
  writeSubmissions(submissions);

  res.json({ success: true, submission: newSubmission });
};
