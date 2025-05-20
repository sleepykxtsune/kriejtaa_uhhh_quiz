document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  if (!form) {
    console.error('Formulář s ID "loginForm" nebyl nalezen.');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');

    if (!emailInput || !passwordInput) {
      console.error('Chybí email nebo heslo input.');
      return;
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    const storedEmail = localStorage.getItem('registeredEmail');
    const storedPassword = localStorage.getItem('registeredPassword');

    if (email === storedEmail && password === storedPassword) {
      alert('Successfully logged in');
      window.location.href = 'web.html';
    } else {
      alert('Incorrect email or password');
    }
  });
});
