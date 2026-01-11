// DOM Elements
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const screenSizeElement = document.getElementById('screenSize');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

// Mobile menu toggle functionality
mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    
    // Add animation to menu items when opening
    if (mobileMenu.classList.contains('active')) {
        const menuItems = document.querySelectorAll('.mobile-nav-item');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${(index + 1) * 0.1}s`;
        });
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Detect and display screen size
function updateScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    let sizeCategory;
    if (width < 480) sizeCategory = 'Extra Small (Mobile)';
    else if (width < 768) sizeCategory = 'Small (Mobile)';
    else if (width < 992) sizeCategory = 'Medium (Tablet)';
    else if (width < 1200) sizeCategory = 'Large (Desktop)';
    else sizeCategory = 'Extra Large (Desktop)';
    
    screenSizeElement.textContent = `${width}px × ${height}px - ${sizeCategory}`;
}

// Update screen size on load and resize
window.addEventListener('load', updateScreenSize);
window.addEventListener('resize', updateScreenSize);

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(15, 23, 42, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
});

// Add hover animation to navigation items
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    
    item.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
    });
    
    item.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Create additional floating dots for animation
function createFloatingDots() {
    const dotsContainer = document.querySelector('.dots-background');
    
    for (let i = 0; i < 15; i++) {
        const dot = document.createElement('div');
        dot.classList.add('floating-dot');
        
        // Random properties for each dot
        const size = Math.random() * 4 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;
        
        // Apply styles
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${posX}%`;
        dot.style.top = `${posY}%`;
        dot.style.animationDuration = `${duration}s`;
        dot.style.animationDelay = `${delay}s`;
        dot.style.opacity = opacity;
        dot.style.backgroundColor = i % 2 === 0 ? '#3b82f6' : '#8b5cf6';
        
        dotsContainer.appendChild(dot);
    }
}

// Add CSS for floating dots
const style = document.createElement('style');
style.textContent = `
    .floating-dot {
        position: absolute;
        border-radius: 50%;
        z-index: 0;
        animation: floatAround linear infinite;
    }
    
    @keyframes floatAround {
        0% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(20px, -20px) rotate(90deg);
        }
        50% {
            transform: translate(40px, 0) rotate(180deg);
        }
        75% {
            transform: translate(20px, 20px) rotate(270deg);
        }
        100% {
            transform: translate(0, 0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize floating dots when page loads
window.addEventListener('load', createFloatingDots);

// Button click animations
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);






document.addEventListener('DOMContentLoaded', function() {
    // Configuration for interactive dots
    const dotConfig = {
        count: 15,
        colors: {
            heart: '#ff6b6b',
            brain: '#9b59b6',
            lungs: '#3498db',
            eye: '#2ecc71'
        },
        sizes: {
            min: 4,
            max: 12
        }
    };
    
    // State for dots visibility
    let dotsVisible = true;
    
    // Initialize interactive dots for each body part
    initializeDots();
    
    // Set up event listeners for action buttons
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', function() {
            const part = this.getAttribute('data-part');
            triggerAnimation(part);
        });
    });
    
    // Set up event listeners for control buttons
    document.getElementById('reset-btn').addEventListener('click', resetAnimations);
    document.getElementById('toggle-dots').addEventListener('click', toggleDots);
    
    // Add cursor tracking for interactive effects
    document.addEventListener('mousemove', handleCursorMove);
    
    // Initialize animations
    initializeAnimations();
    
    // Functions
    function initializeDots() {
        const bodyParts = ['heart', 'brain', 'lungs', 'eye'];
        
        bodyParts.forEach(part => {
            const container = document.getElementById(`${part}-dots`);
            const color = dotConfig.colors[part];
            
            for (let i = 0; i < dotConfig.count; i++) {
                createDot(container, color, part);
            }
        });
    }
    
    function createDot(container, color, part) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        // Random position within container
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * (dotConfig.sizes.max - dotConfig.sizes.min) + dotConfig.sizes.min;
        
        // Apply styles
        dot.style.left = `${posX}%`;
        dot.style.top = `${posY}%`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.backgroundColor = color;
        dot.style.opacity = '0.7';
        
        // Store initial position for animation
        dot.dataset.initialX = posX;
        dot.dataset.initialY = posY;
        dot.dataset.part = part;
        
        container.appendChild(dot);
    }
    
    function handleCursorMove(e) {
        if (!dotsVisible) return;
        
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        
        // Get all dots
        const dots = document.querySelectorAll('.dot');
        
        dots.forEach(dot => {
            const dotRect = dot.getBoundingClientRect();
            const dotX = dotRect.left + dotRect.width / 2;
            const dotY = dotRect.top + dotRect.height / 2;
            
            // Calculate distance from cursor
            const distance = Math.sqrt(
                Math.pow(cursorX - dotX, 2) + 
                Math.pow(cursorY - dotY, 2)
            );
            
            // If cursor is near the dot, create interaction
            if (distance < 150) {
                const part = dot.dataset.part;
                const force = 1 - (distance / 150);
                
                // Calculate movement away from cursor
                const deltaX = dotX - cursorX;
                const deltaY = dotY - cursorY;
                const angle = Math.atan2(deltaY, deltaX);
                
                // Move dot away from cursor
                const moveDistance = 20 * force;
                const newX = parseFloat(dot.dataset.initialX) + (Math.cos(angle) * moveDistance);
                const newY = parseFloat(dot.dataset.initialY) + (Math.sin(angle) * moveDistance);
                
                // Apply transformation
                dot.style.transform = `translate(${newX - parseFloat(dot.dataset.initialX)}%, ${newY - parseFloat(dot.dataset.initialY)}%) scale(${1 + force * 0.5})`;
                dot.style.opacity = (0.7 + force * 0.3).toString();
                dot.style.boxShadow = `0 0 ${10 * force}px ${dot.style.backgroundColor}`;
            } else {
                // Return to original position
                dot.style.transform = 'translate(0, 0) scale(1)';
                dot.style.opacity = '0.7';
                dot.style.boxShadow = 'none';
            }
        });
    }
    
    function triggerAnimation(part) {
        switch(part) {
            case 'heart':
                animateHeart();
                break;
            case 'brain':
                animateBrain();
                break;
            case 'lungs':
                animateLungs();
                break;
            case 'eye':
                animateEye();
                break;
        }
        
        // Visual feedback on button click
        const button = document.querySelector(`.action-btn[data-part="${part}"]`);
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }
    
    function animateHeart() {
        const heart = document.querySelector('.heart');
        heart.style.animation = 'none';
        
        setTimeout(() => {
            heart.style.animation = 'heartbeat 0.8s ease-in-out 3';
        }, 10);
        
        // Create extra pulse effect
        const heartContainer = document.querySelector('.heart-container');
        const pulse = document.createElement('div');
        pulse.className = 'pulse-ring extra';
        pulse.style.animation = 'pulse 1s forwards';
        heartContainer.appendChild(pulse);
        
        setTimeout(() => {
            pulse.remove();
        }, 1000);
    }
    
    function animateBrain() {
        const brainLeft = document.querySelector('.brain-left');
        const brainRight = document.querySelector('.brain-right');
        
        brainLeft.style.animation = 'none';
        brainRight.style.animation = 'none';
        
        setTimeout(() => {
            brainLeft.style.animation = 'brainLeft 0.5s ease-in-out 4 alternate';
            brainRight.style.animation = 'brainRight 0.5s ease-in-out 4 alternate';
        }, 10);
        
        // Create spark effects
        createSparks('brain-dots', 10, dotConfig.colors.brain);
    }
    
    function animateLungs() {
        const lungs = document.querySelectorAll('.lung');
        
        lungs.forEach(lung => {
            lung.style.animation = 'none';
        });
        
        setTimeout(() => {
            lungs.forEach(lung => {
                lung.style.animation = 'breathe 2s ease-in-out 2';
            });
        }, 10);
        
        // Create breath effect dots
        createBreathEffect('lungs-dots', dotConfig.colors.lungs);
    }
    
    function animateEye() {
        const eyelids = document.querySelectorAll('.eyelid');
        
        eyelids.forEach(lid => {
            lid.style.animation = 'none';
        });
        
        setTimeout(() => {
            eyelids.forEach(lid => {
                lid.style.animation = 'blink 1.5s ease-in-out 1';
            });
        }, 10);
        
        // Make pupil follow cursor for a moment
        const pupil = document.querySelector('.pupil');
        const originalTransition = pupil.style.transition;
        pupil.style.transition = 'transform 0.3s ease-out';
        
        // Move pupil randomly
        const randomX = (Math.random() * 20) - 10;
        const randomY = (Math.random() * 20) - 10;
        pupil.style.transform = `translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px))`;
        
        setTimeout(() => {
            pupil.style.transform = 'translate(-50%, -50%)';
        }, 500);
        
        setTimeout(() => {
            pupil.style.transition = originalTransition;
        }, 800);
    }
    
    function createSparks(containerId, count, color) {
        const container = document.getElementById(containerId);
        
        for (let i = 0; i < count; i++) {
            const spark = document.createElement('div');
            spark.className = 'dot spark';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            spark.style.left = `${posX}%`;
            spark.style.top = `${posY}%`;
            spark.style.width = '6px';
            spark.style.height = '6px';
            spark.style.backgroundColor = color;
            spark.style.boxShadow = `0 0 10px ${color}`;
            
            // Animation
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 30;
            const duration = 0.5 + Math.random() * 0.5;
            
            spark.style.transition = `all ${duration}s ease-out`;
            spark.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            spark.style.opacity = '0';
            
            container.appendChild(spark);
            
            // Remove after animation
            setTimeout(() => {
                spark.remove();
            }, duration * 1000);
        }
    }
    
    function createBreathEffect(containerId, color) {
        const container = document.getElementById(containerId);
        
        for (let i = 0; i < 8; i++) {
            const breathDot = document.createElement('div');
            breathDot.className = 'dot breath';
            
            // Position around lungs
            const angle = (i / 8) * Math.PI * 2;
            const radius = 40 + Math.random() * 20;
            const posX = 50 + Math.cos(angle) * radius;
            const posY = 50 + Math.sin(angle) * radius;
            
            breathDot.style.left = `${posX}%`;
            breathDot.style.top = `${posY}%`;
            breathDot.style.width = '10px';
            breathDot.style.height = '10px';
            breathDot.style.backgroundColor = color;
            breathDot.style.opacity = '0';
            
            // Animation
            const outwardDistance = 30 + Math.random() * 20;
            const outwardAngle = angle + (Math.random() * 0.5 - 0.25);
            const duration = 1 + Math.random() * 0.5;
            
            breathDot.style.transition = `all ${duration}s ease-out`;
            
            setTimeout(() => {
                breathDot.style.opacity = '0.8';
                breathDot.style.transform = `translate(${Math.cos(outwardAngle) * outwardDistance}px, ${Math.sin(outwardAngle) * outwardDistance}px) scale(0.5)`;
            }, 10);
            
            container.appendChild(breathDot);
            
            // Remove after animation
            setTimeout(() => {
                breathDot.remove();
            }, duration * 1000 + 100);
        }
    }
    
    function resetAnimations() {
        // Reset all body part animations
        const animatedElements = document.querySelectorAll('.heart, .brain-left, .brain-right, .lung, .eyelid');
        
        animatedElements.forEach(el => {
            el.style.animation = 'none';
        });
        
        // Force reflow
        void document.body.offsetWidth;
        
        // Reapply animations
        const heart = document.querySelector('.heart');
        const brainLeft = document.querySelector('.brain-left');
        const brainRight = document.querySelector('.brain-right');
        const lungs = document.querySelectorAll('.lung');
        const eyelids = document.querySelectorAll('.eyelid');
        
        if (heart) heart.style.animation = 'heartbeat 1.5s infinite';
        if (brainLeft) brainLeft.style.animation = 'brainLeft 3s infinite alternate';
        if (brainRight) brainRight.style.animation = 'brainRight 3s infinite alternate';
        
        lungs.forEach(lung => {
            lung.style.animation = 'breathe 4s infinite';
        });
        
        eyelids.forEach(lid => {
            lid.style.animation = 'blink 5s infinite';
        });
        
        // Reset dots to original positions
        const dots = document.querySelectorAll('.dot:not(.spark):not(.breath)');
        dots.forEach(dot => {
            dot.style.transform = 'translate(0, 0) scale(1)';
            dot.style.opacity = '0.7';
            dot.style.boxShadow = 'none';
        });
        
        // Visual feedback for reset button
        const resetBtn = document.getElementById('reset-btn');
        resetBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            resetBtn.style.transform = '';
        }, 200);
    }
    
    function toggleDots() {
        dotsVisible = !dotsVisible;
        const dots = document.querySelectorAll('.interactive-dots');
        const toggleBtn = document.getElementById('toggle-dots');
        
        if (dotsVisible) {
            dots.forEach(container => {
                container.style.opacity = '1';
            });
            toggleBtn.innerHTML = '<i class="fas fa-circle"></i> Hide Dots';
        } else {
            dots.forEach(container => {
                container.style.opacity = '0';
            });
            toggleBtn.innerHTML = '<i class="fas fa-circle"></i> Show Dots';
        }
        
        // Visual feedback
        toggleBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            toggleBtn.style.transform = '';
        }, 200);
    }
    
    function initializeAnimations() {
        // Ensure all animations are running on load
        resetAnimations();
    }
});
// Create animated dots for the footer background
function createFooterDots() {
    const footerDotsContainer = document.getElementById('footerDots');
    const dotCount = 50; // Number of dots to create
    
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        
        // Randomize dot properties
        const size = Math.random() * 8 + 2; // Between 2px and 10px
        const posX = Math.random() * 100; // 0% to 100%
        const posY = Math.random() * 100; // 0% to 100%
        const opacity = Math.random() * 0.7 + 0.3; // Between 0.3 and 1
        const animationDuration = Math.random() * 20 + 10; // Between 10s and 30s
        const animationDelay = Math.random() * 5; // Between 0s and 5s
        
        // Set dot styles
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${posX}%`;
        dot.style.top = `${posY}%`;
        dot.style.opacity = opacity;
        dot.style.animation = `float ${animationDuration}s ease-in-out ${animationDelay}s infinite`;
        
        footerDotsContainer.appendChild(dot);
    }
}

// Create animated dots for the main content area
function createContentDots() {
    const dotsContainer = document.getElementById('dotsContainer');
    const dotCount = 30; // Number of dots to create
    
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        
        // Randomize dot properties
        const size = Math.random() * 15 + 5; // Between 5px and 20px
        const posX = Math.random() * 100; // 0% to 100%
        const posY = Math.random() * 100; // 0% to 100%
        const opacity = Math.random() * 0.8 + 0.2; // Between 0.2 and 1
        const animationDuration = Math.random() * 15 + 10; // Between 10s and 25s
        const animationDelay = Math.random() * 3; // Between 0s and 3s
        
        // Random color for content dots
        const colors = [
            'rgba(59, 130, 246, 0.8)', // Blue
            'rgba(139, 92, 246, 0.8)', // Purple
            'rgba(239, 68, 68, 0.8)',  // Red
            'rgba(34, 197, 94, 0.8)'   // Green
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set dot styles
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${posX}%`;
        dot.style.top = `${posY}%`;
        dot.style.opacity = opacity;
        dot.style.background = `radial-gradient(circle, ${color}, rgba(255,255,255,0.2))`;
        dot.style.boxShadow = `0 0 15px ${color}`;
        dot.style.animation = `float ${animationDuration}s ease-in-out ${animationDelay}s infinite, pulse ${animationDuration/2}s ease-in-out ${animationDelay}s infinite alternate`;
        
        dotsContainer.appendChild(dot);
    }
}

// Back to top functionality
function setupBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add hover effects to footer links
function setupFooterHoverEffects() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Add animation to newsletter form
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = newsletterForm.querySelector('input');
    const newsletterButton = newsletterForm.querySelector('button');
    
    newsletterInput.addEventListener('focus', () => {
        newsletterForm.style.borderColor = 'rgba(59, 130, 246, 0.6)';
        newsletterForm.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.2)';
    });
    
    newsletterInput.addEventListener('blur', () => {
        newsletterForm.style.borderColor = 'rgba(59, 130, 246, 0.2)';
        newsletterForm.style.boxShadow = 'none';
    });
    
    newsletterButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (!newsletterInput.value || !newsletterInput.value.includes('@')) {
            // Shake animation for invalid input
            newsletterForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                newsletterForm.style.animation = '';
            }, 500);
            return;
        }
        
        // Success animation
        newsletterButton.innerHTML = '<i class="fas fa-check"></i>';
        newsletterButton.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
        
        setTimeout(() => {
            newsletterButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
            newsletterButton.style.background = 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
            newsletterInput.value = '';
        }, 2000);
    });
}

// Add CSS for shake animation
function addShakeAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create animated dots
    createFooterDots();
    createContentDots();
    
    // Setup functionality
    setupBackToTop();
    setupFooterHoverEffects();
    setupNewsletterForm();
    addShakeAnimation();
    
    // Add responsive class to body based on screen size
    function updateResponsiveClass() {
        const width = window.innerWidth;
        const body = document.body;
        
        // Remove existing responsive classes
        body.classList.remove('mobile', 'tablet', 'desktop');
        
        // Add appropriate class
        if (width < 768) {
            body.classList.add('mobile');
        } else if (width < 1024) {
            body.classList.add('tablet');
        } else {
            body.classList.add('desktop');
        }
    }
    
    // Update on load and resize
    updateResponsiveClass();
    window.addEventListener('resize', updateResponsiveClass);
    
    // Add some interactive effects to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to footer links
    const allFooterLinks = document.querySelectorAll('footer a');
    allFooterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(59, 130, 246, 0.4);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});