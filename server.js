const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Store messages in a JSON file
const messagesFile = 'messages.json';

// Initialize messages file if it doesn't exist
if (!fs.existsSync(messagesFile)) {
    fs.writeFileSync(messagesFile, '[]');
}

// Contact form submission endpoint
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Read existing messages
        const messages = JSON.parse(fs.readFileSync(messagesFile));
        
        // Add new message
        messages.push({
            id: Date.now(),
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        });

        // Save updated messages
        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
