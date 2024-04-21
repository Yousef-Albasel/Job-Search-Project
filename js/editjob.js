 /* get the data from the local storage */ 
 var data={};
  data=localStorage.getItem('dataform');
if (data){
    document.getElementById('jobTitle').value=data.jobTitle.value;
    document.getElementById('CompanyName').value=data.CompanyName.value;
    document.getElementById('jobDescription').value=data.jobDescription.value;
    document.getElementById('jobRequirements').value=data.jobRequirements.value;
    document.getElementById('jobSalary').value=data.jobSalary.value;
    document.getElementsByName('JobStatus').value=data.JobStatus.value;
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
     /* validate the years of experiance */
     if(exp<0 ||exp>40){
      event.preventDefault();
      jobSalary=0;

   }
   localStorage.setItem('dataform',data);

  console.log(localStorage);

})


