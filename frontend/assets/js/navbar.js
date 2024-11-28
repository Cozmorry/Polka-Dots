// Get the burger menu and navbar links
const burger = document.getElementById('navbar-burger');
const navbarLinks = document.querySelector('.navbar-links');

// Toggle the active class when the burger icon is clicked
burger.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
  burger.classList.toggle('active');
});
