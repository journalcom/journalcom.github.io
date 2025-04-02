// ===== PAGE TRANSITIONS =====
document.addEventListener("DOMContentLoaded", () => {
  // Always show content immediately
  document.body.classList.add("loaded");
  
  // Clear transition state when returning to homepage
  if (window.performance && performance.navigation.type === 2) {
    localStorage.removeItem('transitioning');
  }

  // ===== KONAMI CODE (↑↑↓↓) =====
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        // Play audio
        new Audio('audio/stardewvalley.mp3').play().catch(console.error);
        
        // Visual feedback
        document.body.classList.add('konami-activated');
        setTimeout(() => {
          document.body.classList.remove('konami-activated');
        }, 1000);
        
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ===== TAB VISIBILITY =====
  const originalTitle = document.title;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = '👀 where did you go';
      setTimeout(() => document.title = originalTitle, 1500);
    }
  });

  // ===== BLOCKQUOTE EFFECTS =====
  document.querySelectorAll('blockquote').forEach(quote => {
    // Double-click to highlight
    quote.addEventListener('dblclick', () => {
      quote.style.transition = 'all 0.5s ease';
      quote.style.boxShadow = '0 0 25px #B38AFF';
      quote.style.transform = 'scale(1.02)';
      
      // Add crown to personal quotes
      if (quote.querySelector('footer').textContent.includes('utkarsh')) {
        const crown = document.createElement('span');
        crown.innerHTML = '👑';
        crown.className = 'quote-crown';
        quote.appendChild(crown);
        setTimeout(() => crown.remove(), 2000);
      }
      
      setTimeout(() => {
        quote.style.boxShadow = 'none';
        quote.style.transform = 'scale(1)';
      }, 2000);
    });
    
    // Hover effects
    quote.addEventListener('mouseenter', () => {
      quote.style.borderLeft = '4px solid #9c72e6';
    });
    quote.addEventListener('mouseleave', () => {
      quote.style.borderLeft = '4px solid #B38AFF';
    });
  });

  // ===== FAVORITE QUOTES =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'f' && document.querySelector('blockquote:hover')) {
      document.querySelector('blockquote:hover').classList.toggle('favorited');
    }
  });

  // ===== COOKIE RAIN =====
  const cookieTypes = ['🍪', '🍩', '🧁', '🎂', '🥠', '🍬', '🍫'];
  const cookies = [];
  let isRainingCookies = false;

  function toggleCookieRain() {
    isRainingCookies = !isRainingCookies;
    
    if (isRainingCookies) {
      startCookieRain();
      console.log('%c🍪 COOKIE RAIN ACTIVATED! 🍪', 'color: #F4A460; font-size: 16px; font-weight: bold;');
    } else {
      stopCookieRain();
    }
  }

  function createCookie() {
    const cookie = document.createElement('div');
    cookie.className = 'falling-cookie';
    cookie.textContent = cookieTypes[Math.random() * cookieTypes.length | 0];
    cookie.style.left = `${Math.random() * 100}vw`;
    cookie.style.setProperty('--duration', `${3 + Math.random() * 4}s`);
    document.body.appendChild(cookie);
    cookies.push(cookie);
    setTimeout(() => cookie.remove(), 7000);
  }

  function startCookieRain() {
    for (let i = 0; i < 20; i++) {
      setTimeout(createCookie, i * 300);
    }
    const rainInterval = setInterval(createCookie, 500);
    if (!isRainingCookies) clearInterval(rainInterval);
    new Audio('audio/cookie-munch.mp3').play().catch(console.error);
  }

  function stopCookieRain() {
    cookies.forEach(cookie => {
      cookie.style.animation = 'cookieFadeOut 0.5s forwards';
      setTimeout(() => cookie.remove(), 500);
    });
    cookies.length = 0;
  }

  // Cookie activation
  let keySequence = [];
  document.addEventListener('keydown', (e) => {
    keySequence.push(e.key.toLowerCase());
    if (keySequence.slice(-6).join('') === 'cookie') {
      toggleCookieRain();
      keySequence = [];
    }
    if (keySequence.length > 20) keySequence = [];
  });
});