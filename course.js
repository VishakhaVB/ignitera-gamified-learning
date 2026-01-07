// =======================
// Student Dashboard Logic
// =======================

// Initial Data
let xp = 45; // current XP %
let badgesEarned = ["🔥 Streak Master", "💡 Problem Solver", "🚀 Fast Learner"];
let courses = {
  Mathematics: 30,
  Science: 60,
  Technology: 15,
  English: 45,
};

// Update XP Progress
function updateXP() {
  document.getElementById("xp-progress").style.width = xp + "%";
}
updateXP();

// Add New Badge
function addBadge(name) {
  if (!badgesEarned.includes(name)) {
    badgesEarned.push(name);
    const badgeContainer = document.querySelector(".badges");
    const badgeEl = document.createElement("span");
    badgeEl.className = "badge";
    badgeEl.innerText = name;
    badgeContainer.appendChild(badgeEl);
  }
}

// Update Course Progress
function updateCourse(course, increment) {
  courses[course] = Math.min(100, courses[course] + increment);

  // Update progress visually
  const card = [...document.querySelectorAll(".card")].find(
    (c) => c.querySelector("h3").innerText === course
  );
  if (card) {
    card.querySelector(".progress").style.width = courses[course] + "%";
  }

  // Increase XP
  xp = Math.min(100, xp + increment / 2);
  updateXP();

  // Award badges
  if (courses[course] >= 100) {
    addBadge("🏅 " + course + " Mastery");
  }
  if (xp >= 100) {
    addBadge("🌟 XP Champion");
  }
}

// Button Events
document.querySelectorAll(".card .btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const course = btn.parentElement.querySelector("h3").innerText;
    updateCourse(course, 10); // simulate progress
  });
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  alert("You have been logged out.");
  window.location.href = "index.html"; // change later
});
