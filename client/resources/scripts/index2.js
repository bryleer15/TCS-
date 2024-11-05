let data = [];
let sportData = [];
let url = "http://localhost:5156/api/data";

function handleOnLoad() {
    getAllData().then(() => {
        displaySport('sportData');
        displayTeamsOnNewPage();
        displaySportsOnNewPage();
    });
}

async function getAllData() {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        data = await response.json();
        localStorage.setItem('data', JSON.stringify(data)); // Store fetched data in localStorage
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
                        <a href="${item.price}" class="btn-primary">Buy Now</a>
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

function displayTeamsOnNewPage() {
    const storedSportData = JSON.parse(localStorage.getItem('data'));

    if (!storedSportData) {
        console.error("No sport data found.");
        return;
    }

    let teams = [...new Set(storedSportData.map(item => item.team))];
    let teamsList = document.getElementById("teams");

    teamsList.innerHTML = ""; // Clear any existing items

    teams.forEach(team => {
        let li = document.createElement("li");
        li.className = "list-group-item";

        let button = document.createElement("button");
        button.className = "btn btn-link text-decoration-none";
        button.textContent = team;
        button.onclick = () => handleTeamClick(team);

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

function handleTeamClick(team) {
    getTabTeam(team).then(() => displaySport('teamData'));
}

function handleSportClick(sport) {
    getTabSport(sport).then(() => displaySport('sportData'));
}

async function getTabSport(sport) {
    await getAllData();

    sportData = data.filter(item => item.sport === sport);
    localStorage.setItem('sportData', JSON.stringify(sportData));
}

async function getTabTeam(team) {
    await getAllData();

    let teamData = data.filter(item => item.team === team);
    localStorage.setItem('teamData', JSON.stringify(teamData));
}
