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
});

