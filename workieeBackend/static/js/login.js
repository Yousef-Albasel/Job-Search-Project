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
        window.location.href = "browseJob.html"
    } else {
        handleInvalidCredentials();
    }
});


async function validateCredentials(email, password) {
    const storedData = await getUsers();
    if (!storedData) return null;
    // const users = JSON.parse(storedData);
    // return users.find(user => user.email === email && user.password === password);
    console.log(storedData);
  }

function saveLoginCredentials(user) {
    sessionStorage.setItem("UserAccount", JSON.stringify(user));
}

function handleInvalidCredentials() {
    emailInput.classList.add("error");
    passwordInput.classList.add("error");
    document.querySelector(".input-button .error-message").style.display = "block";
}

async function getUsers() {
    try {
        const response = await fetch('/Login', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data.users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
await getUsers();