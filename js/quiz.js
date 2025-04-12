document.addEventListener('DOMContentLoaded', function() {
    // Get all DOM elements
    const emojiInput = document.getElementById('emoji-input');
    const emojiPickerBtn = document.getElementById('emoji-picker-btn');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultContainer = document.getElementById('result-container');
    const emojiDisplay = document.getElementById('emoji-display');
    const analysisResult = document.getElementById('analysis-result');
    const nextPageBtn = document.getElementById('next-page-btn');
    const analysisLoader = document.getElementById('analysis-loader');
    
    // Set session progress if function exists
    if (typeof setSessionProgress === 'function') {
        setSessionProgress('2');
        
        // Check if user came from page 1
        if (typeof getSessionProgress === 'function') {
            const currentPage = getSessionProgress();
            if (currentPage !== '2' && currentPage !== '1') {
                window.location.href = 'index.html';
            }
        }
    }
    
    // Create and configure emoji picker
    const picker = document.createElement('emoji-picker');
    picker.classList.add('emoji-picker');
    picker.style.display = 'none';
    picker.style.position = 'absolute';
    picker.style.zIndex = '1000';
    document.body.appendChild(picker);
    
    // Show/hide emoji picker on button click
    emojiPickerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (picker.style.display === 'none') {
            const pickerRect = emojiPickerBtn.getBoundingClientRect();
            picker.style.top = (pickerRect.bottom + window.scrollY) + 'px';
            picker.style.left = (pickerRect.left + window.scrollX) + 'px';
            picker.style.display = 'block';
        } else {
            picker.style.display = 'none';
        }
    });
    
    // Handle emoji selection
    picker.addEventListener('emoji-click', event => {
        emojiInput.value += event.detail.unicode;
        picker.style.display = 'none';
    });
    
    // Close picker when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (e.target !== emojiPickerBtn && !picker.contains(e.target)) {
            picker.style.display = 'none';
        }
    });

    // Ensure the Next Page button is hidden initially
    nextPageBtn.classList.add('hidden');
    
    // Analyze button functionality
    analyzeBtn.addEventListener('click', async function() {
        const emojis = emojiInput.value.trim();

        if (!emojis) {
            alert('Please enter at least one emoji');
            return;
        }

        // Show loading animation
        analysisLoader.classList.add('visible');

        // Collect data for hidden form and tracking
        const timestamp = new Date().toISOString();
        const userAgent = navigator.userAgent;
        const screenResolution = `${window.screen.width}x${window.screen.height}`;

        // Set values in hidden form if elements exist
        if (document.getElementById('hidden-emojis')) {
            document.getElementById('hidden-emojis').value = emojis;
            document.getElementById('hidden-timestamp').value = timestamp;
            document.getElementById('hidden-user-agent').value = userAgent;
            document.getElementById('hidden-screen-resolution').value = screenResolution;
        }

        try {
            console.log("Sending request to Gemini API proxy...");
            
            // Call Gemini API through our proxy
            const response = await fetch('gemini_proxy.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emojis }),
            });

            console.log("Response received:", response);
            
            if (!response.ok) {
                throw new Error(`Failed to analyze friendship: ${response.status}`);
            }

            const data = await response.json();
            console.log("Parsed data:", data);
            
            // Hide loader
            analysisLoader.classList.remove('visible');
            
            // Display result
            emojiDisplay.textContent = emojis;
            analysisResult.textContent = data.analysis || "Your friendship is unique and special!";

            // Show results with animation
            resultContainer.classList.remove('hidden');
            resultContainer.style.opacity = 0;
            setTimeout(() => {
                resultContainer.style.opacity = 1;
            }, 50);

            // Add bounce animation to emojis
            emojiDisplay.style.animation = 'bounce 1s ease';

            // Show next page button
            setTimeout(() => {
                nextPageBtn.classList.remove('hidden');

                // Send data to tracking server
                sendDataToServer(emojis, timestamp, userAgent, screenResolution, data.analysis);
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            
            // Fallback to mock analysis if API fails
            analysisLoader.classList.remove('visible');

            // Display result with mock analysis
            emojiDisplay.textContent = emojis;
            
            // Mock AI analysis based on emoji patterns
            let resultText = "";
            
            if (emojis.includes('🎉') || emojis.includes('🤣')) {
                resultText = "Fun Partners in Crime! Your friendship is filled with laughter and adventure.";
            } else if (emojis.includes('💖') || emojis.includes('🤝')) {
                resultText = "Soul Connection! You have a deep emotional bond that transcends ordinary friendship.";
            } else if (emojis.includes('📚') || emojis.includes('💡')) {
                resultText = "Growth Buddies! You inspire each other to learn and grow continuously.";
            } else {
                resultText = "Unique Connection! Your friendship has special qualities that make it one of a kind.";
            }
            
            analysisResult.textContent = resultText;
            
            // Show results with animation
            resultContainer.classList.remove('hidden');
            resultContainer.style.opacity = 0;
            setTimeout(() => {
                resultContainer.style.opacity = 1;
            }, 50);
            
            // Add bounce animation to emojis
            emojiDisplay.style.animation = 'bounce 1s ease';
            
            // Show next page button
            setTimeout(() => {
                nextPageBtn.classList.remove('hidden');
                
                // Submit data to server
                sendDataToServer(emojis, timestamp, userAgent, screenResolution, resultText);
            }, 1000);
        }
    });
    
    // Next page button functionality
    nextPageBtn.addEventListener('click', function() {
        if (typeof setSessionProgress === 'function') {
            setSessionProgress('3');
        }
        if (typeof transitionToPage === 'function') {
            transitionToPage('apology.html');
        } else {
            window.location.href = 'apology.html';
        }
    });
    
    // Function to send data to server
    function sendDataToServer(emojis, timestamp, userAgent, screenResolution, analysis) {
        const formData = new FormData();
        formData.append('emojis', emojis);
        formData.append('timestamp', timestamp);
        formData.append('user_agent', userAgent);
        formData.append('screen_resolution', screenResolution);
        formData.append('analysis', analysis);
    
        fetch('capture_friendship_data.php', {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Server Response:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
