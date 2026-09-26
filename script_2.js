/* =========================================================
   PREMIUM PAGE NAVIGATION
   ========================================================= */

(function () {

    const pageNav = document.getElementById('premium-page-nav');
    const scrollTopBtn = document.getElementById('page-scroll-top');
    const scrollBottomBtn = document.getElementById('page-scroll-bottom');

    if (!pageNav || !scrollTopBtn || !scrollBottomBtn) return;

    function updatePageNavigation() {

        const scrollPosition = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;

        const maxScroll = pageHeight - viewportHeight;

        /* Afficher après avoir quitté le haut */
        if (scrollPosition > 250) {
            pageNav.classList.add('is-visible');
        } else {
            pageNav.classList.remove('is-visible');
        }

        /* Désactiver visuellement le bouton haut */
        if (scrollPosition <= 250) {
            scrollTopBtn.style.opacity = '0.45';
            scrollTopBtn.style.pointerEvents = 'none';
        } else {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        }

        /* Désactiver le bouton bas lorsque le footer est atteint */
        if (scrollPosition >= maxScroll - 100) {
            scrollBottomBtn.style.opacity = '0.45';
            scrollBottomBtn.style.pointerEvents = 'none';
        } else {
            scrollBottomBtn.style.opacity = '1';
            scrollBottomBtn.style.pointerEvents = 'auto';
        }
    }

    /* Remonter en haut */
    scrollTopBtn.addEventListener('click', function () {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });

    /* Aller tout en bas */
    scrollBottomBtn.addEventListener('click', function () {

        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });

    });

    /* Mise à jour pendant le scroll */
    window.addEventListener('scroll', updatePageNavigation, {
        passive: true
    });

    /* Mise à jour initiale */
    updatePageNavigation();

})();