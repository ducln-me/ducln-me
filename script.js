// ===== MOBILE MENU TOGGLE =====
const navbarToggle = document.getElementById('navbarToggle');
const sidebar = document.getElementById('sidebar');

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

// ===== SCROLL SPY FOR NAVIGATION =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

function activateNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);

        if (href === current) {
            link.classList.add('active');

            // Also activate navbar links
            const navbarLink = document.querySelector(`.navbar-links a[href="#${current}"]`);
            if (navbarLink) {
                document.querySelectorAll('.navbar-links a').forEach(l => l.classList.remove('active'));
                navbarLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);
window.addEventListener('load', activateNavLink);

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

// ===== POPULATE PROJECTS IN SIDEBAR =====
function populateProjectsSidebar() {
    const projectsList = document.getElementById('projectsList');
    const projectCards = document.querySelectorAll('.project-card');

    projectsList.innerHTML = '';

    projectCards.forEach(card => {
        const projectName = card.querySelector('h3').textContent;
        const projectId = card.getAttribute('data-project');

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${projectId}`;
        a.textContent = projectName;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.animation = 'highlight 1s ease';
            setTimeout(() => {
                card.style.animation = '';
            }, 1000);
        });

        li.appendChild(a);
        projectsList.appendChild(li);
    });
}

// Add highlight animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); box-shadow: 0 15px 35px var(--shadow-lg); }
    }
`;
document.head.appendChild(style);

populateProjectsSidebar();

// ===== BLOG FILTERS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

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

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

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

// ===== PROJECT CARD LINKS TO BLOG =====
document.querySelectorAll('.project-card .blog-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const blogId = link.getAttribute('href');
        const blogCard = document.querySelector(blogId);

        if (blogCard) {
            // Switch to "all" filter to make sure the blog is visible
            const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allFilterBtn) {
                allFilterBtn.click();
            }

            // Scroll to blog section first
            const blogSection = document.getElementById('blog');
            if (blogSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = blogSection.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Then highlight the specific blog card
                setTimeout(() => {
                    blogCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    blogCard.style.animation = 'highlight 1.5s ease';
                    setTimeout(() => {
                        blogCard.style.animation = '';
                    }, 1500);
                }, 800);
            }
        }
    });
});

// ===== RESPONSIVE ADJUSTMENTS =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Remove sidebar active class when resizing to desktop
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('active');
        }
    }, 250);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC key to close sidebar on mobile
    if (e.key === 'Escape' && window.innerWidth <= 1024) {
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

// ===== ACTIVE SECTION HIGHLIGHT =====
function updateActiveSection() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });

    // Update sidebar navigation
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

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
