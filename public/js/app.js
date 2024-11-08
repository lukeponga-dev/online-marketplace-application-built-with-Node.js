function updateAuthLinks() {
    fetch('/auth/isAuthenticated', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        const authLinks = document.getElementById('authLinks');
        if (data.isAuthenticated) {
          authLinks.innerHTML = `
            <span>Welcome, ${data.username} </span>
            <a href="#" onclick="logoutUser()">Logout</a>
          `;
        } else {
          authLinks.innerHTML = `
            <a href="/login.html">Login</a>
            <a href="/register.html">Register</a>
          `;
        }
      })
      .catch((err) => console.error('Authentication check error:', err));
  }
  
  function logoutUser() {
    fetch('/auth/logout', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        updateAuthLinks();
      })
      .catch((err) => console.error('Logout error:', err));
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    updateAuthLinks();
    // Other initialization code
  });
  