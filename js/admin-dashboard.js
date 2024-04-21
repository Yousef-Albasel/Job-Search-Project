document.addEventListener('DOMContentLoaded', function() {
    displayJobs();
    const checkBoxes = document.querySelectorAll(".job-container input[type='checkbox']");
    const deleteButton = document.querySelector(".listed-jobs .control-panel .buttons button[name='delete-button']");
    const editButton = document.getElementById("editJobButton");

    checkBoxes.forEach(checkBox => {
        checkBox.addEventListener('change', function() {
            const jobContainer = this.closest('.job-container');
            if (this.checked) {
                jobContainer.style.backgroundColor = '#EAEBED';
            } else {
                jobContainer.style.backgroundColor = 'transparent';
            }
        });
    });

    editButton.addEventListener('click',function(){
        checkBoxes.forEach(checkBox => {
            if (checkBox.checked) {
                const jobContainer = checkBox.closest('.job-container');
                const jobId = jobContainer.dataset.jobId;
                sessionStorage.setItem('EditedJobId', jobId);
            }
        });
        
    })

    deleteButton.addEventListener('click', function() {
        checkBoxes.forEach(checkBox => {
            if (checkBox.checked) {
                const jobContainer = checkBox.closest('.job-container');
                const jobId = jobContainer.dataset.jobId;
                deleteJobFromLocalStorage(jobId);
                jobContainer.remove();
            }
        });
    });

});

function deleteJobFromLocalStorage(jobId) {
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    jobs = jobs.filter(job => job.jobId != jobId); 
    localStorage.setItem('jobs', JSON.stringify(jobs));
}

function displayJobs() {
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    let listedJobs = document.querySelector('.listed-jobs');

    jobs.forEach(function(job) {
        let jobContainer = document.createElement('div');
        jobContainer.classList.add('job-container');
        jobContainer.setAttribute('data-job-id', job.jobId); 

        let jobContainerHeader = document.createElement('div');
        jobContainerHeader.classList.add('job-container-header');

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('for', 'select-job');
        checkbox.setAttribute('name', 'select-job');

        let jobTitle = document.createElement('h1');
        jobTitle.textContent = job.jobTitle;

        let jobStatus = document.createElement('span');
        jobStatus.textContent = job.jobStatus;

        jobContainerHeader.appendChild(checkbox);
        jobContainerHeader.appendChild(jobTitle);
        jobContainerHeader.appendChild(jobStatus);

        let jobDescription = document.createElement('p');
        jobDescription.textContent = job.jobDescription;

        let requiredSkills = document.createElement('div');
        requiredSkills.classList.add('required-skills');

        let yearsOfExperience = document.createElement('p');
        yearsOfExperience.textContent = job.yearsOfExperience;
        yearsOfExperience.classList.add('yearsOfExperience');

        let jobSalary = document.createElement('span');
        jobSalary.style.fontWeight = '600';
        jobSalary.textContent = job.jobSalary;

        requiredSkills.appendChild(yearsOfExperience);
        requiredSkills.appendChild(jobSalary);

        jobContainer.appendChild(jobContainerHeader);
        jobContainer.appendChild(jobDescription);
        jobContainer.appendChild(requiredSkills);

        jobContainer.appendChild(document.createElement('hr'))
        listedJobs.appendChild(jobContainer);
    });
}
