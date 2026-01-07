// Personalized Greeting
function setGreeting() {
  const hour = new Date().getHours();
  const greeting = document.getElementById("greeting");
  if (hour < 12) greeting.textContent = "Good Morning 🌅";
  else if (hour < 18) greeting.textContent = "Good Afternoon ☀️";
  else greeting.textContent = "Good Evening 🌙";

  const teacherName = localStorage.getItem("teacherName") || "Teacher";
  document.getElementById("teacherName").textContent = teacherName;
  document.getElementById("teacherNameWelcome").textContent = teacherName;
}
setGreeting();

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  alert("Logged out!");
  window.location.href = "index.html";
});

// Notes Save / Clear
function saveNote() {
  const note = document.getElementById("noteInput").value;
  localStorage.setItem("teacherNote", note);
  alert("Note saved ✅");
}

function clearNote() {
  document.getElementById("noteInput").value = "";
  localStorage.removeItem("teacherNote");
  alert("Note cleared 🗑️");
}

// Load saved note on refresh
window.onload = () => {
  const savedNote = localStorage.getItem("teacherNote");
  if (savedNote) {
    document.getElementById("noteInput").value = savedNote;
  }
  showTip();
};

// Teaching Tips Rotation
const tips = [
  "Encourage students to ask questions 💬",
  "Use real-world examples in your lessons 🌍",
  "Celebrate small achievements 🎉",
  "Promote teamwork and collaboration 🤝",
  "Give constructive feedback regularly 📝"
];
let tipIndex = 0;

function showTip() {
  document.getElementById("tipText").textContent = tips[tipIndex];
  tipIndex = (tipIndex + 1) % tips.length;
  setTimeout(showTip, 5000); // change every 5s
}

// Navigation
function navigateTo(page) {
  window.location.href = page;
}
