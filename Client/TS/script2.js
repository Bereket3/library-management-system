const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav'); 

menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('active'); 
});

// Modal logic
const home = document.getElementById('home');
const registerModal = document.getElementById('register-section');
const loginModal = document.getElementById('login-section');

function showModal(modal) {
  modal.style.display = 'flex';
  home.classList.add('blurred');
}

function hideModal(modal) {
  modal.style.display = 'none';
  home.classList.remove('blurred');
}

document.getElementById('StartedBtn').addEventListener('click', () => {
  showModal(registerModal);
});

document.getElementById('toLogin').addEventListener('click', () => {
  hideModal(registerModal);
  showModal(loginModal);
});

document.getElementById('toRegistration').addEventListener('click', () => {
  hideModal(loginModal);
  showModal(registerModal);
});

document.getElementById('registerSubmit').addEventListener('click', () => {
  alert('Signed up successfully!');
  hideModal(registerModal);
});

document.getElementById('loginSubmit').addEventListener('click', () => {
  alert('Logged in successfully!');
  hideModal(loginModal);
});

// Close modals on outside click
window.addEventListener('click', (e) => {
  if (e.target === registerModal) hideModal(registerModal);
  if (e.target === loginModal) hideModal(loginModal);
});
