// Authentication utility functions

// Store user data in localStorage
function storeUser(userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
}

// Get current user from localStorage
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Check if user is authenticated
function isAuthenticated() {
    return !!getCurrentUser();
}

// Logout user
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login.html';
}

// Redirect based on user role
export function redirectBasedOnRole(role) {
    switch(role.toLowerCase()) {
        case 'admin':
            window.location.href = 'dashboard.html';
            break;
        case 'company':
            window.location.href = 'companyDashboard.html';
            break;
        case 'driver':
        case 'user':
        default:
            window.location.href = 'dashboard.html';
    }
}

// Redirect to login if not authenticated
export function requireAuth(requiredRole = null) {
    const user = getCurrentUser();
    
    if (!user) {
        window.location.href = '/login.html';
        return false;
    }
    
    if (requiredRole && user.role !== requiredRole) {
        window.location.href = '/unauthorized.html';
        return false;
    }
    
    return true;
}

export { storeUser, getCurrentUser, isAuthenticated, logout };
