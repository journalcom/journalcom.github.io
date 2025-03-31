// ===== PAGE TRANSITIONS =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  localStorage.setItem('loaded', 'true'); // Add this line
});

// Update link transition code:
document.querySelectorAll('a').forEach(link => {
  if (link.target === "_blank" || link.hash) return;
  link.addEventListener("click", (e) => {
      // Only animate if coming from same origin
      if (link.origin === window.location.origin) {
          e.preventDefault();
          document.body.classList.remove("loaded");
          setTimeout(() => {
              window.location.href = link.href;
          }, 400);
      }
  });
});

// Add this new code:
if (localStorage.getItem('loaded') === 'true') {
  document.body.classList.add("loaded");
  localStorage.removeItem('loaded');
}