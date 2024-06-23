document.addEventListener('DOMContentLoaded', function(){
    displayJobs();
    Search();
});


function Search(){
    let searchOption = document.querySelector("#exp").value.toLowerCase();
    let searchBar = document.querySelector(".search-input").value.toLowerCase();
    let jobSearch = document.querySelectorAll(".block");
    let jobTitleSearch = document.getElementsByTagName('h5');
    let yExpSearch = document.getElementsByClassName('y-exp');

    
    for (let i=0; i<jobTitleSearch.length; i++){
        if(jobTitleSearch[i].innerHTML.toLowerCase().indexOf(searchBar) >= 0 && yExpSearch[i].innerHTML.toLowerCase().indexOf(searchOption) >= 0){
            jobSearch[i].style.display = "";
        }
        else{
            jobSearch[i].style.display = "none";
        }
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

async function displayJobs(){
    // const userCredentials = sessionStorage.getItem("UserAccount");
    // const user = JSON.parse(userCredentials);
    let jobs = await getJobData();
    let userAccountStr = sessionStorage.getItem("UserAccount");
    if (!userAccountStr) {
        alert('No user account found in session storage.');
        return;
    }
    var userAccount = JSON.parse(userAccountStr);
    //let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    let listedJobs = document.querySelector('.content');

    let noJobsMessage = document.createElement('p');
    noJobsMessage.classList.add('no-jobs-message');
    noJobsMessage.textContent = "No Jobs Found";

    if(jobs.length == 0){
        listedJobs.appendChild(noJobsMessage)
    }

    jobs.forEach(function(job) {
        let jobBlock = document.createElement('div');
        jobBlock.classList.add('block');
        jobBlock.setAttribute('data-job-id', job.id); 

        let jobBlockHeader = document.createElement('div');
        jobBlockHeader.classList.add('comp-name');

        let image = document.createElement('img');
        image.setAttribute('src', "/static/images/company_logo.png");
        image.setAttribute('alt', 'Company Logo')

        let jobTitle = document.createElement('h5');
        jobTitle.classList.add('job-title');
        jobTitle.textContent = job.jobtitle;

        let compNameAddress = document.createElement('p');
        let compName = document.createElement('span');
        compName.classList.add('bolded');
        compName.textContent = job.companyname;
        compNameAddress.appendChild(compName);
        let compAddress = document.createElement('span');
        compAddress.textContent = ` - ${job.companyaddress}`;
        compNameAddress.appendChild(compAddress);
        

        jobBlockHeader.appendChild(image);
        jobBlockHeader.appendChild(jobTitle);
        jobBlockHeader.appendChild(compNameAddress);

        let jobDescription = document.createElement('p');
        jobDescription.classList.add('discription')
        jobDescription.textContent = job.jobdescription;

        let yearsOfExperience = document.createElement('p');
        yearsOfExperience.classList.add('experiences');
        let yExp = document.createElement('span');
        yExp.classList.add('y-exp');
        yExp.textContent = job.yearsofexperience;
        yearsOfExperience.appendChild(yExp);
        let yText = document.createElement('span');
        yText.textContent = ` Years of Experience.`;
        yearsOfExperience.appendChild(yText);
        

        let Salary = document.createElement('p');
        Salary.classList.add('salary');
        let salaryNum = document.createElement('span');
        salaryNum.classList.add('bolded');
        salaryNum.textContent = `E£${job.jobsalary}`;
        Salary.appendChild(salaryNum);
        let perMonth = document.createElement('span');
        perMonth.textContent = ` / month`
        Salary.appendChild(perMonth)

        let Buttons = document.createElement('div');
        Buttons.classList.add('job-buttons');

        let applyButton = document.createElement('button');
        applyButton.setAttribute('onclick', "location.href='#'");
        applyButton.textContent = 'Apply'
        applyButton.addEventListener('click', function() {
        let jobId = applyButton.parentElement.parentElement.getAttribute('data-job-id');
            if(userAccount.is_company_admin === false){
                if(applyForJob(jobId)){
                applyButton.classList.add("applied")}
                applyButton.innerHTML = "Applied";
            }else{
                alert("You are not allowed to apply for jobs!");
            };
        });
        let detailsButton = document.createElement('button');
        detailsButton.setAttribute('onclick', "getJobId(this)");
        detailsButton.textContent = 'Details';
        
        Buttons.appendChild(applyButton);
        Buttons.appendChild(detailsButton);

        jobBlock.appendChild(jobBlockHeader);
        jobBlock.appendChild(jobDescription);
        jobBlock.appendChild(yearsOfExperience);
        jobBlock.appendChild(Salary);
        jobBlock.appendChild(Buttons);

        listedJobs.appendChild(jobBlock);

    });
}

function getJobId(button) {
    let selectedJobId = button.parentElement.parentElement.getAttribute('data-job-id');
    sessionStorage.setItem('selectedJobId', selectedJobId);
    window.location.href = "details";
}

async function applyForJob(jobId) {
    let userAccountStr = sessionStorage.getItem("UserAccount");
    let apps = await getApplications();


    if (!userAccountStr) {
        alert('No user account found in session storage.');
        return;
    }
    var userAccount = JSON.parse(userAccountStr);
    const user_id = userAccount.id;
    const existingApp = apps.find(app => app.user_id === user_id && app.job_id === jobId);

    if (existingApp) {
        alert('You have already applied for this job.');
        return false;
    }

    const data = {
        user_id,
        job_id: jobId
    };
    try {
        const response = await fetch('apply/', { 
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
        
        return (responseData.status === 'success')? true : false;
    } catch (error) {
        console.error('There was a problem applying for the job:', error);
        alert('An unexpected error occurred. Please try again later.'); 
    }
}

async function getApplications() {
    try {
        const response = await fetch('getApplications/', {
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
