
        // --- Product Data ---
        const products = [
            { id: 1, name: "Chronographe Royal", category: "horlogerie", price: 12500, img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1780&auto=format&fit=crop", desc: "Or rose 18 carats, mouvement automatique suisse." },
            { id: 2, name: "Le Sac Céleste", category: "maroquinerie", price: 3400, img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop", desc: "Cuir grainé pleine fleur, fermoir signature." },
            { id: 3, name: "Essence de Nuit", category: "parfums", price: 350, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop", desc: "Eau de parfum, notes boisées et ambrées." },
            { id: 4, name: "Montre Squelette", category: "horlogerie", price: 28000, img: "montre_platine.jpg", desc: "Mécanisme apparent, édition limitée à 50 exemplaires." },
            { id: 5, name: "Porte-cartes Onyx", category: "accessoires", price: 280, img: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974&auto=format&fit=crop", desc: "Cuir de veau lisse, finition bords francs." },
            { id: 6, name: "Lunettes Solaires Riviera", category: "accessoires", price: 450, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop", desc: "Monture écaille véritable, verres polarisés." }
        ];

        const bestProducts = [
            products[0], products[1], products[3], products[2]
        ];

        // --- State ---
        let cart = [];
        let currentSlide = 0;
        let slideInterval;

        // --- Utilities ---
        const formatPrice = (price) => {
            return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'FRC', maximumFractionDigits: 0 }).format(price);
        };

        // --- DOM Elements ---
        const header = document.getElementById('main-header');
        const menuBtn = document.getElementById('menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const cartBtn = document.getElementById('cart-btn');
        const closeCartBtn = document.getElementById('close-cart-btn');
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartCount = document.getElementById('cart-count');
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartTotal = document.getElementById('cart-total');
        const emptyCartMsg = document.getElementById('empty-cart-msg');
        
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const productGrid = document.getElementById('product-grid');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const bestProductsScroll = document.getElementById('best-products-scroll');

        
        // --- Header Scroll Effect ---
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-md', 'bg-brand-pale-orange');
                header.classList.remove('bg-brand-pale-orange/90');
            } else {
                header.classList.remove('shadow-md', 'bg-brand-pale-orange');
                header.classList.add('bg-brand-pale-orange/90');
            }
        });

        // --- Mobile Menu Toggle ---
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });

        // Close menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        // --- Cart Toggle ---
        const openCart = () => {
            cartSidebar.classList.add('open');
            cartOverlay.classList.remove('hidden');
            // Small delay to allow display block to apply before opacity transition
            setTimeout(() => {
                cartOverlay.style.opacity = '1';
            }, 10);
            document.body.style.overflow = 'hidden';
            renderCart();
        };

        const closeCart = () => {
            cartSidebar.classList.remove('open');
            cartOverlay.style.opacity = '0';
            setTimeout(() => {
                cartOverlay.classList.add('hidden');
            }, 300);
            document.body.style.overflow = '';
        };

        cartBtn.addEventListener('click', openCart);
        closeCartBtn.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);

        // --- Custom MessageBox instead of Alert ---
        const showMessage = (msg) => {
            const msgBox = document.createElement('div');
            msgBox.className = 'fixed top-24 left-1/2 transform -translate-x-1/2 bg-brand-dark-cyan text-brand-pale-orange px-6 py-3 shadow-lg z-50 flex items-center gap-3 transition-all duration-500 opacity-0 translate-y-[-20px] font-sans text-sm tracking-wide';
            msgBox.innerHTML = `
                <svg class="w-5 h-5 text-brand-pale-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>${msg}</span>
            `;
            document.body.appendChild(msgBox);
            
            // Animate in
            requestAnimationFrame(() => {
                msgBox.style.opacity = '1';
                msgBox.style.transform = 'translate(-50%, 0)';
            });

            // Remove after 3s
            setTimeout(() => {
                msgBox.style.opacity = '0';
                msgBox.style.transform = 'translate(-50%, -20px)';
                setTimeout(() => msgBox.remove(), 500);
            }, 3000);
        };

        
        // --- Cart Logic ---
        const addToCart = (productId) => {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            updateCartCount();
            showMessage(`${product.name} ajouté au panier`);
            
            // Optional: Auto open cart on add
            // openCart();
        };

        const removeFromCart = (productId) => {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            renderCart();
        };

        const updateQuantity = (productId, delta) => {
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity += delta;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCartCount();
                    renderCart();
                }
            }
        };

        const updateCartCount = () => {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            if (totalItems > 0) {
                cartCount.style.opacity = '1';
            } else {
                cartCount.style.opacity = '0';
            }
        };

        const renderCart = () => {
            cartItemsContainer.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                cartItemsContainer.appendChild(emptyCartMsg);
                emptyCartMsg.style.display = 'flex';
                cartTotal.textContent = '0 €';
                return;
            }

            emptyCartMsg.style.display = 'none';

            cart.forEach(item => {
                total += item.price * item.quantity;
                const itemEl = document.createElement('div');
                itemEl.className = 'flex gap-4 items-center bg-white p-3 shadow-sm';
                itemEl.innerHTML = `
                    <img src="${item.img}" alt="${item.name}" class="w-20 h-20 object-cover border border-brand-dark-cyan/10">
                    <div class="flex-grow">
                        <h4 class="font-serif text-sm text-brand-dark-cyan line-clamp-1">${item.name}</h4>
                        <p class="text-xs text-brand-dark-cyan/60 mb-2">${formatPrice(item.price)}</p>
                        <div class="flex items-center gap-3 border border-brand-dark-cyan/20 w-fit px-2 py-1">
                            <button onclick="updateQuantity(${item.id}, -1)" class="text-brand-dark-cyan hover:text-black focus:outline-none">-</button>
                            <span class="text-xs font-medium w-4 text-center">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" class="text-brand-dark-cyan hover:text-black focus:outline-none">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="text-brand-dark-cyan/40 hover:text-red-500 transition-colors p-2 focus:outline-none">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });

            cartTotal.textContent = formatPrice(total);
        };


        // --- Hero Carousel Logic (Smooth Fade between Images/Videos) ---
        const goToSlide = (index) => {
            // Remove active class from current
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('w-12', 'opacity-100');
            dots[currentSlide].classList.add('w-8', 'opacity-40');
            
            // If it's a video, pause it to save resources (optional, but good practice)
            const currentVideo = slides[currentSlide].querySelector('video');
            if(currentVideo) {
                // currentVideo.pause(); // Kept playing for smoother transitions if user clicks back quickly
            }

            // Update current slide index
            currentSlide = index;

            // Add active class to new
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.remove('w-8', 'opacity-40');
            dots[currentSlide].classList.add('w-12', 'opacity-100');

            // Ensure new video plays
            const newVideo = slides[currentSlide].querySelector('video');
            if(newVideo && newVideo.paused) {
                newVideo.play().catch(e => console.log("Auto-play prevented by browser"));
            }
        };

        const nextSlide = () => {
            let next = (currentSlide + 1) % slides.length;
            goToSlide(next);
        };

        // Initialize Carousel
        const initCarousel = () => {
            // Set initial state
            slides.forEach((slide, i) => {
                if(i !== 0) slide.classList.remove('active');
            });
            
            // Dot click events
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    goToSlide(index);
                    startCarousel(); // Restart timer
                });
            });

            startCarousel();
        };

        const startCarousel = () => {
            slideInterval = setInterval(nextSlide, 7000); // 7 seconds per slide for premium slow feel
        };


        // --- Render Main Product Grid (with Filtering) ---
        const renderProducts = (filter = 'all') => {
            productGrid.innerHTML = '';
            
            const filteredProducts = filter === 'all' 
                ? products 
                : products.filter(p => p.category === filter || (filter === 'accessoires' && p.category !== 'horlogerie' && p.category !== 'maroquinerie'));

            filteredProducts.forEach((p, index) => {
                // Staggered animation delay based on index
                const delay = index * 100;
                
                const card = document.createElement('div');
                card.className = `product-card group flex flex-col bg-white border border-brand-dark-cyan/5 p-4 opacity-0 transform translate-y-8 transition-all duration-700 ease-out`;
                card.style.transitionDelay = `${delay}ms`;
                
                card.innerHTML = `
                    <div class="product-image-container relative h-80 mb-6 bg-[#f4ece0]">
                        <img src="${p.img}" alt="${p.name}" class="product-image w-full h-full object-cover">
                        
                        <!-- Quick Add Button (Hover overlay) -->
                        <div class="absolute inset-0 bg-brand-dark-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button onclick="addToCart(${p.id})" class="bg-brand-pale-orange text-brand-dark-cyan px-6 py-3 font-medium text-sm tracking-widest uppercase hover:bg-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                    <div class="text-center flex-grow flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-brand-dark-cyan/50 uppercase tracking-widest mb-2 block">${p.category}</span>
                            <h3 class="font-serif text-xl text-brand-dark-cyan mb-2">${p.name}</h3>
                            <p class="text-sm font-light text-brand-dark-cyan/70 line-clamp-2 mb-4">${p.desc}</p>
                        </div>
                        <p class="font-medium text-lg text-brand-dark-cyan">${formatPrice(p.price)}</p>
                    </div>
                `;
                
                productGrid.appendChild(card);
                
                // Trigger animation after append
                setTimeout(() => {
                    card.classList.remove('opacity-0', 'translate-y-8');
                }, 50);
            });
        };

        // --- Filter Logic ---
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active button styling
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'border-brand-dark-cyan', 'text-brand-dark-cyan');
                    b.classList.add('border-transparent', 'text-brand-dark-cyan/60');
                });
                
                const target = e.target;
                target.classList.remove('border-transparent', 'text-brand-dark-cyan/60');
                target.classList.add('active', 'border-brand-dark-cyan', 'text-brand-dark-cyan');
                
                const filterValue = target.getAttribute('data-filter');
                
                // Fade out current grid
                productGrid.style.opacity = '0';
                
                setTimeout(() => {
                    renderProducts(filterValue);
                    productGrid.style.opacity = '1';
                }, 300);
            });
        });

        // --- Render Horizontal Best Products ---
        const renderBestProducts = () => {
            bestProductsScroll.innerHTML = '';
            
            bestProducts.forEach((p) => {
                const item = document.createElement('div');
                item.className = 'scroll-item w-[85vw] md:w-[40vw] lg:w-[25vw] max-w-sm flex-shrink-0 group cursor-pointer';
                item.innerHTML = `
                    <div class="relative overflow-hidden h-[60vh] md:h-[500px] mb-4">
                        <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                        <div class="absolute bottom-6 left-6 right-6">
                            <h3 class="font-serif text-2xl text-brand-pale-orange mb-1">${p.name}</h3>
                            <p class="text-brand-pale-orange/80 font-light mb-4">${formatPrice(p.price)}</p>
                            <button onclick="addToCart(${p.id}); event.stopPropagation();" class="w-full py-3 border border-brand-pale-orange text-brand-pale-orange hover:bg-brand-pale-orange hover:text-brand-dark-cyan transition-colors uppercase tracking-widest text-xs font-semibold backdrop-blur-sm">
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                `;
                bestProductsScroll.appendChild(item);
            });

            // Setup Custom Scroll Buttons
            const scrollLeftBtn = document.getElementById('scroll-left');
            const scrollRightBtn = document.getElementById('scroll-right');
            
            if(scrollLeftBtn && scrollRightBtn) {
                const scrollAmount = window.innerWidth > 768 ? window.innerWidth * 0.4 : window.innerWidth * 0.85;

                scrollLeftBtn.addEventListener('click', () => {
                    bestProductsScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });

                scrollRightBtn.addEventListener('click', () => {
                    bestProductsScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });
            }
        };

        // --- Auto Scroll Best Products (Subtle movement) ---
        let autoScrollInterval;
        const startAutoScroll = () => {
             // Only auto scroll on desktop, mobile users prefer swiping
            if(window.innerWidth > 768) {
                autoScrollInterval = setInterval(() => {
                    if (bestProductsScroll.scrollLeft + bestProductsScroll.clientWidth >= bestProductsScroll.scrollWidth - 10) {
                        bestProductsScroll.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        bestProductsScroll.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                }, 4000);
            }
        };
        
        // Pause auto-scroll on interaction
        bestProductsScroll.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        bestProductsScroll.addEventListener('mouseleave', startAutoScroll);
        bestProductsScroll.addEventListener('touchstart', () => clearInterval(autoScrollInterval));

        // --- Initialization ---
        window.addEventListener('DOMContentLoaded', () => {
            initCarousel();
            renderProducts('all');
            renderBestProducts();
            startAutoScroll();
            
            // Initial transition for grid
            productGrid.style.transition = 'opacity 0.3s ease-in-out';
        });

        // Add to global scope for inline onclick handlers
        window.addToCart = addToCart;
        window.removeFromCart = removeFromCart;
        window.updateQuantity = updateQuantity;
