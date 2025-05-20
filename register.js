document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value.trim();

      if (email && password) {
        localStorage.setItem('registeredEmail', email);
        localStorage.setItem('registeredPassword', password);
        alert('Úspěšně zaregistrováno!');
        window.location.href = 'login.html';
      } else {
        alert('Vyplňte všechny údaje.');
      }
    });
  }
});
