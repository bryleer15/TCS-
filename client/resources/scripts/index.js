let data = [];
let sportData = [];
let myAccount = [];
let account = null;
let url = "http://localhost:5156/api/data";
let url2 = "http://localhost:5156/api/account/";
let url3 = "http://localhost:5156/api/transaction/";
 
let hasRedirected = localStorage.getItem('hasRedirected') || 'false';
let newAccount = localStorage.getItem('passBy')
let myAccounts = [];
 
async function handleOnLoad() {
   
    getAllData().then(() => { 
        displayData();
        displaySport('sportData');
        displaySportsOnNewPage();
    });

    await getAllAccounts();

    console.log("Loaded data:", data); 

    localStorage.setItem('hasRedirected', 'false');

    account = JSON.parse(localStorage.getItem('passBy'));
    console.log("Account retrieved:", account);  
        
    console.log("Account after load:", account); 
    
    await loadData();
}

 

async function getAllAccounts() {
    console.log("fetching accounts")
    try {
        let response = await fetch(url2);
        if (!response.ok) throw new Error('Network response was not ok');
        myAccounts = await response.json();
        console.log(myAccounts)
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }

async function loadData() {
    await getAllData();
    loadCardData();
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

async function getAllData() {
  try {
      let response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      data = await response.json();
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}

async function displayData(limit = 6) {
    let html = `<div class="row">`;

    data.filter(item => item.bought === 'F').slice(0, limit).forEach(function(data) {

        html += `
             <div class="card m-4" style="width: 18rem;">
                  <img class="card-img-top" src="${data.picture}" alt="${data.firstName} ${data.lastName}" style="width:100%; height: 385px;">
                <div class="card-body">
                    <h5 class="card-title">${data.firstName} ${data.lastName}</h5>
                    <p class="card-text">${data.team}</p>
                    <p class="card-text">${data.sport}</p>
                    <a href="./index5.html" class="btn btn-primary2" onclick="passInfo('${data.firstName}','${data.lastName}','${data.sport}','${data.price}','${data.rating}','${data.team}', '${data.descriptions}', '${data.picture}')">More Info</a>
                </div>
            </div>
        `;
    });

    html += "</div>";
    document.getElementById("data").innerHTML = html;
}

async function displaySport(dataKey) {
    let html = `<div class="row">`;
    sportData = JSON.parse(localStorage.getItem(dataKey));

    if (!sportData) {
        console.error(`No data found for key: ${dataKey}`);
        return;
    }

    sportData.forEach(function(item) {
        html += `
            <div class="flip-card m-4" style="width: 18rem;">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img class="card-img-top" src="${item.picture}" alt="${item.firstName} ${item.lastName}" style="width:100%; height: 385px;">
                        <h5>${item.firstName} ${item.lastName}</h5>
                    </div>
                    <div class="flip-card-back">
                        <h5>${item.firstName} ${item.lastName}</h5>
                        <p>Team: ${item.team}</p>
                        <p>Sport: ${item.sport}</p>
                        <p>PSA Rating: ${item.rating}</p>
                        <p>Price: $${item.price}</p>
                        <p>${item.descriptions}</p>
                        <button class="btn-primary" onclick="openModal('${item.firstName} ${item.lastName}', ${item.price})">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
    });

    html += "</div>";

    const data2Element = document.getElementById("data2");
    if (data2Element) {
        data2Element.innerHTML = html;
    } else {
        console.error('Element with ID "data2" not found');
    }
}

async function getSport(sport) {
        console.log(sport)

        await getAllData();

        sportData = data.filter(item => item.sport === sport && item.bought === 'F');
    
        // Store and log the filtered sport data
        localStorage.setItem('sportData', JSON.stringify(sportData));
        console.log(sportData);
        displayTeamsOnNewPage(sportData);
        localStorage.setItem('data', JSON.stringify(data)); 
        displaySport(data);
}

async function getCategory(category) {

    await getAllData();

    sportData = data.filter(item => item.category === category && item.bought === 'F');

    // Store and log the filtered sport data
    localStorage.setItem('sportData', JSON.stringify(sportData)); 
    console.log(sportData);
}

async function passInfo(firstName, lastName, sport, price, rating, team, descriptions, picture) {
      const cardData = {
         
          firstName: firstName,
          lastName: lastName,
          sport: sport,
          price: price,
          rating: rating,
          team: team,
          descriptions: descriptions,
          picture: picture
      };
  
      localStorage.setItem('cardData', JSON.stringify(cardData));
      window.location.href = './index5.html';
  
  }

function loadCardData() {
  const cardData = JSON.parse(localStorage.getItem('cardData'));

  if (cardData) {
      console.log("Loaded card data:", cardData); // Debugging line
      buildTable2(cardData);
  } else {
      console.error("No card data found in localStorage");
  }
}

function buildTable2(cardData) {
    let html = `
        <main class="container">
            <div class="row">
                <div class="col-md-6 image-container">
                    <img class="card-img-top" src="${cardData.picture}" alt="${cardData.firstName} ${cardData.lastName}">
                </div>
                <div class="col-md-6 card-info">
                <h2 id="card-title">Card Information</h2>
                    <p><strong>Name:</strong> ${cardData.firstName} ${cardData.lastName}</p>
                    <p><strong>Rating:</strong> ${cardData.rating}</p>
                    <p><strong>Price:</strong> $${cardData.price}</p>
                    <p><strong>Team:</strong> ${cardData.team}</p>
                    <p><strong>Sport:</strong> ${cardData.sport}</p>
                    <p><strong>Description:</strong> ${cardData.descriptions}</p>
                    <button class="btn-primary" onclick="openModal('${cardData.firstName} ${cardData.lastName}', ${cardData.price})">Buy Now</button>

                </div>
            </div>
        </main>
    `;
    document.getElementById("solo").innerHTML = html;
}

function displaySportsOnNewPage() {
    const storedSportData = JSON.parse(localStorage.getItem('data'));

    if (!storedSportData) {
        console.error("No sport data found.");
        return;
    }

    let sports = [...new Set(storedSportData.map(item => item.sport))];
    let sportList = document.getElementById("sports");

    sportList.innerHTML = "";

    sports.forEach(sport => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center"; // Adjusted for alignment


        let button = document.createElement("button");
        button.className = "btn btn-link text-decoration-none";
        button.textContent = sport;
        button.onclick = () => handleSportClick(sport);

        li.appendChild(button);
        sportList.appendChild(li);
    });
}

function handleSportClick(sport) {
    console.log(`Sport clicked: ${sport}`);  // Debug log
    getTabSport(sport).then(() => {
       displaySport('sportData');  
    //    displayTeamsOnNewPage(sport)
    });
}


function openModal(name, price) {
    const modal = document.getElementById("buyModal");
    modal.style.display = "block";
    document.getElementById("modalTitle").innerText = `Purchase ${name}`;
    document.getElementById("modalPrice").innerText = `Price: $${price}`;
    
    let html = `<form id="purchaseForm">
        <label for="buyerFName">First Name:</label>
        <input type="text" id="buyerFName" name="buyerFName" required>

        <label for="buyerLName">Last Name:</label>
        <input type="text" id="buyerLName" name="buyerLName" required>

        <label for="buyerCCnum">Credit Card Number:</label>
        <input type="text" id="buyerCCnum" name="buyerCCnum" required>

        <label for="buyerCVC">CVC</label>
        <input type="password" id="buyerCVC" name="buyerCVC" required>

        <button type="submit" class="btn-primary">Confirm Purchase</button>
    </form><br>`;

    // Insert the HTML into the designated container in the modal
    document.getElementById("buynow").innerHTML = html;
}



function closeModal() {
    document.getElementById("buyModal").style.display = "none";
}

async function viewTransaction(){
  
    try {
        let response = await fetch(url3 + account.accountID);
        if (!response.ok) throw new Error('Network response was not ok');
        myTransaction = await response.json();
        console.log(myTransaction)
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

}

async function displayBought() {
    // Hide unnecessary sections
    document.getElementById("app").style.display = "none";
    document.getElementById("data").style.display = "none";
    document.getElementById("app2").style.display = "none";
    document.getElementById("row").style.display = "none";


    // Call viewTransaction() to populate myTransaction and data
    await viewTransaction();

    // Filter data for bought items and matching inventoryID
    const filteredData = data.filter(item => 
        item.bought === 'T' && 
        myTransaction.some(transaction => transaction.inventoryID === item.inventoryID)
    );

    // Start with the first table (transactions)
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

    // Close the first table
    html += `</table><br/>`;

    // Add the second table (filtered data)
    html += `<table class="table">
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Category</th>
      <th>Price</th>
      <th>Team</th>
    </tr>`;

    filteredData.forEach((item) => {
        html += `<tr>
          <td>${item.firstName}</td>
          <td>${item.lastName}</td>
          <td>${item.category}</td>
          <td>${item.price}</td>
          <td>${item.team}</td>
        </tr>`;
    });

    // Close the second table
    html += `</table>`;

    // Display the HTML in the app3 div
    document.getElementById("app3").innerHTML = html;
}

async function handleAddTransaction(inventoryID, price) {
    try {
        const currentDate = new Date();
        const dateOnly = currentDate.toISOString().split('T')[0];
        console.log("Transaction Date:", dateOnly);

        let trans = {
            accountID: account.accountID,  // Ensure `account.accountID` is defined and available
            inventoryID: inventoryID,
            price: price,
            transDate: dateOnly
        };
        console.log("Transaction Data:", trans);

        const response = await fetch(url3, {
            method: "POST",
            body: JSON.stringify(trans),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (response.ok) {
            console.log("Transaction successful");
            closeModal();  // Close modal upon successful transaction
            // Optionally reload or update page here
            // handleOnLoad();
        } else {
            console.error("Transaction failed", response.statusText);
            alert("Failed to complete transaction. Please try again.");
        }
    } catch (error) {
        console.error("Error occurred:", error);
        alert("An error occurred while processing the transaction.");
    }
}

async function viewTransaction(){
  
    try {
        let response = await fetch(url3 + account.accountID);
        if (!response.ok) throw new Error('Network response was not ok');
        myTransaction = await response.json();
        console.log(myTransaction)
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

}

async function displayBought() {
   
    document.getElementById("data").style.display = "none";


    // Call viewTransaction() to populate myTransaction and data
    await viewTransaction();

    // Filter data for bought items and matching inventoryID
    const filteredData = data.filter(item => 
        item.bought === 'T' && 
        myTransaction.some(transaction => transaction.inventoryID === item.inventoryID)
    );

    // Start with the first table (transactions)
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

    // Close the first table
    html += `</table><br/>`;

    // Add the second table (filtered data)
    html += `<table class="table">
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Category</th>
      <th>Price</th>
      <th>Team</th>
    </tr>`;

    filteredData.forEach((item) => {
        html += `<tr>
          <td>${item.firstName}</td>
          <td>${item.lastName}</td>
          <td>${item.category}</td>
          <td>${item.price}</td>
          <td>${item.team}</td>
        </tr>`;
    });

    // Close the second table
    html += `</table>`;

    let app3Element = document.getElementById("app3");
    if (app3Element) {
        app3Element.innerHTML = html;
    } else {
        console.error("Element with ID 'app3' not found.");
    }
}
