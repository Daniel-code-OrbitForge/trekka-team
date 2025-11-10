// Role selection functionality
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelectorAll('.container');
    const userBtn = document.querySelector('.option:nth-child(1)');
    const driverBtn = document.querySelector('.option:nth-child(2)');
    const companyBtn = document.querySelector('.option:nth-child(3)');
    
    // Function to handle role selection
    function handleRoleSelection(role) {
        // Store the selected role in session storage
        sessionStorage.setItem('selectedRole', role);
        
        // Hide role selection and show the appropriate form
        container[0].classList.add('deactivate');
        container[1].classList.remove('deactivate');
        
        // Update the form title based on the selected role
        const formTitle = document.querySelector('.card-title-user p:first-child');
        if (formTitle) {
            const roleText = role.charAt(0).toUpperCase() + role.slice(1);
            formTitle.textContent = `Create your ${roleText} Account`;
        }
    }
    
    // Add event listeners to role buttons
    if (userBtn) {
        userBtn.addEventListener('click', () => handleRoleSelection('user'));
    }
    
    if (driverBtn) {
        driverBtn.addEventListener('click', () => handleRoleSelection('driver'));
    }
    
    if (companyBtn) {
        companyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // For company, store the role and redirect
            sessionStorage.setItem('selectedRole', 'company');
            window.location.href = 'signupCompany.html';
        });
    }
    
    // Check if we should show the role selection or the form
    const selectedRole = sessionStorage.getItem('selectedRole');
    if (selectedRole && container.length > 1) {
        // If company role is selected, don't show the form, just redirect
        if (selectedRole === 'company') {
            window.location.href = 'signupCompany.html';
        } else {
            container[0].classList.add('deactivate');
            container[1].classList.remove('deactivate');
        }
    }
});
