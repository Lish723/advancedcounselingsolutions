// 🌿 Advanced Counseling Solutions - Complete Script File
// Your existing functionality + Background Animations

// ===== YOUR EXISTING FUNCTIONALITY =====

function toggleMenu() {
    const menu = document.getElementById("headerMenu");
    menu.classList.toggle("show");
}

const moods = {
    Sunday: { icon: "☀️", quote: "Let warmth and rest shape your day." },
    Monday: { icon: "🌈", quote: "Breathe into the new week — your pace is enough." },
    Tuesday: { icon: "🌿", quote: "Every step you take is rooted in growth." },
    Wednesday: { icon: "🍃", quote: "Midweek pause — reflect and reset gently." },
    Thursday: { icon: "🦋", quote: "Transformation lives in small wins." },
    Friday: { icon: "🌸", quote: "Let joy bloom through tiny celebrations." },
    Saturday: { icon: "🌷", quote: "Let the stillness guide your way." }
};

const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
document.getElementById("day-name").textContent = `${dayName}`;
document.getElementById("quote-text").textContent = `${moods[dayName].icon} ${moods[dayName].quote}`;

// Breathing Circle Code
const breathText = document.getElementById("breathe-text");
const breathSequence = [
    { text: "Breathe in…", duration: 4000 },
    { text: "Hold…", duration: 3000 },
    { text: "Breathe out…", duration: 5000 }
];

let currentStep = 0;

function cycleBreathing() {
    breathText.textContent = breathSequence[currentStep].text;
    
    setTimeout(() => {
        currentStep = (currentStep + 1) % breathSequence.length;
        cycleBreathing();
    }, breathSequence[currentStep].duration);
}

// Start the breathing cycle
cycleBreathing();

// Quiz Code
let currentQuizStep = 0;
let quizAnswers = {};

function nextStep() {
    // Get all quiz steps
    const quizSteps = document.querySelectorAll('.quiz-step');
    
    // Get the current question name
    const currentQuestionName = `q${currentQuizStep + 1}`;
    
    // Check if an answer is selected
    const selectedAnswer = document.querySelector(`input[name="${currentQuestionName}"]:checked`);
    
    if (!selectedAnswer) {
        alert('Please select an answer before continuing.');
        return;
    }
    
    // Store the answer
    quizAnswers[currentQuestionName] = selectedAnswer.value;
    
    // Hide current step
    quizSteps[currentQuizStep].classList.remove('active');
    
    // Move to next step
    currentQuizStep++;
    
    // Show next step
    if (currentQuizStep < quizSteps.length) {
        quizSteps[currentQuizStep].classList.add('active');
    }
}

function submitQuiz() {
    // Get the last question answer
    const selectedAnswer = document.querySelector('input[name="q9"]:checked');
    
    if (!selectedAnswer) {
        alert('Please select an answer before submitting.');
        return;
    }
    
    // Store the last answer
    quizAnswers.q9 = selectedAnswer.value;
    
    // Calculate results
    calculateResults();
}

function calculateResults() {
    let yesCount = 0;
    let tryCount = 0;
    let noCount = 0;
    let notForMeCount = 0;
    
    // Count answers
    for (let answer in quizAnswers) {
        switch (quizAnswers[answer]) {
            case 'yes':
                yesCount++;
                break;
            case 'try':
                tryCount++;
                break;
            case 'no':
                noCount++;
                break;
            case 'notforme':
                notForMeCount++;
                break;
        }
    }
    
    // Determine result
    let resultTitle, resultMessage;
    
    if (yesCount >= 6) {
        resultTitle = "You're Ready for Therapy! 🌟";
        resultMessage = "Based on your answers, you seem well-prepared to begin your therapeutic journey. You're open to growth, ready to commit time and effort, and have a positive outlook on the healing process. Consider reaching out to a therapist to start this meaningful work.";
    } else if (yesCount + tryCount >= 6) {
        resultTitle = "You're Open to Therapy 🌱";
        resultMessage = "You show openness to therapy and personal growth, even if you have some uncertainties. This is completely normal! Many people feel hesitant at first. Your willingness to try is a great starting point. Consider speaking with a therapist about your concerns.";
    } else if (noCount >= 5) {
        resultTitle = "You Might Not Be Ready Yet 🤔";
        resultMessage = "It seems like you might not be ready for therapy right now, and that's okay. Everyone's journey is different. You might benefit from exploring self-help resources first, or simply taking more time to consider what you want from therapy.";
    } else {
        resultTitle = "You're Exploring Your Options 🧭";
        resultMessage = "You have mixed feelings about therapy, which is completely understandable. It might help to learn more about what therapy involves, speak with friends who've had positive experiences, or consider starting with a consultation to see how it feels.";
    }
    
    // Display results
    displayResults(resultTitle, resultMessage);
}

function displayResults(title, message) {
    const quizContainer = document.querySelector('.quiz-container');
    
    quizContainer.innerHTML = `
        <div style="text-align: center;">
            <h2>${title}</h2>
            <p style="font-size: 1.1rem; color: #555; line-height: 1.6; margin-bottom: 2rem;">${message}</p>
            <button onclick="restartQuiz()" style="background: linear-gradient(135deg, rgb(66, 90, 59), #4a6b4f); color: white; border: none; border-radius: 8px; padding: 0.8rem 2rem; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease;">Take Quiz Again</button>
        </div>
    `;
}

function restartQuiz() {
    // Reset variables
    currentQuizStep = 0;
    quizAnswers = {};
    
    // Reload the page to reset the quiz
    location.reload();
}

// ===== BACKGROUND ANIMATIONS - NEW ADDITION =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations
    initializeBackgroundAnimations();
    
    // Set up periodic randomization for natural movement
    setInterval(randomizeBackgroundAnimations, 30000); // Re-randomize every 30 seconds
    
    // Optional: Add user interaction features
    setupAnimationInteractiveFeatures();
});

/**
 * Initialize and randomize all background animations
 */
function initializeBackgroundAnimations() {
    randomizeBackgroundAnimations();
    console.log('🌿 Background animations initialized for Advanced Counseling Solutions');
}

/**
 * Randomize animation timing for natural, organic movement
 */
function randomizeBackgroundAnimations() {
    // Only run if animation elements exist
    if (!document.querySelector('.background-animations')) return;
    
    // Randomize leaves
    const leaves = document.querySelectorAll('.leaf');
    leaves.forEach((leaf, index) => {
        const randomDelay = Math.random() * 8; // 0-8 second delay
        const randomDuration = 12 + Math.random() * 10; // 12-22 second duration
        leaf.style.animationDelay = randomDelay + 's';
        leaf.style.animationDuration = randomDuration + 's';
    });
    
    // Randomize dew drops
    const dewDrops = document.querySelectorAll('.dew-drop');
    dewDrops.forEach((drop, index) => {
        const randomDelay = Math.random() * 4; // 0-4 second delay
        const randomPulseDuration = 1.5 + Math.random() * 2; // 1.5-3.5 second pulse
        drop.style.animationDelay = randomDelay + 's';
        drop.style.animationDuration = randomPulseDuration + 's';
    });
    
    // Randomize particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const randomDelay = Math.random() * 6; // 0-6 second delay
        const randomFloat = 5 + Math.random() * 4; // 5-9 second float
        particle.style.animationDelay = randomDelay + 's';
        particle.style.animationDuration = randomFloat + 's';
    });
    
    // Randomize hearts
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        const randomDelay = Math.random() * 10; // 0-10 second delay
        const randomDrift = 18 + Math.random() * 12; // 18-30 second drift
        heart.style.animationDelay = randomDelay + 's';
        heart.style.animationDuration = randomDrift + 's';
    });
    
    // Randomize lotus flowers
    const lotus = document.querySelectorAll('.lotus');
    lotus.forEach((flower, index) => {
        const randomDelay = Math.random() * 12; // 0-12 second delay
        const randomGrow = 19 + Math.random() * 8; // 19-27 second growth cycle
        flower.style.animationDelay = randomDelay + 's';
        flower.style.animationDuration = randomGrow + 's';
    });
    
    // Randomize breathing circles
    const circles = document.querySelectorAll('.breath-circle');
    circles.forEach((circle, index) => {
        const randomDelay = Math.random() * 8; // 0-8 second delay
        const randomBreathe = 21 + Math.random() * 6; // 21-27 second drift
        circle.style.animationDelay = randomDelay + 's';
        circle.style.animationDuration = randomBreathe + 's';
    });
    
    // Randomize butterflies
    const butterflies = document.querySelectorAll('.butterfly');
    butterflies.forEach((butterfly, index) => {
        const randomDelay = Math.random() * 15; // 0-15 second delay
        const randomFly = 23 + Math.random() * 10; // 23-33 second flight
        butterfly.style.animationDelay = randomDelay + 's';
        butterfly.style.animationDuration = randomFly + 's';
    });
    
    // Randomize breeze lines
    const breezes = document.querySelectorAll('.breeze-line');
    breezes.forEach((breeze, index) => {
        const randomDelay = Math.random() * 12; // 0-12 second delay
        const randomBreeze = 8 + Math.random() * 6; // 8-14 second breeze
        breeze.style.animationDelay = randomDelay + 's';
        breeze.style.animationDuration = randomBreeze + 's';
    });
}

/**
 * Add interactive features for animations (optional)
 */
function setupAnimationInteractiveFeatures() {
    // Pause animations when page is not visible (performance optimization)
    document.addEventListener('visibilitychange', function() {
        const animationContainer = document.querySelector('.background-animations');
        if (animationContainer) {
            if (document.hidden) {
                animationContainer.style.animationPlayState = 'paused';
            } else {
                animationContainer.style.animationPlayState = 'running';
            }
        }
    });
    
    // Optional: Add gentle sparkle effect on click (only on empty space)
    document.addEventListener('click', function(e) {
        // Only add sparkles if clicking on empty space (not on content)
        if (e.target === document.body || e.target.classList.contains('background-animations')) {
            createHealingSparkle(e.clientX, e.clientY);
        }
    });
}

/**
 * Create a temporary healing sparkle effect at click location
 */
function createHealingSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '12px';
    sparkle.style.height = '12px';
    sparkle.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'healingSparkle 1.5s ease-out forwards';
    
    // Add sparkle keyframes if not already present
    if (!document.querySelector('#healing-sparkle-styles')) {
        const style = document.createElement('style');
        style.id = 'healing-sparkle-styles';
        style.textContent = `
            @keyframes healingSparkle {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.5) rotate(180deg);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

/**
 * Utility function to adjust animation speed globally
 */
function setBackgroundAnimationSpeed(multiplier = 1) {
    const allAnimatedElements = document.querySelectorAll('.leaf, .dew-drop, .particle, .heart, .lotus, .breath-circle, .butterfly, .breeze-line, .healing-ray');
    
    allAnimatedElements.forEach(element => {
        const currentDuration = parseFloat(element.style.animationDuration) || 15; // default fallback
        element.style.animationDuration = (currentDuration / multiplier) + 's';
    });
}

/**
 * Function to pause/resume all background animations
 */
function toggleBackgroundAnimations() {
    const animationContainer = document.querySelector('.background-animations');
    if (!animationContainer) return;
    
    const currentState = animationContainer.style.animationPlayState;
    
    if (currentState === 'paused') {
        animationContainer.style.animationPlayState = 'running';
        console.log('🌿 Background animations resumed');
    } else {
        animationContainer.style.animationPlayState = 'paused';
        console.log('🌿 Background animations paused');
    }
}

/**
 * Add seasonal color variations (optional feature)
 */
function setSeasonalAnimationTheme(season = 'spring') {
    const root = document.documentElement;
    
    switch(season.toLowerCase()) {
        case 'spring':
            root.style.setProperty('--animation-primary-color', '#81c784');
            root.style.setProperty('--animation-secondary-color', '#c8e6c9');
            break;
        case 'summer':
            root.style.setProperty('--animation-primary-color', '#ffb74d');
            root.style.setProperty('--animation-secondary-color', '#ffe0b2');
            break;
        case 'autumn':
            root.style.setProperty('--animation-primary-color', '#d4822a');
            root.style.setProperty('--animation-secondary-color', '#ffcc80');
            break;
        case 'winter':
            root.style.setProperty('--animation-primary-color', '#81c7d4');
            root.style.setProperty('--animation-secondary-color', '#b3e5fc');
            break;
    }
}

// Export animation functions for potential external use
window.BackgroundAnimationController = {
    randomize: randomizeBackgroundAnimations,
    setSpeed: setBackgroundAnimationSpeed,
    toggle: toggleBackgroundAnimations,
    setSeason: setSeasonalAnimationTheme
};

// Debug mode - uncomment for development
// console.log('🌿 Background Animation Controller loaded. Available methods:', Object.keys(window.BackgroundAnimationController));
