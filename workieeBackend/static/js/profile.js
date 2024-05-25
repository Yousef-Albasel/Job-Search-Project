let skillArray = [];

document.addEventListener("DOMContentLoaded", async function() {
    let users = await getUsers();
    var userAccount = JSON.parse(sessionStorage.getItem("UserAccount"));
    console.log(skillArray);
    if (users) {
        document.querySelector('#user-name').innerHTML = userAccount.username;
        document.querySelector('#user-account-name').innerHTML = userAccount.username;
        document.querySelector('#email').innerHTML = userAccount.email;
        document.querySelector('#current-job').innerHTML = userAccount.current_job;
        document.querySelector('#user-account-job').innerHTML = userAccount.current_job;
        document.querySelector('#company-name').innerHTML = userAccount.company_name;
    }
    await displayApplicants();
});

// Fetching users
async function getUsers() {
    try {
        const response = await fetch('/login/get_users', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        return data.users; 
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
}

// Event listener for editing profile
document.addEventListener('DOMContentLoaded', async () => {
    const editButton = document.getElementById("edit-button");
    const userNameInput = document.getElementById("new-name");
    const emailInput = document.getElementById("new-email");
    const currentJobInput = document.getElementById("new-job");
    const companyNameInput = document.getElementById("new-company");
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
            }
        });
    }

    updateSpanOnEnter(userNameInput, userNameSpan);
    updateSpanOnEnter(emailInput, emailSpan);
    updateSpanOnEnter(currentJobInput, currentJobSpan);
    updateSpanOnEnter(companyNameInput, companyNameSpan);
});

// Handling skills
const newSkillButton = document.querySelector(".profile-elements .skills i.fa-plus");
const newSkillInput = document.querySelector(".profile-elements input");

newSkillButton.addEventListener('click', () => {
    newSkillInput.style.display = "flex";
});

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

// Fetching job data
async function getJobData() {
    try {
        const response = await fetch('/admin-dashboard', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.jobs;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
}

async function getJobUsingAppID(appId) {
    try {
        const jobs = await getJobData();
        const job = jobs.find(j => j.id === appId);
        
        if (!job) {
            console.warn(`Job with ID ${appId} not found.`);
        }
        
        return job;
    } catch (error) {
        console.error('Error in getJobUsingAppID:', error);
        return null;
    }
}

function generateJobApplication(job,appid) {
    const applicationField = document.createElement('div');
    applicationField.className = 'application-field';
    applicationField.setAttribute("value", appid);
    const jobTitle = document.createElement('h6');
    jobTitle.textContent = job.jobtitle;

    const companyName = document.createElement('span');
    companyName.textContent = job.companyname;

    const jobRequirements = document.createElement('p');
    jobRequirements.className = 'job-requirements';
    jobRequirements.textContent = job.jobrequirements;

    const yearsOfExp = document.createElement('span');
    yearsOfExp.className = 'yearsofexp';
    yearsOfExp.textContent = job.yearsofexperience;

    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete-application';
    deleteButton.textContent = 'Delete Application';

    applicationField.appendChild(jobTitle);
    applicationField.appendChild(companyName);
    applicationField.appendChild(jobRequirements);
    applicationField.appendChild(yearsOfExp);
    applicationField.appendChild(deleteButton);

    return applicationField;
}

async function displayApplicants() {
    const userCredentials = sessionStorage.getItem("UserAccount");
    const user = JSON.parse(userCredentials);
    const container = document.querySelector('.job-applications');
    const applicants = await getApplications();

    if (!applicants) return;

    for (const applicant of applicants) {
        if (applicant.user_id === user.id) {
            console.log(applicant.id)
            const job = await getJobUsingAppID(applicant.job_id);
            if (job) {
                const applicantElement = generateJobApplication(job,applicant.id);
                container.appendChild(applicantElement);
            }
        }
    }
    deleteApp();
}

async function getApplications() {
    try {
        const response = await fetch('browse/getApplications/', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        return data.apps; 
    } catch (error) {
        console.error('Error fetching apps:', error);
        return null;
    }
}
async function deleteApp() {
    setTimeout(() => {
        let deleteButtons = document.querySelectorAll('#delete-application');
        console.log("Delete buttons found: ", deleteButtons.length);
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                console.log("clicked on remove");
                const applicationField = event.target.closest('.application-field');
                const applicationId = applicationField.getAttribute('value');

                try {
                    const response = await fetch(`/delete_application/${applicationId}/`, {
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });

                    if (response.ok) {
                        applicationField.remove();
                        alert('Application deleted successfully');
                    } else {
                        const data = await response.json();
                        alert(`Error: ${data.message}`);
                    }
                } catch (error) {
                    console.error('Error deleting application:', error);
                    alert('Error deleting application');
                }
            });
        });
    }, 1000); // Adding a delay to ensure buttons are loaded
}
