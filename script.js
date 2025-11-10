// Multi-step form functionality for registration
function nextStep(currentStep) {
    document.getElementById('step' + currentStep).style.display = 'none';
    let next = currentStep + 1;
    document.getElementById('step' + next).style.display = 'block';
    // Highlight step indicator
    document.querySelector('.step' + currentStep).classList.remove('active');
    document.querySelector('.step' + next).classList.add('active');
}

document.getElementById('regForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Simple validation
    let pwd = this.password.value;
    let cpwd = this.confirmPassword.value;
    if (pwd.length < 8 || !/[A-Z]/.test(pwd) || !/[a-z]/.test(pwd) || !/[0-9]/.test(pwd)) {
        alert('Password must be at least 8 characters and include uppercase, lowercase, and numbers.');
        return;
    }
    if (pwd !== cpwd) {
        alert('Passwords do not match!');
        return;
    }
    alert('Registration successful!');
    window.location.href = 'index.html'; // Redirect to login
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Simple validation for demo
    let email = document.getElementById('loginEmail').value;
    let pwd = document.getElementById('loginPassword').value;
    if (email.length < 5 || pwd.length < 4) {
        alert('Please enter valid email and password.');
        return;
    }
    alert('Login successful!');
    // For real application, submit to backend
    // window.location.href = 'dashboard.html';
});

