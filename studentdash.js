// ======== Load Student Data from localStorage ========
document.addEventListener("DOMContentLoaded", () => {
  const studentName = localStorage.getItem("studentName") || "Student";
  const studentClass = localStorage.getItem("studentClass") || "Class 8";
  const xp = parseInt(localStorage.getItem("xp")) || 0;
  const streak = parseInt(localStorage.getItem("streak")) || 0;

  // Update UI
  document.getElementById("student-name").textContent = studentName;
  document.getElementById("student-class").textContent = studentClass;

  updateXP(xp);
  updateStreak(streak);
  setGreeting();
  rotateMotivation();
  loadNotes();
});

// ======== Greeting Based on Time ========
function setGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  const name = localStorage.getItem("studentName") || "Student";
  document.getElementById("greeting").textContent = `${greeting}, ${name} 👋`;
}

// ======== XP Progress ========
function updateXP(xp) {
  const progress = document.getElementById("xp-progress");
  const xpValue = document.getElementById("xp-value");

  let maxXP = 100; // per level
  let percentage = Math.min((xp / maxXP) * 100, 100);

  progress.style.width = percentage + "%";
  xpValue.textContent = `${xp} / ${maxXP}`;
  localStorage.setItem("xp", xp);
}

// Call this when quiz/daily challenge completed
function addXP(points) {
  let currentXP = parseInt(localStorage.getItem("xp")) || 0;
  updateXP(currentXP + points);
}

// ======== Streak Counter ========
function updateStreak(streak) {
  document.getElementById("streak").textContent = `🔥 Streak: ${streak} days`;
  localStorage.setItem("streak", streak);
}

// Example: call this daily login
function increaseStreak() {
  let streak = parseInt(localStorage.getItem("streak")) || 0;
  streak++;
  updateStreak(streak);
}

// ======== Motivational Corner (rotating tips) ========
const tips = [
  "🔥 You’re in Top 10 of your class!",
  "💡 Solve 1 more quiz to earn +50 XP",
  "🚀 Keep pushing, your streak is growing!",
  "📚 Review yesterday’s notes to stay sharp",
  "🏆 Consistency beats intensity — small steps daily!"
];
let tipIndex = 0;

function rotateMotivation() {
  const text = document.getElementById("motivation-rotate");
  if (!text) return;

  text.textContent = tips[tipIndex];
  tipIndex = (tipIndex + 1) % tips.length;

  setTimeout(rotateMotivation, 5000); // change every 5s
}

// ======== Notes Section ========
function saveNote() {
  const input = document.getElementById("note-input");
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (input.value.trim() === "") return;

  notes.push(input.value.trim());
  localStorage.setItem("notes", JSON.stringify(notes));

  input.value = "";
  loadNotes();
}

function loadNotes() {
  const list = document.getElementById("notes-list");
  if (!list) return;

  list.innerHTML = "";
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = () => deleteNote(index);

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

// ======== Navigation ========
function goTo(page) {
  window.location.href = page;
}

// ======== Logout ========
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
