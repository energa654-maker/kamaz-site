const express = require('express');
const router = express.Router();

const db = require('../config/db');

// Получить всю технику
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT *
      FROM vehicles
      ORDER BY id DESC
    `);

    res.json({
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({
      message: 'Ошибка получения техники',
      error: error.message
    });
  }
});

// Добавить технику
router.post('/', async (req, res) => {
  try {
    const {
      title,
      price,
      category,
      description,
      image,
      page_url
    } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({
        message: 'Название, цена и категория обязательны'
      });
    }

    const result = await db.query(
      `
      INSERT INTO vehicles
      (title, price, category, description, image, page_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        title,
        price,
        category,
        description || '',
        image || '',
        page_url || ''
      ]
    );

    res.json({
      message: 'Техника добавлена',
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      message: 'Ошибка добавления техники',
      error: error.message
    });
  }
});

// Удалить технику
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      'DELETE FROM vehicles WHERE id = $1',
      [id]
    );

    res.json({
      message: 'Техника удалена'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Ошибка удаления техники',
      error: error.message
    });
  }
});

module.exports = router;