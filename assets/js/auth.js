function initAuth() {
    const loginSection = document.getElementById('login-section');
    const welcomeSection = document.getElementById('welcome-section');
    const todoSection = document.getElementById('todo-section');
    const logoutBtn = document.getElementById('logout-btn');
    const loginForm = document.getElementById('login-form');
    const nameInput = document.getElementById('name-input');
    const greeting = document.getElementById('greeting');
    
    function checkAuth() {
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            showWelcomeScreen(savedName);
        } else {
            showLoginScreen();
        }
    }
    
    function showLoginScreen() {
        if (loginSection) {
            loginSection.style.display = 'block';
        }
        if (welcomeSection) {
            welcomeSection.style.display = 'none';
        }
        if (todoSection) {
            todoSection.style.display = 'none';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
    }
    
    function showWelcomeScreen(name) {
        if (loginSection) {
            loginSection.style.display = 'none';
        }
        if (welcomeSection) {
            welcomeSection.style.display = 'block';
        }
        if (todoSection) {
            todoSection.style.display = 'block';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
        }
        
        if (greeting) {
            const hour = new Date().getHours();
            let greetingMessage = '';
            
            if (hour >= 5 && hour < 12) {
                greetingMessage = '좋은 아침이에요';
            } else if (hour >= 12 && hour < 18) {
                greetingMessage = '좋은 오후에요';
            } else if (hour >= 18 && hour < 22) {
                greetingMessage = '좋은 저녁이에요';
            } else {
                greetingMessage = '안녕하세요';
            }
            
            greeting.textContent = `${greetingMessage}, ${name}님!`;
        }
        
        window.initTodos();
    }
    
    function handleLogin(event) {
        event.preventDefault();
        
        const name = nameInput.value;
        if (name) {
            // Save to localStorage
            localStorage.setItem('userName', name);

            nameInput.value = '';
            showWelcomeScreen(name);
        }
    }
    
    function handleLogout() {
        // Remove from localStorage
        localStorage.removeItem('userName');
        
        // Clear todos from display
        if (window.clearTodoDisplay && typeof window.clearTodoDisplay === 'function') {
            window.clearTodoDisplay();
        }
        console.log(window.clearTodoDisplay);

        showLoginScreen();
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    if (nameInput) {
        nameInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                handleLogin(event);
            }
        });
    }
    
    checkAuth();
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAuth();
});
