document.addEventListener('DOMContentLoaded', () => {
    // Add styles for smooth scrolling
    const style = document.createElement('style');
    style.textContent = `
        /* Enable smooth scrolling */
        html {
            scroll-behavior: smooth;
            overflow-y: auto;
        }

        body {
            overflow-y: auto;
            height: 100%;
            margin: 0;
            padding: 0;
        }

        /* Ensure content is scrollable */
        .portfolio-section {
            min-height: 100vh;
            overflow-y: auto;
        }
    `;
    document.head.appendChild(style);

    // Enable keyboard navigation for scrolling
    document.addEventListener('keydown', (e) => {
        const scrollAmount = 100; // Adjust scroll amount as needed
        
        if (e.key === 'ArrowUp') {
            window.scrollBy({
                top: -scrollAmount,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowDown') {
            window.scrollBy({
                top: scrollAmount,
                behavior: 'smooth'
            });
        } else if (e.key === 'PageUp') {
            window.scrollBy({
                top: -window.innerHeight,
                behavior: 'smooth'
            });
        } else if (e.key === 'PageDown') {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    });

    // Initial animations for landing page
    const creativeText = document.querySelector('.creative-text');
    creativeText.style.opacity = '0';
    setTimeout(() => {
        creativeText.style.transition = 'opacity 1.5s ease-in-out';
        creativeText.style.opacity = '1';
    }, 500);

    // Navigation setup
    const sections = {
        personalInfo: document.querySelector('.personal-info'),
        educationalBackground: document.querySelector('.educational-background'),
        educationalBackground2: document.querySelector('.educational-background-2'),
        skillsAwards: document.querySelector('.skills-awards'),
        hobbies: document.querySelector('.hobbies'),
        gallery: document.querySelector('.gallery'),
        closing: document.querySelector('.closing')
    };

    const navigation = {
        forward: {
            personalInfo: 'educationalBackground',
            educationalBackground: 'educationalBackground2',
            educationalBackground2: 'skillsAwards',
            skillsAwards: 'hobbies',
            hobbies: 'gallery',
            gallery: 'closing',
            closing: null
        },
        backward: {
            personalInfo: null,
            educationalBackground: 'personalInfo',
            educationalBackground2: 'educationalBackground',
            skillsAwards: 'educationalBackground2',
            hobbies: 'skillsAwards',
            gallery: 'hobbies',
            closing: 'gallery'
        }
    };

    function navigateForward(currentSection) {
        const nextSectionKey = navigation.forward[currentSection];
        if (!nextSectionKey) return;

        const currentElement = sections[currentSection];
        const nextElement = sections[nextSectionKey];

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateBackward(currentSection) {
        const prevSectionKey = navigation.backward[currentSection];
        if (!prevSectionKey) return;

        const currentElement = sections[currentSection];
        const prevElement = sections[prevSectionKey];

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        prevElement.style.transform = 'translateX(-100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        prevElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        prevElement.style.opacity = '1';

        // Trigger reflow
        void prevElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate previous section in
        prevElement.style.transform = 'translateX(0)';
        prevElement.style.opacity = '1';
        prevElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    // Add click handlers for navigation arrows
    Object.keys(sections).forEach(sectionKey => {
        const section = sections[sectionKey];
        
        // Forward navigation (left arrows)
        const leftArrows = section.querySelector('.left-arrows');
        if (leftArrows) {
            leftArrows.addEventListener('click', () => {
                navigateForward(sectionKey);
            });
        }

        // Backward navigation (right arrows)
        const rightArrows = section.querySelector('.right-arrows');
        if (rightArrows) {
            rightArrows.addEventListener('click', () => {
                navigateBackward(sectionKey);
            });
        }
    });

    // Handle transition ends
    Object.values(sections).forEach(section => {
        section.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform' && !section.classList.contains('section-active')) {
                section.style.display = 'none';
            }
        });
    });

    // Add hover effect to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
            link.style.transition = 'transform 0.3s ease';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });

    // Add parallax effect to background
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.querySelector('.background-overlay').style.transform = 
            `translate(${moveX}px, ${moveY}px)`;
    });

    // Scroll animation for personal info section
    const personalInfo = document.querySelector('.personal-info');
    const profileCard = document.querySelector('.profile-card');
    const arrows = document.querySelectorAll('.arrows');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                profileCard.style.opacity = '1';
                profileCard.style.transform = 'translateY(0)';
                arrows.forEach(arrow => {
                    arrow.style.opacity = '1';
                    arrow.style.transform = 'translateX(0)';
                });
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(personalInfo);

    // Show personal info section by default and hide others
    sections.personalInfo.style.display = 'flex';
    sections.personalInfo.classList.add('section-active');
    sections.educationalBackground.style.display = 'none';
    sections.educationalBackground2.style.display = 'none';
    sections.skillsAwards.style.display = 'none';
    sections.hobbies.style.display = 'none';
    sections.gallery.style.display = 'none';
    sections.closing.style.display = 'none';

    // Initialize sections with transitions
    Object.values(sections).forEach(section => {
        if (section && section !== sections.personalInfo) {
            section.style.transform = 'translateX(100%)';
            section.style.opacity = '0';
            section.style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';
        }
    });

    // Add animation cleanup for all sections
    Object.values(sections).forEach(section => {
        section.addEventListener('animationend', () => {
            section.classList.remove('slide-out-right', 'slide-in-right', 'slide-out-left', 'slide-in-left');
        });
    });

    // Make sure hobbies section is properly initialized
    const hobbies = sections.hobbies;
    if (hobbies) {
        hobbies.style.transform = 'translateX(100%)';
        hobbies.style.opacity = '0';
        hobbies.style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';
    }

    // Reset animation classes after transitions
    personalInfo.addEventListener('animationend', () => {
        personalInfo.classList.remove('slide-out-left', 'slide-in-left');
    });

    sections.educationalBackground.addEventListener('animationend', () => {
        sections.educationalBackground.classList.remove('slide-out-left', 'slide-in-right', 'slide-out-right', 'slide-in-left');
    });

    sections.educationalBackground2.addEventListener('animationend', () => {
        sections.educationalBackground2.classList.remove('slide-out-left', 'slide-in-right', 'slide-out-right', 'slide-in-left');
    });

    sections.skillsAwards.addEventListener('animationend', () => {
        sections.skillsAwards.classList.remove('slide-out-right', 'slide-in-right');
    });

    sections.hobbies.addEventListener('animationend', () => {
        sections.hobbies.classList.remove('slide-out-right', 'slide-in-right');
    });

    // Gallery popup functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const popupGallery = document.querySelector('.popup-gallery');
    const closePopup = document.querySelector('.close-popup');
    const albumContainers = document.querySelectorAll('.album-container');
    const fullImagePopup = document.querySelector('.full-image-popup');
    const fullSizeImage = document.querySelector('.full-size-image');
    const closeFullImage = document.querySelector('.close-full-image');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentAlbum = null;
    let currentImageIndex = 0;
    let currentAlbumImages = [];

    // Open album popup
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const albumId = item.getAttribute('data-album');
            const portfolioSection = item.closest('.portfolio-section');
            currentAlbum = portfolioSection.querySelector(`#${albumId}-album`);
            
            if (currentAlbum) {
                // Hide all albums and show the selected one
                const albumContainers = portfolioSection.querySelectorAll('.album-container');
                albumContainers.forEach(container => container.classList.remove('active'));
                currentAlbum.classList.add('active');
                
                // Show the popup gallery
                const popupGallery = portfolioSection.querySelector('.popup-gallery');
                popupGallery.classList.add('active');
                
                // Get all images in the current album
                currentAlbumImages = Array.from(currentAlbum.querySelectorAll('img'));
            }
        });
    });

    // Close album popup
    document.querySelectorAll('.close-popup').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const popupGallery = closeBtn.closest('.popup-gallery');
            popupGallery.classList.remove('active');
            currentAlbum = null;
            currentAlbumImages = [];
        });
    });

    // Open full image view with smooth transitions
    document.querySelectorAll('.album-grid img').forEach((img) => {
        img.addEventListener('click', () => {
            const albumGrid = img.closest('.album-grid');
            const portfolioSection = img.closest('.portfolio-section');
            currentAlbumImages = Array.from(albumGrid.querySelectorAll('img'));
            currentImageIndex = currentAlbumImages.indexOf(img);
            
            // Get the full image popup specific to this portfolio section
            const fullImagePopup = portfolioSection.querySelector('.full-image-popup');
            const fullSizeImage = fullImagePopup.querySelector('.full-size-image');
            
            // Show loading state
            fullSizeImage.style.opacity = '0';
            fullImagePopup.classList.add('active');
            
            // Load the new image
            fullSizeImage.src = img.src;
            fullSizeImage.onload = () => {
                fullSizeImage.style.opacity = '1';
                fullSizeImage.style.transition = 'opacity 0.3s ease';
            };
            
            updateNavigationButtons(fullImagePopup);
        });
    });

    function updateNavigationButtons(popup) {
        const prevBtn = popup.querySelector('.prev-btn');
        const nextBtn = popup.querySelector('.next-btn');
        
        if (currentImageIndex === 0) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }
        
        if (currentImageIndex === currentAlbumImages.length - 1) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }
    }

    // Navigation with smooth transitions
    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                const fullImagePopup = btn.closest('.full-image-popup');
                const fullSizeImage = fullImagePopup.querySelector('.full-size-image');
                
                // Show loading state
                fullSizeImage.style.opacity = '0';
                
                // Load the new image
                fullSizeImage.src = currentAlbumImages[currentImageIndex].src;
                fullSizeImage.onload = () => {
                    fullSizeImage.style.opacity = '1';
                    fullSizeImage.style.transition = 'opacity 0.3s ease';
                };
                
                updateNavigationButtons(fullImagePopup);
            }
        });
    });

    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentImageIndex < currentAlbumImages.length - 1) {
                currentImageIndex++;
                const fullImagePopup = btn.closest('.full-image-popup');
                const fullSizeImage = fullImagePopup.querySelector('.full-size-image');
                
                // Show loading state
                fullSizeImage.style.opacity = '0';
                
                // Load the new image
                fullSizeImage.src = currentAlbumImages[currentImageIndex].src;
                fullSizeImage.onload = () => {
                    fullSizeImage.style.opacity = '1';
                    fullSizeImage.style.transition = 'opacity 0.3s ease';
                };
                
                updateNavigationButtons(fullImagePopup);
            }
        });
    });

    // Keyboard navigation for full image view
    document.addEventListener('keydown', (e) => {
        const fullImagePopup = document.querySelector('.full-image-popup.active');
        if (fullImagePopup) {
            if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
                currentImageIndex--;
                const fullSizeImage = fullImagePopup.querySelector('.full-size-image');
                
                // Show loading state
                fullSizeImage.style.opacity = '0';
                
                // Load the new image
                fullSizeImage.src = currentAlbumImages[currentImageIndex].src;
                fullSizeImage.onload = () => {
                    fullSizeImage.style.opacity = '1';
                    fullSizeImage.style.transition = 'opacity 0.3s ease';
                };
                
                updateNavigationButtons(fullImagePopup);
            } else if (e.key === 'ArrowRight' && currentImageIndex < currentAlbumImages.length - 1) {
                currentImageIndex++;
                const fullSizeImage = fullImagePopup.querySelector('.full-size-image');
                
                // Show loading state
                fullSizeImage.style.opacity = '0';
                
                // Load the new image
                fullSizeImage.src = currentAlbumImages[currentImageIndex].src;
                fullSizeImage.onload = () => {
                    fullSizeImage.style.opacity = '1';
                    fullSizeImage.style.transition = 'opacity 0.3s ease';
                };
                
                updateNavigationButtons(fullImagePopup);
            } else if (e.key === 'Escape') {
                const fullSizeImage = fullImagePopup.querySelector('.full-size-image');
                
                // Fade out
                fullSizeImage.style.opacity = '0';
                setTimeout(() => {
                    fullImagePopup.classList.remove('active');
                    fullSizeImage.src = '';
                }, 300);
            }
        } else if (fullImagePopup.classList.contains('active') && e.key === 'Escape') {
            fullImagePopup.classList.remove('active');
        }
    });

    // Scroll-based navigation
    const portfolioSections = document.querySelectorAll('.portfolio-section');
    const navDots = document.querySelectorAll('.nav-dots .dot');

    // Initialize scroll indicator
    let lastScrollTop = 0;
    let ticking = false;

    function updateScrollIndicator() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Update navbar background
        if (scrollTop > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }

        // Update active section
        portfolioSections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollTop >= sectionTop - windowHeight / 2 && scrollTop < sectionBottom - windowHeight / 2) {
                // Update navigation
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
                navDots.forEach(dot => dot.classList.remove('active'));
                navDots[index].classList.add('active');

                // Show section
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });

        lastScrollTop = scrollTop;
    }

    // Smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle scroll events
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollIndicator();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize sections
    portfolioSections.forEach((section, index) => {
        if (index === 0) {
            section.classList.add('visible');
        }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            const currentSection = document.querySelector('.portfolio-section.visible');
            if (currentSection) {
                const nextSection = currentSection.nextElementSibling;
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            const currentSection = document.querySelector('.portfolio-section.visible');
            if (currentSection) {
                const prevSection = currentSection.previousElementSibling;
                if (prevSection) {
                    prevSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });

    // Handle touch events for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchStartY - touchEndY;
        const currentSection = document.querySelector('.portfolio-section.visible');

        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0 && currentSection.nextElementSibling) {
                // Swipe up
                currentSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
            } else if (swipeDistance < 0 && currentSection.previousElementSibling) {
                // Swipe down
                currentSection.previousElementSibling.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Initialize scroll indicator
    updateScrollIndicator();

    // Montorio's sections
    const montorioSections = {
        personalInfo: document.querySelector('#montorio .personal-info'),
        educationalBackground: document.querySelector('#montorio .educational-background'),
        educationalBackground2: document.querySelector('#montorio .educational-background-2'),
        skillsAwards: document.querySelector('#montorio .skills-awards'),
        hobbies: document.querySelector('#montorio .hobbies'),
        gallery: document.querySelector('#montorio .gallery'),
        closing: document.querySelector('#montorio .closing')
    };

    function navigateMontorioForward() {
        const currentElement = montorioSections.personalInfo;
        const nextElement = montorioSections.educationalBackground;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateMontorioBackward() {
        const currentElement = montorioSections.educationalBackground;
        const prevElement = montorioSections.personalInfo;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        prevElement.style.transform = 'translateX(-100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        prevElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        prevElement.style.opacity = '1';

        // Trigger reflow
        void prevElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate previous section in
        prevElement.style.transform = 'translateX(0)';
        prevElement.style.opacity = '1';
        prevElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateMontorioEducationalForward() {
        const currentElement = montorioSections.educationalBackground;
        const nextElement = montorioSections.educationalBackground2;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateMontorioEducationalBackward() {
        const currentElement = montorioSections.educationalBackground2;
        const prevElement = montorioSections.educationalBackground;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        prevElement.style.transform = 'translateX(-100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        prevElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        prevElement.style.opacity = '1';

        // Trigger reflow
        void prevElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate previous section in
        prevElement.style.transform = 'translateX(0)';
        prevElement.style.opacity = '1';
        prevElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateMontorioSkillsAwardsForward() {
        const currentElement = montorioSections.skillsAwards;
        const nextElement = montorioSections.hobbies;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateMontorioEducational2Forward() {
        const currentElement = montorioSections.educationalBackground2;
        const nextElement = montorioSections.skillsAwards;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    // Add click handlers for Montorio's navigation arrows
    const montorioPersonalInfo = montorioSections.personalInfo;
    const montorioEducationalBackground = montorioSections.educationalBackground;
    const montorioEducationalBackground2 = montorioSections.educationalBackground2;
    const montorioSkillsAwards = montorioSections.skillsAwards;

    // Forward navigation (left arrows)
    const montorioLeftArrows = montorioPersonalInfo.querySelector('.left-arrows');
    if (montorioLeftArrows) {
        montorioLeftArrows.addEventListener('click', navigateMontorioForward);
    }

    const montorioEducationalLeftArrows = montorioEducationalBackground.querySelector('.left-arrows');
    if (montorioEducationalLeftArrows) {
        montorioEducationalLeftArrows.addEventListener('click', navigateMontorioEducationalForward);
    }

    const montorioEducational2LeftArrows = montorioEducationalBackground2.querySelector('.left-arrows');
    if (montorioEducational2LeftArrows) {
        montorioEducational2LeftArrows.addEventListener('click', navigateMontorioEducational2Forward);
    }

    // Backward navigation (right arrows)
    const montorioRightArrows = montorioEducationalBackground.querySelector('.right-arrows');
    if (montorioRightArrows) {
        montorioRightArrows.addEventListener('click', navigateMontorioBackward);
    }

    const montorioEducationalRightArrows = montorioEducationalBackground2.querySelector('.right-arrows');
    if (montorioEducationalRightArrows) {
        montorioEducationalRightArrows.addEventListener('click', navigateMontorioEducationalBackward);
    }

    // Add event listener for Montorio's skills and awards section left arrow
    const montorioSkillsAwardsLeftArrows = montorioSkillsAwards.querySelector('.left-arrows');
    if (montorioSkillsAwardsLeftArrows) {
        montorioSkillsAwardsLeftArrows.addEventListener('click', navigateMontorioSkillsAwardsForward);
    }

    // Initialize Montorio's sections
    montorioSections.personalInfo.style.display = 'flex';
    montorioSections.personalInfo.classList.add('section-active');
    montorioSections.educationalBackground.style.display = 'none';
    montorioSections.educationalBackground2.style.display = 'none';
    montorioSections.skillsAwards.style.display = 'none';
    montorioSections.hobbies.style.display = 'none';
    montorioSections.gallery.style.display = 'none';
    montorioSections.closing.style.display = 'none';

    // Add transitions to Montorio's sections
    [montorioEducationalBackground, montorioEducationalBackground2, montorioSkillsAwards].forEach(section => {
        section.style.transform = 'translateX(100%)';
        section.style.opacity = '0';
        section.style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';
    });

    // Handle transition ends for Montorio's sections
    [montorioPersonalInfo, montorioEducationalBackground, montorioEducationalBackground2, montorioSkillsAwards].forEach(section => {
        section.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform' && !section.classList.contains('section-active')) {
                section.style.display = 'none';
            }
        });
    });

    function navigateMontorioGalleryForward() {
        const currentElement = montorioSections.gallery;
        const nextElement = montorioSections.closing;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateMontorioGalleryBackward() {
        const currentElement = montorioSections.gallery;
        const prevElement = montorioSections.hobbies;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        prevElement.style.transform = 'translateX(-100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        prevElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        prevElement.style.opacity = '1';

        // Trigger reflow
        void prevElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate previous section in
        prevElement.style.transform = 'translateX(0)';
        prevElement.style.opacity = '1';
        prevElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    // Add event listeners for Montorio's gallery section
    const montorioGalleryLeftArrows = montorioSections.gallery.querySelector('.left-arrows');
    if (montorioGalleryLeftArrows) {
        montorioGalleryLeftArrows.addEventListener('click', navigateMontorioGalleryForward);
    }

    const montorioGalleryRightArrows = montorioSections.gallery.querySelector('.right-arrows');
    if (montorioGalleryRightArrows) {
        montorioGalleryRightArrows.addEventListener('click', navigateMontorioGalleryBackward);
    }

    function navigateMontorioHobbiesForward() {
        const currentElement = montorioSections.hobbies;
        const nextElement = montorioSections.gallery;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateMontorioHobbiesBackward() {
        const currentElement = montorioSections.hobbies;
        const prevElement = montorioSections.skillsAwards;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        prevElement.style.transform = 'translateX(-100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        prevElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        prevElement.style.opacity = '1';

        // Trigger reflow
        void prevElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate previous section in
        prevElement.style.transform = 'translateX(0)';
        prevElement.style.opacity = '1';
        prevElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    // Add event listener for Montorio's hobbies section left arrow
    const montorioHobbiesLeftArrows = montorioSections.hobbies.querySelector('.left-arrows');
    if (montorioHobbiesLeftArrows) {
        montorioHobbiesLeftArrows.addEventListener('click', navigateMontorioHobbiesForward);
    }

    // Add event listener for Montorio's skills and awards section right arrow
    const montorioSkillsAwardsRightArrows = montorioSections.skillsAwards.querySelector('.right-arrows');
    if (montorioSkillsAwardsRightArrows) {
        montorioSkillsAwardsRightArrows.addEventListener('click', () => {
            const currentElement = montorioSections.skillsAwards;
            const prevElement = montorioSections.educationalBackground2;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Add event listener for Montorio's closing section left arrow
    const montorioClosingLeftArrows = montorioSections.closing.querySelector('.left-arrows');
    if (montorioClosingLeftArrows) {
        montorioClosingLeftArrows.addEventListener('click', () => {
            const currentElement = montorioSections.closing;
            const nextElement = montorioSections.gallery;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Add event listener for Montorio's hobbies section right arrow
    const montorioHobbiesRightArrows = montorioSections.hobbies.querySelector('.right-arrows');
    if (montorioHobbiesRightArrows) {
        montorioHobbiesRightArrows.addEventListener('click', navigateMontorioHobbiesBackward);
    }

    // Gallery functionality for Montorio
    const montorioGalleryItems = document.querySelectorAll('#montorio .gallery-item');
    const montorioPopupGallery = document.querySelector('#montorio .popup-gallery');
    const montorioClosePopup = document.querySelector('#montorio .close-popup');
    const montorioFullImagePopup = document.querySelector('#montorio .full-image-popup');
    const montorioFullImage = document.querySelector('#montorio .full-size-image');
    const montorioCloseFullImage = document.querySelector('#montorio .close-full-image');
    const montorioPrevBtn = document.querySelector('#montorio .prev-btn');
    const montorioNextBtn = document.querySelector('#montorio .next-btn');

    let currentMontorioAlbum = '';
    let currentMontorioImageIndex = 0;
    let montorioImages = [];

    // Open album when clicking on gallery item
    montorioGalleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const albumId = item.getAttribute('data-album');
            currentMontorioAlbum = albumId;
            montorioPopupGallery.classList.add('active');
            document.querySelectorAll('#montorio .album-container').forEach(album => {
                album.classList.remove('active');
            });
            document.querySelector(`#montorio #${albumId}-album`).classList.add('active');
        });
    });

    // Close album popup
    montorioClosePopup.addEventListener('click', () => {
        montorioPopupGallery.classList.remove('active');
    });

    // Open full image when clicking on album image
    document.querySelectorAll('#montorio .album-grid img').forEach(img => {
        img.addEventListener('click', () => {
            montorioFullImagePopup.classList.add('active');
            montorioFullImage.src = img.src;
            montorioImages = Array.from(img.closest('.album-grid').querySelectorAll('img'));
            currentMontorioImageIndex = montorioImages.indexOf(img);
        });
    });

    // Close full image popup
    montorioCloseFullImage.addEventListener('click', () => {
        montorioFullImagePopup.classList.remove('active');
    });

    // Close on click outside
    montorioFullImagePopup.addEventListener('click', (e) => {
        if (e.target === montorioFullImagePopup) {
            montorioFullImagePopup.classList.remove('active');
        }
    });

    // Navigate between images
    montorioPrevBtn.addEventListener('click', () => {
        if (currentMontorioImageIndex > 0) {
            currentMontorioImageIndex--;
            montorioFullImage.src = montorioImages[currentMontorioImageIndex].src;
        }
    });

    montorioNextBtn.addEventListener('click', () => {
        if (currentMontorioImageIndex < montorioImages.length - 1) {
            currentMontorioImageIndex++;
            montorioFullImage.src = montorioImages[currentMontorioImageIndex].src;
        }
    });

    // Close popups when clicking outside
    montorioPopupGallery.addEventListener('click', (e) => {
        if (e.target === montorioPopupGallery) {
            montorioPopupGallery.classList.remove('active');
        }
    });

    // Keyboard navigation for full image popup
    document.addEventListener('keydown', (e) => {
        if (montorioFullImagePopup.classList.contains('active')) {
            if (e.key === 'ArrowLeft' && currentMontorioImageIndex > 0) {
                currentMontorioImageIndex--;
                montorioFullImage.src = montorioImages[currentMontorioImageIndex].src;
            } else if (e.key === 'ArrowRight' && currentMontorioImageIndex < montorioImages.length - 1) {
                currentMontorioImageIndex++;
                montorioFullImage.src = montorioImages[currentMontorioImageIndex].src;
            } else if (e.key === 'Escape') {
                montorioFullImagePopup.classList.remove('active');
            }
        } else if (montorioPopupGallery.classList.contains('active') && e.key === 'Escape') {
            montorioPopupGallery.classList.remove('active');
        }
    });

    function navigateMontorioClosingBackward() {
        const currentElement = montorioSections.closing;
        const prevElement = montorioSections.gallery;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        prevElement.style.transform = 'translateX(-100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        prevElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        prevElement.style.opacity = '1';

        // Trigger reflow
        void prevElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate previous section in
        prevElement.style.transform = 'translateX(0)';
        prevElement.style.opacity = '1';
        prevElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    // Add event listener for Montorio's closing section right arrow
    const montorioClosingRightArrows = montorioSections.closing.querySelector('.right-arrows');
    if (montorioClosingRightArrows) {
        montorioClosingRightArrows.addEventListener('click', navigateMontorioClosingBackward);
    }

    // Orphiano's sections
    const orphianoSections = {
        personalInfo: document.querySelector('#orphiano .personal-info'),
        educationalBackground: document.querySelector('#orphiano .educational-background'),
        educationalBackground2: document.querySelector('#orphiano .educational-background-2'),
        skillsAwards: document.querySelector('#orphiano .skills-awards'),
        hobbies: document.querySelector('#orphiano .hobbies'),
        gallery: document.querySelector('#orphiano .gallery'),
        closing: document.querySelector('#orphiano .closing')
    };

    // Navigation functions for Orphiano's sections
    function navigateOrphianoForward() {
        const currentElement = orphianoSections.personalInfo;
        const nextElement = orphianoSections.educationalBackground;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateOrphianoEducationalForward() {
        const currentElement = orphianoSections.educationalBackground;
        const nextElement = orphianoSections.educationalBackground2;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateOrphianoEducationalBackward() {
        const currentElement = orphianoSections.educationalBackground;
        const prevElement = orphianoSections.personalInfo;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        prevElement.style.transform = 'translateX(-100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        prevElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        prevElement.style.opacity = '1';

        // Trigger reflow
        void prevElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate previous section in
        prevElement.style.transform = 'translateX(0)';
        prevElement.style.opacity = '1';
        prevElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateOrphianoEducational2Forward() {
        const currentElement = orphianoSections.educationalBackground2;
        const nextElement = orphianoSections.skillsAwards;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateOrphianoEducational2Backward() {
        const currentElement = orphianoSections.educationalBackground2;
        const prevElement = orphianoSections.educationalBackground;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        prevElement.style.transform = 'translateX(-100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        prevElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        prevElement.style.opacity = '1';

        // Trigger reflow
        void prevElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate previous section in
        prevElement.style.transform = 'translateX(0)';
        prevElement.style.opacity = '1';
        prevElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    // Add event listeners for Orphiano's navigation arrows
    const orphianoPersonalInfo = orphianoSections.personalInfo;
    const orphianoEducationalBackground = orphianoSections.educationalBackground;
    const orphianoEducationalBackground2 = orphianoSections.educationalBackground2;

    // Forward navigation (left arrows)
    const orphianoLeftArrows = orphianoPersonalInfo.querySelector('.left-arrows');
    if (orphianoLeftArrows) {
        orphianoLeftArrows.addEventListener('click', navigateOrphianoForward);
    }

    const orphianoEducationalLeftArrows = orphianoEducationalBackground.querySelector('.left-arrows');
    if (orphianoEducationalLeftArrows) {
        orphianoEducationalLeftArrows.addEventListener('click', navigateOrphianoEducationalForward);
    }

    const orphianoEducational2LeftArrows = orphianoEducationalBackground2.querySelector('.left-arrows');
    if (orphianoEducational2LeftArrows) {
        orphianoEducational2LeftArrows.addEventListener('click', navigateOrphianoEducational2Forward);
    }

    // Backward navigation (right arrows)
    const orphianoEducationalRightArrows = orphianoEducationalBackground.querySelector('.right-arrows');
    if (orphianoEducationalRightArrows) {
        orphianoEducationalRightArrows.addEventListener('click', navigateOrphianoEducationalBackward);
    }

    const orphianoEducational2RightArrows = orphianoEducationalBackground2.querySelector('.right-arrows');
    if (orphianoEducational2RightArrows) {
        orphianoEducational2RightArrows.addEventListener('click', navigateOrphianoEducational2Backward);
    }

    // Initialize Orphiano's sections
    orphianoSections.personalInfo.style.display = 'flex';
    orphianoSections.personalInfo.classList.add('section-active');
    orphianoSections.educationalBackground.style.display = 'none';
    orphianoSections.educationalBackground2.style.display = 'none';
    orphianoSections.skillsAwards.style.display = 'none';
    orphianoSections.hobbies.style.display = 'none';
    orphianoSections.gallery.style.display = 'none';
    orphianoSections.closing.style.display = 'none';

    // Add transitions to Orphiano's sections
    [orphianoEducationalBackground, orphianoEducationalBackground2].forEach(section => {
        section.style.transform = 'translateX(100%)';
        section.style.opacity = '0';
        section.style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';
    });

    function navigateOrphianoSkillsAwardsForward() {
        const currentElement = orphianoSections.skillsAwards;
        const nextElement = orphianoSections.hobbies;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateOrphianoSkillsAwardsBackward() {
        const currentElement = orphianoSections.skillsAwards;
        const prevElement = orphianoSections.educationalBackground2;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        prevElement.style.transform = 'translateX(-100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        prevElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        prevElement.style.opacity = '1';

        // Trigger reflow
        void prevElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate previous section in
        prevElement.style.transform = 'translateX(0)';
        prevElement.style.opacity = '1';
        prevElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    // Add event listeners for Orphiano's skills and awards section arrows
    const orphianoSkillsAwards = orphianoSections.skillsAwards;
    
    const orphianoSkillsAwardsLeftArrows = orphianoSkillsAwards.querySelector('.left-arrows');
    if (orphianoSkillsAwardsLeftArrows) {
        orphianoSkillsAwardsLeftArrows.addEventListener('click', navigateOrphianoSkillsAwardsForward);
    }

    const orphianoSkillsAwardsRightArrows = orphianoSkillsAwards.querySelector('.right-arrows');
    if (orphianoSkillsAwardsRightArrows) {
        orphianoSkillsAwardsRightArrows.addEventListener('click', navigateOrphianoSkillsAwardsBackward);
    }

    function navigateOrphianoHobbiesForward() {
        const currentElement = orphianoSections.hobbies;
        const nextElement = orphianoSections.gallery;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        nextElement.style.transform = 'translateX(100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        nextElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        nextElement.style.opacity = '1';

        // Trigger reflow
        void nextElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate next section in
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        nextElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    function navigateOrphianoHobbiesBackward() {
        const currentElement = orphianoSections.hobbies;
        const prevElement = orphianoSections.skillsAwards;

        // Reset any existing transforms
        currentElement.style.transform = 'translateX(0)';
        prevElement.style.transform = 'translateX(-100%)';

        // Make both sections visible
        currentElement.style.display = 'flex';
        prevElement.style.display = 'flex';
        currentElement.style.opacity = '1';
        prevElement.style.opacity = '1';

        // Trigger reflow
        void prevElement.offsetWidth;

        // Animate current section out
        currentElement.style.transform = 'translateX(100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('section-active');

        // Animate previous section in
        prevElement.style.transform = 'translateX(0)';
        prevElement.style.opacity = '1';
        prevElement.classList.add('section-active');

        // Hide current section after animation
        setTimeout(() => {
            if (!currentElement.classList.contains('section-active')) {
                currentElement.style.display = 'none';
            }
        }, 600);
    }

    // Add event listeners for Orphiano's hobbies section arrows
    const orphianoHobbies = orphianoSections.hobbies;
    
    const orphianoHobbiesLeftArrows = orphianoHobbies.querySelector('.left-arrows');
    if (orphianoHobbiesLeftArrows) {
        orphianoHobbiesLeftArrows.addEventListener('click', navigateOrphianoHobbiesForward);
    }

    const orphianoHobbiesRightArrows = orphianoHobbies.querySelector('.right-arrows');
    if (orphianoHobbiesRightArrows) {
        orphianoHobbiesRightArrows.addEventListener('click', navigateOrphianoHobbiesBackward);
    }

    // Add event listeners for Orphiano's gallery section arrows
    const orphianoGallery = orphianoSections.gallery;
    
    const orphianoGalleryLeftArrows = orphianoGallery.querySelector('.left-arrows');
    if (orphianoGalleryLeftArrows) {
        orphianoGalleryLeftArrows.addEventListener('click', () => {
            const currentElement = orphianoSections.gallery;
            const nextElement = orphianoSections.closing;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    const orphianoGalleryRightArrows = orphianoGallery.querySelector('.right-arrows');
    if (orphianoGalleryRightArrows) {
        orphianoGalleryRightArrows.addEventListener('click', () => {
            const currentElement = orphianoSections.gallery;
            const prevElement = orphianoSections.hobbies;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Add event listeners for Orphiano's closing section arrows
    const orphianoClosing = orphianoSections.closing;
    
    // Only keep the right arrow navigation (back to gallery)
    const orphianoClosingRightArrows = orphianoClosing.querySelector('.right-arrows');
    if (orphianoClosingRightArrows) {
        orphianoClosingRightArrows.addEventListener('click', () => {
            const currentElement = orphianoSections.closing;
            const prevElement = orphianoSections.gallery;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Add navigation for Pacia's sections
    const paciaSections = {
        personalInfo: document.querySelector('#pacia .personal-info'),
        educationalBackground: document.querySelector('#pacia .educational-background'),
        educationalBackground2: document.querySelector('#pacia .educational-background-2'),
        skillsAwards: document.querySelector('#pacia .skills-awards'),
        hobbies: document.querySelector('#pacia .hobbies'),
        gallery: document.querySelector('#pacia .gallery'),
        closing: document.querySelector('#pacia .closing')
    };

    // Personal Info navigation
    const paciaPersonalInfo = paciaSections.personalInfo;
    
    const paciaLeftArrows = paciaPersonalInfo.querySelector('.left-arrows');
    if (paciaLeftArrows) {
        paciaLeftArrows.addEventListener('click', () => {
            const currentElement = paciaSections.personalInfo;
            const nextElement = paciaSections.educationalBackground;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Educational Background navigation
    const paciaEducationalBackground = paciaSections.educationalBackground;
    
    const paciaEducationalLeftArrows = paciaEducationalBackground.querySelector('.left-arrows');
    if (paciaEducationalLeftArrows) {
        paciaEducationalLeftArrows.addEventListener('click', () => {
            const currentElement = paciaSections.educationalBackground;
            const nextElement = paciaSections.educationalBackground2;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    const paciaEducationalRightArrows = paciaEducationalBackground.querySelector('.right-arrows');
    if (paciaEducationalRightArrows) {
        paciaEducationalRightArrows.addEventListener('click', () => {
            const currentElement = paciaSections.educationalBackground;
            const prevElement = paciaSections.personalInfo;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Educational Background 2 navigation
    const paciaEducationalBackground2 = paciaSections.educationalBackground2;
    
    const paciaEducational2LeftArrows = paciaEducationalBackground2.querySelector('.left-arrows');
    if (paciaEducational2LeftArrows) {
        paciaEducational2LeftArrows.addEventListener('click', () => {
            const currentElement = paciaSections.educationalBackground2;
            const nextElement = paciaSections.skillsAwards;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    const paciaEducational2RightArrows = paciaEducationalBackground2.querySelector('.right-arrows');
    if (paciaEducational2RightArrows) {
        paciaEducational2RightArrows.addEventListener('click', () => {
            const currentElement = paciaSections.educationalBackground2;
            const prevElement = paciaSections.educationalBackground;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Skills & Awards navigation
    const paciaSkillsAwards = paciaSections.skillsAwards;
    
    const paciaSkillsAwardsLeftArrows = paciaSkillsAwards.querySelector('.left-arrows');
    if (paciaSkillsAwardsLeftArrows) {
        paciaSkillsAwardsLeftArrows.addEventListener('click', () => {
            const currentElement = paciaSections.skillsAwards;
            const nextElement = paciaSections.hobbies;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    const paciaSkillsAwardsRightArrows = paciaSkillsAwards.querySelector('.right-arrows');
    if (paciaSkillsAwardsRightArrows) {
        paciaSkillsAwardsRightArrows.addEventListener('click', () => {
            const currentElement = paciaSections.skillsAwards;
            const prevElement = paciaSections.educationalBackground2;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Hobbies navigation
    const paciaHobbies = paciaSections.hobbies;
    
    const paciaHobbiesLeftArrows = paciaHobbies.querySelector('.left-arrows');
    if (paciaHobbiesLeftArrows) {
        paciaHobbiesLeftArrows.addEventListener('click', () => {
            const currentElement = paciaSections.hobbies;
            const nextElement = paciaSections.gallery;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    const paciaHobbiesRightArrows = paciaHobbies.querySelector('.right-arrows');
    if (paciaHobbiesRightArrows) {
        paciaHobbiesRightArrows.addEventListener('click', () => {
            const currentElement = paciaSections.hobbies;
            const prevElement = paciaSections.skillsAwards;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Gallery navigation
    const paciaGallery = paciaSections.gallery;
    
    const paciaGalleryLeftArrows = paciaGallery.querySelector('.left-arrows');
    if (paciaGalleryLeftArrows) {
        paciaGalleryLeftArrows.addEventListener('click', () => {
            const currentElement = paciaSections.gallery;
            const nextElement = paciaSections.closing;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    const paciaGalleryRightArrows = paciaGallery.querySelector('.right-arrows');
    if (paciaGalleryRightArrows) {
        paciaGalleryRightArrows.addEventListener('click', () => {
            const currentElement = paciaSections.gallery;
            const prevElement = paciaSections.hobbies;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Closing section navigation
    const paciaClosing = paciaSections.closing;
    
    const paciaClosingRightArrows = paciaClosing.querySelector('.right-arrows');
    if (paciaClosingRightArrows) {
        paciaClosingRightArrows.addEventListener('click', () => {
            const currentElement = paciaSections.closing;
            const prevElement = paciaSections.gallery;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Gallery functionality for Pacia
    const paciaGalleryItems = document.querySelectorAll('#pacia .gallery-item');
    const paciaPopupGallery = document.querySelector('#pacia .popup-gallery');
    const paciaClosePopup = document.querySelector('#pacia .close-popup');
    const paciaFullImagePopup = document.querySelector('#pacia .full-image-popup');
    const paciaFullImage = document.querySelector('#pacia .full-size-image');
    const paciaCloseFullImage = document.querySelector('#pacia .close-full-image');
    const paciaPrevBtn = document.querySelector('#pacia .prev-btn');
    const paciaNextBtn = document.querySelector('#pacia .next-btn');

    let currentPaciaAlbum = '';
    let currentPaciaImageIndex = 0;
    let paciaImages = [];

    // Open album when clicking on gallery item
    paciaGalleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const albumId = item.getAttribute('data-album');
            currentPaciaAlbum = albumId;
            paciaPopupGallery.classList.add('active');
            document.querySelectorAll('#pacia .album-container').forEach(album => {
                album.classList.remove('active');
            });
            document.querySelector(`#pacia #${albumId}-album`).classList.add('active');
        });
    });

    // Close album popup
    paciaClosePopup.addEventListener('click', () => {
        paciaPopupGallery.classList.remove('active');
    });

    // Open full image when clicking on album image
    document.querySelectorAll('#pacia .album-grid img').forEach(img => {
        img.addEventListener('click', () => {
            paciaFullImagePopup.classList.add('active');
            paciaFullImage.src = img.src;
            paciaImages = Array.from(img.closest('.album-grid').querySelectorAll('img'));
            currentPaciaImageIndex = paciaImages.indexOf(img);
        });
    });

    // Close full image popup
    paciaCloseFullImage.addEventListener('click', () => {
        paciaFullImagePopup.classList.remove('active');
    });

    // Close on click outside
    paciaFullImagePopup.addEventListener('click', (e) => {
        if (e.target === paciaFullImagePopup) {
            paciaFullImagePopup.classList.remove('active');
        }
    });

    // Navigate between images
    paciaPrevBtn.addEventListener('click', () => {
        if (currentPaciaImageIndex > 0) {
            currentPaciaImageIndex--;
            paciaFullImage.src = paciaImages[currentPaciaImageIndex].src;
        }
    });

    paciaNextBtn.addEventListener('click', () => {
        if (currentPaciaImageIndex < paciaImages.length - 1) {
            currentPaciaImageIndex++;
            paciaFullImage.src = paciaImages[currentPaciaImageIndex].src;
        }
    });

    // Close popups when clicking outside
    paciaPopupGallery.addEventListener('click', (e) => {
        if (e.target === paciaPopupGallery) {
            paciaPopupGallery.classList.remove('active');
        }
    });

    // Keyboard navigation for full image popup
    document.addEventListener('keydown', (e) => {
        if (paciaFullImagePopup.classList.contains('active')) {
            if (e.key === 'ArrowLeft' && currentPaciaImageIndex > 0) {
                currentPaciaImageIndex--;
                paciaFullImage.src = paciaImages[currentPaciaImageIndex].src;
            } else if (e.key === 'ArrowRight' && currentPaciaImageIndex < paciaImages.length - 1) {
                currentPaciaImageIndex++;
                paciaFullImage.src = paciaImages[currentPaciaImageIndex].src;
            } else if (e.key === 'Escape') {
                paciaFullImagePopup.classList.remove('active');
            }
        } else if (paciaPopupGallery.classList.contains('active') && e.key === 'Escape') {
            paciaPopupGallery.classList.remove('active');
        }
    });

    // Add navigation for Yasoña's sections
    const yasonaSections = {
        personalInfo: document.querySelector('#yasona .personal-info'),
        educationalBackground: document.querySelector('#yasona .educational-background'),
        educationalBackground2: document.querySelector('#yasona .educational-background-2'),
        skillsAwards: document.querySelector('#yasona .skills-awards'),
        hobbies: document.querySelector('#yasona .hobbies'),
        gallery: document.querySelector('#yasona .gallery'),
        closing: document.querySelector('#yasona .closing')
    };

    // Personal Info navigation
    const yasonaPersonalInfo = yasonaSections.personalInfo;
    
    const yasonaLeftArrows = yasonaPersonalInfo.querySelector('.left-arrows');
    if (yasonaLeftArrows) {
        yasonaLeftArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.personalInfo;
            const nextElement = yasonaSections.educationalBackground;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Educational Background navigation
    const yasonaEducationalBackground = yasonaSections.educationalBackground;
    
    const yasonaEducationalLeftArrows = yasonaEducationalBackground.querySelector('.left-arrows');
    if (yasonaEducationalLeftArrows) {
        yasonaEducationalLeftArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.educationalBackground;
            const nextElement = yasonaSections.educationalBackground2;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    const yasonaEducationalRightArrows = yasonaEducationalBackground.querySelector('.right-arrows');
    if (yasonaEducationalRightArrows) {
        yasonaEducationalRightArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.educationalBackground;
            const prevElement = yasonaSections.personalInfo;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Educational Background 2 navigation
    const yasonaEducationalBackground2 = yasonaSections.educationalBackground2;
    
    const yasonaEducational2LeftArrows = yasonaEducationalBackground2.querySelector('.left-arrows');
    if (yasonaEducational2LeftArrows) {
        yasonaEducational2LeftArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.educationalBackground2;
            const nextElement = yasonaSections.skillsAwards;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    const yasonaEducational2RightArrows = yasonaEducationalBackground2.querySelector('.right-arrows');
    if (yasonaEducational2RightArrows) {
        yasonaEducational2RightArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.educationalBackground2;
            const prevElement = yasonaSections.educationalBackground;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Skills & Awards navigation
    const yasonaSkillsAwards = yasonaSections.skillsAwards;
    
    const yasonaSkillsAwardsLeftArrows = yasonaSkillsAwards.querySelector('.left-arrows');
    if (yasonaSkillsAwardsLeftArrows) {
        yasonaSkillsAwardsLeftArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.skillsAwards;
            const nextElement = yasonaSections.hobbies;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    const yasonaSkillsAwardsRightArrows = yasonaSkillsAwards.querySelector('.right-arrows');
    if (yasonaSkillsAwardsRightArrows) {
        yasonaSkillsAwardsRightArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.skillsAwards;
            const prevElement = yasonaSections.educationalBackground2;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Hobbies navigation
    const yasonaHobbies = yasonaSections.hobbies;
    
    const yasonaHobbiesLeftArrows = yasonaHobbies.querySelector('.left-arrows');
    if (yasonaHobbiesLeftArrows) {
        yasonaHobbiesLeftArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.hobbies;
            const nextElement = yasonaSections.gallery;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    const yasonaHobbiesRightArrows = yasonaHobbies.querySelector('.right-arrows');
    if (yasonaHobbiesRightArrows) {
        yasonaHobbiesRightArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.hobbies;
            const prevElement = yasonaSections.skillsAwards;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Gallery navigation
    const yasonaGallery = yasonaSections.gallery;
    
    const yasonaGalleryLeftArrows = yasonaGallery.querySelector('.left-arrows');
    if (yasonaGalleryLeftArrows) {
        yasonaGalleryLeftArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.gallery;
            const nextElement = yasonaSections.closing;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            nextElement.style.transform = 'translateX(100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            nextElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            nextElement.style.opacity = '1';

            // Trigger reflow
            void nextElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(-100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate next section in
            nextElement.style.transform = 'translateX(0)';
            nextElement.style.opacity = '1';
            nextElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    const yasonaGalleryRightArrows = yasonaGallery.querySelector('.right-arrows');
    if (yasonaGalleryRightArrows) {
        yasonaGalleryRightArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.gallery;
            const prevElement = yasonaSections.hobbies;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Closing section navigation
    const yasonaClosing = yasonaSections.closing;
    
    const yasonaClosingRightArrows = yasonaClosing.querySelector('.right-arrows');
    if (yasonaClosingRightArrows) {
        yasonaClosingRightArrows.addEventListener('click', () => {
            const currentElement = yasonaSections.closing;
            const prevElement = yasonaSections.gallery;

            // Reset any existing transforms
            currentElement.style.transform = 'translateX(0)';
            prevElement.style.transform = 'translateX(-100%)';

            // Make both sections visible
            currentElement.style.display = 'flex';
            prevElement.style.display = 'flex';
            currentElement.style.opacity = '1';
            prevElement.style.opacity = '1';

            // Trigger reflow
            void prevElement.offsetWidth;

            // Animate current section out
            currentElement.style.transform = 'translateX(100%)';
            currentElement.style.opacity = '0';
            currentElement.classList.remove('section-active');

            // Animate previous section in
            prevElement.style.transform = 'translateX(0)';
            prevElement.style.opacity = '1';
            prevElement.classList.add('section-active');

            // Hide current section after animation
            setTimeout(() => {
                if (!currentElement.classList.contains('section-active')) {
                    currentElement.style.display = 'none';
                }
            }, 600);
        });
    }

    // Initialize Yasoña's sections
    yasonaSections.personalInfo.style.display = 'flex';
    yasonaSections.personalInfo.classList.add('section-active');
    yasonaSections.educationalBackground.style.display = 'none';
    yasonaSections.educationalBackground2.style.display = 'none';
    yasonaSections.skillsAwards.style.display = 'none';
    yasonaSections.hobbies.style.display = 'none';
    yasonaSections.gallery.style.display = 'none';
    yasonaSections.closing.style.display = 'none';

    // Add transitions to Yasoña's sections
    [yasonaSections.educationalBackground, yasonaSections.educationalBackground2, yasonaSections.skillsAwards, yasonaSections.hobbies, yasonaSections.gallery, yasonaSections.closing].forEach(section => {
        section.style.transform = 'translateX(100%)';
        section.style.opacity = '0';
        section.style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';
    });

    // Gallery functionality for Yasoña
    const yasonaGalleryItems = document.querySelectorAll('#yasona .gallery-item');
    const yasonaPopupGallery = document.querySelector('#yasona .popup-gallery');
    const yasonaClosePopup = document.querySelector('#yasona .close-popup');
    const yasonaFullImagePopup = document.querySelector('#yasona .full-image-popup');
    const yasonaFullImage = document.querySelector('#yasona .full-size-image');
    const yasonaCloseFullImage = document.querySelector('#yasona .close-full-image');
    const yasonaPrevBtn = document.querySelector('#yasona .prev-btn');
    const yasonaNextBtn = document.querySelector('#yasona .next-btn');

    let currentYasonaAlbum = '';
    let currentYasonaImageIndex = 0;
    let yasonaImages = [];

    // Open album when clicking on gallery item
    yasonaGalleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const albumId = item.getAttribute('data-album');
            currentYasonaAlbum = albumId;
            yasonaPopupGallery.classList.add('active');
            document.querySelectorAll('#yasona .album-container').forEach(album => {
                album.classList.remove('active');
            });
            document.querySelector(`#yasona #${albumId}-album`).classList.add('active');
        });
    });

    // Close album popup
    yasonaClosePopup.addEventListener('click', () => {
        yasonaPopupGallery.classList.remove('active');
    });

    // Open full image when clicking on album image
    document.querySelectorAll('#yasona .album-grid img').forEach(img => {
        img.addEventListener('click', () => {
            yasonaFullImagePopup.classList.add('active');
            yasonaFullImage.src = img.src;
            yasonaImages = Array.from(img.closest('.album-grid').querySelectorAll('img'));
            currentYasonaImageIndex = yasonaImages.indexOf(img);
        });
    });

    // Close full image popup
    yasonaCloseFullImage.addEventListener('click', () => {
        yasonaFullImagePopup.classList.remove('active');
    });

    // Close on click outside
    yasonaFullImagePopup.addEventListener('click', (e) => {
        if (e.target === yasonaFullImagePopup) {
            yasonaFullImagePopup.classList.remove('active');
        }
    });

    // Navigate between images
    yasonaPrevBtn.addEventListener('click', () => {
        if (currentYasonaImageIndex > 0) {
            currentYasonaImageIndex--;
            yasonaFullImage.src = yasonaImages[currentYasonaImageIndex].src;
        }
    });

    yasonaNextBtn.addEventListener('click', () => {
        if (currentYasonaImageIndex < yasonaImages.length - 1) {
            currentYasonaImageIndex++;
            yasonaFullImage.src = yasonaImages[currentYasonaImageIndex].src;
        }
    });

    // Close popups when clicking outside
    yasonaPopupGallery.addEventListener('click', (e) => {
        if (e.target === yasonaPopupGallery) {
            yasonaPopupGallery.classList.remove('active');
        }
    });

    // Keyboard navigation for full image popup
    document.addEventListener('keydown', (e) => {
        if (yasonaFullImagePopup.classList.contains('active')) {
            if (e.key === 'ArrowLeft' && currentYasonaImageIndex > 0) {
                currentYasonaImageIndex--;
                yasonaFullImage.src = yasonaImages[currentYasonaImageIndex].src;
            } else if (e.key === 'ArrowRight' && currentYasonaImageIndex < yasonaImages.length - 1) {
                currentYasonaImageIndex++;
                yasonaFullImage.src = yasonaImages[currentYasonaImageIndex].src;
            } else if (e.key === 'Escape') {
                yasonaFullImagePopup.classList.remove('active');
            }
        } else if (yasonaPopupGallery.classList.contains('active') && e.key === 'Escape') {
            yasonaPopupGallery.classList.remove('active');
        }
    });

    // Add close button functionality for popup galleries
    const closeButtons = document.querySelectorAll('.close-popup, .close-full-image');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup-gallery, .full-image-popup');
            if (popup) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close popup when clicking outside
    const popups = document.querySelectorAll('.popup-gallery, .full-image-popup');
    popups.forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Add initial styles for animation
const profileCard = document.querySelector('.profile-card');
const leftArrows = document.querySelector('.left-arrows');
const rightArrows = document.querySelector('.right-arrows');

profileCard.style.opacity = '0';
profileCard.style.transform = 'translateY(50px)';
profileCard.style.transition = 'all 0.8s ease-out';

leftArrows.style.opacity = '0';
leftArrows.style.transform = 'translateX(-50px)';
leftArrows.style.transition = 'all 0.8s ease-out';

rightArrows.style.opacity = '0';
rightArrows.style.transform = 'translateX(50px)';
rightArrows.style.transition = 'all 0.8s ease-out'; 