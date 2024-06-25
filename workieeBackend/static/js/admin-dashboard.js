document.addEventListener('DOMContentLoaded', function() {
    displayJobs();
    const checkBoxes = document.querySelectorAll(".job-container input[type='checkbox']");
    const deleteButton = document.querySelector(".listed-jobs .control-panel .buttons button[name='delete-button']");
    const editButton = document.getElementById("editJobButton");

    document.addEventListener('change', function(event) {
        if (event.target.matches(".job-container input[type='checkbox']")) {
            const jobContainer = event.target.closest('.job-container');
            if (event.target.checked) {
                jobContainer.style.backgroundColor = '#EAEBED';
            } else {
                jobContainer.style.backgroundColor = 'transparent';
            }
        }
    });

    editButton.addEventListener('click', async function(){
        const checkBoxes = document.querySelectorAll(".job-container input[type='checkbox']");
        checkBoxes.forEach( async checkBox => {
            if (checkBox.checked) {
                const jobContainer = checkBox.closest('.job-container');
                const jobId = jobContainer.dataset.jobId;
                const baseUrl = window.location.origin + '/jobs/edit/';
                const redirectUrl = `${baseUrl}${jobId}`;        
                window.location.href = redirectUrl;                
            }
        });
        
    })

    deleteButton.addEventListener('click', async function() {
        const checkBoxes = document.querySelectorAll(".job-container input[type='checkbox']");
        checkBoxes.forEach(async checkBox => {
            if (checkBox.checked) {
                const jobContainer = checkBox.closest('.job-container');
                const jobId = jobContainer.dataset.jobId;
                await deleteJobFromDatabase(jobId);
                jobContainer.remove();
            }
        });
    });
    
});

async function deleteJobFromDatabase(jobId) {
    try {
        const response = await fetch('/delete-job/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'jobId': jobId
            }).toString()
        });

        const data = await response.json();

        if (data.status!== 'success') {
            console.error('Error deleting job:', data.message);
        }
    } catch (error) {
        console.error('Error deleting job:', error);
    }
}

async function getJobData() {
    try {
        const response = await fetch('/admin-dashboard', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return(data.jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
}

// Call the function to fetch job data


async function displayJobs() {
    const userCredentials = sessionStorage.getItem("UserAccount");
    const user = JSON.parse(userCredentials);
    let jobs = await getJobData();
    // let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    let listedJobs = document.querySelector('.listed-jobs');
    let nJobs = document.getElementById('NoOfJobs');
    let cnt = 0;
    jobs.forEach(function(job) {
    if(user.id === job.user_id_id){
        cnt++;
        let jobContainer = document.createElement('div');
        jobContainer.classList.add('job-container');
        jobContainer.setAttribute('data-job-id', job.id); 

        let jobContainerHeader = document.createElement('div');
        jobContainerHeader.classList.add('job-container-header');

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('for', 'select-job');
        checkbox.setAttribute('name', 'select-job');

        let jobTitle = document.createElement('h1');
        jobTitle.textContent = job.jobtitle;

        let jobStatus = document.createElement('span');
        jobStatus.textContent = job.jobstatus;

        jobContainerHeader.appendChild(checkbox);
        jobContainerHeader.appendChild(jobTitle);
        jobContainerHeader.appendChild(jobStatus);

        let jobDescription = document.createElement('p');
        jobDescription.textContent = job.jobdescription;

        let requiredSkills = document.createElement('div');
        requiredSkills.classList.add('required-skills');

        let yearsOfExperience = document.createElement('p');
        yearsOfExperience.textContent = job.yearsofexperience;
        yearsOfExperience.classList.add('yearsOfExperience');

        let jobSalary = document.createElement('span');
        jobSalary.style.fontWeight = '600';
        jobSalary.textContent = job.jobsalary;

        

        requiredSkills.appendChild(yearsOfExperience);
        requiredSkills.appendChild(jobSalary);

        jobContainer.appendChild(jobContainerHeader);
        jobContainer.appendChild(jobDescription);
        jobContainer.appendChild(requiredSkills);

        jobContainer.appendChild(document.createElement('hr'))
        listedJobs.appendChild(jobContainer);
    }});
    nJobs.innerText = cnt;

}


// Styling and improvments

const sidebarButtons = document.querySelectorAll("i.fa-bars"); 
console.log(sidebarButtons);
let isSidebarHidden = true; 
const sideBar = document.querySelector('#side-barID');
const body = document.querySelector('body');
console.log(sideBar);
console.log(body);
sidebarIcon = document.querySelector("#barsIconH");
sidebarIcon.style.display = "none";
sidebarButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("clicked");
        body.classList.toggle('sidebar-hidden');
        sideBar.classList.toggle('hidden');
        isSidebarHidden =!isSidebarHidden;
        sidebarIcon.style.display = isSidebarHidden? "none" : "block";
    });
});


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

async function getJobUsingAppID(appId){
    jobs = await getJobData();
    const userCredentials = sessionStorage.getItem("UserAccount");
    const user = JSON.parse(userCredentials);
    job = jobs.find(j => j.id === appId && j.user_id_id === user.id);    
    return job;
}

async function getUserUsingAppID(appId){
    users = await getUsers();
    user = users.find(u => u.id === appId);    
    return user;
}
function createApplicantElement(user,JobTitle) {
    const divApplicant = document.createElement('div');
    divApplicant.classList.add('application');

    const img = document.createElement('img');
    img.setAttribute('src', 'https://avatar.iran.liara.run/public/37');
    img.style.width = "50px";
    img.style.height = "50px";

    const divInfo = document.createElement('div');

    const h1Name = document.createElement('h1');
    h1Name.setAttribute('id', 'applicant-name');
    h1Name.textContent = user.username;

    const pAppliedFor = document.createElement('p');
    pAppliedFor.textContent = 'Applied for ';

    const spanJobTitle = document.createElement('span');
    spanJobTitle.setAttribute('id', 'application-job-title');
    spanJobTitle.textContent = JobTitle;

    pAppliedFor.appendChild(spanJobTitle);
    divInfo.appendChild(h1Name);
    divInfo.appendChild(pAppliedFor);

    const aViewProfile = document.createElement('a');
    aViewProfile.setAttribute('href', '#');
    aViewProfile.textContent = 'View Resume';
    
    aViewProfile.addEventListener('click',()=>{
        if (user.resume_link != "N/A"){
            window.location.href = user.resume_link;
        }
    })

    if (user.picture_link != "N/A"){
        img.src = user.picture_link;
    }else{
        img.src = "https://avatar.iran.liara.run/public/37";
    }

    divApplicant.appendChild(img);
    divApplicant.appendChild(divInfo);
    divApplicant.appendChild(aViewProfile);

    return divApplicant;
}

async function displayApplicants() {
    const container = document.querySelector('.applicants');
    const applicants = await getApplications();
    let cnt = 0;
    if (!applicants) return;
    applicants.forEach(async applicant => {
        cnt++;
        const job = await getJobUsingAppID(applicant.job_id);
        const user = await getUserUsingAppID(applicant.user_id); 
        const applicantElement = createApplicantElement(user, job.jobtitle);
        container.appendChild(applicantElement);
        document.querySelector("#NoOfApps").innerHTML = cnt;
    });
}

document.addEventListener('DOMContentLoaded', displayApplicants);


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