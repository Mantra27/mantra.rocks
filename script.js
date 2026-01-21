// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Optimized scroll effect for navigation with throttling
const nav = document.querySelector('.nav');
let ticking = false;

function updateNav() {
    const currentScroll = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNav();
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Parallax effect for entire hero section
const heroContent = document.querySelector('.hero-content');
const heroSection = document.querySelector('.hero');

function updateParallax() {
    const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    // Check if hero section is in view
    if (heroContent && heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        
        // Apply parallax when hero is in view
        if (heroBottom > 0 && heroRect.top < windowHeight) {
            // Move entire hero content at parallax speed
            const parallaxOffset = scrollY * 0.5;
            
            heroContent.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
            heroContent.style.webkitTransform = `translate3d(0, ${parallaxOffset}px, 0)`;
        } else {
            // Reset when out of view
            heroContent.style.transform = 'translate3d(0, 0, 0)';
            heroContent.style.webkitTransform = 'translate3d(0, 0, 0)';
        }
    }
}

// Reset any transforms on section titles and work items (cleanup from previous parallax)
const sectionTitles = document.querySelectorAll('.section-title');
const workItems = document.querySelectorAll('.work-item');
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');

sectionTitles.forEach(title => {
    title.style.transform = 'none';
    title.style.webkitTransform = 'none';
});

workItems.forEach(item => {
    item.style.transform = 'none';
    item.style.webkitTransform = 'none';
});

// Reset individual hero element transforms
if (heroTitle) {
    heroTitle.style.transform = 'none';
    heroTitle.style.webkitTransform = 'none';
}

if (heroSubtitle) {
    heroSubtitle.style.transform = 'none';
    heroSubtitle.style.webkitTransform = 'none';
}

// Initialize parallax on load
updateParallax();
