import { storeUser } from './authUtils.js';

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('signUpForm');
    const cards = document.getElementsByClassName('card');
    const companyInfo = document.querySelectorAll('.next')[0];
    const verification = document.querySelectorAll('.next')[1];
    const securityAndSignup = document.querySelectorAll('.next')[2];
    const progress = document.querySelectorAll('.stage');
    const signUpstep = document.querySelector('.signup-step');
    const submitButton = document.querySelector('#signUp button[type="submit"]');


    // nextBtn1.addEventListener('click', ()=>{
    //     cards[0].classList.toggle('active')
    //     cards[1].classList.toggle('active')
    // })

    // backBtn1.addEventListener('click', ()=>{
    //     cards[0].classList.toggle('active')
    //     cards[1].classList.toggle('active')
    // })

    companyInfo.addEventListener('click', (event)=>{
        if(event.target === companyInfo.querySelectorAll('.btn')[0]){
           document.location.assign('../../pages/auth/signupUser.html')
            
        }else{
            cards[0].classList.toggle('active')
            cards[1].classList.toggle('active')
            progress[0].classList.toggle('active-stage')
            progress[1].classList.toggle('active-stage')
        }
    })

    verification.addEventListener('click', (event)=>{
        if(event.target === verification.querySelectorAll('.btn')[0]){
            cards[0].classList.toggle('active')
            cards[1].classList.toggle('active')
            progress[0].classList.toggle('active-stage')
            progress[1].classList.toggle('active-stage')
        }else{
            cards[1].classList.toggle('active')
            cards[2].classList.toggle('active')
            progress[1].classList.toggle('active-stage')
            progress[2].classList.toggle('active-stage')
        }
    })

    // Handle form submission in the security step
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Creating Account...';
            }
            
            // Get form data
            const companyData = {
                id: 'company-' + Date.now(),
                companyName: document.getElementById('companyName').value.trim(),
                email: document.getElementById('companyEmail').value.trim(),
                phone: document.getElementById('companyPhone').value.trim(),
                country: document.getElementById('country').value.trim(),
                website: document.getElementById('website')?.value.trim() || '',
                certificate: document.getElementById('certificate')?.files[0]?.name || '',
                role: 'company',
                createdAt: new Date().toISOString()
            };
            
            // Validate password
            const password = document.querySelector('#company-password input').value;
            const confirmPassword = document.querySelector('#company-confirm input').value;
            const termsAccepted = document.querySelector('input[name="terms"]').checked;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Register Company';
                }
                return;
            }
            
            if (!termsAccepted) {
                alert('You must accept the terms and conditions');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Register Company';
                }
                return;
            }
            
            try {
                // Save company data to localStorage
                const companies = JSON.parse(localStorage.getItem('companies') || '[]');
                
                // Check if company email already exists
                if (companies.some(company => company.email === companyData.email)) {
                    throw new Error('A company with this email already exists');
                }
                
                // Add new company
                companies.push(companyData);
                localStorage.setItem('companies', JSON.stringify(companies));
                
                // Store user session
                storeUser({
                    id: companyData.id,
                    email: companyData.email,
                    companyName: companyData.companyName,
                    role: 'company',
                    token: 'company-token-' + Math.random().toString(36).substr(2, 9)
                });
                
                // Redirect to company dashboard
                window.location.href = 'companyDashboard.html';
                
            } catch (error) {
                console.error('Registration error:', error);
                alert(error.message || 'An error occurred during registration. Please try again.');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Register Company';
                }
            }
        });
    }

    // Handle back button in the security step
    securityAndSignup.addEventListener('click', (event)=>{
        if(event.target === securityAndSignup.querySelectorAll('.btn')[0]){
            cards[1].classList.toggle('active')
            cards[2].classList.toggle('active')
            progress[1].classList.toggle('active-stage')
            progress[2].classList.toggle('active-stage')
        }
    })
})