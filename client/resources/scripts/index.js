let data = [];
let sportData = [];
let myAccount = [];
let account = null;
let url = "http://localhost:5156/api/data";
let url2 = "http://localhost:5156/api/account";
 
// Retrieve redirection status from localStorage
let hasRedirected = localStorage.getItem('hasRedirected') || 'false';
 
async function handleOnLoad() {
    // localStorage.setItem('hasRedirected', 'false');
    // await logIn();
    await loadData(); 
        account = myAccount[0];
        checkLogin(account); // Only pass the relevant account object
    
}
 
async function loadData() {
    await getAllData();
    displayData();
    loadCardData();
}
 
// async function logIn() {
//     let response = await fetch(url2);
//     if (response.status === 200) {
//         myAccount = await response.json();
//         account = myAccount[0]; // Store the first account in account variable
//     }
//     console.log(account);
// }
 
// async function checkLogin(account) {
//     console.log(hasRedirected)
//     // Avoid re-running if redirection is already handled
//     if (!account || hasRedirected === 'true') {
//         console.log("Redirection already handled or account data is missing.");
//         return;
//     }
 
//     console.log("Checking login status...");
//     console.log("Account:", account);
 
//     // Redirect based on login status
//     if (account.isLoggedin === 'T') {
//         console.log("Redirecting to index6.html");
//         localStorage.setItem('hasRedirected', 'true'); // Store redirection flag in localStorage
//         window.location.href = './index6.html';
//     } else {
//         console.log("Redirecting to index.html");
//         localStorage.setItem('hasRedirected', 'true'); // Store redirection flag in localStorage
//         window.location.href = './index.html';
//     }
// }



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



