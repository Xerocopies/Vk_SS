import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Features from './components/Features';
import Footer from './components/Footer';
import CartModal from './components/CartModal';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('dungeonMartCart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('dungeonMartCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // Show notification
    setNotification(`✅ ${product.name} добавлен в корзину`);
    setTimeout(() => setNotification(null), 2000);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="App">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
      />
      <Hero />
      <Catalog onAddToCart={addToCart} />
      <Features />
      <Footer />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        totalPrice={totalPrice}
      />
      
      {notification && (
        <div 
          className="notification"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#2e7d32',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1100,
            fontWeight: 500,
            animation: 'slideIn 0.3s ease',
          }}
        >
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;