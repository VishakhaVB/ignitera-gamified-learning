const levels = [
  {
    title: "Level 1: Easy",
    questions: [
      { q: "5 + 7 = ?", options: [10, 12, 14, 11], answer: 12 },
      { q: "9 - 3 = ?", options: [5, 6, 7, 4], answer: 6 },
      { q: "6 × 2 = ?", options: [12, 14, 8, 16], answer: 12 }
    ]
  },
  {
    title: "Level 2: Medium",
    questions: [
      { q: "15 ÷ 3 = ?", options: [3, 4, 5, 6], answer: 5 },
      { q: "12 × 3 = ?", options: [36, 32, 40, 28], answer: 36 },
      { q: "25 - 18 = ?", options: [5, 6, 7, 8], answer: 7 }
    ]
  },
  {
    title: "Level 3: Hard",
    questions: [
      { q: "√81 = ?", options: [7, 8, 9, 10], answer: 9 },
      { q: "12² = ?", options: [124, 144, 132, 154], answer: 144 },
      { q: "50% of 80 = ?", options: [30, 35, 40, 45], answer: 40 }
    ]
  }
];

let currentLevel = 0, currentQuestion = 0, xp = 0, timer, timeLeft = 15;

const levelTitle = document.getElementById("level-title");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const timerEl = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");
const xpProgress = document.getElementById("xp-progress");
const gameOverEl = document.getElementById("game-over");
const gameContainer = document.getElementById("game-container");
const levelDisplay = document.getElementById("level-display");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = timeLeft;
  startTimer();

  const level = levels[currentLevel];
  const q = level.questions[currentQuestion];
  levelTitle.textContent = level.title;
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.onclick = () => checkAnswer(opt, q.answer, btn);
    optionsEl.appendChild(btn);
  });

  nextBtn.disabled = true;
}

function checkAnswer(selected, correct, btn) {
  clearInterval(timer);
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(b => b.disabled = true);

  if (selected === correct) {
    btn.classList.add("correct");
    feedbackEl.textContent = "✅ Correct!";
    xp += 10;
  } else {
    btn.classList.add("wrong");
    feedbackEl.textContent = `❌ Wrong! Correct: ${correct}`;
  }
  updateXP();
  nextBtn.disabled = false;
}

function updateXP() {
  xpProgress.style.width = xp + "%";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      feedbackEl.textContent = "⏰ Time’s up!";
      document.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
      nextBtn.disabled = false;
    }
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  const level = levels[currentLevel];

  if (currentQuestion >= level.questions.length) {
    currentLevel++;
    currentQuestion = 0;
    if (currentLevel >= levels.length) {
      gameContainer.classList.add("hidden");
      gameOverEl.classList.remove("hidden");
      return;
    }
    levelDisplay.textContent = `Level ${currentLevel + 1}`;
  }
  loadQuestion();
});

function restartGame() {
  currentLevel = 0;
  currentQuestion = 0;
  xp = 0;
  xpProgress.style.width = "0%";
  gameOverEl.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  loadQuestion();
}

loadQuestion();
