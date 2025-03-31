// ===== PAGE TRANSITIONS =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Smooth link transitions (updated for subfolder support)
document.querySelectorAll('a').forEach(link => {
  // Skip external links and anchor links
  if (link.hostname !== window.location.hostname || link.hash) return;
  
  link.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.remove("loaded");
      setTimeout(() => {
          window.location.href = link.href;
      }, 400);
  });
});