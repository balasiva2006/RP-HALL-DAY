// ========== PARTICLE BACKGROUND ==========
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 40;
    const colors = ['#f0c040', '#ff6b9d', '#8b5cf6', '#4ade80', '#60a5fa', '#fde68a'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 15;
        const opacity = Math.random() * 0.4 + 0.1;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = opacity;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

        container.appendChild(particle);
    }
}

// ========== SCROLL REVEAL ANIMATIONS ==========
function initScrollReveal() {
    // Add reveal class to elements
    const revealElements = [
        ...document.querySelectorAll('.host-card'),
        ...document.querySelectorAll('.highlight-item'),
        ...document.querySelectorAll('.step-card'),
        document.querySelector('.invitation-card'),
        document.querySelector('.map-container'),
    ].filter(Boolean);

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.08}s`;
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach((el) => observer.observe(el));
}

// ========== HOST CARD TILT EFFECT ==========
function initTiltEffect() {
    const cards = document.querySelectorAll('.host-card');

    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// ========== MAP ANIMATION ==========
function initMapAnimation() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateMapPath();
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(mapContainer);
}

function animateMapPath() {
    const dots = document.querySelectorAll('.corridor-dot');
    const rows = document.querySelectorAll('.map-row');
    const mainGate = document.querySelector('.main-gate');

    // Animate main gate first
    if (mainGate) {
        mainGate.style.opacity = '0';
        mainGate.style.transform = 'translateX(-50%) scale(0.8)';
        setTimeout(() => {
            mainGate.style.transition = 'all 0.5s ease';
            mainGate.style.opacity = '1';
            mainGate.style.transform = 'translateX(-50%) scale(1)';
        }, 200);
    }

    // Animate dots sequentially from bottom to top
    dots.forEach((dot, index) => {
        const reverseIndex = dots.length - 1 - index;
        dot.style.opacity = '0';
        dot.style.transform = 'translateX(-50%) scale(0)';
        setTimeout(() => {
            dot.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            dot.style.opacity = '1';
            dot.style.transform = 'translateX(-50%) scale(1)';
        }, 500 + reverseIndex * 300);
    });

    // Animate map rows from bottom to top
    const rowOrder = [...rows].reverse();
    rowOrder.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        setTimeout(() => {
            row.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, 600 + index * 350);
    });
}

// ========== SMOOTH PARALLAX ON HERO ==========
function initParallax() {
    const hero = document.querySelector('.hero-content');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrolled < heroHeight) {
            const opacity = 1 - scrolled / heroHeight;
            const translateY = scrolled * 0.3;
            hero.style.opacity = opacity;
            hero.style.transform = `translateY(${translateY}px)`;
        }
    });
}

// ========== CONFETTI BURST ON CTA ==========
function createConfettiBurst(x, y) {
    const colors = ['#f0c040', '#ff6b9d', '#8b5cf6', '#4ade80', '#60a5fa'];
    const confettiCount = 30;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = `${Math.random() * 8 + 4}px`;
        confetti.style.height = `${Math.random() * 8 + 4}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 200;

        let posX = x;
        let posY = y;
        let velX = vx;
        let velY = vy;
        let opacity = 1;
        let rotation = 0;
        const rotationSpeed = Math.random() * 10 - 5;

        function animateConfetti() {
            velY += 8; // gravity
            posX += velX * 0.016;
            posY += velY * 0.016;
            opacity -= 0.015;
            rotation += rotationSpeed;

            confetti.style.left = `${posX}px`;
            confetti.style.top = `${posY}px`;
            confetti.style.opacity = opacity;
            confetti.style.transform = `rotate(${rotation}deg)`;

            if (opacity > 0) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        }

        requestAnimationFrame(animateConfetti);
    }
}

function initConfetti() {
    const cta = document.querySelector('.invitation-cta');
    if (!cta) return;

    cta.addEventListener('click', (e) => {
        createConfettiBurst(e.clientX, e.clientY);
    });

    // Also trigger on invitation card hover
    const card = document.querySelector('.invitation-card');
    let confettiTriggered = false;

    if (card) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !confettiTriggered) {
                        confettiTriggered = true;
                        const rect = card.getBoundingClientRect();
                        setTimeout(() => {
                            createConfettiBurst(rect.left + rect.width / 2, rect.top + 100);
                        }, 800);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(card);
    }
}

// ========== TYPEWRITER EFFECT FOR GREETING ==========
function initTypewriter() {
    const badge = document.querySelector('.greeting-badge span:last-child');
    if (!badge) return;

    const text = badge.textContent;
    badge.textContent = '';
    badge.style.borderRight = '2px solid var(--gold)';

    let i = 0;
    function type() {
        if (i < text.length) {
            badge.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                badge.style.borderRight = 'none';
            }, 1000);
        }
    }

    setTimeout(type, 500);
}

// ========== SMOOTH SECTION HEADERS ==========
function initSectionHeaders() {
    const headers = document.querySelectorAll('.section-header');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.3 }
    );

    headers.forEach((header) => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'all 0.8s ease';
        observer.observe(header);
    });
}

// ========== DESTINATION BLOCK PULSE ==========
function initDestinationPulse() {
    const destBlock = document.querySelector('.destination-block');
    if (!destBlock) return;

    setInterval(() => {
        destBlock.style.boxShadow = '0 0 30px rgba(240, 192, 64, 0.3), inset 0 0 15px rgba(240, 192, 64, 0.05)';
        setTimeout(() => {
            destBlock.style.boxShadow = '0 0 10px rgba(240, 192, 64, 0.1)';
        }, 1000);
    }, 2000);
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initTypewriter();
    initScrollReveal();
    initTiltEffect();
    initMapAnimation();
    initParallax();
    initConfetti();
    initSectionHeaders();
    initDestinationPulse();
});

// ========== LOADING ANIMATION ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});