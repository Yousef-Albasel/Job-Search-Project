const companyCheckbox = document.querySelector("#company-admin");
const companyField = document.querySelector('.input-field[name="company-field"]');
let isChecked = false;

companyCheckbox.addEventListener('change', function() {
        if (this.checked) {
            companyField.style.display = 'flex';
            isChecked = true;
        } else {
            companyField.style.display = 'none';
            isChecked = false;
        }
    });

// ============================== Form Validation
const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("c-password");
const companyNameInput = document.getElementById("company-name");

console.log(form);
form.addEventListener('submit', e=>{
    e.preventDefault();
    ValidateInputs();
    if(allInputsValid()){
        saveCredentials(usernameInput.value,emailInput.value,passwordInput.value,isChecked,companyNameInput.value);
    }
});
    

const setError = (element,message) => {
    const inputControl = element;
    const errorDisplay = inputControl.parentElement.querySelector('.error-message');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
};

const setSuccess = (element) => {
    const inputControl = element;
    const errorDisplay = inputControl.parentElement.querySelector('.error-message');
    errorDisplay.innerText = ''; 
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const ValidateInputs = () => {
    const usernameValue = usernameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();
    const companyNameValue = companyNameInput.value.trim();

    // Validating Username
    if (usernameValue === '') {
        setError(usernameInput, 'Username is required');
    } else if (isUsernameExists(usernameValue)) {
        setError(usernameInput, 'Username Already Exists');
    }
    else {
        setSuccess(usernameInput);
    }

    // Validating Email Address
    if (emailValue === '') {
        setError(emailInput, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(emailInput, 'Provide a valid email address');
    } else if (isEmailExists(emailValue)) {
        setError(emailInput, 'Email Already Exists');
    } else {
        setSuccess(emailInput); 
    }
    // Validating Password
    const strength = { 
        1: "very Weak", 
        2: "Weak", 
        3: "Meduim", 
        4: "Strong", 
    }; 
    let regex = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,20}$/;
    
    if (passwordValue === ''){
        setError(passwordInput, 'Password is required');
    }
    else if (passwordValue.length > 20) 
    {
        setError(passwordInput, 'Password is too big');
    } else if (passwordValue.length < 8)
    {
        setError(passwordInput, 'Password is too short');
    } else if (regex.test(passwordValue)) {
        setSuccess(passwordInput)
    } else {
        let count = 0; 
        let regex1 = /[a-z]/; 
        if (regex1.test(passwordValue)) count++; 
        let regex2 = /[A-Z]/; 
        if (regex2.test(passwordValue)) count++; 
        let regex3 = /[\d]/;
        if (regex3.test(passwordValue)) count++; 
        let regex4 = /[!@#$%^&*.?]/; 
        if (regex4.test(passwordValue)) count++; 
        setError(passwordInput,`Password is ${strength[count]}, must have 1 lowercase, 1 uppercase, 1 digit, 1 special character, and be 8-20 characters long.`);
    }

    if (confirmPasswordValue === ''){
        setError(confirmPasswordInput, 'Please confirm your password');
    } else if (confirmPasswordValue != passwordValue){
        setError(confirmPasswordInput, "Passwords do not match. Please ensure both passwords are the same.");
    }else{
        setSuccess(confirmPasswordInput);
    }

    // Validating Company name
    if(companyNameValue === '' && isChecked)
    {
        setError(companyNameInput, 'Company name is required');
    } else if (companyNameValue.length < 3 && isChecked){
        setError(companyNameInput, 'Company name is too short (min = 3)');
    } else {
        setSuccess(companyNameInput);
    }
};

usernameInput.addEventListener('blur', ValidateInputs);
emailInput.addEventListener('blur', ValidateInputs);
passwordInput.addEventListener('blur', ValidateInputs);
confirmPasswordInput.addEventListener('blur', ValidateInputs);
companyNameInput.addEventListener('blur', ValidateInputs);

function isEmailExists(email) {
    let storedData = localStorage.getItem("userCredentials");
    if (!storedData) {
        return false;
    }
    let users = JSON.parse(storedData);
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return true; // Email exists
        }
    }
    return false; // Email doesn't exist
}

function isUsernameExists(username) {
    let storedData = localStorage.getItem("userCredentials");
    if (!storedData) {
        return false;
    }
    let users = JSON.parse(storedData);
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return true; // user exists
        }
    }
    return false; // user doesn't exist
}

const allInputsValid = () => {
    const inputElements = [usernameInput, emailInput, passwordInput, confirmPasswordInput, companyNameInput];

    for (let i = 0; i < inputElements.length; i++) {
        if (inputElements[i].classList.contains('error')) {
            return false; 
        }
    }

    return true; 
};
// ============================= Local Storage Handling

function saveCredentials(username, email, password,isAdmin=false,companyName="") {

    if (typeof(Storage) !== "undefined") {
        var userCredentials = {
            username: username,
            email: email,
            password: password,
            isAdmin: isAdmin,
            companyName:companyName
        };
        var storedData = localStorage.getItem("userCredentials");
        var users = [];
        if (storedData) {
            users = JSON.parse(storedData);
        }
        users.push(userCredentials);
        localStorage.setItem("userCredentials", JSON.stringify(users));
        console.log("User credentials saved successfully.");
    } else {
        console.log("Sorry, your browser does not support localStorage.");
    }
}
