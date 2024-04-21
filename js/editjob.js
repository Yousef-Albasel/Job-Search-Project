document.addEventListener('DOMContentLoaded', function() {
  /* get the data from the local storage */ 

  let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

 let data=jobs[1];
  // data=localStorage.getItem('editedJob');
  console.log(data)
if (data){
    document.getElementById('jobTitle').value=data.jobTitle;
    console.log(data.jobTitle);
    document.getElementById('CompanyName').value=data.CompanyName;
    document.getElementById('jobDescription').value=data.jobDescription;
    document.getElementById('jobRequirements').value=data.jobRequirements;
    document.getElementById('jobSalary').value=data.jobSalary;
    let yearsOfExperienceSelect = document.getElementById('yearsOfExperience');
        for (let i = 0; i < yearsOfExperienceSelect.options.length; i++) {
            if (yearsOfExperienceSelect.options[i].value === data.yearsOfExperience) {
                yearsOfExperienceSelect.selectedIndex = i;
                break; // Exit loop once the correct option is found
            }
        }
    let radioButtons = document.getElementsByName('JobStatus');
        for (let i = 0; i < radioButtons.length; i++) {
          console.log(radioButtons[i].value);
          console.log(data.jobStatus);
            if (radioButtons[i].value == data.jobStatus) {
                radioButtons[i].checked = true;
                break; // Exit loop once the correct radio button is found
            }
        }
}

let form=document.getElementById('editJob');
form.addEventListener('submit' , function(event){
   
let jobSalary=document.getElementById('jobSalary').value;
let exp=document.getElementById('yearsOfExperiance').value;


/* validate the salary */
    if(jobSalary<0){
        event.preventDefault();
        jobSalary=0;
     }
     
   localStorage.setItem('dataform',data);

  console.log(localStorage);

})


})