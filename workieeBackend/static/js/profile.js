document.addEventListener("DOMContentLoaded", async function() {
    var users = await getUsers();
    var userAccount = JSON.parse(sessionStorage.getItem("UserAccount"));
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


async function getJobUsingAppID(appId) {
    try {
        const jobs = await getJobData();
        const job = jobs.find(j => j.id === appId);
        
        if (!job) {
            console.log(`Job with ID ${appId} not found.`);
        }
        
        return job;
    } catch (error) {
        console.log('Error in getJobUsingAppID:', error);
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


// Fetch Requests

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