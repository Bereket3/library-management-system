"use strict";
// TypeScript function to toggle the menu
function initializeMenuToggle() {
    // Get the menu toggle button and the navigation links container
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        // Add click event listener to the toggle button
        menuToggle.addEventListener('click', () => {
            // Toggle the 'active' class to show or hide the menu
            navLinks.classList.toggle('active');
        });
    }
    else {
        console.error('Menu toggle or nav links element not found');
    }
}
// Initialize the menu toggle functionality
initializeMenuToggle();
