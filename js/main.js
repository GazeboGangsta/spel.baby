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
      updateStatusbar();
      return;
    }
    var target = stages[currentStage][0];
    var duration = stages[currentStage][1];
    progressBar.style.width = target + '%';
    percentText.textContent = target + '% complete';
    currentStage++;
    setTimeout(runStage, duration);
  }

  // Fake popup before loading starts — clicking OK gives us user interaction for autoplay
  alert('WELCOME 2 MY PAGE!! click ok 2 enter ^_^');

  // Start music immediately after user clicks OK (browser autoplay policy satisfied)
  // Deferred slightly so the player vars are initialized first
  setTimeout(function () { playerPlay(); }, 100);

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

// --- RIGHT-CLICK DISABLED ---
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  alert('nice try!! u cant steal my code!! made with luv by yesbellis 💖');
});

// --- TITLE BAR SCROLLER ---
(function () {
  var titleText = '~*~ YeSbElLiS sPeLl ~*~ ThE eLf FrOm OuTeR sPaCe ~*~ spell.baby ~*~ ';
  var titlePos = 0;
  setInterval(function () {
    document.title = titleText.substring(titlePos) + titleText.substring(0, titlePos);
    titlePos = (titlePos + 1) % titleText.length;
  }, 200);
})();

// --- KONAMI CODE ---
(function () {
  var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  var konamiPos = 0;
  var overlay = document.getElementById('konami-overlay');

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === konamiCode[konamiPos]) {
      konamiPos++;
      if (konamiPos === konamiCode.length) {
        overlay.style.display = 'flex';
        konamiPos = 0;
      }
    } else {
      konamiPos = 0;
    }
  });

  overlay.addEventListener('click', function () {
    overlay.style.display = 'none';
  });
})();

// --- "YOU ARE LISTENING TO" TOOLTIP ---
var listeningTooltip = document.getElementById('listening-tooltip');
var listeningTrack = document.getElementById('listening-track');

audio.addEventListener('play', function () {
  listeningTrack.textContent = tracks[currentTrack].title + ' - Yesbellis & the Spells';
  listeningTooltip.style.display = 'block';
  setTimeout(function () {
    listeningTooltip.style.display = 'none';
  }, 4000);
});

// --- CLOCK ---
(function () {
  var clockEl = document.getElementById('clock-time');
  function updateClock() {
    var now = new Date();
    var h = now.getHours();
    var m = ('0' + now.getMinutes()).slice(-2);
    var s = ('0' + now.getSeconds()).slice(-2);
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    clockEl.textContent = h + ':' + m + ':' + s + ' ' + ampm;
  }
  setInterval(updateClock, 1000);
  updateClock();
})();

// --- FALLING STARS ---
(function () {
  var starChars = ['⭐', '✨', '💫', '✦', '·'];
  var starColors = ['#ff0', '#fff', '#ff69b4', '#0ff', '#aaf'];

  function spawnStar() {
    var star = document.createElement('div');
    star.className = 'falling-star';
    star.textContent = starChars[Math.floor(Math.random() * starChars.length)];
    star.style.left = Math.random() * 100 + 'vw';
    star.style.color = starColors[Math.floor(Math.random() * starColors.length)];
    star.style.fontSize = (8 + Math.random() * 14) + 'px';
    var duration = 3 + Math.random() * 5;
    star.style.animationDuration = duration + 's';
    document.body.appendChild(star);

    setTimeout(function () {
      star.remove();
    }, duration * 1000);
  }

  setInterval(spawnStar, 800);
})();

// --- UPDATE FAKE STATUSBAR WITH VISITOR COUNT ---
function updateStatusbar() {
  var count = localStorage.getItem('spellbaby_visitors') || '847';
  var el = document.getElementById('statusbar-marquee');
  el.textContent = '~*~ welcome 2 my page ~*~ u r visitor #' + ('000000' + count).slice(-6) + ' ~*~ sign my guestbook ~*~ best viewed 800x600 ~*~ powered by the nat zeroes ~*~ rawr XD ~*~';
}

// --- CURSOR SPARKLE TRAIL ---
(function () {
  var sparkles = [];
  var chars = ['✦', '✧', '★', '·', '✶'];
  var colors = ['#ff00ff', '#00ffff', '#ff0', '#ff69b4', '#0f0'];

  document.addEventListener('mousemove', function (e) {
    var spark = document.createElement('div');
    spark.className = 'cursor-trail';
    spark.textContent = chars[Math.floor(Math.random() * chars.length)];
    spark.style.left = e.pageX + 'px';
    spark.style.top = e.pageY + 'px';
    spark.style.color = colors[Math.floor(Math.random() * colors.length)];
    spark.style.fontSize = (8 + Math.random() * 10) + 'px';
    document.body.appendChild(spark);

    setTimeout(function () {
      spark.remove();
    }, 600);
  });
})();
