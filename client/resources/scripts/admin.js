let data = [];
let sportData = [];
let myAccount = [];
let myTransaction = [];
let account = null;
let url = "http://localhost:5156/api/data";
let url2 = "http://localhost:5156/api/account/";
let url3 = "http://localhost:5156/api/transaction/"

let hasRedirected = localStorage.getItem('hasRedirected') || 'false';
let myAccounts = [];


async function handleOnLoad() {
    getAllData();
    
    await getAllAccounts();
    account = JSON.parse(localStorage.getItem('passBy'));
    console.log("Account retrieved:", account);

    await getAllAccounts();
    console.log("Account after load:", account);
    

    await loadData();
}

async function loadData() {
    await getAllData();
    displayData();
    loadCardData();
}


// -----------------------------------------------------------------DATA----------------------------------------------------------------//


async function getAllData() {
  try {
      let response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      data = await response.json();
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}

async function getAllBought() {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        data = await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }

async function displayData() {
    let html = `<table class="table">
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Price</th>
       <th>Sport</th>
        <th>Team</th>
        <th>Rating</th>
       <th>Descriptions</th>
        <th>Category</th>
        <th>Bought</th>
       <th>Biddable</th>
        <th>Edit</th>
     
     
    </tr>`;
      data.forEach((data) => {
          html += `<tr>
              <td>${data.firstName}</td>
              <td>${data.lastName}</td>
              <td>${data.price}</td>
              <td>${data.sport}</td>
              <td>${data.team}</td>
              <td>${data.rating}</td>
              <td>${data.descriptions}</td>
              <td>${data.category}</td>
              <td><button onclick="handleBought(${data.inventoryID})" style="background-color: ${data.bought === 'T' ? 'yellow' : ''}">T/F</button></td>
              <td><button onclick="handleBid(${data.inventoryID})" style="background-color: ${data.isBiddable === 'T' ? 'green' : ''}">T/F</button></td>
              <td><button onclick='handleEditForm(${data.inventoryID})'>Edit</button></td>
          </tr>`;
      });
     
      document.getElementById("app").innerHTML = html;
}

function reloadPage() {
    getAllData();
    displayData();

}

function handleAddForm() {   
    let html = `<form id="handleAdd" onsubmit="return false">
    <label for="firstName">First Name</label><br>
    <input type="text" id="firstName" name="firstName" required><br>

    <label for="firstName">Last Name</label><br>
    <input type="text" id="lastName" name="lastName" required><br>

    <label for="lastName">Sport</label><br>
    <input type="text" id="sport" name="sport" required><br>

    <label for="sport">Rating</label><br>
    <input type="number" id="rating" name="rating" max="10" min="1"  required><br>

    <label for="rating">Price</label><br>
    <input type="text" id="price" name="price" required><br>

    <label for="price">Team</label><br>
    <input type="text" id="team" name="team" required><br>

    <label for="category">Category</label><br>
    <input type="text" id="category" name="category" required><br>

    <label for="descriptions">Description</label><br>
    <input type="text" id="descriptions" name="descriptions" required><br>

    <label for="picture">picture</label><br>
    <input type="text" id="picture" name="picture" required><br>

    <button onclick = "handleAdd()">Save</button>
</form><br>
<button onclick="location.reload()">Back</button>`;
    document.getElementById("app").innerHTML = html;
}

function handleAdd() {
    let newCard = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        sport: document.getElementById('sport').value,
        rating: document.getElementById('rating').value,
        team: document.getElementById('team').value,
        price: document.getElementById('price').value,
        category: document.getElementById('category').value,
        descriptions: document.getElementById('descriptions').value,
        isBiddable: "F",
        bought: "F",
        picture: document.getElementById('picture').value
   };
    console.log(newCard);

    fetch(url, {
        method: "POST",
        body: JSON.stringify(newCard),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(() => {
        handleOnLoad();
        location.reload();
    });
}

function handleEditForm(inventoryID) {
    const cardData = data.find(data => data.inventoryID === inventoryID);
    console.log(cardData)
    if (!cardData) {
        console.error("Card data not found.");
        return;
    }

    let html = `<form id="editForm" onsubmit="return false">
                    <label for="firstName">First Name</label><br>
                    <input type="text" id="firstName" name="firstName" value="${cardData.firstName}" required><br>

                    <label for="firstName">Last Name</label><br>
                    <input type="text" id="lastName" name="lastName" value="${cardData.lastName}" required><br>

                    <label for="lastName">Sport</label><br>
                    <input type="text" id="sport" name="sport" value="${cardData.sport}" required><br>

                    <label for="sport">Rating</label><br>
                    <input type="number" id="rating" name="rating" max="10" min="1" value="${cardData.rating}" required><br>

                    <label for="rating">Price</label><br>
                    <input type="text" id="price" name="price" value="${cardData.price}" required><br>

                    <label for="price">Team</label><br>
                    <input type="text" id="team" name="team" value="${cardData.team}" required><br>

                    <label for="category">Category</label><br>
                    <input type="text" id="category" name="category" value="${cardData.category}" required><br>

                    <label for="descriptions">Description</label><br>
                    <input type="text" id="descriptions" name="descriptions" value="${cardData.descriptions}" required><br>

                    <label for="category">isBiddable</label><br>
                    <input type="text" id="isBiddable" name="isBiddable" value="${cardData.isBiddable}" required><br>

                    <label for="picture">picture</label><br>
                    <input type="text" id="picture" name="picture" value="${cardData.picture}" required><br>

                    <label for="bought">bought</label><br>
                    <input type="text" id="bought" name="bought" value="${cardData.bought}" required><br>

                    <button onclick = "handleEdit(${cardData.inventoryID})">Save</button>
                </form><br>
                <button onclick="location.reload()">Back</button>`;
    document.getElementById("app").innerHTML = html;
}

async function handleEdit(inventoryID) {
    
   let updatedCard = {
        inventoryID: inventoryID,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        sport: document.getElementById('sport').value,
        rating: document.getElementById('rating').value,
        team: document.getElementById('team').value,
        price: document.getElementById('price').value,
        category: document.getElementById('category').value,
        descriptions: document.getElementById('descriptions').value,
        isBiddable: document.getElementById('isBiddable').value,
        bought: document.getElementById('bought').value,
        picture: document.getElementById('picture').value
   }
    
console.log(updatedCard)
   const response = await fetch(`${url}/${inventoryID}`, {
    method: "PUT",
    body: JSON.stringify(updatedCard),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
});

if (!response.ok) {
    console.error('Failed to update database:', response.statusText);
} else {
    console.log('Update successful');
}
}

async function handleBid(inventoryID) {
    const cardItem = data.find(data => data.inventoryID === inventoryID);
    console.log(cardItem)
    cardItem.isBiddable = cardItem.isBiddable === 'T' ? 'F' : 'T';

    document.querySelector(`button[onclick='handleBid(${inventoryID})']`).style.backgroundColor = cardItem.isBiddable === 'T' ? 'green' : '';

    const response = await fetch(`${url}/${inventoryID}`, {
        method: "PUT",
        body: JSON.stringify(cardItem),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    
    if (!response.ok) {
        console.error('Failed to update database:', response.statusText);
    } else {
        console.log('Update successful');
    }
}

async function handleBought(inventoryID) {
    const cardItem = data.find(data => data.inventoryID === inventoryID);
    console.log(cardItem)
    cardItem.bought = cardItem.bought === 'T' ? 'F' : 'T';

    document.querySelector(`button[onclick='handleBought(${inventoryID})']`).style.backgroundColor = cardItem.bought === 'T' ? 'yellow' : '';

    const response = await fetch(`${url}/${inventoryID}`, {
        method: "PUT",
        body: JSON.stringify(cardItem),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    
    if (!response.ok) {
        console.error('Failed to update database:', response.statusText);
    } else {
        console.log('Update successful');
    }
    
}


// -----------------------------------------------------------------ACCOUNTS----------------------------------------------------------------//


async function getAllAccounts() {
    try {
        let response = await fetch(url2);
        if (!response.ok) throw new Error('Network response was not ok');
        myAccounts = await response.json();
        console.log(myAccounts);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function displayAccounts() {

    document.getElementById("app").style.display = "none";
    document.getElementById("data").style.display = "none";

    let html = `<table class="table">
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
       <th>Password</th>
        <th>Admin</th>
        <th>Address</th>
       <th>Zip Code</th>
        <th>City</th>
        <th>State</th>
        <th>Delete</th>
     
     
    </tr>`;
    myAccounts.forEach((account) => {
          html += `<tr>
              <td>${account.fName}</td>
              <td>${account.lName}</td>
              <td>${account.email}</td>
              <td>********</td>
              <td><button onclick="handleBought(${account.accountID})" style="background-color: ${account.isAdmin === 'T' ? 'yellow' : ''}">T/F</button></td>
              <td>${account.address}</td>
              <td>${account.zip}</td>
              <td>${account.city}</td>
              <td>${account.state}</td>
            <td><button onclick='handleDeleteAccount(${account.accountID})'>Delete</button></td>

          </tr>`;
      });
      document.getElementById("app2").innerHTML = html;
}

async function handleDeleteAccount(accountID) {
    await fetch(url2 + accountID, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    window.location.reload();
}

function handleAddAdmin() {
    let newAdmin = {
        fName: document.getElementById('firstName').value,
        lName: document.getElementById('lastName').value,
        email: document.getElementById('sport').value,
        password: document.getElementById('rating').value,
        isAdmin: 'T'
    };
    console.log(newAdmin);

    fetch(url2, {
        method: "POST",
        body: JSON.stringify(newAdmin),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(() => {
        handleOnLoad();
        location.reload();
    });
}

async function handleAddAccount(){
    let newAccount = {
        IsAdmin: "T",
        IsLoggedin: "F",
        Fname: document.getElementById("firstName").value,
        Lname: document.getElementById("lastName").value,
        Email: document.getElementById("email").value,
        Password: document.getElementById("password").value,
        Address: "123wall",
        City: "Tuscaloosa",
        State: "Alabama",
        Zip: "35407"
      
    };
 
    console.log(newAccount);
    await fetch(url2, {
        method: "POST",
        body: JSON.stringify(newAccount),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      window.location.reload()
}

function handleAddAccountForm() {   
    let html = `<form id="handleAddAccount()" onsubmit="return false">
    <label for="firstName">First Name</label><br>
    <input type="text" id="firstName" name="firstName" required><br>

    <label for="firstName">Last Name</label><br>
    <input type="text" id="lastName" name="lastName" required><br>

    <label for="email">Email</label><br>
    <input type="text" id="email" name="email" required><br>

    <label for="Password">Password</label><br>
    <input type="text" id="password" name="password" required><br>

    <button onclick = "handleAddAccount()">Save</button>
</form><br>
<button onclick="location.reload()">Back</button>`;
    document.getElementById("app").innerHTML = html;
}

async function signInHome() {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    const account = myAccounts.find(
        (acc) => acc.email === email && acc.password === password
    );

    if (account) {
        console.log('Login successful!');
        account.isLoggedin = "T";  // Set login status locally

        try {
            // Log URL and data being sent
            const url = url2 + account.accountID;
            console.log(`Fetching URL: ${url}`);
            console.log("Account data being sent:", JSON.stringify(account));

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(account)
            });

            // Check response status
            if (response.ok) {
                localStorage.setItem('passBy', JSON.stringify(account));
                console.log("Account stored in localStorage:", account);

                if (account.isAdmin === "T") {
                    window.location.href = './admin.html';
                } else {
                    window.location.href = './index6.html';
                }
            } else {
                console.error("Failed to update login status on the server:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    } else {
        alert('Incorrect email or password');
    }
}

async function toggleLoginStatus() {
    try {
        let account = JSON.parse(localStorage.getItem('passBy'));

        if (!account) {
            console.error("Account not found for login/logout toggle.");
            return;
        }

        // Toggle login status
        account.isLoggedin = account.isLoggedin === "T" ? "F" : "T";

        // Update the account on the server
        const response = await fetch(url2 + account.accountID, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(account)
        });

        if (response.ok) {
            localStorage.setItem('passBy', JSON.stringify(account));

            // Redirect based on the new login status and admin status
            if (account.isLoggedin === "T") {
                if (account.isAdmin === "T") {
                    window.location.href = './admin.html';
                } else {
                    window.location.href = './index6.html';
                }
                localStorage.setItem('hasRedirected', 'true');
            } else {
                localStorage.setItem('hasRedirected', 'false');
                window.location.href = './index.html';
            }
        } else {
            console.error('Failed to update login status on server');
        }
    } catch (error) {
        console.error('Error toggling login status:', error);
    }
}


// -----------------------------------------------------------------TRANSACTION----------------------------------------------------------------//


async function viewAllTransactions(){
    try {
        let response = await fetch(url3);
        if (!response.ok) throw new Error('Network response was not ok');
        myTransaction = await response.json();
        console.log(myTransaction);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

}

async function displayBought() {

    document.getElementById("app").style.display = "none";
    document.getElementById("data").style.display = "none";
    document.getElementById("app2").style.display = "none";
    viewAllTransactions();

    let html = `<table class="table">
    <tr>
      <th>Transaction ID</th>
      <th>Account ID</th>
      <th>Inventory ID</th>
       <th>Price</th>
        <th>Transaction Date</th>
     
    </tr>`;
      myTransaction.forEach((transaction) => {
          html += `<tr>
              <td>${transaction.transID}</td>
              <td>${transaction.accountID}</td>
              <td>${transaction.inventoryID}</td>
              <td>${transaction.price}</td>
              <td>${transaction.transDate}</td>
          </tr>`;
      });
     
      document.getElementById("app3").innerHTML = html;
    
}