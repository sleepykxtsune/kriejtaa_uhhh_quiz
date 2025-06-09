document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      const storedEmail = localStorage.getItem('registeredEmail');
      const storedPassword = localStorage.getItem('registeredPassword');
    

      if (!email || !password) {
        alert('Vyplňte přihlašovací údaje.');
        return;
      }

      if (email === storedEmail && password === storedPassword) {
        alert('Successfully logged in');
        window.location.href = "web.html";
      } else {
        alert('Incorrect email or password');
      }
    });
  }
});
