// ===== TYPEWRITER EFFECT =====
function typeWriter(text, element, speed = 30) {
    let i = 0;
    element.innerHTML = ""; // Clear existing content
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// ===== PAGE TRANSITIONS =====
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    
    // Apply typewriter to elements with class "auto-type"
    document.querySelectorAll(".auto-type").forEach(el => {
        const text = el.textContent;
        el.textContent = ""; // Clear original text
        typeWriter(text, el);
    });
});

// Smooth link transitions
document.querySelectorAll('a[href^="/"], a[href^="http"]').forEach(link => {
    if (link.target === "_blank" || link.href.includes("#")) return;
    link.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.remove("loaded");
        setTimeout(() => window.location.href = link.href, 400);
    });
});

// ===== TERMINAL CONSOLE =====
const commands = {
    help: "Available commands: about, resume, secret, clear",
    about: "I'm a high school student from Dubai who loves tech and chess.",
    resume: "Redirecting to resume...",
    secret: "Nice try! 😉 Email me for the password.",
    clear: () => {
        document.getElementById("terminal-output").innerHTML = "";
        return "";
    }
};

document.getElementById("command-input")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const cmd = e.target.value.trim().toLowerCase();
        const outputEl = document.getElementById("terminal-output");
        
        outputEl.innerHTML += `<span style="color:#B38AFF">$</span> ${cmd}<br>`;
        
        if (cmd === "resume") {
            setTimeout(() => window.location.href = "resume.html", 1000);
            outputEl.innerHTML += "Redirecting...<br>";
        } else if (commands[cmd]) {
            const response = typeof commands[cmd] === "function" ? commands[cmd]() : commands[cmd];
            outputEl.innerHTML += `${response}<br>`;
        } else {
            outputEl.innerHTML += `Command not found. Type 'help'.<br>`;
        }
        
        e.target.value = "";
        outputEl.scrollTop = outputEl.scrollHeight;
    }
});