import { useEffect } from 'react';

function CartModal({ isOpen, onClose, cartItems, onRemoveItem, totalPrice }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`cart-modal ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className="cart-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal__header">
          <h3>Корзина</h3>
          <button className="close-modal" onClick={onClose}>×</button>
        </div>
        <div className="cart-modal__body">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Корзина пуста</p>
          ) : (
            <div id="cartItemsList">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-title">{item.name}</div>
                    <div className="cart-item-price">{item.price} ₽ x{item.quantity}</div>
                  </div>
                  <button 
                    className="cart-item-remove" 
                    onClick={() => onRemoveItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="cart-modal__footer">
          <div className="cart-total">
            <span>Итого:</span>
            <span id="cartTotalPrice">{totalPrice} ₽</span>
          </div>
          <button className="btn--primary" id="checkoutBtn">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;