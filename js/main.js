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
      initVisitorCounter();
      // Autoplay music after "Flash" loads
      playerPlay();
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

// --- VISITOR COUNTER ---
function initVisitorCounter() {
  var counterEl = document.getElementById('visitor-num');
  var count = parseInt(localStorage.getItem('spellbaby_visitors') || '847', 10);
  count++;
  localStorage.setItem('spellbaby_visitors', count);
  // Pad to 6 digits
  counterEl.textContent = ('000000' + count).slice(-6);
}

// --- MUSIC PLAYER ---
var tracks = [
  {
    title: 'The Elf From Outer Space',
    src: 'Yesbellis and the Spells Songs/The Elf From Outer Space - Yesbellis & the Spells.mp3'
  },
  {
    title: "Barmaid's Bosom",
    src: "Yesbellis and the Spells Songs/Barmaid's Bosom - Yesbellis & the Spells.mp3"
  },
  {
    title: 'Grog For My Dog',
    src: 'Yesbellis and the Spells Songs/Grog For My Dog - Yesbellis & the Spells.mp3'
  },
  {
    title: 'The Tavern of Tragedy',
    src: 'Yesbellis and the Spells Songs/The Tavern of Tragedy - Yesbellis & the Spells.mp3'
  }
];

var currentTrack = 0;
var audio = new Audio();
var isPlaying = false;
var marquee = document.getElementById('track-marquee');

function updateMarquee() {
  var text = '';
  for (var i = 0; i < tracks.length; i++) {
    if (i === currentTrack) {
      text += '▶ ' + tracks[i].title + ' ◀';
    } else {
      text += '★ ' + tracks[i].title;
    }
    text += ' ★ ';
  }
  marquee.textContent = text;
}

function playerPlay() {
  if (!isPlaying) {
    audio.src = tracks[currentTrack].src;
    audio.play();
    isPlaying = true;
    updateMarquee();
  } else if (audio.paused) {
    audio.play();
  }
}

function playerNext() {
  currentTrack = (currentTrack + 1) % tracks.length;
  audio.src = tracks[currentTrack].src;
  if (isPlaying) {
    audio.play();
  }
  updateMarquee();
}

function playerStop() {
  audio.pause();
  audio.currentTime = 0;
  currentTrack = 0;
  isPlaying = false;
  marquee.textContent = '★ click PLAY!! to start the music ★';
}

// Auto-advance to next track when current one ends
audio.addEventListener('ended', function () {
  currentTrack = (currentTrack + 1) % tracks.length;
  audio.src = tracks[currentTrack].src;
  audio.play();
  updateMarquee();
});
