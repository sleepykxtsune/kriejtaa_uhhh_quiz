document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (!loginForm) {
    console.error('Formulář s ID "loginForm" nebyl nalezen.');
    return;
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');

    if (!emailInput || !passwordInput) {
      console.error('Nebyly nalezeny inputy s ID "loginEmail" nebo "loginPassword".');
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
