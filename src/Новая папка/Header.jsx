import { useState } from 'react';

function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="container header__container">
        <a href="/" className="logo">
          Dungeon<span>Mart</span>
        </a>
        <nav>
          <ul className="nav-list">
            <li><a href="/">Главная</a></li>
            <li><a href="#catalog">Каталог</a></li>
            <li><a href="#delivery">Доставка</a></li>
            <li><a href="#contacts">Контакты</a></li>
          </ul>
        </nav>
        <div className="cart-icon" id="cartIcon" onClick={onCartClick}>
          🛒
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;