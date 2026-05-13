const express = require('express');
const router = express.Router();
const axios = require('axios');

const supabase = require('../config/supabase');


// ==========================
// 📌 GET ALL LEADS
// ==========================
router.get('/', async (req, res) => {
  try {

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        message: 'Ошибка получения заявок',
        error
      });
    }

    res.json({ data });

  } catch (err) {
    console.log('GET ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ==========================
// 📌 CREATE LEAD
// ==========================
router.post('/', async (req, res) => {

  console.log("👉 LEAD RECEIVED:", req.body);

  try {

    const { name, phone, comment } = req.body;

    // ----------------------
    // CHECK FIELDS
    // ----------------------
    if (!name || !phone) {
      return res.status(400).json({
        message: 'Имя и телефон обязательны'
      });
    }

    // ----------------------
    // SAVE TO SUPABASE
    // ----------------------
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name,
          phone,
          comment,
          status: 'new'
        }
      ])
      .select();

    if (error) {
      console.log("SUPABASE ERROR:", error);

      return res.status(500).json({
        message: 'Ошибка базы данных',
        error
      });
    }

    // ----------------------
    // TELEGRAM MESSAGE
    // ----------------------
    const text = `
🚛 Новая заявка

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || '-'}
`;

    try {
      const tgResponse = await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text
        }
      );

      console.log("📲 TELEGRAM OK:", tgResponse.data);

    } catch (tgErr) {
      console.log("❌ TELEGRAM ERROR:", tgErr.response?.data || tgErr.message);
    }

    // ----------------------
    // RESPONSE TO FRONTEND
    // ----------------------
    res.json({
      message: 'Заявка сохранена',
      data
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);

    res.status(500).json({
      message: 'Ошибка сервера'
    });
  }
});


// ==========================
// 📌 DELETE LEAD
// ==========================
router.delete('/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({
        message: 'Ошибка удаления',
        error
      });
    }

    res.json({
      message: 'Удалено'
    });

  } catch (err) {
    console.log('DELETE ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;