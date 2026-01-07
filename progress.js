// Simulated progress values (later can be fetched from backend/localStorage)
const progressData = {
  math: 70,
  science: 45,
  english: 85
};

// Update progress bars dynamically
function updateProgress() {
  for (let subject in progressData) {
    const percent = progressData[subject];
    const bar = document.getElementById(`${subject}-progress`);
    const label = document.getElementById(`${subject}-percent`);

    if (bar && label) {
      bar.style.width = percent + "%";
      label.textContent = percent + "%";
    }
  }
}

// Add logout button
document.getElementById("logout-btn").addEventListener("click", () => {
  alert("Logged out successfully!");
  window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", updateProgress);
