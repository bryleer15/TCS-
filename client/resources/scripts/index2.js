

function handleOnLoad() {
    displaySport();
}


async function displaySport(sportData) {
    let html = `<div class="row">`;
    sportData = JSON.parse(localStorage.getItem('sportData'));

    console.log(sportData);

    sportData.forEach(function(sportData) {
        html += `
            <div class="flip-card m-4" style="width: 18rem;">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img class="card-img-top" src="${sportData.picture}" alt="${sportData.firstName} ${sportData.lastName}" style="width:100%; height: 385px;">
                        <h5>${sportData.firstName} ${sportData.lastName}</h5>
                    </div>
                    <div class="flip-card-back">
                        <h5>${sportData.firstName} ${sportData.lastName}</h5>
                        <p>Team: ${sportData.team}</p>
                        <p>Sport: ${sportData.sport}</p>
                        <p>PSA Rating: ${sportData.rating}</p>
                        <p>Price: $${sportData.price}</p>
                        <p>${sportData.descriptions}</p>
                        <a href="${sportData.price}" class="btn-primary">Buy Now</a>
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
