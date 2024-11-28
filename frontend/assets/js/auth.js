// Handle Sign-Up Form Submission
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('newUsername').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('newPassword').value;

  // Validate that all fields are filled out
  if (!username || !email || !phone || !password) {
      alert('Please fill in all fields.');
      return;
  }

  // Send sign-up data to the backend
  fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, phone, password }),
  })
  .then(response => response.json())
  .then(data => {
      alert(data.message);
      if (data.message === 'Customer registered successfully!') {
          // Clear the form and switch to login tab after successful signup
          document.getElementById('signupForm').reset();
          document.getElementById('login-tab').click();
      }
  })
  .catch(error => console.error('Error:', error));
});

// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Validate that both fields are filled out
  if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
  }

  // Send login data to the backend
  fetch('/api/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
      alert(data.message);
      if (data.token) {
          // Store the token in localStorage
          localStorage.setItem('token', data.token);

          // Redirect to the appropriate dashboard based on the role
          if (data.role === 'admin') {
              window.location.href = '/admin-dashboard'; // Admin Dashboard
          } else if (data.role === 'staff') {
              window.location.href = '/staff-dashboard'; // Staff Dashboard
          } else {
              window.location.href = '/customer-dashboard'; // Customer Dashboard
          }
      }
  })
  .catch(error => console.error('Error:', error));
});
