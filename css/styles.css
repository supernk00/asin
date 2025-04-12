:root {
    --purple-gradient: linear-gradient(135deg, #a770ef, #cf8bf3, #fdb99b);
    --blue-gradient: linear-gradient(135deg, #0093E9, #00DBDE);
    --gold-gradient: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    --transition-time: 500ms;
    --glassmorphism-bg: rgba(255, 255, 255, 0.1);
    --glassmorphism-border: rgba(255, 255, 255, 0.2);
    --card-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Segoe UI', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    position: relative;
    color: white;
    background-size: 400% 400%;
    animation: gradient-shift 15s ease infinite;
}

body.page-1 {
    background: var(--purple-gradient);
}

body.page-2 {
    background: var(--blue-gradient);
}

body.page-3 {
    background: var(--gold-gradient);
}

.particles-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
}

/* Page 1 - Message Container */
.message-container {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px;
    max-width: 600px;
    width: 90%;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.message {
    opacity: 0;
    transform: translateY(20px);
    font-size: 24px;
    margin-bottom: 20px;
    transition: opacity var(--transition-time) ease, transform var(--transition-time) ease;
}

.message.active {
    opacity: 1;
    transform: translateY(0);
}

.message:last-child.active {
    animation: pop-animation 0.8s forwards;
}

.arrow-btn {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 50px;
    border-radius: 8px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    transition: all 0.3s ease;
}

.arrow-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
    /* transform: scale(1.05); */
}

/* Page 2 - Quiz Card */
.card {
    background-color: var(--glassmorphism-bg);
    border-radius: 20px;
    padding: 40px;
    max-width: 600px;
    width: 90%;
    text-align: center;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--glassmorphism-border);
    position: relative;
}

.glassmorphism {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

h1 {
    margin-bottom: 30px;
    font-size: 28px;
}

.emoji-input-container {
    display: flex;
    margin-bottom: 20px;
}

#emoji-input {
    flex-grow: 1;
    padding: 15px;
    font-size: 18px;
    border: none;
    border-radius: 10px 0 0 10px;
    background-color: rgba(255, 255, 255, 0.8);
}

#emoji-picker-btn {
    padding: 15px 20px;
    font-size: 18px;
    border: none;
    border-radius: 0 10px 10px 0;
    background-color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
}

.emoji-picker {
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    max-width: 350px;
    max-height: 400px;
    overflow: auto;
}

.primary-btn {
    padding: 15px 30px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #00DBDE, #0093E9);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 20px 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.primary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

#result-container {
    margin-top: 30px;
    transition: opacity 0.5s ease;
}

#result-container.hidden {
    display: none;
    opacity: 0;
}

#emoji-display {
    font-size: 50px;
    margin: 20px 0;
    min-height: 60px;
}

.certificate {
    background: linear-gradient(135deg, #ffffff, #f4f4f4);
    color: #333;
    border-radius: 10px;
    padding: 20px;
    margin-top: 30px;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    animation: certificate-glow 2s infinite alternate;
}

.certificate-stamp {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background-color: #ff4d4d;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 24px;
    transform: rotate(-15deg);
}

/* Page 3 - Apology Card */
.card-container {
    position: relative;
    perspective: 1500px;
    width: 90%;
    max-width: 500px;
}

.folded-card {
    width: 100%;
    height: 400px;
    position: relative;
    transform-style: preserve-3d;
    animation: unfold-card 1s forwards;
    perspective: 1500px;
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.8s;
}

.card-open .card-inner {
    transform: rotateY(180deg);
}

.card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.card-front {
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #333;
    transform: rotateY(0deg);
}

.card-back {
    background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
    transform: rotateY(180deg);
    padding: 30px;
    overflow-y: auto;
}

.handwritten {
    font-family: 'Dancing Script', cursive;
    font-size: 22px;
    line-height: 1.6;
    color: #333;
}

.signature {
    margin-top: 8px;
    font-size: 22px;
    text-align: right;
    position: relative;
    display: inline-block;
    margin-left: auto;
}

.signature::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background-color: #333;
    animation: sign-line 1s forwards 1s;
}

.hearts-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100;
}

.heart {
    position: absolute;
    font-size: 20px;
    animation: float-heart 4s linear infinite;
    opacity: 0.7;
}

/* .gift-icon {
    position: absolute;
    top: -30px;
    right: -20px;
    font-size: 40px;
    animation: bounce 2s infinite;
} */

/* Loading Spinner */
.loading-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
}

.loading-spinner.visible {
    opacity: 1;
    visibility: visible;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
}

.hidden {
    display: none;
}

emoji-picker {
    max-width: 300px;
    max-height: 400px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

/* Animations */
@keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes pop-animation {
    0% { transform: scale(0.1); opacity: 0; }
    70% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}

@keyframes certificate-glow {
    from { box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
    to { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
}

@keyframes unfold-card {
    0% { transform: rotateY(-90deg); }
    100% { transform: rotateY(0); }
}

@keyframes sign-line {
    0% { width: 0; }
    100% { width: 100%; }
}

@keyframes float-heart {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.7; }
    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Responsive design */
@media (max-width: 768px) {
    .message-container, .card {
        width: 90%;
        padding: 30px;
    }
    
    .message {
        font-size: 20px;
    }
    
    h1 {
        font-size: 24px;
    }
}

