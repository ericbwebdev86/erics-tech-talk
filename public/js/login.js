async function signupHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#usernameSignUp').value.trim();
    const password = document.querySelector('#passwordSignUp').value.trim();

    if(username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
            document.location.replace('/')
        } else {
            alert(response.statusText);
        }
        
    }
}
document.querySelector('.register-form').addEventListener('submit', signupHandler);

async function loginHandler(event) {
    event.preventDefault();
    
    const username = document.querySelector('#usernameInput').value.trim();
    const password = document.querySelector('#passwordInput').value.trim();

    if(username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
            document.location.replace('/')
        } else {
            alert(response.statusText);
        }
        
    }
}
document.querySelector('.login-form').addEventListener('submit', loginHandler);