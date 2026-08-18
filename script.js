const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwFt677pNJyCvJTWsGI9-H5wyUwj_FtKQoReKkq7Y5oi6yOFDLVkEUGk5hYytAwlbNV/exec";

const weddingDate = new Date("October 1, 2026 12:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = weddingDate - now;

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }

    });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {

    const rsvpButton = document.getElementById("rsvpButton");
    const rsvpMessage = document.getElementById("rsvpMessage");

    rsvpForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        rsvpButton.disabled = true;
        rsvpButton.textContent = "Sending...";

        const formData = new FormData(rsvpForm);

        try {

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: formData,
                mode: "no-cors"
            });

            rsvpMessage.textContent =
                "Thank you! Your RSVP has been received. ❤️";

            rsvpMessage.style.display = "block";

            rsvpForm.reset();

            rsvpButton.textContent = "RSVP Submitted";

        } catch (error) {

            console.error("RSVP Error:", error);

            rsvpMessage.textContent =
                "Something went wrong. Please try again.";

            rsvpMessage.style.display = "block";

            rsvpButton.disabled = false;
            rsvpButton.textContent = "Send RSVP";
        }

    });

}