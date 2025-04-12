// Common functions for all pages

// Session management
function setSessionProgress(page) {
    sessionStorage.setItem('currentPage', page);
}

function getSessionProgress() {
    return sessionStorage.getItem('currentPage') || '1';
}

// Page transition
function transitionToPage(url) {
    document.body.style.opacity = 0;
    
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('visible');
    }
    
    setTimeout(() => {
        window.location.href = url;
    }, 800);
}

// Particle animation
function createParticles() {
    const container = document.querySelector('.particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random styling
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 5 + 3}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s linear infinite`;
        particle.style.animationDelay = `-${delay}s`;
        
        container.appendChild(particle);
    }
}

// Hearts animation for page 3
function createHearts() {
    if (document.querySelector('.hearts-container')) {
        const container = document.querySelector('.hearts-container');
        const heartCount = 20;
        
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤️';
                
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.top = `${Math.random() * 100}%`;
                heart.style.animationDelay = `${Math.random() * 2}s`;
                
                container.appendChild(heart);
                
                // Remove after animation completes
                setTimeout(() => {
                    heart.remove();
                }, 4000);
            }, i * 300);
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Fade in effect
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = 'opacity 800ms';
        document.body.style.opacity = 1;
    }, 200);
    
    // Create particles
    createParticles();
    
    // If on page 3, create floating hearts
    if (document.querySelector('.hearts-container')) {
        createHearts();
        setInterval(createHearts, 8000); // Create new hearts periodically
    }
});
