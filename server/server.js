// server.js
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000; // Use the port provided by Render

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
