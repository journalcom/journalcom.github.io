// ===== PAGE TRANSITIONS =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Smooth link transitions
document.querySelectorAll('a[href^="."]').forEach(link => {
  if (link.target === "_blank" || link.href.includes("#")) return;
  link.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.remove("loaded");
      setTimeout(() => window.location.href = link.href, 400);
  });
});