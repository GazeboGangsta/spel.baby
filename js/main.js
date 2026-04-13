// ============================================
// spell.baby — Yesbellis Spell
// The Elf From Outer Space
// "made in Microsoft FrontPage 2003"
// ============================================

(function () {
  // --- FAKE FLASH LOADING SCREEN ---
  var loadingScreen = document.getElementById('loading-screen');
  var progressBar = document.getElementById('progress-inner');
  var percentText = document.getElementById('loading-percent');
  var mainPage = document.getElementById('main-page');

  // Jerky progress: [targetPercent, durationMs]
  var stages = [
    [15, 400],
    [28, 300],
    [42, 500],  // pause here
    [42, 600],  // hold at 42%
    [78, 200],  // jump!
    [85, 400],
    [92, 300],
    [97, 200],
    [100, 300]
  ];

  var currentStage = 0;

  function runStage() {
    if (currentStage >= stages.length) {
      // Loading "complete" — snap to main page
      loadingScreen.style.display = 'none';
      mainPage.style.display = 'block';
      return;
    }
    var target = stages[currentStage][0];
    var duration = stages[currentStage][1];
    progressBar.style.width = target + '%';
    percentText.textContent = target + '% complete';
    currentStage++;
    setTimeout(runStage, duration);
  }

  // Start the loading animation
  setTimeout(runStage, 500);
})();
