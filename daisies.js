const emojis = ['🌼', '🌼', '🌼','☘️', '🌼','🌼', '🌼','☘️', '🌼', '🐤', '🌼','🌼', '🌼', '🌼', '🌼','🌼', '🌼', '🌼', '🌼', '☘️','🐝'];
const sizes = [8, 10, 12, 16]; // Different sizes for emojis
const numDaisies = 2; // Number of daisies to launch when cursor stops (you can adjust this value)
const spawnInterval = 1000; // Time interval in milliseconds between spawning daisies

let mouseX = -1;
let mouseY = -1;
let mouseStopped = false;
let lastMouseX = -1;
let lastMouseY = -1;

// Function to create a falling daisy emoji with random size and direction
function createFallingDaisy(x, y) {
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    emoji.style.fontSize = `${randomSize}px`; // Set random font size
    emoji.style.left = x + 'px';
    emoji.style.top = y + 'px';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(emoji);

    // Generate a random direction for the daisy
    const angle = Math.random() * 2 * Math.PI;
    const speed = 1 + Math.random() * 2; // Random speed
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    // Animate the falling daisy in the random direction
    const animation = emoji.animate(
        [
            { transform: 'translate(0, 0)' },
            { transform: `translate(${vx * 100}px, ${vy * 100}px)` } // Adjust the distance
        ],
        {
            duration: 2000 + Math.random() * 2000,
            iterations: 1,
            fill: 'forwards'
        }
    );

    animation.onfinish = () => {
        // Remove the daisy after it reaches the cursor position
        document.body.removeChild(emoji);
    };
}

// Function to track mouse movement
function trackMouse(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

// Function to check if the mouse cursor has stopped
function checkMouseStopped() {
    if (mouseX === lastMouseX && mouseY === lastMouseY) {
        mouseStopped = true;
    } else {
        mouseStopped = false;
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    // Launch daisies when the cursor stops
    if (mouseStopped) {
        for (let i = 0; i < numDaisies; i++) {
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            createFallingDaisy(randomX, randomY);
        }
    }

    // Continue checking for mouse stopping
    setTimeout(checkMouseStopped, spawnInterval);
}

// Initialize mouse tracking
document.addEventListener('mousemove', trackMouse);

// Start checking for mouse stopping
checkMouseStopped();

const cursor = document.getElementById('cursor');

// Function to update the cursor position
function updateCursor(event) {
    const { clientX, clientY } = event;
    cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;

    // Create multiple falling emojis from the cursor position
    for (let i = 0; i < 0.5; i++) {
        createFallingDaisy(clientX, clientY);
    }
}

// Function to handle touch events
function handleTouch(event) {
    const { clientX, clientY } = event.touches[0];
    cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;

    // Create multiple falling emojis from the touch position
    for (let i = 0; i < 1; i++) {
        createFallingDaisy(clientX, clientY);
    }
}

// Hide the actual mouse pointer
document.body.style.cursor = 'none';

// Listen for mousemove events
document.addEventListener('mousemove', updateCursor);
document.addEventListener('touchmove', handleTouch);
