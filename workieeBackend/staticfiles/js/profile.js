let skillArray = [];
document.addEventListener("DOMContentLoaded", async function() {
    let users = await getUsers();
    var userAccount = JSON.parse(sessionStorage.getItem("UserAccount"));
    // skillArray = userAccount.skills;
    console.log(skillArray);
    if (users) {
        document.querySelector('#user-name').innerHTML = userAccount.username;
        document.querySelector('#user-account-name').innerHTML = userAccount.username;
        document.querySelector('#email').innerHTML = userAccount.email;
        document.querySelector('#current-job').innerHTML = userAccount.current_job;
        document.querySelector('#user-account-job').innerHTML = userAccount.current_job;
        document.querySelector('#company-name').innerHTML = userAccount.company_name;
        // loadSkillsFromJson(userAccount.skills);
    }
});

// document.addEventListener('DOMContentLoaded', () => {
//     const profileImage = document.getElementById('profile-image');

//     profileImage.addEventListener('click', () => {
//         const timestamp = new Date().getTime();
//         profileImage.src = `https://i.pravatar.cc/150?timestamp=${timestamp}`;
//     });
// });

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


document.addEventListener('DOMContentLoaded', async () => {
    // let userprofiles = await getUsersProfiles();
    const editButton = document.getElementById("edit-button");
    const userNameInput = document.getElementById("new-name");
    const emailInput = document.getElementById("new-email");
    const currentJobInput = document.getElementById("new-job");
    const companyNameInput = document.getElementById("new-company");
    const urlInput = document.getElementById("new-url");
    const userNameSpan = document.getElementById("user-name");
    const emailSpan = document.getElementById("email");
    const currentJobSpan = document.getElementById("current-job");
    const companyNameSpan = document.getElementById("company-name");
    const saveButton = document.getElementById("save-button");

    saveButton.addEventListener('click', async () => {
        const userCredentials = sessionStorage.getItem("UserAccount");
        const user = JSON.parse(userCredentials);
        const userId = user.id;
        const username = userNameSpan.innerHTML;
        const email = emailSpan.innerHTML;
        const currentJob = currentJobSpan.innerHTML;
        const companyName = companyNameSpan.innerHTML;
        
        const data = {
            userId,
            username,   
            email,
            currentJob,
            companyName
            // skills: JSON.stringify(skillArray)
        };
        
        try {
            const response = await fetch('/update_profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
    
            const responseData = await response.json();
            if (responseData.status === 'success') {
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('There was a problem updating the profile:', error);
        }

    });
    
    editButton.addEventListener('click', () => {
        userNameInput.style.display = "flex";
        emailInput.style.display = "flex";
        currentJobInput.style.display = "flex";
        companyNameInput.style.display = "flex";
    });

    function updateSpanOnEnter(inputElement, spanElement) {
        inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (inputElement.value != ""){
                spanElement.innerHTML = inputElement.value;
                }
                userNameInput.style.display = "none";
                emailInput.style.display = "none";
                currentJobInput.style.display = "none";
                companyNameInput.style.display = "none";
                urlInput.style.display = "none";
            }
        });
    }

    updateSpanOnEnter(userNameInput, userNameSpan);
    updateSpanOnEnter(emailInput, emailSpan);
    updateSpanOnEnter(currentJobInput, currentJobSpan);
    updateSpanOnEnter(companyNameInput, companyNameSpan);
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

// function loadSkillsFromJson(jsonString) {
//     if (!isValidJson(jsonString)) {
//         console.error('Invalid JSON string:', jsonString);
//         return;
//     }
//     const skills = JSON.parse(jsonString);
//     skills.forEach(skill => {
//         addSkill(skill);
//     });
// }

// function addSkill(skillArr = [], skill) {
//     let tag = document.createElement("span");
//     const skillsContainer = document.querySelector(".profile-elements .skills");
//     let deleteButt = document.createElement("i");
//     tag.setAttribute("class", "tag");
//     deleteButt.setAttribute("class", "fas fa-times");
//     tag.innerHTML = skill;
//     skillArray.push(tag.innerHTML)

//     tag.appendChild(deleteButt);
//     skillsContainer.removeChild(newSkillButton);
//     skillsContainer.appendChild(tag);
//     skillsContainer.appendChild(newSkillButton);
// }

// function isValidJson(jsonString) {
//     try {
//         JSON.parse(jsonString);
//         return true;
//     } catch (error) {
//         return false;
//     }
// }