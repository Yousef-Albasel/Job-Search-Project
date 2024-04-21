document.addEventListener('DOMContentLoaded', function() {
    displayJobDetails();
});

function displayJobDetails() {
    let selectedJobId = sessionStorage.getItem('selectedJobId');

    if (selectedJobId) {
        let job = getJobDetails(selectedJobId);

        if (job) {
            document.querySelector('.job-header h1').textContent = job.jobTitle;
            document.querySelector('.comp-name').textContent = job.CompanyName;
            document.querySelector('.comp-address').textContent = job.CompanyAddress;
            document.querySelector('.job-details .y-exp').textContent = "Experience Needed: " + job.yearsOfExperience + "Years of Experience.";
            document.querySelector('.job-details .salary').textContent = "Salary: E£" + job.jobSalary;
            document.querySelector('.job-details .job-status').textContent = "Status: " + job.jobStatus;
            document.querySelector('.job-description p').textContent = job.jobDescription;
            document.querySelector('.job-requirements p').textContent = job.jobRequirements;
        } else {
            console.error('Job not found.');
        }
    } else {
        console.error('No selected jobId found in sessionStorage.');
    }
}

function getJobDetails(jobId) {
    var jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    var selectedJob = jobs.find(function(job) {
        return job.jobId == jobId;
    });
    return selectedJob;
}
