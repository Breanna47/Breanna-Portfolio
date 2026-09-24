
let isModalOpen = false;
let contrastToggle = false;
let isMenuOpen = false;

const scaleFactor = 1 / 20;

function moveBackground(event) {
    if (window.innerWidth <= 768) {
        return;
    }

    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;

    for (let i = 0; i < shapes.length; i++) {
        const direction = i % 2 !== 0 ? -1 : 1;

        shapes[i].style.transform =
            `translate(${x * direction}px, ${y * direction}px)`;
    }
}

function toggleContrast() {
    contrastToggle = !contrastToggle;

    document.body.classList.toggle(
        "dark-theme",
        contrastToggle
    );
}

function toggleModal() {
    isModalOpen = !isModalOpen;

    document.body.classList.toggle(
        "modal__open",
        isModalOpen
    );

    if (isModalOpen) {
        closeMenu();
    }
}

function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    document.body.classList.toggle(
        "nav__open",
        isMenuOpen
    );

    const menuButton = document.querySelector(".nav__menu-btn");

    menuButton.setAttribute(
        "aria-expanded",
        String(isMenuOpen)
    );
}

function closeMenu() {
    isMenuOpen = false;

    document.body.classList.remove("nav__open");

    const menuButton = document.querySelector(".nav__menu-btn");

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
    }
}

function contact(event) {
    event.preventDefault();

    const form = event.target;

    const name = form.elements.user_name.value.trim();
    const email = form.elements.user_email.value.trim();
    const message = form.elements.message.value.trim();

    if (!name || !email || !message) {
        return;
    }

    const subject = encodeURIComponent(
        `Portfolio inquiry from ${name}`
    );

    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href =
        `mailto:breanna.watson@yahoo.com?subject=${subject}&body=${body}`;
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        if (isModalOpen) {
            toggleModal();
        }

        if (isMenuOpen) {
            closeMenu();
        }
    }
});

document.addEventListener("click", function(event) {
    if (!isMenuOpen) {
        return;
    }

    const navigation = document.querySelector("nav");

    if (!navigation.contains(event.target)) {
        closeMenu();
    }
});