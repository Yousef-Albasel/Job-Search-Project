document.addEventListener('DOMContentLoaded', function() {
    let form = document.querySelector('form');
  
    form.addEventListener('submit', function(event) {
      var formData = new FormData(form);
      var data = {};
      formData.forEach(function(value, key){
          data[key] = value;
      });
  
      if (!validateForm(data)) {
          return;
      }
  
      console.log('Form data is valid:', data);
    });
  
    function validateForm(data) {
      if (data.jobSalary < 0) {
          data.jobSalary = 0;
      }
  
      if (!data.jobTitle || !data.CompanyName || !data.CompanyAddress || !data.jobDescription || !data.jobRequirements) {
          alert('Please fill in all required fields.');
          return false;
      }
  
      return true;
    }
  });
  