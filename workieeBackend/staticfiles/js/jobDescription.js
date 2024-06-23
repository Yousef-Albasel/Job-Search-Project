document.addEventListener('DOMContentLoaded', function() {
    displayJobDetails();
});

async function displayJobDetails() {
    let selectedJobId = sessionStorage.getItem('selectedJobId');

    if (selectedJobId) {
        let jobs = await getJobData();
        console.log(jobs);
        var job = jobs.find(function(job) {
            return job.id == selectedJobId;
        });
        if (job) {
            document.querySelector('.job-header h1').textContent = job.jobtitle;
            document.querySelector('.comp-name').textContent = job.companyname;
            document.querySelector('.comp-address').textContent = job.companyaddress;
            document.querySelector('.job-details .y-exp').textContent = "Experience Needed: " + job.yearsofexperience + " Years of Experience.";
            document.querySelector('.job-details .salary').textContent = "Salary: E£ " + job.jobsalary;
            document.querySelector('.job-details .job-status').textContent = "Status: " + job.jobstatus;
            document.querySelector('.job-description p').textContent = job.jobdescription;
            document.querySelector('.job-requirements p').textContent = job.jobrequirements;
        } else {
            console.error('Job not found.');
        }
    } else {
        console.error('No selected jobId found in sessionStorage.');
    }
}

async function getJobData() {
    try {
        const response = await fetch('/browse', {
            headers: { 
                'X-Requested-With': 'XMLHttpRequest',
            }
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
