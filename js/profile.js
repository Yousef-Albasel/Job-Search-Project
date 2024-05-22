document.addEventListener("DOMContentLoaded", function() {
    var userAccount = JSON.parse(sessionStorage.getItem("UserAccount"));
    if (userAccount) {
        document.querySelector('.info-field:nth-of-type(1) span').textContent = userAccount.username;
        document.querySelector('.info-field:nth-of-type(2) span').textContent = userAccount.email;
        document.querySelector('#curr-job').innerText = "N/A";
        document.querySelector('#company-name').textContent = userAccount.companyName ? userAccount.companyName : "N/A";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.getElementById('profile-image');

    profileImage.addEventListener('click', () => {
        const timestamp = new Date().getTime();
        profileImage.src = `https://i.pravatar.cc/150?timestamp=${timestamp}`;
    });
});

const newSkillButton = document.querySelector(".profile-elements .skills i.fa-plus");
const deleteSkillButton = document.querySelector(".profile-elements .skills .tag i.fa-times");
const newSkillInput = document.querySelector(".profile-elements input");

newSkillButton.addEventListener('click',() => {
    newSkillInput.style.display = "flex";
})

const skillsContainer = document.querySelector(".profile-elements .skills");
newSkillInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let tag = document.createElement("span");
        let deleteButt = document.createElement("i");
        tag.setAttribute("class","tag");
        deleteButt.setAttribute("class","fas fa-times");
        tag.innerHTML = newSkillInput.value;
        tag.appendChild(deleteButt);
        skillsContainer.removeChild(newSkillButton);
        skillsContainer.appendChild(tag);
        skillsContainer.appendChild(newSkillButton);
        newSkillInput.value = "";
        newSkillInput.style.display ="none";
        deleteButt.addEventListener('click', function() {
            skillsContainer.removeChild(tag);
        });
    }
});

