document.addEventListener("DOMContentLoaded", () => {
    // No need to manage the cart open/close manually if Snipcart handles it
    const cartButton = document.getElementById("cart-button");

    // Snipcart will handle cart opening automatically when the button is clicked
    // Ensure your Snipcart script is loaded and working
    if (window.Snipcart) {
        console.log("Snipcart is loaded and working.");
    } else {
        console.error("Snipcart is not loaded correctly.");
    }

    // Get the hamburger icon and nav links for responsive menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Toggle the 'active' class on the nav-links when the hamburger is clicked
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

