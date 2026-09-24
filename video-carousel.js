/* =========================================================
   Luxury by Ess — Immersive Reels Video Carousel
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------------------------------
       1. RÉCUPÉRATION DES ÉLÉMENTS
       --------------------------------------------------------- */

    const track = document.getElementById('video-reels-track');

    if (!track) {
        return;
    }

    const cards = Array.from(
        track.querySelectorAll('.video-reel-card')
    );

    const videos = cards.map(card =>
        card.querySelector('.video-reel')
    );

    const prevButton = document.getElementById('video-reels-prev');
    const nextButton = document.getElementById('video-reels-next');

    const currentCounter =
        document.getElementById('video-reels-current');

    const totalCounter =
        document.getElementById('video-reels-total');

    const progressBar =
        document.getElementById('video-reels-progress-bar');


    /* ---------------------------------------------------------
       2. VARIABLES
       --------------------------------------------------------- */

    let activeIndex = 0;


    /* ---------------------------------------------------------
       3. PAGINATION
       --------------------------------------------------------- */

    if (totalCounter) {
        totalCounter.textContent =
            String(cards.length).padStart(2, '0');
    }


    /* ---------------------------------------------------------
       4. MISE À JOUR DES BOUTONS PLAY / PAUSE
       --------------------------------------------------------- */

    function updatePlayButton(card, video) {

        const playButton =
            card.querySelector('.js-video-play');

        if (!playButton || !video) {
            return;
        }

        const playIcon =
            playButton.querySelector('.icon-play');

        const pauseIcon =
            playButton.querySelector('.icon-pause');

        const isPaused = video.paused;

        if (playIcon) {
            playIcon.classList.toggle(
                'hidden',
                !isPaused
            );
        }

        if (pauseIcon) {
            pauseIcon.classList.toggle(
                'hidden',
                isPaused
            );
        }

        playButton.setAttribute(
            'aria-label',
            isPaused
                ? 'Lire la vidéo'
                : 'Mettre la vidéo en pause'
        );
    }


    /* ---------------------------------------------------------
       5. MISE À JOUR DU BOUTON MUTE / UNMUTE
       --------------------------------------------------------- */

    function updateMuteButton(card, video) {

        const muteButton =
            card.querySelector('.js-video-mute');

        if (!muteButton || !video) {
            return;
        }

        const mutedIcon =
            muteButton.querySelector('.icon-muted');

        const unmutedIcon =
            muteButton.querySelector('.icon-unmuted');

        const isMuted = video.muted;

        if (mutedIcon) {
            mutedIcon.classList.toggle(
                'hidden',
                !isMuted
            );
        }

        if (unmutedIcon) {
            unmutedIcon.classList.toggle(
                'hidden',
                isMuted
            );
        }

        muteButton.setAttribute(
            'aria-label',
            isMuted
                ? 'Activer le son'
                : 'Couper le son'
        );
    }


    /* ---------------------------------------------------------
       6. MISE À JOUR COMPLÈTE DES CONTRÔLES
       --------------------------------------------------------- */

    function updateCardControls(card, video) {

        if (!card || !video) {
            return;
        }

        updatePlayButton(card, video);
        updateMuteButton(card, video);
    }


    /* ---------------------------------------------------------
       7. ARRÊTER LES AUTRES VIDÉOS
       --------------------------------------------------------- */

    function pauseOtherVideos(activeVideo) {

        videos.forEach(video => {

            if (!video) {
                return;
            }

            if (video !== activeVideo) {

                video.pause();

                /*
                 * Toutes les vidéos non actives
                 * restent silencieuses.
                 */
                video.muted = true;
            }
        });
    }


    /* ---------------------------------------------------------
       8. MISE À JOUR DE LA PAGINATION
       --------------------------------------------------------- */

    function updatePagination(index) {

        if (currentCounter) {

            currentCounter.textContent =
                String(index + 1).padStart(2, '0');
        }

        if (progressBar) {

            const percentage =
                ((index + 1) / cards.length) * 100;

            progressBar.style.width =
                `${percentage}%`;
        }
    }


    /* ---------------------------------------------------------
       9. MISE À JOUR DE L'ÉTAT ACTIF
       --------------------------------------------------------- */

    function updateActiveCard(index) {

        activeIndex = Math.max(
            0,
            Math.min(index, cards.length - 1)
        );

        cards.forEach((card, i) => {

            card.classList.toggle(
                'is-active',
                i === activeIndex
            );

            updateCardControls(
                card,
                videos[i]
            );
        });

        updatePagination(activeIndex);

        /*
         * Désactivation des flèches aux extrémités.
         */
        if (prevButton) {

            prevButton.disabled =
                activeIndex === 0;
        }

        if (nextButton) {

            nextButton.disabled =
                activeIndex === cards.length - 1;
        }
    }


    /* ---------------------------------------------------------
       10. ALLER À UNE VIDÉO
       --------------------------------------------------------- */

   function scrollToVideo(index, behavior = 'smooth') {

    const targetCard = cards[
        Math.max(
            0,
            Math.min(
                index,
                cards.length - 1
            )
        )
    ];

    if (!targetCard) {
        return;
    }

    /*
     * IMPORTANT :
     * On calcule la position de la carte à l'intérieur
     * du track et on modifie UNIQUEMENT scrollLeft.
     *
     * Cela évite que scrollIntoView() tente de modifier
     * le scroll vertical de toute la page.
     */

    const trackRect =
        track.getBoundingClientRect();

    const cardRect =
        targetCard.getBoundingClientRect();

    const currentScroll =
        track.scrollLeft;

    const cardCenter =
        cardRect.left +
        cardRect.width / 2;

    const trackCenter =
        trackRect.left +
        trackRect.width / 2;

    const offset =
        cardCenter -
        trackCenter;

    track.scrollTo({
        left:
            currentScroll + offset,

        behavior:
            behavior
    });
}

    /* ---------------------------------------------------------
       11. ACTIVER UNE VIDÉO
       --------------------------------------------------------- */

    async function activateVideo(
        index,
        autoplay = true
    ) {

        const safeIndex =
            Math.max(
                0,
                Math.min(
                    index,
                    cards.length - 1
                )
            );

        const activeVideo =
            videos[safeIndex];

        if (!activeVideo) {
            return;
        }

        /*
         * On arrête toutes les autres vidéos.
         */
        pauseOtherVideos(activeVideo);

        /*
         * On met à jour la carte active.
         */
        updateActiveCard(safeIndex);

        /*
         * Lecture automatique de la vidéo active.
         */
        if (autoplay) {

            try {

                await activeVideo.play();

            } catch (error) {

                /*
                 * Certains navigateurs peuvent bloquer
                 * l'autoplay. Ce n'est pas une erreur
                 * critique.
                 */
            }
        }

        updateCardControls(
            cards[safeIndex],
            activeVideo
        );
    }


    /* ---------------------------------------------------------
       12. BOUTON PLAY / PAUSE
       --------------------------------------------------------- */

    cards.forEach((card, index) => {

        const video =
            videos[index];

        const playButton =
            card.querySelector('.js-video-play');

        const muteButton =
            card.querySelector('.js-video-mute');


        /* -----------------------------------------------------
           PLAY / PAUSE
           ----------------------------------------------------- */

        if (playButton) {

            playButton.addEventListener(
                'click',
                async (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    if (video.paused) {

                        /*
                         * Cette vidéo devient active.
                         */
                        pauseOtherVideos(video);

                        updateActiveCard(index);

                        try {

                            await video.play();

                        } catch (error) {

                            console.warn(
                                'Lecture vidéo impossible :',
                                error
                            );
                        }

                    } else {

                        /*
                         * Pause de la vidéo.
                         */
                        video.pause();
                    }

                    updateCardControls(
                        card,
                        video
                    );
                }
            );
        }


        /* -----------------------------------------------------
           MUTE / UNMUTE
           ----------------------------------------------------- */

        if (muteButton) {

            muteButton.addEventListener(
                'click',
                async (event) => {

                    event.preventDefault();
                    event.stopPropagation();

                    /*
                     * Inversion du son.
                     */
                    video.muted =
                        !video.muted;

                    /*
                     * Si l'utilisateur active le son
                     * alors que la vidéo est en pause,
                     * on relance la vidéo.
                     */
                    if (
                        !video.muted &&
                        video.paused
                    ) {

                        pauseOtherVideos(video);

                        updateActiveCard(index);

                        try {

                            await video.play();

                        } catch (error) {

                            console.warn(
                                'Lecture vidéo impossible :',
                                error
                            );
                        }
                    }

                    updateCardControls(
                        card,
                        video
                    );
                }
            );
        }


        /* -----------------------------------------------------
           ÉVÉNEMENTS VIDÉO
           ----------------------------------------------------- */

        video.addEventListener(
            'play',
            () => {

                updatePlayButton(
                    card,
                    video
                );
            }
        );


        video.addEventListener(
            'pause',
            () => {

                updatePlayButton(
                    card,
                    video
                );
            }
        );


        video.addEventListener(
            'volumechange',
            () => {

                updateMuteButton(
                    card,
                    video
                );
            }
        );

    });


    /* ---------------------------------------------------------
       13. DÉTECTION DE LA VIDÉO VISIBLE
       --------------------------------------------------------- */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const index =
                        cards.indexOf(
                            entry.target
                        );

                    if (index === -1) {
                        return;
                    }

                    /*
                     * La vidéo devient active
                     * lorsqu'elle est suffisamment visible.
                     */
                    activateVideo(
                        index,
                        true
                    );

                });

            },
            {
                root: track,

                /*
                 * Une vidéo doit être visible
                 * à environ 72 % pour devenir active.
                 */
                threshold: 0.72
            }
        );


    cards.forEach(card => {

        observer.observe(card);

    });


    /* ---------------------------------------------------------
       14. BOUTON PRÉCÉDENT
       --------------------------------------------------------- */

    if (prevButton) {

        prevButton.addEventListener(
            'click',
            () => {

                if (activeIndex <= 0) {
                    return;
                }

                const newIndex =
                    activeIndex - 1;

                scrollToVideo(
                    newIndex
                );

                activateVideo(
                    newIndex,
                    true
                );
            }
        );
    }


    /* ---------------------------------------------------------
       15. BOUTON SUIVANT
       --------------------------------------------------------- */

    if (nextButton) {

        nextButton.addEventListener(
            'click',
            () => {

                if (
                    activeIndex >=
                    cards.length - 1
                ) {
                    return;
                }

                const newIndex =
                    activeIndex + 1;

                scrollToVideo(
                    newIndex
                );

                activateVideo(
                    newIndex,
                    true
                );
            }
        );
    }


    /* ---------------------------------------------------------
       16. NAVIGATION AU CLAVIER
       --------------------------------------------------------- */

    track.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'ArrowLeft'
            ) {

                event.preventDefault();

                if (prevButton) {
                    prevButton.click();
                }
            }


            if (
                event.key === 'ArrowRight'
            ) {

                event.preventDefault();

                if (nextButton) {
                    nextButton.click();
                }
            }

        }
    );


    /* ---------------------------------------------------------
       17. REDIMENSIONNEMENT DE LA FENÊTRE
       --------------------------------------------------------- */

    let resizeTimer;

    window.addEventListener(
        'resize',
        () => {

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(
                    () => {

                        scrollToVideo(
                            activeIndex,
                            'auto'
                        );

                    },
                    150
                );
        }
    );


    /* ---------------------------------------------------------
       18. ÉTAT INITIAL
       --------------------------------------------------------- */

    updateActiveCard(0);


    /* ---------------------------------------------------------
       19. AUTOPLAY INITIAL
       --------------------------------------------------------- */

    const firstVideo =
        videos[0];

    if (firstVideo) {

        /*
         * Important :
         * muted = true permet généralement
         * l'autoplay sur les navigateurs modernes.
         */
        firstVideo.muted = true;

        firstVideo
            .play()
            .then(() => {

                updateCardControls(
                    cards[0],
                    firstVideo
                );

            })
            .catch(() => {

                /*
                 * L'utilisateur pourra lancer
                 * manuellement la vidéo avec Play.
                 */
                updateCardControls(
                    cards[0],
                    firstVideo
                );
            });
    }

});