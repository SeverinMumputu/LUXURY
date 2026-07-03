
        document.addEventListener('DOMContentLoaded', () => {

            // --- 1. DONNÉES PRODUITS (Simulées) ---
            const allProducts = [
                { id: 1, name: "Chronographe Royal Obsidian", category: "horlogerie", price: 24500, img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop", isPrestige: true },
                { id: 2, name: "Sac Cuir Héritage Beige", category: "maroquinerie", price: 3200, img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&auto=format&fit=crop", isPrestige: true },
                { id: 3, name: "Eau de Parfum 'Nuit d'Orient'", category: "parfums", price: 450, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop", isPrestige: false },
                { id: 4, name: "Lunettes de Soleil Aviateur Or", category: "accessoires", price: 890, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop", isPrestige: false },
                { id: 5, name: "Montre Squelette Platine", category: "horlogerie", price: 45000, img: "montre_platine.jpg", isPrestige: true },
                { id: 6, name: "Porte-cartes Crocodile Noir", category: "maroquinerie", price: 650, img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop", isPrestige: false },
                { id: 7, name: "Collier Diamant Éternité", category: "accessoires", price: 12500, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop", isPrestige: true },
                { id: 8, name: "Casque Audio Premium LXY", category: "accessoires", price: 1200, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop", isPrestige: false },
            ];

            const formatPrice = (price) => {
                return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'FRC', minimumFractionDigits: 0 }).format(price);
            };

            // --- 2. GESTION DU PANIER ---
            let cart = [];
            const cartBadge = document.getElementById('cart-badge');
            const cartSidebar = document.getElementById('cart-sidebar');
            const cartOverlay = document.getElementById('cart-overlay');
            const cartBtn = document.getElementById('cart-btn');
            const closeCartBtn = document.getElementById('close-cart-btn');
            const cartItemsContainer = document.getElementById('cart-items');
            const cartTotalEl = document.getElementById('cart-total');

            const toggleCart = () => {
                const isClosed = cartSidebar.classList.contains('translate-x-full');
                if (isClosed) {
                    cartSidebar.classList.remove('translate-x-full');
                    cartOverlay.classList.remove('hidden');
                    // petit délai pour animer l'opacité
                    setTimeout(() => cartOverlay.classList.add('opacity-100'), 10);
                } else {
                    cartSidebar.classList.add('translate-x-full');
                    cartOverlay.classList.remove('opacity-100');
                    setTimeout(() => cartOverlay.classList.add('hidden'), 500); // attend fin trans.
                }
            };

            cartBtn.addEventListener('click', toggleCart);
            closeCartBtn.addEventListener('click', toggleCart);
            cartOverlay.addEventListener('click', toggleCart);

            window.addToCart = (productId) => {
                const product = allProducts.find(p => p.id === productId);
                if(!product) return;

                const existingItem = cart.find(item => item.id === productId);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                
                updateCartUI();
                
                // Ouvrir le panier pour confirmer l'action
                if(cartSidebar.classList.contains('translate-x-full')){
                    toggleCart();
                }
            };

            window.removeFromCart = (productId) => {
                cart = cart.filter(item => item.id !== productId);
                updateCartUI();
            };

            window.changeQuantity = (productId, delta) => {
                const item = cart.find(i => i.id === productId);
                if(item) {
                    item.quantity += delta;
                    if(item.quantity <= 0) {
                        removeFromCart(productId);
                    } else {
                        updateCartUI();
                    }
                }
            }

            const updateCartUI = () => {
                // Update badge
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                if (totalItems > 0) {
                    cartBadge.textContent = totalItems;
                    cartBadge.classList.remove('hidden');
                } else {
                    cartBadge.classList.add('hidden');
                }

                // Update items list
                cartItemsContainer.innerHTML = '';
                if(cart.length === 0) {
                    cartItemsContainer.innerHTML = `<p class="text-center text-darkCyan/60 italic font-serif mt-10">Votre panier est d'un raffinement absolu, mais vide.</p>`;
                } else {
                    cart.forEach(item => {
                        const itemEl = document.createElement('div');
                        itemEl.className = 'flex gap-4 items-center bg-white p-3 border border-darkCyan/10 shadow-sm';
                        itemEl.innerHTML = `
                            <img src="${item.img}" alt="${item.name}" class="w-16 h-16 object-cover bg-gray-100">
                            <div class="flex-1">
                                <h4 class="text-sm font-serif text-darkCyan line-clamp-1">${item.name}</h4>
                                <p class="text-xs text-darkCyan/60 mt-1 uppercase">${formatPrice(item.price)}</p>
                                <div class="flex items-center gap-3 mt-2">
                                    <button onclick="changeQuantity(${item.id}, -1)" class="text-darkCyan hover:text-black w-6 h-6 flex items-center justify-center border border-darkCyan/20">-</button>
                                    <span class="text-xs">${item.quantity}</span>
                                    <button onclick="changeQuantity(${item.id}, 1)" class="text-darkCyan hover:text-black w-6 h-6 flex items-center justify-center border border-darkCyan/20">+</button>
                                </div>
                            </div>
                            <button onclick="removeFromCart(${item.id})" class="text-darkCyan/40 hover:text-red-500 transition self-start" title="Retirer">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                            </button>
                        `;
                        cartItemsContainer.appendChild(itemEl);
                    });
                }

                // Update total
                const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                cartTotalEl.textContent = formatPrice(totalAmount);
            };

            // --- 3. MENU HAMBURGER ---
            const menuBtn = document.getElementById('menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const closeMenuBtn = document.getElementById('close-menu-btn');
            const menuLinks = document.querySelectorAll('.menu-link');

            const toggleMobileMenu = () => {
                mobileMenu.classList.toggle('-translate-x-full');
            };

            menuBtn.addEventListener('click', toggleMobileMenu);
            closeMenuBtn.addEventListener('click', toggleMobileMenu);
            menuLinks.forEach(link => {
                link.addEventListener('click', toggleMobileMenu);
            });

            // --- 4. CARROUSEL HERO ---
            const heroSlides = [
                {
                    img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop",
                    subtitle: "Horlogerie d'exception",
                    title: "L'Élégance à chaque seconde",
                    desc: "Découvrez nos pièces de haute horlogerie, où la précision mécanique rencontre l'art absolu."
                },
                {
                    img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2070&auto=format&fit=crop",
                    subtitle: "Maroquinerie de prestige",
                    title: "Le Cuir dans son Excellence",
                    desc: "Des créations uniques façonnées à la main par nos maîtres artisans pour sublimer votre allure."
                },
                {
                    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2070&auto=format&fit=crop",
                    subtitle: "Senteurs Rares",
                    title: "L'Essence du Luxe",
                    desc: "Des fragrances envoûtantes composées à partir des matières premières les plus nobles."
                }
            ];

            let currentSlide = 0;
            const heroBg = document.getElementById('hero-bg');
            const heroSubtitle = document.getElementById('hero-subtitle');
            const heroTitle = document.getElementById('hero-title');
            const heroDesc = document.getElementById('hero-desc');
            const paginationContainer = document.getElementById('hero-pagination');

            // Créer les points de pagination
            heroSlides.forEach((_, idx) => {
                const dot = document.createElement('button');
                dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-paleOrange w-6' : 'bg-paleOrange/40'}`;
                dot.addEventListener('click', () => goToSlide(idx));
                paginationContainer.appendChild(dot);
            });

            const updateHero = () => {
                const slide = heroSlides[currentSlide];
                
                // Animation fade out brève
                heroBg.style.opacity = '0.5';
                heroSubtitle.classList.remove('fade-in');
                heroTitle.classList.remove('fade-in');
                heroDesc.classList.remove('fade-in');

                setTimeout(() => {
                    heroBg.style.backgroundImage = `url('${slide.img}')`;
                    heroSubtitle.textContent = slide.subtitle;
                    heroTitle.textContent = slide.title;
                    heroDesc.textContent = slide.desc;
                    
                    heroBg.style.opacity = '1';
                    // Redéclenchement reflow pour rejouer l'animation css
                    void heroSubtitle.offsetWidth;
                    
                    heroSubtitle.classList.add('fade-in');
                    heroTitle.classList.add('fade-in');
                    heroDesc.classList.add('fade-in');
                }, 500); // 500ms d'attente pour le fade out

                // Update dots
                Array.from(paginationContainer.children).forEach((dot, idx) => {
                    if(idx === currentSlide) {
                        dot.className = 'w-6 h-2 rounded-full transition-all duration-300 bg-paleOrange';
                    } else {
                        dot.className = 'w-2 h-2 rounded-full transition-all duration-300 bg-paleOrange/40 hover:bg-paleOrange/70';
                    }
                });
            };

            const goToSlide = (idx) => {
                currentSlide = idx;
                updateHero();
            };

            setInterval(() => {
                currentSlide = (currentSlide + 1) % heroSlides.length;
                updateHero();
            }, 6000); // Change chaque 6 secondes


            // --- 5. GÉNÉRATION DES PRODUITS (BOUTIQUE & PRESTIGE) ---
            
            // Fonction pour créer la carte d'un produit
            const createProductCard = (product, isDarkBg = false) => {
                const textColor = isDarkBg ? 'text-paleOrange' : 'text-darkCyan';
                const borderColor = isDarkBg ? 'border-paleOrange/20' : 'border-darkCyan/20';
                const btnClass = isDarkBg 
                    ? 'border border-paleOrange hover:bg-paleOrange hover:text-darkCyan text-paleOrange' 
                    : 'bg-darkCyan text-paleOrange hover:bg-black';

                return `
                    <div class="group flex flex-col relative" data-category="${product.category}">
                        <div class="relative overflow-hidden aspect-[4/5] bg-gray-100 mb-6">
                            <img src="${product.img}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                            <button onclick="addToCart(${product.id})" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[90%] py-3 text-xs uppercase tracking-widest font-semibold ${btnClass}">
                                Ajouter au panier
                            </button>
                        </div>
                        <div class="flex justify-between items-start gap-4">
                            <div>
                                <p class="text-[10px] uppercase tracking-widest ${textColor} opacity-60 mb-1">${product.category}</p>
                                <h3 class="font-serif text-lg ${textColor}">${product.name}</h3>
                            </div>
                            <span class="${textColor} font-light">${formatPrice(product.price)}</span>
                        </div>
                    </div>
                `;
            };

            // Remplir le carrousel Prestige
            const prestigeCarousel = document.getElementById('premium-carousel');
            const prestigeProducts = allProducts.filter(p => p.isPrestige);
            prestigeCarousel.innerHTML = prestigeProducts.map(p => 
                `<div class="snap-start shrink-0 w-[85vw] sm:w-[350px]">
                    ${createProductCard(p, false)}
                </div>`
            ).join('');

            // Scroll arrows pour le carrousel
            const scrollLeftBtn = document.getElementById('scroll-left');
            const scrollRightBtn = document.getElementById('scroll-right');
            
            scrollLeftBtn.addEventListener('click', () => {
                prestigeCarousel.scrollBy({ left: -350, behavior: 'smooth' });
            });
            scrollRightBtn.addEventListener('click', () => {
                prestigeCarousel.scrollBy({ left: 350, behavior: 'smooth' });
            });


            // Remplir la grille Boutique
            const productGrid = document.getElementById('product-grid');
            
            const renderGrid = (filter = 'all') => {
                productGrid.innerHTML = '';
                const filtered = filter === 'all' ? allProducts : allProducts.filter(p => p.category === filter);
                
                if(filtered.length === 0) {
                    productGrid.innerHTML = `<p class="col-span-full text-center py-10 font-light opacity-50">Aucune pièce disponible dans cette catégorie pour le moment.</p>`;
                    return;
                }

                productGrid.innerHTML = filtered.map(p => createProductCard(p, true)).join('');
                
                // Effet d'apparition des cartes
                Array.from(productGrid.children).forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, 50 * index);
                });
            };

            renderGrid(); // Initial render

            // Filtrage dynamique
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // Reset styles
                    filterBtns.forEach(b => {
                        b.classList.remove('active', 'border-b', 'border-paleOrange', 'font-semibold');
                        b.classList.add('text-paleOrange/50');
                    });
                    
                    // Add active styles
                    e.target.classList.add('active', 'border-b', 'border-paleOrange', 'font-semibold');
                    e.target.classList.remove('text-paleOrange/50');
                    
                    const category = e.target.getAttribute('data-filter');
                    renderGrid(category);
                });
            });
        });