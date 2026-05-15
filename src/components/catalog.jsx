import { useState, useEffect } from 'react';
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
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Загрузка миниатюр...</h2>
            <p>Получаем данные с сервера</p>
          </div>
        </div>
      </section>
    );
  }

  // Обработка ошибки
  if (error) {
    return (
      <section className="catalog" id="catalog">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px', color: '#dc2626' }}>
            <h2>Ошибка!</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
              Попробовать снова
            </button>
          </div>
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
            <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>
              Миниатюры не найдены
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Catalog;