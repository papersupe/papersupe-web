// Global interactions & future hooks


document.addEventListener('DOMContentLoaded', () => {
// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
document.querySelector(this.getAttribute('href'))?.scrollIntoView({
behavior: 'smooth'
});
});
});


// Navbar shadow on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
if (window.scrollY > 20) {
nav.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)';
} else {
nav.style.boxShadow = 'none';
}
});


// Agent circle future hook
const agentBtn = document.querySelector('.agent-btn');
if (agentBtn) {
agentBtn.title = 'Agentic systems are cooking here';
}
});


// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}


// Enable swipe hint (mobile)
document.querySelectorAll('.research-grid').forEach(grid => {
  let startX = 0;

  grid.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  grid.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (Math.abs(startX - endX) > 50) {
      grid.style.cursor = 'grabbing';
      setTimeout(() => grid.style.cursor = 'default', 300);
    }
  });
});

