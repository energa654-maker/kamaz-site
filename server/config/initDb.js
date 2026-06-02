const db = require('./db');

async function initDb() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        comment TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('PostgreSQL table leads is ready');
  } catch (error) {
    console.log('DATABASE INIT ERROR:', error.message);
  }
}

module.exports = initDb;