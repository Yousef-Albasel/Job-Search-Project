const form = document.querySelector("form");

const emailInput = document.getElementById("email-login");
const passwordInput = document.getElementById("password-login");
const rememberMeCheckbox = document.getElementById("remember-me");

form.addEventListener('submit', e => {
    e.preventDefault(); 
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const user = validateCredentials(email, password);
    if (user) {
        saveLoginCredentials(user);
        window.location.href = "browseJob.html"
    } else {
        handleInvalidCredentials();
    }
});


function validateCredentials(email, password) {
    const storedData = localStorage.getItem("userCredentials");
    if (!storedData) return null;
    const users = JSON.parse(storedData);
    return users.find(user => user.email === email && user.password === password);
}

function saveLoginCredentials(user) {
    sessionStorage.setItem("UserAccount", JSON.stringify(user));
}

function handleInvalidCredentials() {
    emailInput.classList.add("error");
    passwordInput.classList.add("error");
    document.querySelector(".input-button .error-message").style.display = "block";
}
