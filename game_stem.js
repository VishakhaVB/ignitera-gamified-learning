const challengeText = document.getElementById("challengeText");
const typingArea = document.getElementById("typingArea");
const startBtn = document.getElementById("startBtn");
const resultBox = document.getElementById("resultBox");

const xpPoints = document.getElementById("xp-points");
const xpProgress = document.getElementById("xp-progress");

let xp = 0;
let startTime, endTime, currentText;

const sentences = [
  "Photosynthesis is how plants make their food using sunlight.",
  "The Earth revolves around the Sun in 365 days.",
  "Water boils at 100 degrees Celsius at sea level.",
  "Electricity flows through conductors like copper.",
  "Speed is distance divided by time."
];

// 🎵 Add sound
const successSound = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
const failSound = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");

startBtn.addEventListener("click", () => {
  if (startBtn.textContent === "Start") {
    playGame();
  } else {
    endGame();
  }
});

function playGame() {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  currentText = sentences[randomIndex];
  challengeText.textContent = currentText;
  typingArea.value = "";
  typingArea.disabled = false;
  typingArea.focus();
  startBtn.textContent = "Done";
  startTime = new Date().getTime();
}

function endGame() {
  endTime = new Date().getTime();
  const totalTime = (endTime - startTime) / 1000;
  typingArea.disabled = true;
  startBtn.textContent = "Start";

  const typed = typingArea.value.trim();
  const wordsOriginal = currentText.split(" ");
  const wordsTyped = typed.split(" ");
  let correct = 0;
  wordsOriginal.forEach((word, idx) => {
    if (word === wordsTyped[idx]) correct++;
  });

  const accuracy = Math.round((correct / wordsOriginal.length) * 100);
  const speed = Math.round((typed.split(" ").length / totalTime) * 60);

  // Show result
  resultBox.textContent = `⏱ Time: ${totalTime}s | ⚡ Speed: ${speed} WPM | 🎯 Accuracy: ${accuracy}%`;

  // 🎵 Play sound
  if (accuracy > 70) {
    successSound.play();
  } else {
    failSound.play();
  }

  // XP System
  let earnedXP = Math.min(speed + accuracy, 100);
  xp += earnedXP;
  xpPoints.textContent = xp;
  xpProgress.style.width = `${Math.min(xp / 5, 100)}%`;

  unlockBadges(speed, accuracy);
}

function unlockBadges(speed, accuracy) {
  if (speed > 40) document.getElementById("badge-speed").classList.add("unlocked");
  if (accuracy > 80) document.getElementById("badge-accuracy").classList.add("unlocked");
  if (speed > 50 && accuracy > 85) document.getElementById("badge-master").classList.add("unlocked");
}

// Rotate motivation text
const quotes = [
  "Keep practicing, every keystroke makes you stronger! 🚀",
  "Accuracy is the key to mastery. 🎯",
  "Your brain is like a muscle, train it daily. 💪",
  "Typing fast means thinking fast. ⚡",
  "Knowledge grows when shared! 📚"
];
setInterval(() => {
  document.getElementById("motivation-text").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];
}, 6000);
