document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');

  form.addEventListener('submit', function(event) {
      event.preventDefault(); 
      let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

      const jobTitle = document.getElementById('jobTitle').value;
      const jobStatus = document.querySelector('select[name="jobStatus"]').value;
      const yearsOfExperience = document.querySelector('select[name="yearsOfExperience"]').value;
      const jobSalary = document.getElementById('jobSalary').value;
      const jobDescription = document.getElementById('jobDescription').value;
      const jobRequirements = document.getElementById('jobRequirements').value;
      const companyName = document.getElementById('companyName').value;
      const companyAddress = document.getElementById('companyAddress').value;
      const jobId = generateJobId(jobs);

      let jobData = {
          jobId : jobId,
          jobTitle: jobTitle,
          jobStatus: jobStatus,
          yearsOfExperience: yearsOfExperience,
          jobSalary: jobSalary,
          jobDescription: jobDescription,
          jobRequirements: jobRequirements,
          companyName: companyName,
          companyAddress: companyAddress
      };

      jobs.push(jobData);

      localStorage.setItem('jobs', JSON.stringify(jobs));
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
function generateJobId(jobs) {
    let maxId = 0;
    jobs.forEach(function(job) {
        if (job.jobId > maxId) {
            maxId = job.jobId;
        }
    });
    return maxId + 1;
}