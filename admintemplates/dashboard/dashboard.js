const navLinks = document.querySelectorAll('.sidebar nav a');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});
