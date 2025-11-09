// ===== MOBILE MENU TOGGLE =====
const navbarToggle = document.getElementById('navbarToggle');
const sidebar = document.getElementById('sidebar');

if (navbarToggle && sidebar) {
    navbarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !navbarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// ===== SCROLL SPY FOR NAVIGATION (for single page sections) =====
const sections = document.querySelectorAll('.section, .subsection, .project-section');
const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

function activateNavLink() {
    if (navLinks.length === 0) return;

    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            if (targetId === current) {
                link.classList.add('active');
            }
        }
    });
}

if (navLinks.length > 0) {
    window.addEventListener('scroll', activateNavLink);
    window.addEventListener('load', activateNavLink);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        }
    });
});

// ===== BLOG FILTERS (for blog page) =====
const filterLinks = document.querySelectorAll('.filter-link');
const blogArticles = document.querySelectorAll('.blog-article-card');

if (filterLinks.length > 0 && blogArticles.length > 0) {
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active state
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const filterValue = link.getAttribute('data-filter');

            // Filter articles
            blogArticles.forEach(article => {
                const category = article.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    article.classList.remove('hidden');
                    article.style.opacity = '1';
                    article.style.transform = 'translateY(0)';
                } else {
                    article.style.opacity = '0';
                    article.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        article.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// ===== PUBLICATIONS FILTERS (for publications page) =====
const pubFilterLinks = document.querySelectorAll('.sidebar-nav .nav-link[data-year], .sidebar-nav .nav-link[data-topic]');
const publications = document.querySelectorAll('.publication-detail');

if (pubFilterLinks.length > 0 && publications.length > 0) {
    pubFilterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active state
            pubFilterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const filterYear = link.getAttribute('data-year');
            const filterTopic = link.getAttribute('data-topic');

            // Filter publications
            publications.forEach(pub => {
                const pubYear = pub.getAttribute('data-year');
                const pubTopic = pub.getAttribute('data-topic');

                let shouldShow = false;

                if (filterYear === 'all') {
                    shouldShow = true;
                } else if (filterYear && pubYear === filterYear) {
                    shouldShow = true;
                } else if (filterTopic && pubTopic === filterTopic) {
                    shouldShow = true;
                }

                if (shouldShow) {
                    pub.style.display = 'block';
                    setTimeout(() => {
                        pub.style.opacity = '1';
                        pub.style.transform = 'translateX(0)';
                    }, 10);
                } else {
                    pub.style.opacity = '0';
                    pub.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        pub.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Legacy blog filters (if they exist on the page)
const filterButtons = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

if (filterButtons.length > 0 && blogCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filter blog cards
            blogCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    // Animate in
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
const animatedElements = document.querySelectorAll('.project-card, .blog-card, .publication-card, .education-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== DYNAMIC YEAR UPDATE =====
// Update copyright year if you add a footer
const currentYear = new Date().getFullYear();

// ===== HIGHLIGHT ANIMATION =====
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); box-shadow: 0 15px 35px var(--shadow-lg); }
    }
`;
document.head.appendChild(style);

// ===== RESPONSIVE ADJUSTMENTS =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Remove sidebar active class when resizing to desktop
        if (sidebar && window.innerWidth > 1024) {
            sidebar.classList.remove('active');
        }
    }, 250);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC key to close sidebar on mobile
    if (sidebar && e.key === 'Escape' && window.innerWidth <= 1024) {
        sidebar.classList.remove('active');
    }
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// This function is now handled by activateNavLink above

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Personal portfolio loaded successfully!');

    // Initial scroll position check
    activateNavLink();
    updateActiveSection();

    // Add smooth reveal for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
});
