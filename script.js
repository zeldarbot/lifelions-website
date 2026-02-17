/* ===================================================================
   LifeLions.ai — Interactive Script
   Science. Soul. Service.
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation scroll effect ---
    const nav = document.getElementById('nav');

    const handleNavScroll = () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Hero animations on load ---
    const heroAnimations = document.querySelectorAll('.hero-content .animate-in');

    const triggerHeroAnimations = () => {
        heroAnimations.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 120);
        });
    };

    setTimeout(triggerHeroAnimations, 300);

    // --- Counter animation ---
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number[data-count]');

        counters.forEach(counter => {
            if (counter.dataset.animated) return;

            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const start = performance.now();

            const updateCounter = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            counter.dataset.animated = 'true';
            requestAnimationFrame(updateCounter);
        });
    };

    setTimeout(animateCounters, 1200);

    // --- Scroll reveal animations ---
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add data-animate to key elements
    const animatableSelectors = [
        '.crisis-content',
        '.crisis-stat-card',
        '.approach-header',
        '.orbit-item',
        '.diagram-center',
        '.science-sidebar',
        '.science-card',
        '.pillar-card',
        '.products-header',
        '.product-card',
        '.stories-header',
        '.story-card',
        '.hope-content',
        '.families-header',
        '.family-card',
        '.pride-visual',
        '.pride-content',
        '.join-content',
        '.section-tag',
        '.section-title'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (!el.closest('.hero')) {
                el.setAttribute('data-animate', '');
                scrollObserver.observe(el);
            }
        });
    });

    // Stagger children animations
    document.querySelectorAll('.science-cards, .families-grid, .pillars-grid, .products-grid, .stories-grid, .crisis-stat-stack').forEach(grid => {
        Array.from(grid.children).forEach((child, i) => {
            child.style.transitionDelay = (i * 0.1) + 's';
        });
    });

    // --- Floating particles in hero ---
    const particlesContainer = document.getElementById('heroParticles');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.4 + 0.1;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;

        particle.style.cssText =
            'width:' + size + 'px;' +
            'height:' + size + 'px;' +
            'left:' + x + '%;' +
            'top:' + y + '%;' +
            'opacity:' + opacity + ';' +
            'animation:float-particle ' + duration + 's ' + delay + 's ease-in-out infinite;';

        particlesContainer.appendChild(particle);
    }

    // Add particle keyframes
    const particleStyle = document.createElement('style');
    particleStyle.textContent =
        '@keyframes float-particle {' +
        '0%, 100% { transform: translate(0, 0) scale(1); }' +
        '25% { transform: translate(20px, -15px) scale(1.2); }' +
        '50% { transform: translate(-10px, 20px) scale(0.8); }' +
        '75% { transform: translate(15px, 10px) scale(1.1); }' +
        '}';
    document.head.appendChild(particleStyle);

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Form handling ---
    const form = document.getElementById('joinForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            form.innerHTML =
                '<div class="form-success">' +
                '<div class="form-success-icon">🦁</div>' +
                '<h3>Welcome to the Pride!</h3>' +
                '<p>Thank you for taking this courageous step. We\'ll be in touch soon — ' +
                'and in the meantime, know that you\'re not alone in this fight. ' +
                'We\'re praying for you and your family.</p>' +
                '</div>';
        }, 1500);
    });

    // --- Parallax effect on scroll ---
    const parallaxElements = document.querySelectorAll('.hope-bg, .join-bg, .stories-bg');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const section = el.parentElement;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrolled > sectionTop - window.innerHeight &&
                scrolled < sectionTop + sectionHeight) {
                const offset = (scrolled - sectionTop) * 0.15;
                el.style.transform = 'translateY(' + offset + 'px)';
            }
        });
    }, { passive: true });

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('.section[id], .hero[id]');
    const navLinkElements = document.querySelectorAll('.nav-link[href^="#"]');

    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- Orbit hover effect ---
    const orbitItems = document.querySelectorAll('.orbit-item');
    const diagramCore = document.querySelector('.diagram-core');

    if (diagramCore) {
        orbitItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const type = item.dataset.orbit;
                diagramCore.style.transform = 'scale(1.05)';

                if (type === 'science') {
                    diagramCore.style.background = 'linear-gradient(135deg, #3B82C4 0%, #2563A0 100%)';
                } else if (type === 'soul') {
                    diagramCore.style.background = 'linear-gradient(135deg, #7C2D36 0%, #5C1F28 100%)';
                } else if (type === 'service') {
                    diagramCore.style.background = 'linear-gradient(135deg, #2D5F3E 0%, #1D4A2D 100%)';
                }
            });

            item.addEventListener('mouseleave', () => {
                diagramCore.style.transform = '';
                diagramCore.style.background = '';
            });
        });
    }

    // --- Preload fonts ---
    if (document.fonts) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }

    console.log('%c🦁 LifeLions.ai', 'font-size: 24px; font-weight: bold; color: #C8962E;');
    console.log('%cWe are lions. Noble, brave, courageous, caring, strong.', 'font-size: 12px; color: #6B7280;');
    console.log('%cWe extend a LifeLine to all of humanity.', 'font-size: 12px; color: #6B7280; font-style: italic;');
});
