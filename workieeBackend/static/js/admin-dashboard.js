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
    });
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

    