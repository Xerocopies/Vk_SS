const products = [
    { id: 1, name: "Дварф-воин", category: "miniatures", price: 890, rating: 4.8, inStock: true, image: "https://ir.ozone.ru/s3/multimedia-1-2/c1000/6980711690.jpg" },
    { id: 2, name: "Эльфийка-лучник", category: "miniatures", price: 890, rating: 4.7, inStock: true, image: "https://ir.ozone.ru/s3/multimedia-q/c1000/6749476154.jpg" },
    { id: 3, name: "Красный дракон", category: "miniatures", price: 3490, rating: 5.0, inStock: true, image: "https://dragon-shop.ru/wp-content/uploads/2021/04/dnd-iotr-adultreddragon10-892527-nwqZbcar_1024x1024.jpg" },
    { id: 4, name: "Лич (зачарованный)", category: "miniatures", price: 1290, rating: 4.9, inStock: false, image: "https://ir.ozone.ru/s3/multimedia-1-k/6939397568.jpg" },
    { id: 5, name: "Гоблины (набор 5 шт)", category: "miniatures", price: 1490, rating: 4.6, inStock: true, image: "https://ir.ozone.ru/s3/multimedia-5/c1000/6757082033.jpg" },
    { id: 6, name: "Тролль", category: "miniatures", price: 1790, rating: 4.8, inStock: true, image: "https://ir.ozone.ru/s3/multimedia-1-d/c1000/6998777185.jpg" },
    { id: 7, name: "Набор красок (10 цветов)", category: "paints", price: 2200, rating: 4.9, inStock: true, image: "https://mimic-dnd.com/image/cache/catalog/products/hobby/thearmypainter/wp75001/dungeons-and-dragons-nolzurs-marvelous-pigments-adventurers-paint-set-1500x1500.jpg" },
    { id: 8, name: "Кисти синтетика (набор 6 шт)", category: "paints", price: 650, rating: 4.5, inStock: true, image: "https://krasniykarandash.ru/upload/resize_cache/iblock/7b4/505_758_1/7b4c6100d865873dbdce0695a98824bd.jpg" },
    { id: 9, name: "Грунт аэрозольный", category: "paints", price: 750, rating: 4.7, inStock: true, image: "https://st15.stpulscen.ru/images/product/561/163/629_original.jpeg" },
    { id: 10, name: "Набор для покраски (стартовый)", category: "paints", price: 3500, rating: 5.0, inStock: false, image: "https://dragon-shop.ru/wp-content/uploads/2021/02/the-army-painter-d-d-nolzurs-marvelous-pigments-mo.jpg" },
    { id: 11, name: "Кубики D&D (набор 7 шт)", category: "accessories", price: 550, rating: 4.8, inStock: true, image: "https://mimic-dnd.com/image/cache/catalog/products/Dice/thelavaset-575x575.jpg" },
    { id: 12, name: "Игровое поле (складное)", category: "accessories", price: 2100, rating: 4.7, inStock: true, image: "https://ir.ozone.ru/s3/multimedia-x/6834019317.jpg" },
    { id: 13, name: "Башня для кубиков", category: "accessories", price: 1450, rating: 4.9, inStock: true, image: "https://mimic-dnd.com/image/cache/catalog/products/dicetower/27ed4a01aa9af4c14222263e16e5322e8095d4f5_original-1500x1500.jpeg" },
    { id: 14, name: "Сумка для миниатюр", category: "accessories", price: 1800, rating: 4.6, inStock: true, image: "https://ir.ozone.ru/s3/multimedia-1-o/c1000/7122822324.jpg" },
];

class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('dungeonMartCart')) || [];
        this.updateUI();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
        this.updateUI();
        this.showModal();
        
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
        this.renderCartModal();
    }

    getTotalCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    save() {
        localStorage.setItem('dungeonMartCart', JSON.stringify(this.items));
        
        const cartCounters = document.querySelectorAll('.cart-count');
        cartCounters.forEach(counter => {
            if (counter) counter.textContent = this.getTotalCount();
        });
    }

    updateUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getTotalCount();
        }

        if (document.getElementById('cartModal')?.classList.contains('show')) {
            this.renderCartModal();
        }
    }

    renderCartModal() {
        const cartList = document.getElementById('cartItemsList');
        const totalPriceSpan = document.getElementById('cartTotalPrice');
        
        if (this.items.length === 0) {
            cartList.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
            totalPriceSpan.textContent = '0 ₽';
            return;
        }

        let html = '';
        this.items.forEach(item => {
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${item.price} ₽ x${item.quantity}</div>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}">✕</button>
                </div>
            `;
        });
        cartList.innerHTML = html;
        totalPriceSpan.textContent = this.getTotalPrice() + ' ₽';

        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.target.dataset.id);
                this.removeItem(id);
            });
        });
    }

    showModal() {
        const modal = document.getElementById('cartModal');
        if (!modal) return;
        this.renderCartModal();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideModal() {
        const modal = document.getElementById('cartModal');
        if (!modal) return;
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

const cart = new Cart();

function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        let categoryText = '';
        if (product.category === 'miniatures') categoryText = 'Миниатюры';
        else if (product.category === 'paints') categoryText = 'Краски и кисти';
        else categoryText = 'Аксессуары';
        
        const stockClass = product.inStock ? '' : 'out';
        const stockText = product.inStock ? 'В наличии' : 'Под заказ';
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" 
                     style="width: 100%; height: 100%; object-fit: contain; padding: 10px;"
                     onerror="this.onerror=null; this.src='https://cdn.pixabay.com/photo/2016/06/13/09/12/dice-1453868_1280.png';">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-category">${categoryText}</div>
                <div class="product-rating">⭐ ${product.rating} <span>| 25 отзывов</span></div>
                <div class="product-stock ${stockClass}">${stockText}</div>
                <div class="product-price">${product.price} ₽</div>
                <button class="add-to-cart" data-id="${product.id}">В корзину</button>
            </div>
        `;
        grid.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === id);
            if (product) {
                cart.addItem(product);
                
                let notification = document.querySelector('.notification');
                if (!notification) {
                    notification = document.createElement('div');
                    notification.className = 'notification';
                    notification.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #2e7d32;
                        color: white;
                        padding: 15px 25px;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        z-index: 1100;
                        font-weight: 500;
                        animation: slideIn 0.3s ease;
                        transition: opacity 0.3s;
                    `;
                    document.body.appendChild(notification);
                    
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes slideIn {
                            from {
                                transform: translateX(100%);
                                opacity: 0;
                            }
                            to {
                                transform: translateX(0);
                                opacity: 1;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                notification.textContent = `✅ ${product.name} добавлен в корзину`;
                notification.style.display = 'block';
                
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        notification.style.display = 'none';
                        notification.style.opacity = '1';
                    }, 300);
                }, 2000);
            }
        });
    });
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const category = e.target.dataset.category;
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
            
            const catalog = document.getElementById('catalog');
            if (catalog) {
                catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function setupPriceFilter() {
    const applyBtn = document.getElementById('applyPrice');
    if (!applyBtn) return;
    
    applyBtn.addEventListener('click', function() {
        const min = parseInt(document.getElementById('minPrice')?.value) || 0;
        const max = parseInt(document.getElementById('maxPrice')?.value) || 100000;
        
        let filtered = products.filter(p => p.price >= min && p.price <= max);
        
        const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category;
        if (activeCategory && activeCategory !== 'all') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }
        
        renderProducts(filtered);
    });
}

function setupCartModal() {
    const cartIcon = document.getElementById('cartIcon');
    const modal = document.getElementById('cartModal');
    const closeBtn = document.getElementById('closeModal');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cart.showModal();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            cart.hideModal();
        });
    }
    
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                cart.hideModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                cart.hideModal();
            }
        });
    }
}

function setupCheckoutButton() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (!checkoutBtn) return;
    
    checkoutBtn.addEventListener('click', (e) => {
        if (cart.items.length === 0) {
            e.preventDefault();
            alert('Корзина пуста');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupFilters();
    setupPriceFilter();
    setupCartModal();
    setupCheckoutButton();
    
    const cartCounters = document.querySelectorAll('.cart-count');
    cartCounters.forEach(counter => {
        if (counter) counter.textContent = cart.getTotalCount();
    });
});

const style = document.createElement('style');
style.textContent = `
    .product-image {
        height: 200px;
        background: #2d333b;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    
    .product-image img {
        transition: transform 0.3s;
    }
    
    .product-card:hover .product-image img {
        transform: scale(1.1);
    }
    
    .product-stock.out {
        color: #c62828;
    }
    
    .product-stock {
        color: #2e7d32;
        font-size: 13px;
        margin-bottom: 12px;
        font-weight: 500;
    }
    
    .price-filter {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .price-input {
        width: 100%;
        padding: 8px 12px;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        font-size: 14px;
    }
    
    .apply-price {
        background: #c9362b;
        color: white;
        border: none;
        padding: 8px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;
    }
    
    .apply-price:hover {
        background: #b02b21;
    }
`;

document.head.appendChild(style);