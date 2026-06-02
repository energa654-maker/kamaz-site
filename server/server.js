require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const leadRoutes = require('./routes/leads');
const initDb = require('./config/initDb');

const app = express();

app.use(cors());
app.use(express.json());

// Создание таблицы при запуске
initDb();

// Статика, если открываешь сайт через Render
app.use(express.static(path.join(__dirname, '../client')));

// API
app.use('/api/leads', leadRoutes);

// Главная
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log(process.env.DATABASE_URL);