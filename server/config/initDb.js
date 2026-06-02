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

    await db.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price BIGINT NOT NULL,
        category VARCHAR(50) NOT NULL,
        description TEXT,
        image TEXT,
        page_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('PostgreSQL tables are ready');

  } catch (error) {
    console.log('DATABASE INIT ERROR:', error.message);
  }
}

module.exports = initDb;