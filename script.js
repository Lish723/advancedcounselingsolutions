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
