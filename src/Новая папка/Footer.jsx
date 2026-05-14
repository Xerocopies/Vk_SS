function Footer() {
  return (
    <footer className="footer" id="contacts">
      <div className="container footer__container">
        <div className="footer__col">
          <h4>Dungeon Mart</h4>
          <p>Магазин миниатюр и аксессуаров для настольных игр. Работаем с 2018 года.</p>
          <p>📍 Москва, ул. Тверская, 15</p>
        </div>
        <div className="footer__col">
          <h4>Информация</h4>
          <ul>
            <li><a href="#delivery">Доставка и оплата</a></li>
            <li><a href="#">О магазине</a></li>
            <li><a href="#">Политика конфиденциальности</a></li>
            <li><a href="#">Возврат товара</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Контакты</h4>
          <ul>
            <li>📧 info@dungeonmart.ru</li>
            <li>📞 8 (916) 011 65-58</li>
            <li>⏰ Пн-Пт: 10:00 - 20:00</li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        © 2025 Dungeon Mart. Все права защищены.
      </div>
    </footer>
  );
}

export default Footer;