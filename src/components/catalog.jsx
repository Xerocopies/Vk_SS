import { useState, useEffect } from 'react'; // <-- Добавьте useEffect
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';

function Catalog({ products, onAddToCart, loading, error }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Обновляем filteredProducts при изменении products
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = (category) => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  const handlePriceFilter = (min, max) => {
    const minPrice = parseInt(min) || 0;
    const maxPrice = parseInt(max) || 100000;
    let filtered = products.filter(p => p.price >= minPrice && p.price <= maxPrice);

    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category;
    if (activeCategory && activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    setFilteredProducts(filtered);
  };

  // Обработка загрузки
  if (loading) {
    return (
      <section className="catalog" id="catalog">
        <div className="container">
          <p>Загрузка товаров...</p>
        </div>
      </section>
    );
  }

  // Обработка ошибки
  if (error) {
    return (
      <section className="catalog" id="catalog">
        <div className="container">
          <p style={{ color: 'red' }}>Ошибка: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="catalog" id="catalog">
      <div className="container catalog__container">
        <Sidebar
          onFilterChange={handleFilterChange}
          onPriceFilter={handlePriceFilter}
        />
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <p>Товары не найдены</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Catalog;