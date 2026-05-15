import { useState, useEffect } from 'react'; // <-- Добавили useEffect
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Features from './components/Features';
import Footer from './components/Footer';
import CartModal from './components/CartModal';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]); // Состояние для товаров с сервера
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибки

  // Загрузка данных с сервера
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Используем тестовый API (как в лекции)
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        
        const data = await response.json();
        
        // Преобразуем данные в нужный формат
        const formattedProducts = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          category: item.category,
          image: item.image,
          description: item.description
        }));
        
        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Ошибка:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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