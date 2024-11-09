let data = [];
let sportData = [];
let myAccount = [];
let account = null;
let url = "http://localhost:5156/api/data";
let url2 = "http://localhost:5156/api/account/";
 
let hasRedirected = localStorage.getItem('hasRedirected') || 'false';
let myAccounts = [];
 


async function handleOnLoad() {
    localStorage.setItem('hasRedirected', 'false');
    await getAllAccounts();
    await logIn();
    await loadData(); 
        account = myAccount[0];
        console.log(account)
        isDirected(account);
    
}
 

async function getAllAccounts() {
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
    displayData();
    loadCardData();
}
 
async function logIn(accountID) {
    
    let response = await fetch(url2 + accountID, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    if (response.status === 200) {
        myAccount = await response.json();
        account = myAccount[0]; 
        console.log(myAccount)
        console.log(account)
    }
    console.log(account);
}
 
async function isDirected(account) {
    console.log(hasRedirected)
    console.log(account)

    if (!account || hasRedirected === 'true') {
        console.log("Redirection already handled or account data is missing.");
        return;

    } else{
        await checkLogin(account)
    }

}

async function checkLogin(account) {
 
    console.log("Checking login status...");
    console.log("Account:", account);
 
    if (account.isLoggedin === 'T') {
        console.log("Redirecting to index6.html");
        localStorage.setItem('hasRedirected', 'true'); 
        window.location.href = './index6.html';
    } else {
        console.log("Redirecting to index.html");
        localStorage.setItem('hasRedirected', 'true'); 
        window.location.href = './index.html';
    }
}


async function handleLogOut(){
    await logIn()
    console.log(account)
    await logOut(account)
}

async function logOut(account){
    console.log(account)
    console.log(account.accountID)
    await fetch(url2 + account.accountID, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });

    hasRedirected = localStorage.getItem('hasRedirected') || 'false';
    logIn()
    await checkLogin(account)
}

async function signInHome() {
   
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    const account = myAccounts.find(
        (acc) => acc.email === email && acc.password === password
      );

      let newAccount = {
        AccountID : account.accountID,
        Email : account.email,
        Password : account.password,
        FName : account.fName,
        LName :  account.lName,
        Address : account.address,
        City : account.city,
        State : account.state,
        Zip : account.zip,
        IsAdmin : "F",
        IsLoggedin : "T"
    };

      if (account) {
        console.log('Login successful!');
        await fetch(url2 + newAccount.AccountID, {
    
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(newAccount) 
          });
        logIn(newAccount.AccountID);

      } else {
        alert('Incorrect email or password');
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



  async function displayData(limit = 5) {
      let html = `<div class="row">`;

      data.slice(0,limit).forEach(function(data) {

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


  async function getSport(sport) {
        console.log(sport)

        await getAllData();

        sportData = data.filter(item => item.sport === sport);
    
        // Store and log the filtered sport data
        localStorage.setItem('sportData', JSON.stringify(sportData));
        console.log(sportData);
        displayTeamsOnNewPage(sportData);
        localStorage.setItem('data', JSON.stringify(data)); 
        displaySport(data);
}


async function getCategory(category) {

    await getAllData();

    sportData = data.filter(item => item.category === category);

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
                </div>
            </div>
        </main>
    `;
    document.getElementById("solo").innerHTML = html;
}



