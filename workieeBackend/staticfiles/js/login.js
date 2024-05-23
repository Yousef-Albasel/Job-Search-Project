document.addEventListener('DOMContentLoaded', async function() {
    await getUsers();
});

const form = document.querySelector("form");
const emailInput = document.getElementById("email-login");
const passwordInput = document.getElementById("password-login");
const rememberMeCheckbox = document.getElementById("remember-me");

form.addEventListener('submit', async e => {
    e.preventDefault(); 
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const user = await validateCredentials(email, password);
    if (user) {
        saveLoginCredentials(user);
        window.location.href = "browse/";
    } else {
        handleInvalidCredentials();
    }
});

async function validateCredentials(email, password) {
    const users = await getUsers();
    if (!users) return null;
    return users.find(user => user.email === email && user.password === password);
}

function saveLoginCredentials(user) {
    sessionStorage.setItem("UserAccount", JSON.stringify(user));
}

function handleInvalidCredentials() {
    emailInput.classList.add("error");
    passwordInput.classList.add("error");
    const errorMessage = document.querySelector(".input-button .error-message");
    if (errorMessage) {
        errorMessage.style.display = "block";
    }
}

async function getUsers() {
    try {
        const response = await fetch('/login/get_users', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.users);
        return data.users; 
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
}
