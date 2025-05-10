/**
 * Confirmation Page JavaScript
 * Handles animations and UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create confetti effect
    createConfetti();
    
    // Countdown timer for redirection (optional)
    startCountdown();
    
    // Add pulse animation to success icon
    const successIcon = document.querySelector('.bi-check-circle-fill');
    if (successIcon) {
        successIcon.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
    }
});

/**
 * Creates a confetti effect on the page
 */
function createConfetti() {
    // Create confetti container if it doesn't exist
    let confettiContainer = document.querySelector('.confetti-container');
    if (!confettiContainer) {
        confettiContainer = document.createElement('div');
        confettiContainer.classList.add('confetti-container');
        document.body.appendChild(confettiContainer);
    }
    
    // Confetti colors
    const colors = [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
        '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', 
        '#009688', '#4caf50', '#8bc34a', '#cddc39', 
        '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
    ];
    
    // Create confetti pieces
    const confettiCount = 100;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    
    // Clear any existing confetti
    confettiContainer.innerHTML = '';
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const shape = Math.random() > 0.5 ? 'circle' : 'square';
        const initialX = Math.random() * window.innerWidth;
        const initialY = -20;
        const duration = Math.random() * 3 + 2;
        
        // Set styles
        confetti.style.backgroundColor = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.borderRadius = shape === 'circle' ? '50%' : '0';
        confetti.style.left = `${initialX}px`;
        confetti.style.top = `${initialY}px`;
        confetti.style.animationDuration = `${duration}s`;
        
        // Add to container
        confettiContainer.appendChild(confetti);
        
        // Remove after animation completes
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

/**
 * Starts a countdown timer for redirection (optional)
 */
function startCountdown() {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;
    
    let seconds = 10; // 10 seconds countdown
    
    const interval = setInterval(() => {
        seconds--;
        countdownElement.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(interval);
            window.location.href = '/'; // Redirect to homepage
        }
    }, 1000);
}