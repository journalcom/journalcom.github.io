// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector("main");
    const themeToggleButton = document.getElementById("theme-toggle");
    const body = document.body;

    // Initial fade-in effect for the main content
    main.style.opacity = "0";
    main.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
        main.style.opacity = "1";
    }, 300);

    // Theme toggle functionality
    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", () => {
            body.classList.toggle("light-theme");
            if (body.classList.contains("light-theme")) {
                console.log("Switched to Light Mode");
            } else {
                console.log("Wakanda Forever! Switched to Dark Mode");
            }
        });
    }

    // Smooth scroll effect for navigation links
    const navLinks = document.querySelectorAll("a[href^='#']");
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Loading animation (could be like a Wakanda symbol or similar animation)
    const loader = document.createElement("div");
    loader.classList.add("loader");
    loader.textContent = "Loading...";
    document.body.appendChild(loader);

    setTimeout(() => {
        loader.style.display = "none";
    }, 1500);  // Loader disappears after 1.5 seconds

    console.log("Wakanda Forever! JavaScript is alive!");
});
