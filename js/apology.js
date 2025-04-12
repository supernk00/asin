document.addEventListener('DOMContentLoaded', function() {
    // Set session progress
    setSessionProgress('3');
    
    // Check if user came from page 2
    const currentPage = getSessionProgress();
    if (currentPage !== '3' && currentPage !== '2') {
        window.location.href = 'index.html';
    }
    
    // Animate the card opening
    const card = document.querySelector('.folded-card');
    setTimeout(() => {
        card.style.transform = 'rotateY(180deg)';
    }, 500);
    
    // Scroll effects for card content
    const cardContent = document.querySelector('.card-content');
    if (cardContent) {
        const paragraphs = cardContent.querySelectorAll('p');
        
        // Create scroll observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Apply initial styles and observe paragraphs
        paragraphs.forEach((paragraph, index) => {
            paragraph.style.opacity = 0;
            paragraph.style.transform = 'translateY(20px)';
            paragraph.style.transition = `opacity 0.5s ease ${index * 0.3}s, transform 0.5s ease ${index * 0.3}s`;
            observer.observe(paragraph);
        });
        
        // Trigger initial observation
        setTimeout(() => {
            paragraphs[0].style.opacity = 1;
            paragraphs[0].style.transform = 'translateY(0)';
        }, 1500);
    }

    const foldedCard = document.querySelector('.folded-card');
    const openCardBtn = document.querySelector('.open-card-btn');
    
    // Only open card on button click, not on hover
    openCardBtn.addEventListener('click', function() {
        foldedCard.classList.add('card-open');
    });
    
    // Remove any existing hover listeners
    foldedCard.removeEventListener('mouseenter', handleCardHover);
    foldedCard.removeEventListener('mouseover', handleCardHover);
    
    // Function placeholder for any existing hover handlers
    function handleCardHover() {
        // This is just a placeholder to remove any existing handlers
    }
});
