document.querySelectorAll('[data-reset-form]').forEach((button) => {
  button.addEventListener('click', () => {
    const form = document.getElementById('addBookForm');
    if (form) {
      form.reset();
    }
  });
});
