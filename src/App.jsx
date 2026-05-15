import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Features from './components/Features';
import Footer from './components/Footer';
import CartModal from './components/CartModal';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных с сервера (API монстров D&D)
  useEffect(() => {
    const fetchMiniatures = async () => {
      try {
        setLoading(true);
        // Используем Open5e API - бесплатное API с монстрами D&D 5e
        const response = await fetch('https://api.open5e.com/monsters/?limit=50');
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        
        const data = await response.json();
        
        // Преобразуем данные API в формат товаров
        const miniatures = data.results.map((monster, index) => ({
          id: monster.slug || `monster-${index}`,
          name: monster.name,
          price: Math.floor(Math.random() * 50) + 10, // Случайная цена $10-60
          category: monster.type?.toLowerCase() || 'monster',
          image: monster.img_main || 'https://via.placeholder.com/300x300?text=D%26D+Miniature',
          description: `${monster.size} ${monster.type} • CR ${monster.challenge_rating || '?'}`,
          challengeRating: monster.challenge_rating
        }));
        
        setProducts(miniatures);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить миниатюры. Попробуйте позже.');
        console.error('Ошибка:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMiniatures();
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="App">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <Catalog 
        products={products} 
        onAddToCart={addToCart}
        loading={loading}
        error={error}
      />
      <Features />
      <Footer />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default App;