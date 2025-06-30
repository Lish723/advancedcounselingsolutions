document.addEventListener("DOMContentLoaded", () => {
console.log("Welcome to Advanced Counseling Solutions!");
});
document.addEventListener("DOMContentLoaded", () => {
  // Toggle navigation (if using a menu)
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    });
}

  // Mood and Quote data
const moods = {
    0: { day: "Sunday", quote: "Take time to rest and nourish your soul." },
    1: { day: "Monday", quote: "Breathe in courage, breathe out stress." },
    2: { day: "Tuesday", quote: "Progress, not perfection." },
    3: { day: "Wednesday", quote: "Pause. Reflect. Recenter." },
    4: { day: "Thursday", quote: "Peace begins with a deep breath." },
    5: { day: "Friday", quote: "Embrace the moment with calm curiosity." },
    6: { day: "Saturday", quote: "Let the stillness guide your way." }
};

  // Apply quote and day text
const today = new Date().getDay();
const dayElem = document.getElementById("day-name");
const quoteElem = document.getElementById("quote-text");
const moodBox = document.getElementById("moodbox");

if (dayElem && quoteElem && moodBox) {
  dayElem.textContent = moods[today].day;
  quoteElem.innerHTML = moods[today].quote;

  const dayClass = moods[today].day.toLowerCase();
  moodBox.classList.add(dayClass);
} else {
  console.warn("One or more mood elements not found in the DOM.");
}
  // Apply tranquil theme styles
const tranquilTheme = {
    '--bg-color': '#f5f9f6',
    '--accent-color': '#cfe3d4',
    '--text-color': '#4f5e51',
    '--font-family': "'Segoe UI', sans-serif",
    '--font-size': '14px'
};

const root = document.documentElement;
Object.keys(tranquilTheme).forEach(variable => {
    root.style.setProperty(variable, tranquilTheme[variable]);
});
});

const breatheText = document.getElementById('breathe-text');

const cycleDuration = 7500; // total time for inhale + hold + exhale
const breatheInTime = 3000;
const holdTime = 1500;
const breatheOutTime = 3000;

function breathingCycle() {
  breatheText.textContent = 'Breathe in…';
  setTimeout(() => {
    breatheText.textContent = 'Hold…';
  }, breatheInTime);
  setTimeout(() => {
    breatheText.textContent = 'Breathe out…';
  }, breatheInTime + holdTime);
}

setInterval(breathingCycle, cycleDuration);
breathingCycle(); // run once immediately

document.addEventListener("DOMContentLoaded", function () {
const swiper = new Swiper('.mental-health-carousel', {
    loop: true,
    centeredSlides: true,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });
});


let currentStep = 0;
const steps = document.querySelectorAll(".quiz-step");

function nextStep() {
  const currentInputs = steps[currentStep].querySelectorAll("input[type='radio']");
  const answered = Array.from(currentInputs).some(input => input.checked);

  if (!answered) {
    alert("Please select an answer before continuing.");
    return;
  }

  steps[currentStep].classList.remove("active");
  currentStep++;

  if (currentStep < steps.length) {
    steps[currentStep].classList.add("active");
  }
}

function submitQuiz() {
  const answers = [];
  for (let i = 1; i <= 9; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    answers.push(selected ? selected.value : "unanswered");
  }

  const yesCount = answers.filter(ans => ans === "yes").length;

  let message = "";
  if (yesCount >= 7) {
    message = "It looks like you're truly ready to start your therapy journey.";
  } else if (yesCount >= 4) {
    message = "You're making thoughtful steps — therapy could really support your growth.";
  } else {
    message = "That’s okay. Readiness grows over time, and we're here when you're ready.";
  }

  document.querySelector(".quiz-container").innerHTML = `
    <div class="quiz-results">
      <h3>Your Reflection</h3>
      <p>${message}</p>
    </div>
  `;
}
