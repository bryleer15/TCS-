let data = [];
let sportData = [];
let myAccount = [];
let account = null;
let url = "http://localhost:5156/api/data";
let url2 = "http://localhost:5156/api/account/";
let url3 = "http://localhost:5156/api/transaction/";
let url4 = "http://localhost:5156/api/bidding/";

 
let hasRedirected = localStorage.getItem('hasRedirected') || 'false';
let newAccount = localStorage.getItem('passBy')
let myAccounts = [];


async function handleOnLoad() {
    getAllData().then(() => {
        displaySport('sportData');
        displayTeamsOnNewPage();
        displaySportsOnNewPage();
    });


    account = JSON.parse(localStorage.getItem('passBy'));
    console.log("Account retrieved:", account);  
    
    console.log("Account after load:", account); 
    await loadData();
}

async function loadData() {
    await getAllData();
    
}

// -----------------------------------------------------------------ACCOUNTS----------------------------------------------------------------//


async function signInHome() {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    const account = myAccounts.find(
        (acc) => acc.email === email && acc.password === password
    );

    if (account) {
        console.log('Login successful!');
        account.isLoggedin = "T"; 

        try {
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

        account.isLoggedin = account.isLoggedin === "T" ? "F" : "T";

        const response = await fetch(url2 + account.accountID, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(account)
        });

        if (response.ok) {
            localStorage.setItem('passBy', JSON.stringify(account));

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


// -----------------------------------------------------------------DATA----------------------------------------------------------------//


async function getAllData() {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        data = await response.json();
        localStorage.setItem('data', JSON.stringify(data)); 
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function displaySport(dataKey) {
    let html = `<div class="row">`;
    sportData = JSON.parse(localStorage.getItem(dataKey));

    if (!sportData) {
        console.error(`No data found for key: ${dataKey}`);
        return;
    }
    sportData = sportData.filter(item => item.bought === 'F');
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
                        <button class="btn-primary" onclick="openModal('${item.firstName} ${item.lastName}', ${item.price},${item.inventoryID})">Buy Now</button>
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

function displayTeamsOnNewPage(selectedSport) {
    
    const storedSportData = JSON.parse(localStorage.getItem('sportData'));

    if (!storedSportData) {
        console.error("No sport data found.");
        return;
    }

   
    let teams = [...new Set(storedSportData.map(item => item.team))];  
    let teamsList = document.getElementById("teams");

    teamsList.innerHTML = "";  

    
    teams.forEach(team => {
        let li = document.createElement("li");
        li.className = "list-group-item";

        let button = document.createElement("button");
        button.className = "btn btn-link text-decoration-none";
        button.textContent = team;
        button.onclick = () => handleTeamClick(team, selectedSport);  

        li.appendChild(button);
        teamsList.appendChild(li);
    });
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
        li.className = "list-group-item";

        let button = document.createElement("button");
        button.className = "btn btn-link text-decoration-none";
        button.textContent = sport;
        button.onclick = () => handleSportClick(sport);

        li.appendChild(button);
        sportList.appendChild(li);
    });
}

function handleTeamClick(team, sport) {
    getTabTeam(team, sport).then(() => displaySport('teamData'));  
}

function handleSportClick(sport) {
    console.log(`Sport clicked: ${sport}`);  
    getTabSport(sport).then(() => {
       displaySport('sportData');  
       displayTeamsOnNewPage(sport)
    });
}

async function getTabSport(sport) {
    await getAllData();  

    sportData = data.filter(item => item.sport === sport && item.bought === 'F');  
    localStorage.setItem('sportData', JSON.stringify(sportData));  
}

async function getTabTeam(team, sport) {
    await getTabSport(sport);  

    let teamData = data.filter(item => item.team === team);  
    localStorage.setItem('teamData', JSON.stringify(teamData)); 
}


// -----------------------------------------------------------------TRANSACTIONS----------------------------------------------------------------//


function openModal(name, price, inventoryID) {
    const modal = document.getElementById("buyModal");
    modal.style.display = "block";
    document.getElementById("modalTitle").innerText = `Purchase ${name}`;
    document.getElementById("modalPrice").innerText = `Price: $${price}`;

    let html = `<form id="purchaseForm" onsubmit="event.preventDefault(); handleAddTransaction(${inventoryID}, ${price})">
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

    document.getElementById("buynow").innerHTML = html;
}

function closeModal() {
    document.getElementById("buyModal").style.display = "none";
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
   
    document.getElementById("data2").style.display = "none";


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

// -----------------------------------------------------------------BIDDING----------------------------------------------------------------//
