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

document.querySelectorAll('blockquote').forEach(quote => {
  // Double-click to highlight
  quote.addEventListener('dblclick', () => {
    // Create glowing effect
    quote.style.transition = 'all 0.5s ease';
    quote.style.boxShadow = '0 0 25px #B38AFF';
    quote.style.transform = 'scale(1.02)';
    
    // Add temporary crown icon to your personal quotes
    const author = quote.querySelector('footer').textContent;
    if (author.includes('utkarsh')) {
      const crown = document.createElement('span');
      crown.innerHTML = '👑';
      crown.style.position = 'absolute';
      crown.style.right = '15px';
      crown.style.top = '15px';
      crown.style.fontSize = '1.5rem';
      quote.style.position = 'relative';
      quote.appendChild(crown);
      
      setTimeout(() => crown.remove(), 2000);
    }
    
    // Auto-reset after 2 seconds
    setTimeout(() => {
      quote.style.boxShadow = 'none';
      quote.style.transform = 'scale(1)';
    }, 2000);
  });
  
  // Bonus: Mouse enter/leave effects
  quote.addEventListener('mouseenter', () => {
    quote.style.borderLeft = '4px solid #9c72e6';
  });
  
  quote.addEventListener('mouseleave', () => {
    quote.style.borderLeft = '4px solid #B38AFF';
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'f') {
    const hoveredQuote = document.querySelector('blockquote:hover');
    if (hoveredQuote) {
      hoveredQuote.classList.toggle('favorited');
    }
  }
});