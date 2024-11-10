// CREATE ACCOUNT
function createAccount(event) {
    event.preventDefault();

    // Getting the user input with value
    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value;
    const passwordRepeat = document.getElementById('psw-repeat').value;

    // Checking if passwords are same
    if (password !== passwordRepeat) {
        alert('Passwords do not match!');
        console.log('Passwords do not match');
        return;
    }

    const userData = {
        email: email,
        password: password
    };

    // Convert to JSON
    localStorage.setItem('user', JSON.stringify(userData));
    alert('You are now registered');

    createAccount();
}

// DELETE ACCOUNT
function deleteAccount(event) {
    event.preventDefault();

    const userData = localStorage.getItem('user');

    if (userData) {
        localStorage.removeItem('user');
        alert('Your account has been deleted.');
        window.location.href = 'index.html';
    } else {
        alert('No account found. Please register first.');
    }
}

document
    .querySelector('.form-register')
    .addEventListener('submit', function (event) {
        const target = event.submitter;

        if (target.classList.contains('register-btn')) {
            createAccount(event);
        } else if (target.classList.contains('delete-btn')) {
            deleteAccount(event);
        }
    });
