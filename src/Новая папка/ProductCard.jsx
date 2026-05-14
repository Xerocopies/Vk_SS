function ProductCard({ product, onAddToCart }) {
  const categoryText = {
    miniatures: 'Миниатюры',
    paints: 'Краски и кисти',
    accessories: 'Аксессуары'
  }[product.category];

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }}
          onError={(e) => {
            e.target.src = 'https://cdn.pixabay.com/photo/2016/06/13/09/12/dice-1453868_1280.png';
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-category">{categoryText}</div>
        <div className="product-rating">
          ⭐ {product.rating} <span>| 25 отзывов</span>
        </div>
        <div className={`product-stock ${product.inStock ? '' : 'out'}`}>
          {product.inStock ? 'В наличии' : 'Под заказ'}
        </div>
        <div className="product-price">{product.price} ₽</div>
        <button 
          className="add-to-cart" 
          onClick={() => onAddToCart(product)}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}

export default ProductCard;