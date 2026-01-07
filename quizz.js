// ===== Load XP from localStorage =====
document.addEventListener("DOMContentLoaded", () => {
  let xp = parseInt(localStorage.getItem("xp")) || 0;
  updateXP(xp);
});

// ===== Function to Update XP Bar =====
function updateXP(xp) {
  const xpBar = document.getElementById("xp-progress");
  const xpPoints = document.getElementById("xp-points");

  // Cap at 100% for now
  const progress = Math.min(xp, 100);

  xpBar.style.width = progress + "%";
  xpPoints.textContent = xp + " XP";
}
function openGame(url) {
  window.location.href = url; // redirects in same tab
}


// ===== Open Game and Simulate XP Gain =====
//function openGame(page) {
  // Add XP before going to game
  //let currentXP = parseInt(localStorage.getItem("xp")) || 0;
  //currentXP += 10; // +10 XP per game entry (you can adjust)
  //localStorage.setItem("xp", currentXP);
  
   //function openGame(url) {
    //window.open(url, "_blank"); // opens in a new tab
  //}

  // Navigate to game page
  window.location.href = page;
}
