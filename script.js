// --- SISTEMA DO RELÓGIO ---
function updateClock() {
    const now = new Date();
    const options = { timeZone: 'America/Sao_Paulo', hour12: false };
    const timeString = now.toLocaleTimeString('pt-BR', options);
    const clockElement = document.getElementById('clock');
    if (clockElement) clockElement.textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// --- ESTADOS DO CURSOR ---
const follower = document.getElementById('cursor-follower');
const dot = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0, followX = 0, followY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0 });

    // Efeito de iluminação nos cards (Bento Grid)
    const target = e.target.closest('.bento-node');
    if (target) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        target.style.setProperty('--y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    }
});

function animateFollower() {
    followX += (mouseX - followX) * 0.08;
    followY += (mouseY - followY) * 0.08;
    follower.style.transform = `translate(calc(${followX}px - 50%), calc(${followY}px - 50%))`;
    requestAnimationFrame(animateFollower);
}
animateFollower();

// --- EFEITO MAGNÉTICO ---
const magneticEls = document.querySelectorAll('.magnetic');
magneticEls.forEach(el => {
    el.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(this, { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: "power2.out" });
    });
    el.addEventListener('mouseleave', function() {
        gsap.to(this, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    });
});

// --- ANIMAÇÕES DE ENTRADA ---
window.addEventListener('load', () => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }});
    tl.from(".reveal", { y: 40, opacity: 0, duration: 1.5, stagger: 0.1 })
      .from("#main-title", { y: 100, skewY: 7, duration: 2, opacity: 0 }, "-=1.2");
});

// --- CLIQUE DO MOUSE ---
document.addEventListener('mousedown', () => {
    gsap.to(dot, { scale: 3, duration: 0.2 });
    gsap.to(follower, { scale: 0.8, opacity: 0.2, duration: 0.2 });
});
document.addEventListener('mouseup', () => {
    gsap.to(dot, { scale: 1, duration: 0.2 });
    gsap.to(follower, { scale: 1, opacity: 1, duration: 0.2 });
});