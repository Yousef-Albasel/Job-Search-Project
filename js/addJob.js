document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');

  form.addEventListener('submit', function(event) {

    //prevent Default actions
    event.preventDefault(); 

    //get jobs object from local storage
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    // get data from form
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function(value, key){
        data[key] = value;
    });

    //create an id for a job
    const jobId = generateJobId(jobs);
    data[jobId] = jobId;

    //check over data
    if(data.jobSalary<0){
        event.preventDefault();
        data.jobSalary=0;
     }
    console.log(data);
    
    //push new job to jobs array
    jobs.push(data);

    //save jobs in local storage
    localStorage.setItem('jobs', JSON.stringify(jobs));

    //set message to confirm save 
    const message = document.querySelector("#message");
    
    message.style.color="green";
      message.style.display="flex";
      form.reset();
      setTimeout(function() {
        message.style.display = "none";
        window.location.href = "admin-dashboard.html";
    }, 3000);

    });
});

//create an id using unique key
function generateJobId(jobs) {
    let maxId = 0;
    jobs.forEach(function(job) {
        if (job.jobId > maxId) {
            maxId = job.jobId;
        }
    });
    return maxId + 1;
}