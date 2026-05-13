function renderHeader() {
  document.write(`
    <header class="header">

      <div class="logo">
        🚛 КАМАЗ Центр
      </div>

      <nav class="nav">
        <a href="/index.html">Главная</a>
        <a href="/pages/leasing.html">Лизинг</a>
        <a href="/pages/5490.html">Каталог</a>
        <a href="#contacts">Контакты</a>
      </nav>

    </header>
  `);
}

function renderFooter() {
  document.write(`
    <footer class="footer" id="contacts">

      <div class="footer-grid">

        <div>
          <h3>📞 Контакты</h3>

          <p>
            <a href="tel:+79274191444">
              +7 (927) 419-14-44
            </a>
          </p>

          <p>
            <a href="mailto:energa432@mail.ru">
              energa432@mail.ru
            </a>
          </p>
        </div>

        <div>
          <h3>🏢 Реквизиты</h3>

          <p>ООО "МеталлМаш"</p>
          <p>ИНН 1650450440</p>
        </div>

        <div>
          <h3>📄 Документы</h3>

          <p>
            <a href="/pages/privacy.html">
              Политика конфиденциальности
            </a>
          </p>

          <p>
            <a href="/pages/consent.html">
              Согласие на обработку данных
            </a>
          </p>
        </div>

      </div>

      <div class="copyright">
        © 2026 ООО "МеталлМаш"
      </div>

    </footer>
  `);
}