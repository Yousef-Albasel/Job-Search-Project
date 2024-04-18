let form=document.getElementById("addJob");

form.addEventListener('submit' , function(event){
  event.preventDefault();

  var formData = new FormData(form);
        var data = {};
        formData.forEach(function(value, key){
            data[key] = value;
        });
  
        console.log(data);

        if(data.jobSalary < 0 ){
          console.log(data.jobSalary);
          data.jobSalary=0
        }

        let jsondata=JSON.stringify(data);

        localStorage.setItem("newJob",jsondata);
        console.log(`save data `);
      form.reset();
})