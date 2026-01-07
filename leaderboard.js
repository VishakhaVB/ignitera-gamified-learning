// Sample data
const students = [
  { name: "Aarav", class: "10", xp: 1200 },
  { name: "Rohan", class: "10", xp: 1100 },
  { name: "Riya", class: "10", xp: 980 },
  { name: "Karan", class: "10", xp: 950 },
  { name: "Simran", class: "10", xp: 870 }
];

// Simulated current user (from localStorage ideally)
const currentStudent = {
  name: localStorage.getItem("studentName") || "Rohan",
  class: localStorage.getItem("studentClass") || "10",
  xp: parseInt(localStorage.getItem("studentXP")) || 1100
};

// Sort students by XP
students.sort((a, b) => b.xp - a.xp);

// Render top 5 as cards
const leaderboard = document.getElementById("leaderboard-cards");
students.slice(0, 5).forEach((student, index) => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <div class="rank rank-${index + 1}">#${index + 1}</div>
    <h3>${student.name}</h3>
    <p>Class ${student.class}</p>
    <p><strong>${student.xp} XP</strong></p>
    <div class="progress-bar">
      <div class="progress" style="width:${Math.min(student.xp / 12, 100)}%"></div>
    </div>
  `;
  leaderboard.appendChild(div);
});

// Update profile
document.getElementById("studentName").textContent = currentStudent.name;
document.getElementById("studentClass").textContent = "Class " + currentStudent.class;
document.getElementById("xp-progress").style.width = (currentStudent.xp / 15) + "%";

// Dynamic motivation messages
const tips = [
  "🔥 You’re in Top 3 of your class!",
  "💡 Solve 1 more quiz to reach Rank 1!",
  "🚀 Keep streak alive and earn bonus XP!",
  "⭐ Unlock badges by daily challenges!"
];
let tipIndex = 0;
setInterval(() => {
  document.getElementById("motivation-text").textContent = tips[tipIndex];
  tipIndex = (tipIndex + 1) % tips.length;
}, 4000);
