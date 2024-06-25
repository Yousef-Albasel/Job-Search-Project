const dropMenuButton = document.querySelector(".header .drop-menu i");
const navigationBarUL = document.querySelector(".header nav.container ul");
const adminDashboardLink = document.querySelector(`li[name="dashboard"]`);
const profileDiv = document.querySelector(".nav-profile");
let isMenuOpen = false;
let userAuthorized = false;

// Drop Down menu handling
dropMenuButton.addEventListener("click", () => {
    navigationBarUL.classList.toggle("show-menu"); 
});


// User Authentication Handling

function checkUserCredentials() {
    const userCredentials = sessionStorage.getItem("UserAccount");
    if (userCredentials) {
        userAuthorized = true;
        const user = JSON.parse(userCredentials);
        const authroizationButtons = document.querySelectorAll(`li[role="authentication"]`);
        
        profileDiv.style.display = "flex"; // Show profile info
        profileDiv.querySelector("div span").innerHTML = user.username;
        if (user.picture_link != "N/A"){
            document.querySelector(".nav-profile a img").src = user.picture_link;
        }else{
            document.querySelector(".nav-profile a img").src = "https://avatar.iran.liara.run/public/37";
        }
        
        authroizationButtons.forEach(button => {
        button.style.display = "none";
            const link = button.querySelector("a");
            link.href = "#"; 
            link.onclick = function(event) {
                event.preventDefault(); 
            };
        });

        if (user.is_company_admin === true && userAuthorized){
            adminDashboardLink.style.display = "block";
        }else{
            adminDashboardLink.style.display = "none";
        }
        console.log("Welcome back, " + user.username + "!");
    }else{
        profileDiv.style.display = "none"
        console.log("User not authorized");
    }
}



document.addEventListener('DOMContentLoaded', function() {
    checkUserCredentials();
});
