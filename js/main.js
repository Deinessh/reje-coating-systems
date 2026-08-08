// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Hero Slider
const slides = document.querySelectorAll('.hero-slide');
if (slides.length > 0) {
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const itemPage = item.getAttribute('href');
        if (currentPage === itemPage || (currentPage === '' && itemPage === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

// Budget Estimator Logic
document.addEventListener('DOMContentLoaded', () => {
    const pkgSelect = document.getElementById('est-package');
    const tdPkgRate = document.getElementById('td-pkg-rate');
    
    const inputArea = document.getElementById('est-built-area');
    const inputSump = document.getElementById('est-water-sump');
    const inputSeptic = document.getElementById('est-septic-tank');
    const inputWallLength = document.getElementById('est-wall-length');
    const inputWallHeight = document.getElementById('est-wall-height');
    
    const costArea = document.getElementById('cost-built-area');
    const costSump = document.getElementById('cost-water-sump');
    const costSeptic = document.getElementById('cost-septic-tank');
    const costWall = document.getElementById('cost-compound-wall');
    const costTotal = document.getElementById('cost-total');
    
    // Rates
    let ratePkg = parseInt(pkgSelect?.value || 2399);
    const rateSump = 24;
    const rateSeptic = 24;
    const rateWall = 425;
    
    function formatCurrency(num) {
        return 'Rs. ' + num.toLocaleString('en-IN');
    }
    
    function calculateCosts() {
        if (!pkgSelect) return;
        ratePkg = parseInt(pkgSelect.value);
        tdPkgRate.textContent = 'Rs. ' + ratePkg;
        
        const vArea = parseFloat(inputArea.value) || 0;
        const vSump = parseFloat(inputSump.value) || 0;
        const vSeptic = parseFloat(inputSeptic.value) || 0;
        const vWallL = parseFloat(inputWallLength.value) || 0;
        const vWallH = parseFloat(inputWallHeight.value) || 0;
        
        const cArea = vArea * ratePkg;
        const cSump = vSump * rateSump;
        const cSeptic = vSeptic * rateSeptic;
        const cWall = (vWallL * vWallH) * rateWall;
        
        costArea.textContent = formatCurrency(cArea);
        costSump.textContent = formatCurrency(cSump);
        costSeptic.textContent = formatCurrency(cSeptic);
        costWall.textContent = formatCurrency(cWall);
        
        const total = cArea + cSump + cSeptic + cWall;
        costTotal.textContent = formatCurrency(total);
    }
    
    if (pkgSelect) {
        pkgSelect.addEventListener('change', calculateCosts);
        inputArea.addEventListener('input', calculateCosts);
        inputSump.addEventListener('input', calculateCosts);
        inputSeptic.addEventListener('input', calculateCosts);
        inputWallLength.addEventListener('input', calculateCosts);
        inputWallHeight.addEventListener('input', calculateCosts);
    }
});

// Modern Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('custom-cursor-dot');
        document.body.appendChild(cursorDot);

        const cursorOutline = document.createElement('div');
        cursorOutline.classList.add('custom-cursor-outline');
        document.body.appendChild(cursorOutline);

        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = posX + 'px';
            cursorDot.style.top = posY + 'px';
            
            cursorOutline.animate({
                left: posX + 'px',
                top: posY + 'px'
            }, { duration: 300, fill: "forwards" });
        });

        // Add hover effect
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .tilt-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hovered');
                cursorOutline.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hovered');
                cursorOutline.classList.remove('hovered');
            });
        });
    }
});

// Advanced Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
});
