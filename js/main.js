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
