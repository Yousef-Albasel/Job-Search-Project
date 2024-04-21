document.addEventListener('DOMContentLoaded', function() {
    /* get the data from the local storage */ 
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    let EditedJobId = sessionStorage.getItem('EditedJobId');
    let data = {};
    
    jobs.forEach(job => {
        if (job.jobId == EditedJobId) {
            data = job;
        }
    });

    console.log(data);

    if (data) {
        document.getElementById('jobTitle').value = data.jobTitle;
        document.getElementById('CompanyName').value = data.CompanyName;
        document.getElementById('jobDescription').value = data.jobDescription;
        document.getElementById('jobRequirements').value = data.jobRequirements;
        document.getElementById('jobSalary').value = data.jobSalary;
        
        let yearsOfExperienceSelect = document.getElementById('yearsOfExperience');
        for (let i = 0; i < yearsOfExperienceSelect.options.length; i++) {
            if (yearsOfExperienceSelect.options[i].value === data.yearsOfExperience) {
                yearsOfExperienceSelect.selectedIndex = i;
                break;
            }
        }
        
        let radioButtons = document.getElementsByName('JobStatus');
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].value == data.jobStatus) {
                radioButtons[i].checked = true;
                break;
            }
        }
    }

    let form = document.getElementById('editJob');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        let jobTitle = document.getElementById('jobTitle').value;
        let CompanyName = document.getElementById('CompanyName').value;
        let jobDescription = document.getElementById('jobDescription').value;
        let jobRequirements = document.getElementById('jobRequirements').value;
        let jobSalary = document.getElementById('jobSalary').value;
        let yearsOfExperience = document.getElementById('yearsOfExperience').value;
        let jobStatus = document.querySelector('input[name="JobStatus"]:checked').value;

        data.jobTitle = jobTitle;
        data.CompanyName = CompanyName;
        data.jobDescription = jobDescription;
        data.jobRequirements = jobRequirements;
        data.jobSalary = jobSalary;
        data.yearsOfExperience = yearsOfExperience;
        data.jobStatus = jobStatus;

        jobs = jobs.map(job => {
            return job.jobId == EditedJobId ? data : job;
        });

        localStorage.setItem('jobs', JSON.stringify(jobs));
        message.style.display = "block";
        setTimeout(function() {
            message.style.display = "none";
            window.location.href = "admin-dashboard.html";
        }, 3000);
        
    });
});
