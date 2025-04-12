document.addEventListener('DOMContentLoaded', function() {
    const messages = document.querySelectorAll('.message');
    const nextBtn = document.getElementById('next-btn');
    let currentMessage = 0;
    
    // Set session progress
    setSessionProgress('1');
    
    // Show first message after a short delay
    setTimeout(() => {
        showMessage(currentMessage);
    }, 500);
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
        currentMessage++;
        
        if (currentMessage < messages.length) {
            showMessage(currentMessage);
        } else {
            // All messages shown, change button text and prepare for page transition
            nextBtn.textContent = "Next Page →";
            nextBtn.style.backgroundColor = "#da22ff";
            nextBtn.style.color = "white";
            
            // Change click handler to navigate to next page
            nextBtn.removeEventListener('click', arguments.callee);
            nextBtn.addEventListener('click', function() {
                setSessionProgress('2');
                transitionToPage('quiz.html');
            });
        }
    });
    
    // Function to show a specific message
    function showMessage(index) {
        if (index > 0) {
            // If not the first message, keep previous messages visible
            for (let i = 0; i < index; i++) {
                messages[i].classList.add('active');
            }
        }
        
        // Show current message with animation
        setTimeout(() => {
            messages[index].classList.add('active');
        }, 100);
    }
});
