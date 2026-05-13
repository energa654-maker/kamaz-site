require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const leadRoutes = require('./routes/leads');

const app = express();

app.use(cors());
app.use(express.json());

// 📁 фронт
app.use(express.static(path.join(__dirname, '../client')));

// 📡 API
app.use('/api/leads', leadRoutes);

// 🏠 главная
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});