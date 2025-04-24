import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('./'));

// Endpoint to handle waitlist submissions
app.post('/api/waitlist', (req, res) => {
  const { email, consent, quizData } = req.body;
  
  if (!email || !consent) {
    return res.status(400).json({ error: 'Email and consent are required' });
  }
  
  // Create data entry with timestamp
  const entry = {
    email,
    consent,
    quizData,
    timestamp: new Date().toISOString()
  };
  
  // In a production app, you would store this in a database
  // For this example, we'll store in a JSON file
  const dataFile = path.join(__dirname, 'waitlist-data.json');
  
  try {
    let waitlistData = [];
    
    // Read existing data if file exists
    if (fs.existsSync(dataFile)) {
      const fileData = fs.readFileSync(dataFile, 'utf8');
      waitlistData = JSON.parse(fileData);
    }
    
    // Add new entry
    waitlistData.push(entry);
    
    // Write back to file
    fs.writeFileSync(dataFile, JSON.stringify(waitlistData, null, 2));
    
    res.json({ success: true, message: 'Successfully joined waitlist' });
  } catch (error) {
    console.error('Error saving waitlist data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});