document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (email && password) {
      localStorage.setItem('registeredEmail', email);
      localStorage.setItem('registeredPassword', password);
      alert('Successfully registered');
      window.location.href = 'login.html';
    } else {
      alert('Vyplňte všechny údaje.');
    }
  });
});
