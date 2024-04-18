const checkBoxes = document.querySelectorAll(".job-container input[type='checkbox']");
const deleteButton = document.querySelector(".listed-jobs .control-panel .buttons button[name='delete-button']");


checkBoxes.forEach(checkBox => {
    checkBox.addEventListener('change', function() {
        const jobContainer = this.closest('.job-container');
        if (this.checked) {
            jobContainer.style.backgroundColor = '#EAEBED';
        } else {
            jobContainer.style.backgroundColor = 'transparent';
        }
    });
});


deleteButton.addEventListener('click', function() {
    checkBoxes.forEach(checkBox => {
        if (checkBox.checked) {
            const jobContainer = checkBox.closest('.job-container');
            jobContainer.style.display ='none';
        }
    });
});