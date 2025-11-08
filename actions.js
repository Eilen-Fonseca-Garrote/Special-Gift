

// DOM Elements
let elements = {};

// Music state
let musicPlaying = false;
const COUNTDOWN_DURATION = 18;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    createParticles();
    setupEventListeners();
});

function initializeElements() {
    console.log("Initializing elements...");
    
    // Cache DOM elements
    elements = {
        introScene: document.getElementById('introScene'),
        celebrationScene: document.getElementById('celebrationScene'),
        transitionScene: document.getElementById('transitionScene'),
        startPartyBtn: document.getElementById('startParty'),
        openReflectionBtn: document.getElementById('openReflection'),
        closeFrameBtn: document.getElementById('closeFrame'),
        countdownElement: document.getElementById('countdown'),
        progressBar: document.getElementById('progress'),
        projectFrame: document.getElementById('projectFrame'),
        musicControl: document.getElementById('musicControl'),
        musicIcon: document.getElementById('musicIcon'),
        bgMusic: document.getElementById('bgMusic'),
        particlesContainer: document.getElementById('particles'),
        balloons: document.querySelectorAll('.balloon'),
        birthdayDancers: document.getElementById('birthdayDancers'),
        dancerImage: document.getElementById('dancerImage'),
        iframeContainer: document.getElementById('iframeContainer')
    };
}

function setupEventListeners() {
    console.log("Setting up event listeners...");
    
    // Start party button
    if (elements.startPartyBtn) {
        elements.startPartyBtn.addEventListener('click', startParty);
    }
    
    // Open reflection button
    if (elements.openReflectionBtn) {
        elements.openReflectionBtn.addEventListener('click', openReflection);
    }
    
    // Close frame button
    if (elements.closeFrameBtn) {
        elements.closeFrameBtn.addEventListener('click', closeReflection);
    }
    
    // Music control
    if (elements.musicControl) {
        elements.musicControl.addEventListener('click', toggleMusic);
    }
}

// Create particles (reduced for increased performance from last version)
function createParticles() {
    if (!elements.particlesContainer) return;
    
    // Reduced particle count for better performance
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        const colors = ['#4FC3F7', '#E91E63', '#FFD54F'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const duration = Math.random() * 15 + 15;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        elements.particlesContainer.appendChild(particle);
    }
}

// Start the party
function startParty() {
    console.log("Starting Fatima's birthday celebration!");
    
    if (!elements.introScene || !elements.celebrationScene) return;
    
    // Hide intro scene
    elements.introScene.style.display = 'none';
    
    // Show celebration scene
    elements.celebrationScene.style.display = 'flex';
    
    // Start animations
    startBirthdayDancers();
    
    // Show balloons
    setTimeout(() => {
        elements.balloons.forEach(balloon => {
            balloon.style.opacity = '0.8';
        });
    }, 300);
    
    // Start music
    if (elements.bgMusic && !musicPlaying) {
        elements.bgMusic.volume = 0.6;
        elements.bgMusic.play().catch(e => {
            console.log("Audio play failed:", e);
        });
        musicPlaying = true;
        if (elements.musicIcon) elements.musicIcon.textContent = '🔊';
    }
    
    // Trigger confetti
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#4FC3F7', '#E91E63', '#FFD54F']
        });
    }
    
    // Start countdown
    startCountdown();
}

// Start birthday dancers animation 
function startBirthdayDancers() {
    if (!elements.birthdayDancers || !elements.dancerImage) return;
    
    setTimeout(() => {
        elements.birthdayDancers.classList.add('active');
    }, 500);
}

// Start countdown
function startCountdown() {
    let count = COUNTDOWN_DURATION;
    
    const countdownInterval = setInterval(() => {
        if (count > 0 && elements.countdownElement) {
            elements.countdownElement.textContent = count;
        }
        
        // Update progress bar
        if (elements.progressBar) {
            elements.progressBar.style.width = `${((COUNTDOWN_DURATION - count) / COUNTDOWN_DURATION) * 100}%`;
        }
        
        // Occasional confetti
        if (count === 12 || count === 6 || count === 3) {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 60,
                    spread: 80,
                    origin: { y: 0.6 }
                });
            }
        }
        
        if (count === 0) {
            clearInterval(countdownInterval);
            if (elements.countdownElement) {
                elements.countdownElement.textContent = "Ready for You! 🎁";
            }
            
            // Final confetti
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 }
                });
            }
            
            // Show transition scene
            setTimeout(() => {
                if (elements.celebrationScene && elements.transitionScene) {
                    elements.celebrationScene.style.display = 'none';
                    elements.transitionScene.style.display = 'flex';
                }
            }, 1200);
        }
        
        count--;
    }, 1000);
}

// Open reflection project in fullscreen
function openReflection() {
    if (!elements.iframeContainer) return;
    
    elements.iframeContainer.classList.add('active');
    
    // Additional celebration
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 }
        });
    }
}

// Close reflection and return to celebration
function closeReflection() {
    if (!elements.iframeContainer) return;
    
    elements.iframeContainer.classList.remove('active');
}

// Toggle music
function toggleMusic() {
    if (!elements.bgMusic) return;
    
    if (musicPlaying) {
        elements.bgMusic.pause();
        if (elements.musicIcon) elements.musicIcon.textContent = '🔇';
    } else {
        elements.bgMusic.play().catch(e => {
            console.log("Audio play failed:", e);
        });
        if (elements.musicIcon) elements.musicIcon.textContent = '🔊';
    }
    musicPlaying = !musicPlaying;
  }
