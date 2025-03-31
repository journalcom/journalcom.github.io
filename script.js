// ===== TYPEWRITER EFFECT =====
document.addEventListener("DOMContentLoaded", function() {
    // Fade-in for all pages
    const main = document.querySelector("main");
    if (main) {
        main.style.opacity = "0";
        setTimeout(() => {
            main.style.transition = "opacity 1s ease";
            main.style.opacity = "1";
        }, 300);
    }

    // Active page highlight
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

console.log("website loaded.");