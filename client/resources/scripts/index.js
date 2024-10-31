
  let data = []
  let url = "http://localhost:5156/api/data"
   
  function handleOnLoad() {
      loadData()
  }
   
  async function loadData() {
      await getAllData()
      displayData()
      getBaseball()
       loadCardData()
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



    async function displayData() {

        let html = `<div class="row">`;

        data.forEach(function(data) {

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



    async function getBaseball() {
        let html = `<div class="row">`;

        data.forEach(function(data) {
            if (data.sport === "Baseball") {  // Filter only Baseball sport
                html += `
                    <div class="flip-card m-4" style="width: 18rem;">
                        <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img src="${data.pic}" class="card-img-top" alt="${data.firstName} ${data.lastName}" style="width:100%; height: 385px;">
                            <h5>${data.firstName} ${data.lastName}</h5>
                        </div>
                        <div class="flip-card-back">
                            <h5>${data.firstName} ${data.lastName}</h5>
                            <p>Team: ${data.team}</p>
                            <p>Sport: ${data.sport}</p>
                             <p>PSA Rating: ${data.rating}</p>
                              <p>Price: $${data.price}</p>
                             <p>${data.description}</p>
                            <a href="${data.price}" class="btn-primary">Buy Now</a>
                        </div>
                    </div>
                </div>
            `;
        }
    });

        html += "</div>";

        const data2Element = document.getElementById("data2");
        if (data2Element) {
            data2Element.innerHTML = html;
        } else {
            console.error('Element with ID "data2" not found');
         }
    }


    async function passInfo(picBase64, firstName, lastName, sport, price, rating, team, description) {
        const cardData = {
            pic: `data:image/jpeg;base64,${picBase64}`, // Use base64 image here
            firstName: firstName,
            lastName: lastName,
            sport: sport,
            price: price,
            rating: rating,
            team: team,
            description: description
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
