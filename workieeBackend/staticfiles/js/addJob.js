document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');

  form.addEventListener('submit', function(event) {
    // Get data from form
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function(value, key){
        data[key] = value;
    });

    // Validate form inputs
    if (!validateForm(data)) {
        // If form is not valid, the default form submission will proceed
        return;
    }

    console.log('Form data is valid:', data);
  });

  function validateForm(data) {
    // Validate salary input
    if (data.jobSalary < 0) {
        data.jobSalary = 0;
    }

    // Validate other required fields
    if (!data.jobTitle || !data.CompanyName || !data.CompanyAddress || !data.jobDescription || !data.jobRequirements) {
        alert('Please fill in all required fields.');
        return false;
    }

    return true;
  }
});
