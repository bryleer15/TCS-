
let url = "http://localhost:5156/api/Data"




async function handleAddAccount(){
    let newAccount = {
        Fname: document.getElementById("inputFName").value,
        Lname: document.getElementById("inputLName").value,
        Email: document.getElementById("inputEmail").value,
        Password: document.getElementById("inputPassword").value,
        Address: document.getElementById("inputAddress").value,
        City: document.getElementById("inputCity").value,
        State: document.getElementById("inputState").value,
        Zip: document.getElementById("inputZip").value
      
      
    };
 
    console.log(newAccount);
    await fetch(url, {
        method: "POST",
        body: JSON.stringify(newAccount),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
}