document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector("main");
    main.style.opacity = "0";
    main.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
        main.style.opacity = "1";
    }, 300);
});

console.log("JavaScript is working!");
