
  let data = []
  let url = "http://localhost:5156/api/Data"
   
  function handleOnLoad() {
      loadData()
  }
   
  async function loadData() {
      await getAllData()
      displayData()
      getBaseball()
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
    let html = `<div class="row">`

    data.forEach(function(data){
        html += `
            <div class="card m-4" style="width: 18rem;">
                <img src="${data.pic}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${data.firstName} ${data.lastName}</h5>
                    <p class="card-text">${data.team}</p>
                    <p class="card-text">${data.sport}</p>
                    <a href="./index5.html" class="btn btn-primary " onclick = "passInfo('${data.pic}','${data.firstName}','${data.lastName}','${data.sport}','${data.price}','${data.team}')">More Info</a>
                </div>
            </div>
        `
    })
    html += "</div>"
    document.getElementById("data").innerHTML = html
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

    // Check if the element exists before trying to set innerHTML
    const data2Element = document.getElementById("data2");
    if (data2Element) {
        data2Element.innerHTML = html;
    } else {
        console.error('Element with ID "data2" not found');
    }
}



