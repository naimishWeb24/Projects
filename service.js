
function nameValidation() {
    const name = document.getElementById("name").value;    
    const letters = /^[\sa-zA-Z0-9]{4,20}$/;

    if (letters.test(name)) {
        document.getElementById("nameError").innerHTML="";
        return true;
    } else {
        document.getElementById("nameError").innerHTML="Name mustbe alphanumeric and between 4 to 30 characters";
        return false;
    }
}

function bdateValidation() {
    const myDate = document.getElementById("bdate").value;
    const datePart = myDate.split('/');
    
    if (datePart.length !== 3) {
        document.getElementById("dateError").innerHTML= "enter valid date format";
        return false;
    }

    var dob = parseInt(datePart[0]);
    var bmonth = parseInt(datePart[1]);
    var byear  = parseInt(datePart[2]);
    var dobFormat = new Date(byear,bmonth-1,dob);
    

    var d = new Date();

    if (dobFormat.getDate() > d.getDate() && (dobFormat.getMonth()+1) > (d.getMonth()+1) && dobFormat.getFullYear() > d.getFullYear()) {
        document.getElementById("dateError").innerHTML= "future date is not valid"
        return false;
    } else {
        document.getElementById("dateError").innerHTML = "";
        return true;
    }
}

function emailValidation() {
    const email = document.getElementById("email").value;
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailFormat.test(email)) {
        document.getElementById("emailError").innerHTML="";
        return true;
    } else {
        document.getElementById("emailError").innerHTML = "Please please Enter valid Email";
        return false;
    }
}

function mobileValidation() {
    const mobileNumber = document.getElementById("phone").value;
    const mobileFormat =/^[1-9]{1}[0-9]{9}$/;
    if (mobileFormat.test(mobileNumber) == false) {
        document.getElementById("mobileError").innerHTML =" please enter Valid Mobile number";
        return false;
    } else if( mobileNumber == "") {
        document.getElementById("mobileError").innerHTML ="Please Enter Mobile";
        return false;
    } else {
        document.getElementById("mobileError").innerHTML = "";
        return true;
    }
}

function submitForm() {
    if (document.getElementById("empId").value) {
        updateData();
    } else {
        insertData();
    }
}

function insertData() {
    
    let isNameValid = nameValidation(),
        isEmailValid = emailValidation(),
        isMobileValid = mobileValidation(),
        isBdateValid = bdateValidation();
    
    let isFormValid = isNameValid &&
        isEmailValid &&
        isMobileValid &&
        isBdateValid ;

    if(isFormValid) {
        

        
        var employeeId = localStorage.length;
        var name = document.getElementById("name").value;
        var gender = document.querySelector('input[name = "gender"]:checked').value;
        var bdate = document.getElementById("bdate").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        
        var hobbies = [];
        var checkboxes = document.getElementsByName("hobbies");
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                hobbies.push(checkbox.value);
            }
        });

        
        const userData = {
            id: employeeId,
            name : name,
            gender : gender,
            bdate : bdate,
            email : email,
            phone : phone,
            hobbies: hobbies
        };  
        userData.id = document.getElementById("empId").value;
        userData.id = employeeId++;
        localStorage.setItem("userData"+ userData.id,JSON.stringify(userData));
      
        window.alert("Data Succesfully Inserted into localStorage.");
    

        displayUserData(userData);
        clearFormData();
    }
}

function clearFormData() {
    document.getElementById("employeeForm").reset();
}

function displayUserData(userData) {
    var tableBodyBasic = document.getElementById("tableData");
   

    var newRow = tableBodyBasic.insertRow();
   

    newRow.innerHTML = `
        <tr>
            <td>${userData.name}</td>
            <td>${userData.gender}</td>
            <td>${userData.bdate}</td>
            <td>${userData.email}</td>
            <td>${userData.phone}</td>
            <td>${userData.hobbies.join(', ')}</td>
            <td>
                <button class="editbutton" style="" onclick="editData('${userData.id}',this)">Edit</button>
                <button class="deleteButton" style="" onclick="deleteData(this)">Delete</button>
            </td>
        </tr>
        `;
    
}
   


function deleteData(button) {
    var result = confirm("Are you sure you want to delete record ?")
    if(result) {
        var row = button.parentNode.parentNode;  // it's return <tr>  data
        var table = row.parentNode;        // it's Returns tr.parentNode = <tbody>
        table.deleteRow(row.rowIndex-1);  // it's delete row of table 
    }
}

function editData(id,button) {
    var row = button.parentNode.parentNode;  // it's return <tr>  data
    var employeeData = JSON.parse(localStorage.getItem("userData" + id));  // get data

    document.getElementById("name").value = employeeData.name  // get Name Value
    
    if (employeeData.gender.toLowerCase() === 'male') {        // Get gender Value
        document.getElementById('genderMale').checked = true;
    } else {
        document.getElementById('genderFemale').checked = true;
    }

    document.getElementById("bdate").value = employeeData.bdate // Get Birthdate
    document.getElementById("email").value = employeeData.email;  // get email
    document.getElementById("phone").value = employeeData.phone;  // get Mobile number
    document.getElementById("empId").value = id;

    const hobbies = employeeData.hobbies;
    document.getElementById("hobbies1").checked = hobbies.includes("Cricket");
    document.getElementById("hobbies2").checked = hobbies.includes("Chess");
    document.getElementById("hobbies3").checked = hobbies.includes("Music");
   
    let currentEditRow = row;
}

function updateData() {
    let isNameValid = nameValidation(),
    isEmailValid = emailValidation(),
    isMobileValid = mobileValidation(),
    isBdateValid = bdateValidation();

let isFormValid = isNameValid &&
    isEmailValid &&
    isMobileValid &&
    isBdateValid ;

if(isFormValid) {
    var employeeId = document.getElementById("empId").value;

    // Retrieve the stored data for the given ID
    var storedData = JSON.parse(localStorage.getItem("userData" + employeeId));

    // Update the stored data with the new values from the form
    storedData.name = document.getElementById("name").value;
    storedData.gender = document.querySelector('input[name = "gender"]:checked').value;
    storedData.bdate = document.getElementById("bdate").value;
    storedData.email = document.getElementById("email").value;
    storedData.phone = document.getElementById("phone").value;

    var hobbies = [];
    var checkboxes = document.getElementsByName("hobbies");
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            hobbies.push(checkbox.value);
        }
    });
    storedData.hobbies = hobbies;

    // Update the stored data in localStorage
   localStorage.setItem("userData" , JSON.stringify(storedData))
   
   
}
}


window.onload=localStorage.clear();
// window.onload=function () {
//     alert("doc loaded")
// }