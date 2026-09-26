
  // --- Product Data ---
const products = [
    {
    id: 1,
    name: "Chronographe Royal",
    category: "horlogerie",
    brand: "rolex",
    price: 12500,

    images: [
        {
            src: "montre_platine.jpg",
            label: "Vue principale"
        },
        {
            src: "Rolex_vue_arriere.webp",
            label: "Vue arrière"
        },
        {
            src: "vue_gauche_2.jpg",
            label: "Vue gauche"
        },
        {
            src: "vue_gauche_1.jpg",
            label: "Vue droite"
        },
        {
            src: "vue_dessus_rolex.jpg",
            label: "Vue de dessus"
        },
        {
            src: "vue_de_enbas.jpg",
            label: "Vue de dessous"
        }
    ],

    img: "rolex-face.jpg",

    desc: "Or rose 18 carats, mouvement automatique suisse."
}
];

// =========================================================
// PREMIUM BRAND CATALOGS
// =========================================================

const brandCatalogs = {

    horlogerie: [
        {
            id: "rolex",
            name: "Rolex",
            image: "rolex.jpeg"
        },
        {
            id: "audemars-piguet",
            name: "Audemars Piguet",
            image: "audemars.jpeg"
        },
        {
            id: "patek-philippe",
            name: "Patek Philippe",
            image: "patek.jpeg"
        },
        {
            id: "cartier",
            name: "Cartier",
            image: "cartier.jpeg"
        },
        {
            id: "tissot",
            name: "Tissot",
            image: "tissot.jpeg"
        },
        {
            id: "omega",
            name: "Omega",
            image: "omega.jpeg"
        },
        {
            id: "richard",
            name: "Richard Mille",
            image: "richard_mille.jpeg"
        },
        {
            id: "hublot",
            name: "Hublot",
            image: "hublot.jpeg"
        },
        {
            id: "casio",
            name: "Casio",
            image: "casio.jpeg"
        },
        {
            id: "Vacheron",
            name: "Vacheron Constantin",
            image: "vacheron.jpeg"
        },
        {
            id: "daniel",
            name: "Daniel Wellington",
            image: "daniel.jpeg"
        },
        {
            id: "montblanc",
            name: "Mont Blanc",
            image: "montBlanc.jpeg"
        },
        {
            id: "jaeger",
            name: "Jaeger-LeCoutre",
            image: "jaeger.jpeg"
        },
        {
            id: "tagheuer",
            name: "TagHeuer",
            image: "tagheuer.jpeg"
        },
        {
            id: "ulysse",
            name: "Ulysse Nardin",
            image: "ulysse.jpeg"
        },
        {
            id: "frank",
            name: "Franck Muller",
            image: "franck_muller.jpeg"
        }
    ],

    maroquinerie: [
        {
            id: "cartier",
            name: "Cartier",
            image: "images/brands/cartier.jpg"
        },
        {
            id: "hermes",
            name: "Hermès",
            image: "images/brands/hermes.jpg"
        }
    ],

    accessoires: [
        {
            id: "cartier",
            name: "Cartier",
            image: "images/brands/cartier.jpg"
        },
        {
            id: "rolex",
            name: "Rolex",
            image: "images/brands/rolex.jpg"
        }
    ]

};

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
        const searchBtn = document.getElementById('search-btn');
        const searchPanel = document.getElementById('search-panel');
        const searchBackdrop = document.getElementById('search-backdrop');
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        const searchCloseBtn = document.getElementById('search-close-btn');
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
        const checkoutBtn = document.getElementById("checkout-btn");
        const WHATSAPP_NUMBER = "243835728309";
        
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const productGrid = document.getElementById('product-grid');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const brandFilterSection = document.getElementById('brand-filter-section');
        const brandFilterGrid = document.getElementById('brand-filter-grid');
        const resetBrandFilter = document.getElementById('reset-brand-filter');
        const bestProductsScroll = document.getElementById('best-products-scroll');

        // =========================================================
// PREMIUM CATALOGUE ACCORDION
// =========================================================

const catalogueToggle =
    document.getElementById('catalogue-toggle');

const catalogueContent =
    document.getElementById('catalogue-content');

let catalogueOpen = false;


const toggleCatalogue = () => {

    catalogueOpen = !catalogueOpen;


    // -----------------------------------------------------
    // UPDATE BUTTON STATE
    // -----------------------------------------------------

    catalogueToggle.classList.toggle(
        'is-flipped',
        catalogueOpen
    );


    // -----------------------------------------------------
    // UPDATE CATALOGUE
    // -----------------------------------------------------

    catalogueContent.classList.toggle(
        'is-open',
        catalogueOpen
    );


    // -----------------------------------------------------
    // ACCESSIBILITY
    // -----------------------------------------------------

    catalogueToggle.setAttribute(
        'aria-expanded',
        String(catalogueOpen)
    );

    catalogueContent.setAttribute(
        'aria-hidden',
        String(!catalogueOpen)
    );


    // -----------------------------------------------------
    // SCROLL TO CATALOGUE AFTER OPENING
    // -----------------------------------------------------

    if (catalogueOpen) {

        setTimeout(() => {

            catalogueContent.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }, 850);

    }

};


if (catalogueToggle && catalogueContent) {

    catalogueToggle.addEventListener(
        'click',
        toggleCatalogue
    );

}

        
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

    const isOpen = mobileMenu.classList.contains('open');

    if (isOpen) {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    } else {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

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

        // =========================================================
// PREMIUM PRODUCT SEARCH
// =========================================================

const normalizeSearchText = (value) => {
    return String(value || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
};


// ---------------------------------------------------------
// OPEN SEARCH
// ---------------------------------------------------------

const openSearch = () => {

    searchPanel.classList.add('open');
    searchBackdrop.classList.add('open');

    searchBtn.setAttribute('aria-expanded', 'true');

    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        searchInput.focus();
    }, 250);

    renderSearchResults('');
};


// ---------------------------------------------------------
// CLOSE SEARCH
// ---------------------------------------------------------

const closeSearch = () => {

    searchPanel.classList.remove('open');
    searchBackdrop.classList.remove('open');

    searchBtn.setAttribute('aria-expanded', 'false');

    searchInput.value = '';

    searchResults.innerHTML = '';

    document.body.style.overflow = '';
};


// ---------------------------------------------------------
// SEARCH PRODUCTS
// ---------------------------------------------------------

const searchProducts = (query) => {

    const normalizedQuery = normalizeSearchText(query);

    if (!normalizedQuery) {
        return [];
    }

    return products.filter(product => {

        const searchableContent = [
            product.name,
            product.brand,
            product.category,
            product.desc
        ]
            .map(normalizeSearchText)
            .join(' ');

        return searchableContent.includes(normalizedQuery);
    });
};


// ---------------------------------------------------------
// RENDER SEARCH RESULTS
// ---------------------------------------------------------

const renderSearchResults = (query) => {

    const normalizedQuery = normalizeSearchText(query);

    // Recherche vide
    if (!normalizedQuery) {

        searchResults.innerHTML = `
            <div class="search-hint">
                Recherchez une pièce, une maison ou une catégorie.
            </div>
        `;

        return;
    }


    const results = searchProducts(normalizedQuery);


    // Aucun résultat
    if (results.length === 0) {

        searchResults.innerHTML = `
            <div class="search-empty">

                <span class="search-empty-label">
                    Recherche
                </span>

                <p class="search-empty-title">
                    Aucun produit trouvé
                </p>

                <p class="text-sm text-brand-dark-cyan/50 mt-2">
                    Essayez un autre nom, une autre marque ou une catégorie.
                </p>

            </div>
        `;

        return;
    }


    // Résultats
    searchResults.innerHTML = '';


    results.forEach(product => {

        const result = document.createElement('button');

        result.type = 'button';

        result.className = 'search-result-item';

        result.innerHTML = `
            <img
                src="${product.img}"
                alt="${product.name}"
                class="search-result-image"
                loading="lazy"
            >

            <span class="search-result-info">

                <span class="search-result-brand">
                    ${product.brand || product.category}
                </span>

                <span class="search-result-name">
                    ${product.name}
                </span>

            </span>

            <span class="search-result-price">
                ${formatPrice(product.price)}
            </span>

            <svg
                class="w-4 h-4 text-brand-dark-cyan/30 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 5l7 7-7 7"
                ></path>
            </svg>
        `;


        result.addEventListener('click', () => {

            goToSearchedProduct(product.id);

        });


        searchResults.appendChild(result);

    });

};


// ---------------------------------------------------------
// REDIRECT TO PRODUCT
// ---------------------------------------------------------

const goToSearchedProduct = (productId) => {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;


    // Fermer la recherche
    closeSearch();


    // Désactiver les filtres de catégorie
    filterBtns.forEach(btn => {

        btn.classList.remove(
            'active',
            'border-brand-dark-cyan',
            'text-brand-dark-cyan'
        );

        btn.classList.add(
            'border-transparent',
            'text-brand-dark-cyan/60'
        );

    });


    // Activer "Tout"
    const allFilter = document.querySelector(
        '.filter-btn[data-filter="all"]'
    );

    if (allFilter) {

        allFilter.classList.remove(
            'border-transparent',
            'text-brand-dark-cyan/60'
        );

        allFilter.classList.add(
            'active',
            'border-brand-dark-cyan',
            'text-brand-dark-cyan'
        );

    }


    // Masquer le filtre des marques
    brandFilterSection.classList.add('hidden');

    resetBrandFilter.classList.add('hidden');


    // Afficher tous les produits
    renderProducts('all');


    // Attendre que le DOM soit reconstruit
    setTimeout(() => {

        const productCards =
            productGrid.querySelectorAll('.product-card');

        let targetCard = null;


        productCards.forEach(card => {

            const title =
                card.querySelector('h3');

            if (
                title &&
                normalizeSearchText(title.textContent) ===
                normalizeSearchText(product.name)
            ) {
                targetCard = card;
            }

        });


        if (!targetCard) return;


        // Redirection visuelle vers le produit
        targetCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });


        // Mise en évidence temporaire
        setTimeout(() => {

            targetCard.classList.add(
                'search-highlight'
            );

        }, 500);


        // Retirer la mise en évidence
        setTimeout(() => {

            targetCard.classList.remove(
                'search-highlight'
            );

        }, 3000);

    }, 100);

};


// ---------------------------------------------------------
// SEARCH EVENTS
// ---------------------------------------------------------

searchBtn.addEventListener(
    'click',
    openSearch
);

searchCloseBtn.addEventListener(
    'click',
    closeSearch
);

searchBackdrop.addEventListener(
    'click',
    closeSearch
);


searchInput.addEventListener(
    'input',
    (event) => {

        renderSearchResults(
            event.target.value
        );

    }
);


// ---------------------------------------------------------
// ESCAPE KEY
// ---------------------------------------------------------

document.addEventListener(
    'keydown',
    (event) => {

        if (
            event.key === 'Escape' &&
            searchPanel.classList.contains('open')
        ) {
            closeSearch();
        }

    }
);

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

        const sendOrderToWhatsApp = () => {

    if (cart.length === 0) {
        showMessage("Votre panier est vide.");
        return;
    }

    let total = 0;

    let message = `🛍 *Nouvelle commande Luxury by Ess*%0A%0A`;

    cart.forEach((item, index) => {

        const sousTotal = item.price * item.quantity;

        total += sousTotal;

        message +=
`*${index + 1}. ${item.name}*
Quantité : ${item.quantity}
Prix : ${formatPrice(item.price)}
Sous-total : ${formatPrice(sousTotal)}

`;
    });

    message +=
`------------------------
💰 Total : ${formatPrice(total)}

Je souhaite confirmer cette commande.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
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

        // =========================================================
// RENDER PREMIUM BRANDS
// =========================================================

const renderBrandFilters = (category) => {

    brandFilterGrid.innerHTML = '';

    const brands = brandCatalogs[category] || [];

    /*
     * Si la catégorie ne possède pas de catalogue
     * de marques, on masque complètement le second filtre.
     */
    if (!brands.length) {

        brandFilterSection.classList.add('hidden');

        return;
    }

    brandFilterSection.classList.remove('hidden');

    brands.forEach((brand, index) => {

        const card = document.createElement('button');

        card.type = 'button';

        card.className = `
            brand-filter-card
            opacity-0
            translate-y-6
        `;

        card.dataset.brand = brand.id;

        card.innerHTML = `
            <div class="brand-filter-image-wrapper">

                <img
                    src="${brand.image}"
                    alt="${brand.name}"
                    class="brand-filter-image"
                    loading="lazy"
                >

                <div class="brand-filter-overlay"></div>

            </div>

            <div class="brand-filter-content">

                <span class="brand-filter-eyebrow">
                    Maison
                </span>

                <span class="brand-filter-name">
                    ${brand.name}
                </span>

            </div>
        `;

        brandFilterGrid.appendChild(card);

        setTimeout(() => {

            card.classList.remove(
                'opacity-0',
                'translate-y-6'
            );

            card.classList.add(
                'transition-all',
                'duration-700',
                'ease-out'
            );

        }, index * 80);


        // Sélection d'une marque
        card.addEventListener('click', () => {

            document
                .querySelectorAll('.brand-filter-card')
                .forEach(item => {
                    item.classList.remove('active');
                });

            card.classList.add('active');

            const selectedBrand =
                card.dataset.brand;

            renderProducts(category, selectedBrand);

            resetBrandFilter.classList.remove('hidden');

            /*
             * On ramène doucement l'utilisateur
             * vers les produits.
             */
            setTimeout(() => {

                productGrid.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }, 100);

        });

    });

};

// =========================================================
// MULTI-VIEW PRODUCT GALLERY
// =========================================================

const getProductImages = (product) => {

    if (
        Array.isArray(product.images) &&
        product.images.length
    ) {
        return product.images;
    }

    return [
        {
            src: product.img,
            label: "Vue principale"
        }
    ];
};


// ---------------------------------------------------------
// PRODUCT GALLERY
// ---------------------------------------------------------

const createProductGallery = (product) => {

    const images = getProductImages(product);

    const galleryId = `product-gallery-${product.id}`;

    const mainImage = images[0];

    const gallery = document.createElement('div');

    gallery.className = 'luxury-product-gallery';

    gallery.dataset.galleryId = galleryId;

    gallery.innerHTML = `

        <div class="luxury-gallery-main">

            <img
                src="${mainImage.src}"
                alt="${product.name} — ${mainImage.label}"
                class="luxury-gallery-main-image"
                data-gallery-main
                loading="lazy"
            >

            ${
                images.length > 1
                ? `
                    <button
                        type="button"
                        class="luxury-gallery-arrow luxury-gallery-prev"
                        aria-label="Vue précédente"
                        data-gallery-prev
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                d="M15 18l-6-6 6-6"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <button
                        type="button"
                        class="luxury-gallery-arrow luxury-gallery-next"
                        aria-label="Vue suivante"
                        data-gallery-next
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                d="M9 18l6-6-6-6"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                `
                : ''
            }

            <button
                type="button"
                class="luxury-gallery-zoom"
                aria-label="Agrandir l'image de ${product.name}"
                data-gallery-zoom
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <circle
                        cx="11"
                        cy="11"
                        r="6.5"
                        stroke-width="1.5"
                    />

                    <path
                        d="M16 16l5 5"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />

                    <path
                        d="M11 8v6M8 11h6"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                </svg>
            </button>

        </div>

        ${
            images.length > 1
            ? `
                <div
                    class="luxury-gallery-thumbnails"
                    role="tablist"
                    aria-label="Vues de ${product.name}"
                >

                    ${images.map((image, index) => `

                        <button
                            type="button"
                            class="
                                luxury-gallery-thumbnail
                                ${index === 0 ? 'active' : ''}
                            "
                            data-gallery-index="${index}"
                            role="tab"
                            aria-label="${image.label}"
                            aria-selected="${index === 0}"
                        >

                            <img
                                src="${image.src}"
                                alt="${product.name} — ${image.label}"
                                loading="lazy"
                            >

                        </button>

                    `).join('')}

                </div>
            `
            : ''
        }

    `;


    // -----------------------------------------------------
    // GALLERY STATE
    // -----------------------------------------------------

    let currentIndex = 0;


    const mainImageElement =
        gallery.querySelector('[data-gallery-main]');

    const thumbnails =
        gallery.querySelectorAll(
            '.luxury-gallery-thumbnail'
        );


    const updateGallery = (index) => {

        if (!images[index]) return;

        currentIndex = index;

        const selectedImage = images[index];


        // Image principale
        mainImageElement.classList.add(
            'luxury-gallery-changing'
        );


        setTimeout(() => {

            mainImageElement.src =
                selectedImage.src;

            mainImageElement.alt =
                `${product.name} — ${selectedImage.label}`;

            mainImageElement.classList.remove(
                'luxury-gallery-changing'
            );

        }, 120);


        // État des miniatures
        thumbnails.forEach((thumbnail, thumbnailIndex) => {

            const isActive =
                thumbnailIndex === index;

            thumbnail.classList.toggle(
                'active',
                isActive
            );

            thumbnail.setAttribute(
                'aria-selected',
                String(isActive)
            );

        });

    };


    // -----------------------------------------------------
    // THUMBNAILS
    // -----------------------------------------------------

    thumbnails.forEach((thumbnail) => {

        thumbnail.addEventListener(
            'click',
            () => {

                const index =
                    Number(
                        thumbnail.dataset.galleryIndex
                    );

                updateGallery(index);

            }
        );

    });


    // -----------------------------------------------------
    // PREVIOUS
    // -----------------------------------------------------

    const previousButton =
        gallery.querySelector('[data-gallery-prev]');

    if (previousButton) {

        previousButton.addEventListener(
            'click',
            (event) => {

                event.stopPropagation();

                const previousIndex =
                    currentIndex === 0
                        ? images.length - 1
                        : currentIndex - 1;

                updateGallery(previousIndex);

            }
        );

    }


    // -----------------------------------------------------
    // NEXT
    // -----------------------------------------------------

    const nextButton =
        gallery.querySelector('[data-gallery-next]');

    if (nextButton) {

        nextButton.addEventListener(
            'click',
            (event) => {

                event.stopPropagation();

                const nextIndex =
                    currentIndex === images.length - 1
                        ? 0
                        : currentIndex + 1;

                updateGallery(nextIndex);

            }
        );

    }


    // -----------------------------------------------------
    // ZOOM / LIGHTBOX
    // -----------------------------------------------------

    const zoomButton =
        gallery.querySelector('[data-gallery-zoom]');

    if (zoomButton) {

        zoomButton.addEventListener(
            'click',
            (event) => {

                event.stopPropagation();

                openProductLightbox(
                    product,
                    images,
                    currentIndex
                );

            }
        );

    }


    // -----------------------------------------------------
    // SWIPE MOBILE
    // -----------------------------------------------------

    let touchStartX = 0;
    let touchEndX = 0;


    mainImageElement.addEventListener(
        'touchstart',
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    mainImageElement.addEventListener(
        'touchend',
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            const distance =
                touchStartX - touchEndX;


            if (Math.abs(distance) < 40) {
                return;
            }


            if (distance > 0) {

                const nextIndex =
                    currentIndex === images.length - 1
                        ? 0
                        : currentIndex + 1;

                updateGallery(nextIndex);

            } else {

                const previousIndex =
                    currentIndex === 0
                        ? images.length - 1
                        : currentIndex - 1;

                updateGallery(previousIndex);

            }

        },
        { passive: true }
    );


    return gallery;
};

// =========================================================
// PRODUCT LIGHTBOX
// =========================================================

let productLightbox = null;


const createProductLightbox = () => {

    if (productLightbox) {
        return productLightbox;
    }


    productLightbox =
        document.createElement('div');

    productLightbox.id =
        'luxury-product-lightbox';

    productLightbox.className =
        'luxury-product-lightbox';


    productLightbox.innerHTML = `

        <div
            class="luxury-lightbox-inner"
            role="dialog"
            aria-modal="true"
            aria-label="Galerie produit"
        >

            <button
                type="button"
                class="luxury-lightbox-close"
                aria-label="Fermer la galerie"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                </svg>
            </button>


            <button
                type="button"
                class="luxury-lightbox-arrow luxury-lightbox-prev"
                aria-label="Vue précédente"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                        d="M15 18l-6-6 6-6"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>


            <div class="luxury-lightbox-image-wrapper">

                <img
                    class="luxury-lightbox-image"
                    src=""
                    alt=""
                >

            </div>


            <button
                type="button"
                class="luxury-lightbox-arrow luxury-lightbox-next"
                aria-label="Vue suivante"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                        d="M9 18l6-6-6-6"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>


            <div
                class="luxury-lightbox-thumbnails"
            ></div>

        </div>

    `;


    document.body.appendChild(
        productLightbox
    );


    // Fermeture
    productLightbox
        .querySelector('.luxury-lightbox-close')
        .addEventListener(
            'click',
            closeProductLightbox
        );


    productLightbox
        .addEventListener(
            'click',
            (event) => {

                if (
                    event.target ===
                    productLightbox
                ) {
                    closeProductLightbox();
                }

            }
        );


    // ESC
    document.addEventListener(
        'keydown',
        (event) => {

            if (
                event.key === 'Escape' &&
                productLightbox.classList.contains('open')
            ) {
                closeProductLightbox();
            }

        }
    );


    return productLightbox;
};


// ---------------------------------------------------------
// OPEN LIGHTBOX
// ---------------------------------------------------------

const openProductLightbox = (
    product,
    images,
    selectedIndex
) => {

    const lightbox =
        createProductLightbox();


    let currentIndex =
        selectedIndex;


    const imageElement =
        lightbox.querySelector(
            '.luxury-lightbox-image'
        );

    const thumbnailsContainer =
        lightbox.querySelector(
            '.luxury-lightbox-thumbnails'
        );


    const updateLightbox = (index) => {

        currentIndex = index;

        const image =
            images[currentIndex];


        imageElement.src =
            image.src;

        imageElement.alt =
            `${product.name} — ${image.label}`;


        thumbnailsContainer
            .querySelectorAll('button')
            .forEach(
                (thumbnail, thumbnailIndex) => {

                    thumbnail.classList.toggle(
                        'active',
                        thumbnailIndex === currentIndex
                    );

                }
            );

    };


    thumbnailsContainer.innerHTML =
        images.map(
            (image, index) => `

                <button
                    type="button"
                    class="
                        luxury-lightbox-thumbnail
                        ${index === currentIndex ? 'active' : ''}
                    "
                    aria-label="${image.label}"
                >
                    <img
                        src="${image.src}"
                        alt=""
                        loading="lazy"
                    >
                </button>

            `
        ).join('');


    thumbnailsContainer
        .querySelectorAll('button')
        .forEach(
            (thumbnail, index) => {

                thumbnail.addEventListener(
                    'click',
                    () => {

                        updateLightbox(index);

                    }
                );

            }
        );


    lightbox
        .querySelector('.luxury-lightbox-prev')
        .onclick = () => {

            const previousIndex =
                currentIndex === 0
                    ? images.length - 1
                    : currentIndex - 1;

            updateLightbox(previousIndex);

        };


    lightbox
        .querySelector('.luxury-lightbox-next')
        .onclick = () => {

            const nextIndex =
                currentIndex === images.length - 1
                    ? 0
                    : currentIndex + 1;

            updateLightbox(nextIndex);

        };


    updateLightbox(currentIndex);


    lightbox.classList.add('open');

    document.body.style.overflow = 'hidden';

};


// ---------------------------------------------------------
// CLOSE LIGHTBOX
// ---------------------------------------------------------

const closeProductLightbox = () => {

    if (!productLightbox) {
        return;
    }

    productLightbox.classList.remove(
        'open'
    );

    document.body.style.overflow = '';

};

        // --- Render Main Product Grid (with Filtering) ---
        // =========================================================
// RENDER MAIN PRODUCT GRID
// CATEGORY + BRAND FILTERING
// =========================================================

const renderProducts = (
    filter = 'all',
    brand = null
) => {

    productGrid.innerHTML = '';

    let filteredProducts;


    // -----------------------------------------------------
    // 1. CATEGORY FILTER
    // -----------------------------------------------------

    if (filter === 'all') {

        filteredProducts = products;

    } else {

        filteredProducts = products.filter(p =>
            p.category === filter ||
            (
                filter === 'accessoires' &&
                p.category !== 'horlogerie' &&
                p.category !== 'maroquinerie'
            )
        );

    }


    // -----------------------------------------------------
    // 2. BRAND FILTER
    // -----------------------------------------------------

    if (brand) {

        filteredProducts = filteredProducts.filter(
            p => p.brand === brand
        );

    }


    // -----------------------------------------------------
    // 3. RENDER PRODUCTS
    // -----------------------------------------------------

    filteredProducts.forEach((p, index) => {

        const delay = index * 100;

        const card = document.createElement('div');

        card.className = `
            product-card
            group
            flex
            flex-col
            bg-white
            border
            border-brand-dark-cyan/5
            p-4
            opacity-0
            transform
            translate-y-8
            transition-all
            duration-700
            ease-out
        `;

        card.style.transitionDelay = `${delay}ms`;

        card.innerHTML = `

    <div
        class="product-image-container
               relative
               h-80
               mb-6
               bg-[#f4ece0]"
    >

        <div
            class="product-gallery-mount"
            data-product-gallery="${p.id}"
        ></div>

        <div
            class="absolute inset-0
                   bg-brand-dark-cyan/20
                   opacity-0
                   group-hover:opacity-100
                   transition-opacity
                   duration-300
                   flex items-center
                   justify-center
                   pointer-events-none"
        >

            <button
                onclick="addToCart(${p.id}); event.stopPropagation();"
                class="bg-brand-pale-orange
                       text-brand-dark-cyan
                       px-6
                       py-3
                       font-medium
                       text-sm
                       tracking-widest
                       uppercase
                       hover:bg-white
                       transition-colors
                       transform
                       translate-y-4
                       group-hover:translate-y-0
                       duration-300
                       pointer-events-auto"
            >
                Ajouter au panier
            </button>

        </div>

    </div>


    <div
        class="text-center
               flex-grow
               flex flex-col
               justify-between"
    >

        <div>

            <span
                class="text-xs
                       text-brand-dark-cyan/50
                       uppercase
                       tracking-widest
                       mb-2
                       block"
            >
                ${p.brand || p.category}
            </span>

            <h3
                class="font-serif
                       text-xl
                       text-brand-dark-cyan
                       mb-2"
            >
                ${p.name}
            </h3>

            <p
                class="text-sm
                       font-light
                       text-brand-dark-cyan/70
                       line-clamp-2
                       mb-4"
            >
                ${p.desc}
            </p>

        </div>

        <p
            class="font-medium
                   text-lg
                   text-brand-dark-cyan"
        >
            ${formatPrice(p.price)}
        </p>

    </div>
`;

        productGrid.appendChild(card);

        // Initialisation de la galerie multi-vues
const galleryMount =
    card.querySelector(
        '[data-product-gallery]'
    );

if (galleryMount) {

    galleryMount.appendChild(
        createProductGallery(p)
    );

}


        // Animation
        setTimeout(() => {

            card.classList.remove(
                'opacity-0',
                'translate-y-8'
            );

        }, 50);

    });


    // -----------------------------------------------------
    // EMPTY STATE
    // -----------------------------------------------------

    if (filteredProducts.length === 0) {

        productGrid.innerHTML = `

            <div
                class="col-span-full
                       text-center
                       py-16"
            >

                <span
                    class="block
                           text-xs
                           uppercase
                           tracking-[0.25em]
                           text-brand-dark-cyan/40
                           mb-4"
                >
                    Collection
                </span>

                <p
                    class="font-serif
                           text-2xl
                           text-brand-dark-cyan"
                >
                    Aucun produit disponible
                </p>

                <p
                    class="mt-2
                           text-sm
                           text-brand-dark-cyan/60"
                >
                    Cette sélection sera bientôt enrichie.
                </p>

            </div>

        `;

    }

};

// FILTER LOGIC
// CATEGORY → BRAND → PRODUCTS
// =========================================================

filterBtns.forEach(btn => {

    btn.addEventListener('click', (e) => {

        // -------------------------------------------------
        // Active category
        // -------------------------------------------------

        filterBtns.forEach(b => {

            b.classList.remove(
                'active',
                'border-brand-dark-cyan',
                'text-brand-dark-cyan'
            );

            b.classList.add(
                'border-transparent',
                'text-brand-dark-cyan/60'
            );

        });


        const target = e.currentTarget;


        target.classList.remove(
            'border-transparent',
            'text-brand-dark-cyan/60'
        );

        target.classList.add(
            'active',
            'border-brand-dark-cyan',
            'text-brand-dark-cyan'
        );


        const filterValue =
            target.getAttribute('data-filter');


        // -------------------------------------------------
        // Reset second filter
        // -------------------------------------------------

        document
            .querySelectorAll('.brand-filter-card')
            .forEach(card => {
                card.classList.remove('active');
            });

        resetBrandFilter.classList.add('hidden');


        // -------------------------------------------------
        // Category "Tout"
        // -------------------------------------------------

        if (filterValue === 'all') {

            brandFilterSection.classList.add('hidden');

            productGrid.style.opacity = '0';

            setTimeout(() => {

                renderProducts('all');

                productGrid.style.opacity = '1';

            }, 300);

            return;
        }


        // -------------------------------------------------
        // Category selected
        // -------------------------------------------------

        renderBrandFilters(filterValue);

        // -------------------------------------------------
// Product transition
// -------------------------------------------------

productGrid.style.opacity = '0';

setTimeout(() => {

    /*
     * Aucun produit n'est affiché tant que
     * le client n'a pas choisi une marque.
     *
     * Le second filtre devient l'étape
     * intermédiaire obligatoire :
     *
     * Catégorie → Marque → Produits
     */
    productGrid.innerHTML = '';

    /*
     * Si la catégorie possède bien un catalogue
     * de marques, on attend la sélection du client.
     */
    if (
        brandCatalogs[filterValue] &&
        brandCatalogs[filterValue].length
    ) {
        productGrid.style.opacity = '1';
        return;
    }

    /*
     * Sécurité : si une future catégorie ne possède
     * aucune marque, ses produits restent affichés.
     */
    renderProducts(filterValue);

    productGrid.style.opacity = '1';

}, 300);

    });

});

// =========================================================
// RESET BRAND FILTER
// =========================================================

resetBrandFilter.addEventListener('click', () => {

    document
        .querySelectorAll('.brand-filter-card')
        .forEach(card => {
            card.classList.remove('active');
        });

    resetBrandFilter.classList.add('hidden');

    // Récupérer la catégorie actuellement sélectionnée
    const activeCategory =
        document.querySelector('.filter-btn.active');

    const category =
        activeCategory
            ? activeCategory.getAttribute('data-filter')
            : 'all';

    // Réafficher les produits de la catégorie
    if (category !== 'all') {

        productGrid.style.opacity = '0';

        setTimeout(() => {

            renderProducts(category);

            productGrid.style.opacity = '1';

        }, 200);

    }

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

        checkoutBtn.addEventListener("click", sendOrderToWhatsApp);
