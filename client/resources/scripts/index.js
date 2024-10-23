
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
      let response = await fetch(url)
      data = await response.json(data)
  }


  async function displayData() {
    let html = `<div class="row">`

    data.forEach(function(data){
        html += `
            <div class="card m-4" style="width: 18rem;">
                <img src="${data.pic}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.firstName} ${data.lastName}</h5>
                    <p class="card-text">${data.team}</p>
                    <p class="card-text">${data.sport}</p>
                    <a href="${data.price}" class="btn btn-primary">More Info</a>
                </div>
            </div>
        `
    })
    html += "</div>"
    document.getElementById("data").innerHTML = html
}


async function getBaseball(){
    let html = `<div class="row">`;

    data.forEach(function(data){
        if (data.sport === "Baseball") {  // Filter only Baseball sport
            html += `
                <div class="flip-card m-4" style="width: 18rem;">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img src="${data.pic}" class="card-img-top" alt="${data.firstName} ${data.lastName}" style="width:100%; height: 200px;">
                            <h5>${data.firstName} ${data.lastName}</h5>
                        </div>
                        <div class="flip-card-back">
                            <h5>${data.firstName} ${data.lastName}</h5>
                            <p>${data.team}</p>
                            <p>${data.sport}</p>
                            <a href="${data.price}" class="btn btn-primary">Buy Now</a>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    html += "</div>";
    document.getElementById("data2").innerHTML = html;
}
