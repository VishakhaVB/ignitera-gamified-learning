// Load student info
document.getElementById("studentName").textContent =
  localStorage.getItem("studentName") || "John Doe";

// Handle Challenge
const challengeText = "What is the capital of France?";
const correctAnswer = "paris";

document.getElementById("submit-challenge").addEventListener("click", () => {
  const answer = document.getElementById("challenge-answer").value.trim().toLowerCase();
  const feedback = document.getElementById("challenge-feedback");

  if (answer === correctAnswer) {
    feedback.textContent = "✅ Correct! +20 XP earned!";
    feedback.style.color = "green";

    // Update XP in localStorage
    let xp = parseInt(localStorage.getItem("xp") || "0");
    xp += 20;
    localStorage.setItem("xp", xp);

    // Update XP bar
    const xpPercent = Math.min((xp % 100), 100);
    document.getElementById("xp-progress").style.width = xpPercent + "%";
  } else {
    feedback.textContent = "❌ Wrong answer. Try again!";
    feedback.style.color = "red";
  }
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
