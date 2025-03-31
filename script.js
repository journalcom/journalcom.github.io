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