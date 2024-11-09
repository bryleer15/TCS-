let data = [];
let sportData = [];
let myAccount = [];
let account = null;
let url = "http://localhost:5156/api/data";
let url2 = "http://localhost:5156/api/account";
let hasRedirected = localStorage.getItem('hasRedirected') || 'false';


async function handleOnLoad() {
    getAllData().then(() => {
        displaySport('sportData');
        displayTeamsOnNewPage();
        displaySportsOnNewPage();
    });

    localStorage.setItem('hasRedirected', 'false');
    await logIn();
    await loadData(); 
        account = myAccount[0];
        console.log(account)
        isDirected(account);
}

async function loadData() {
    await getAllData();
    displayData();
    loadCardData();
}
 
async function logIn() {
    let response = await fetch(url2);
    if (response.status === 200) {
        myAccount = await response.json();
        account = myAccount[0]; 
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
        checkLogin(account)
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

function openModal(name, price) {
    const modal = document.getElementById("buyModal");
    modal.style.display = "block";
    document.getElementById("modalTitle").innerText = `Purchase ${name}`;
    document.getElementById("modalPrice").innerText = `Price: $${price}`;
}

// Function to close the modal
function closeModal() {
    document.getElementById("buyModal").style.display = "none";
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
    console.log(`Sport clicked: ${sport}`);  // Debug log
    getTabSport(sport).then(() => {
       displaySport('sportData');  
       displayTeamsOnNewPage(sport)
    });
}


async function getTabSport(sport) {
    await getAllData();  

    sportData = data.filter(item => item.sport === sport);  
    localStorage.setItem('sportData', JSON.stringify(sportData));  
}

async function getTabTeam(team, sport) {
    await getTabSport(sport);  

    let teamData = data.filter(item => item.team === team);  
    localStorage.setItem('teamData', JSON.stringify(teamData)); 
}
