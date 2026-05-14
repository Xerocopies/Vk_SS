import { useState } from 'react';

function Sidebar({ onFilterChange, onPriceFilter }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleCategoryClick = (category) => {
    onFilterChange(category);
  };

  const handleApplyPrice = () => {
    onPriceFilter(minPrice, maxPrice);
  };

  return (
    <aside className="sidebar">
      <h3>Категории</h3>
      <ul className="filter-list">
        <li>
          <button className="filter-btn active" data-category="all" onClick={() => handleCategoryClick('all')}>
            Все товары
          </button>
        </li>
        <li>
          <button className="filter-btn" data-category="miniatures" onClick={() => handleCategoryClick('miniatures')}>
            Миниатюры
          </button>
        </li>
        <li>
          <button className="filter-btn" data-category="paints" onClick={() => handleCategoryClick('paints')}>
            Краски и кисти
          </button>
        </li>
        <li>
          <button className="filter-btn" data-category="accessories" onClick={() => handleCategoryClick('accessories')}>
            Аксессуары
          </button>
        </li>
      </ul>

      <h3>Цена</h3>
      <div className="price-filter">
        <input 
          type="number" 
          placeholder="От" 
          className="price-input"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="До" 
          className="price-input"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <button className="apply-price" onClick={handleApplyPrice}>
        Применить
      </button>
    </aside>
  );
}

export default Sidebar;