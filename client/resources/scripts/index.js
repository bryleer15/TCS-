let data = [];
let url = "http://localhost:5156/api/data";

function handleOnLoad() {
    loadData();
}

async function loadData() {
    await getAllData();
    displayData();
}

async function getAllData() {
    try {
        let response = await fetch(url);
        console.log("Response status:", response.status); // Check status
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        data = await response.json();
        console.log("Fetched data:", data); // Debug fetched data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayData() {
    let html = `<div class="row">`;

    data.forEach(data => {
        html += `
            <div class="card m-4" style="width: 18rem;">
                <img src="data:image/jpeg;base64,${data.pictureBase64}" class="card-img-top" alt="${data.firstName} ${data.lastName}">
                <div class="card-body">
                    <h5 class="card-title">${data.firstName} ${data.lastName}</h5>
                    <p class="card-text">${data.team}</p>
                    <p class="card-text">${data.sport}</p>
                    <a href="./index5.html" class="btn btn-primary" onclick="passInfo('${data.pictureBase64}','${data.firstName}','${data.lastName}','${data.sport}','${data.price}','${data.rating}','${data.team}', '${data.description}')">More Info</a>
                </div>
            </div>
        `;
    });

    html += "</div>";
    document.getElementById("data").innerHTML = html;
}

function selectSport(sport) {
    localStorage.setItem('selectedSport', sport);
    window.location.href = './index2.html';
}

async function loadSelectedSportData() {
    const selectedSport = localStorage.getItem('selectedSport');
    if (!selectedSport) {
        console.error("No sport selected");
        return; // Exit if no sport is selected
    }

    await loadSportData(selectedSport); // Pass the selected sport here
}

async function loadSportData(sport) {
    let filteredData = data.filter(data => data.sport === sport); // Use already fetched data
    let html = `<div class="row">`;

    filteredData.forEach(data => {
        html += `
            <div class="flip-card m-4" style="width: 18rem;">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="data:image/jpeg;base64,${data.pictureBase64}" class="card-img-top" alt="${data.firstName} ${data.lastName}" style="width:100%; height: 385px;">
                        <h5>${data.firstName} ${data.lastName}</h5>
                    </div>
                    <div class="flip-card-back">
                        <h5>${data.firstName} ${data.lastName}</h5>
                        <p>Team: ${data.team}</p>
                        <p>Sport: ${data.sport}</p>
                        <p>PSA Rating: ${data.rating}</p>
                        <p>Price: $${data.price}</p>
                        <p>${data.description}</p>
                        <a href="#" class="btn btn-primary">Buy Now</a>
                    </div>
                </div>
            </div>
        `;
    });

    html += "</div>"; // Close the row div
    const data2Element = document.getElementById("data2");
    if (data2Element) {
        data2Element.innerHTML = html; // Inject the HTML into the page
    } else {
        console.error('Element with ID "data2" not found');
    }
}

function getBaseball() {
    selectSport('Baseball');
}

function getBasketball() {
    selectSport('Basketball');
}

async function passInfo(picBase64, firstName, lastName, sport, price, rating, team, description) {
    const cardData = {
        pic: `data:image/jpeg;base64,${picBase64}`,
        firstName,
        lastName,
        sport,
        price,
        rating,
        team,
        description
    };

    localStorage.setItem('cardData', JSON.stringify(cardData));
    window.location.href = './index5.html';
}

function loadCardData() {
    const cardData = JSON.parse(localStorage.getItem('cardData'));

    if (cardData) {
        console.log("Loaded card data:", cardData);
        buildTable2(cardData);
    } else {
        console.error("No card data found in localStorage");
    }
}

function buildTable2(cardData) {
    console.log("Storing card data:", cardData);

    let html = `
       <main class="container">
          <div class="row">
              <div class="col-md-6">
                  <h2 id="card-title">Card Information</h2>
                  <p id="card-description"><strong>Name:</strong> ${cardData.firstName} ${cardData.lastName}</p>
                  <p id="card-description"><strong>Rating:</strong> ${cardData.rating}</p>
                  <p id="card-description"><strong>Price:</strong> $${cardData.price}</p>
                  <p id="card-description"><strong>Team:</strong> ${cardData.team}</p>
                  <p id="card-description"><strong>Sport:</strong> ${cardData.sport}</p>
                  <p id="card-description"><strong>Description:</strong> ${cardData.description}</p>
              </div>
              <div class="col-md-6 text-end">
                  <div class="image-container">
                      <img id="card-image" src="${cardData.pic}" alt="Card Image" class="img-fluid" style="max-width: 100%; height: auto;">
                  </div>
              </div>
          </div>
       </main>
    `;

    document.getElementById("solo").innerHTML = html;
}
