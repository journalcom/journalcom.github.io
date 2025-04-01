// ===== PAGE TRANSITIONS =====
document.addEventListener("DOMContentLoaded", () => {
  // Always show content immediately
  document.body.classList.add("loaded");
  
  // Clear transition state when returning to homepage
  if (window.performance && performance.navigation.type === 2) {
      localStorage.removeItem('transitioning');
  }
});

// Smooth link transitions
document.querySelectorAll('a[href^="."]').forEach(link => {
  if (link.target === "_blank" || link.hash) return;
  
  link.addEventListener("click", (e) => {
      // Only animate for forward navigation
      if (!link.href.includes("index.html")) {
          e.preventDefault();
          localStorage.setItem('transitioning', 'true');
          document.body.classList.remove("loaded");
          setTimeout(() => {
              window.location.href = link.href;
          }, 400);
      }
  });
});

// Special handling for homepage
if (window.location.pathname.includes("index.html") && 
  !localStorage.getItem('transitioning')) {
  document.body.classList.add("loaded");
}
localStorage.removeItem('transitioning');

// ===== KONAMI CODE (↑↑↓↓) =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Play audio (relative path to your MP3)
      const audio = new Audio('audio/stardewvalley.mp3');
      audio.play().catch(e => console.log("Audio play failed:", e));
      
      // Visual feedback
      document.body.classList.add('konami-activated');
      setTimeout(() => {
        document.body.classList.remove('konami-activated');
      }, 1000);
      
      // Reset
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

let originalTitle = document.title;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = '👀 where did you go';
    setTimeout(() => document.title = originalTitle, 1500);
  }
});