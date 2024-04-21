document.addEventListener("DOMContentLoaded", function() {
    var userAccount = JSON.parse(sessionStorage.getItem("UserAccount"));
    if (userAccount) {
        document.querySelector('.info-field:nth-of-type(1) span').textContent = userAccount.username;
        document.querySelector('.info-field:nth-of-type(2) span').textContent = userAccount.email;
        document.querySelector('#curr-job').innerText = "N/A";
        document.querySelector('#company-name').textContent = userAccount.companyName ? userAccount.companyName : "N/A";
    }
});
