import { storeUser, redirectBasedOnRole } from './authUtils.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('sigInForm');
  const loginButton = document.getElementById('login-btn');
  const loginError = document.createElement('div');
  loginError.className = 'error-message';
  loginError.style.color = 'red';
  loginError.style.marginTop = '10px';
  loginError.style.display = 'none';
  
  if (loginForm && !loginForm.querySelector('.error-message')) {
    loginForm.insertBefore(loginError, loginForm.firstChild);
  }

  // Check if user is already logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (currentUser && currentUser.role) {
    redirectBasedOnRole(currentUser.role);
    return;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('login-password').value;
      
      if (!email || !password) {
        showError('Please enter both email and password');
        return;
      }
      
      // Simulate API call with localStorage
      setTimeout(() => {
        try {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const user = users.find(u => u.email === email && u.password === password);
          
          if (user) {
            // Store user data in localStorage
            storeUser({
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role || 'user',
              token: 'dummy-token-' + Math.random().toString(36).substr(2, 9)
            });
            
            // Show success message
            const successMessage = document.querySelector('.login-successful');
            if (successMessage) {
              loginForm.style.display = 'none';
              successMessage.style.display = 'flex';
              
              // Redirect after showing success message
              setTimeout(() => {
                redirectBasedOnRole(user.role || 'user');
              }, 1500);
            } else {
              redirectBasedOnRole(user.role || 'user');
            }
          } else {
            showError('Invalid email or password');
          }
        } catch (error) {
          console.error('Login error:', error);
          showError('An error occurred during login');
        } finally {
          if (loginButton) {
            loginButton.disabled = false;
            loginButton.textContent = 'Sign in';
          }
        }
      }, 500); // Simulate network delay
      
      if (loginButton) {
        loginButton.disabled = true;
        loginButton.textContent = 'Signing in...';
      }
    });
  }
  
  function showError(message) {
    loginError.textContent = message;
    loginError.style.display = 'block';
    
    if (loginButton) {
      loginButton.disabled = false;
      loginButton.textContent = 'Sign in';
    }
  }
});