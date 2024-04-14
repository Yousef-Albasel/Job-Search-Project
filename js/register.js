const companyCheckbox = document.querySelector("#company-admin");
const companyField = document.querySelector('.input-field[name="company-field"]');
companyCheckbox.addEventListener('change', function() {
        if (this.checked) {
            companyField.style.display = 'flex';

        } else {
            companyField.style.display = 'none';
        }
    });