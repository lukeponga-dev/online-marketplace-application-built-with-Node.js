document.addEventListener('DOMContentLoaded', () => {
    // Registration form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        try {
          const response = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role }),
          });
  
          const data = await response.json();
          if (response.ok) {
            alert(data.message);
            window.location.href = '/login.html';
          } else {
            alert(`Error: ${data.message}`);
          }
        } catch (err) {
          console.error('Registration error:', err);
        }
      });
    }
  
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
  
        try {
          const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Include cookies
            body: JSON.stringify({ username, password }),
          });
  
          const data = await response.json();
          if (response.ok) {
            alert(data.message);
            window.location.href = '/';
          } else {
            alert(`Error: ${data.message}`);
          }
        } catch (err) {
          console.error('Login error:', err);
        }
      });
    }
  // After successful login
if (response.ok) {
  alert(data.message);
  if (data.role === 'vendor') {
    window.location.href = '/vendor_dashboard.html';
  } else {
    window.location.href = '/';
  }
}
});
