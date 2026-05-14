import { useState } from 'react';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';
import { products } from '../data/products';

function Catalog({ onAddToCart }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (category) => {
    // Update active button
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

  return (
    <section className="catalog" id="catalog">
      <div className="container catalog__container">
        <Sidebar 
          onFilterChange={handleFilterChange}
          onPriceFilter={handlePriceFilter}
        />
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Catalog;