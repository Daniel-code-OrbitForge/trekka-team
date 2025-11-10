import { storeUser, redirectBasedOnRole } from './authUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signUpForm');
    const cards = document.getElementsByClassName('card');
    const nextBtn1 = document.querySelector('.user-next-btn1');
    const toContactInfo = document.querySelectorAll('.next')[0];
    const toSignUp = document.querySelectorAll('.next')[1];
    const progress = document.querySelector('.progress');
    const signUpstep = document.querySelector('.signup-step');
    
    // Get the selected role from session storage
    const selectedRole = sessionStorage.getItem('selectedRole') || 'user';
    
    // Update the form title based on the selected role
    const updateFormTitle = () => {
        const formTitle = document.querySelector('.card-title-user p:first-child');
        if (formTitle) {
            const roleText = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1);
            formTitle.textContent = `Create your ${roleText} Account`;
        }
    };
    
    // Call it on load
    updateFormTitle();

    // Form navigation
    nextBtn1.addEventListener('click', () => {
        // Validate step 1
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (!firstName || !lastName || !email) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        cards[0].classList.toggle('active');
        cards[1].classList.toggle('active');
        progress.style.width = '67%';
        signUpstep.firstElementChild.textContent = 'Step 2 of 3';
        signUpstep.lastElementChild.textContent = '67%';
    });

    toContactInfo.addEventListener('click', (event) => {
        if (event.target === toContactInfo.querySelectorAll('.btn')[0]) {
            // Back button
            cards[0].classList.toggle('active');
            cards[1].classList.toggle('active');
            progress.style.width = '33%';
            signUpstep.firstElementChild.textContent = 'Step 1 of 3';
            signUpstep.lastElementChild.textContent = '33%';
        } else {
            // Next button (to step 3)
            const phone = document.getElementById('phone').value.trim();
            const country = document.getElementById('country').value.trim();
            
            if (!phone || !country) {
                alert('Please fill in all fields');
                return;
            }
            
            cards[1].classList.toggle('active');
            cards[2].classList.toggle('active');
            progress.style.width = '100%';
            signUpstep.firstElementChild.textContent = 'Step 3 of 3';
            signUpstep.lastElementChild.textContent = '100%';
        }
    });

    toSignUp.addEventListener('click', (event) => {
        if (event.target === toSignUp.querySelectorAll('.btn')[0]) {
            // Back button
            cards[1].classList.toggle('active');
            cards[2].classList.toggle('active');
            progress.style.width = '67%';
            signUpstep.firstElementChild.textContent = 'Step 2 of 3';
            signUpstep.lastElementChild.textContent = '67%';
        }
    });
    
    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const country = document.getElementById('country').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm').value;
            const termsAccepted = document.querySelector('input[name="terms"]').checked;
            
            // Validate form
            if (!termsAccepted) {
                alert('You must accept the terms and conditions');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            // Create user object with the selected role
            const userData = {
                id: selectedRole + '-' + Date.now(),
                firstName,
                lastName,
                email,
                phone,
                country,
                password, // In a real app, this should be hashed
                role: selectedRole,
                createdAt: new Date().toISOString()
            };
            
            // Save user to localStorage
            try {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Check if email already exists
                if (users.some(user => user.email === email)) {
                    alert('This email is already registered');
                    return;
                }
                
                users.push(userData);
                localStorage.setItem('users', JSON.stringify(users));
                
                // Log the user in
                storeUser({
                    id: userData.id,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    role: userData.role,
                    token: 'dummy-token-' + Math.random().toString(36).substr(2, 9)
                });
                
                // Show success message and redirect
                alert('Registration successful! Redirecting to dashboard...');
                redirectBasedOnRole(selectedRole);
                
                // Clear the selected role from session storage
                sessionStorage.removeItem('selectedRole');
                
            } catch (error) {
                console.error('Error saving user:', error);
                alert('An error occurred during registration. Please try again.');
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});