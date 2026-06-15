window.addEventListener('DOMContentLoaded', () => {
    const airports = [
            {
                iata: "LTA",
                name: "Hackpines City / Latta Int'l Airport",
            },{
                iata: "HDI",
                name: "Hackpines City / Heidi Int'l Airport"
            },{
                iata: "LTA / HDI",
                name: "Hackpines City / All airports"
            },{
                iata: "PAR",
                name: "Parmesan"
            },{
                iata: "SIN",
                name: "Singapore"
            },{
                iata: "JFK",
                name: "New York, NY / John F. Kennedy Int'l Airport"
            },{
                iata: "LGA",
                name: "New York, NY / LaGuardia Int'l Airport"
            },{
                iata: "JFK / LGA",
                name: "New York, NY / All airports"
            }, {
                iata: "BOS",
                name: "Boston, MA"
            },{
                iata: "LAX",
                name: "Los Angeles, CA"
            },{
                iata: "SFO",
                name: "San Fransisco, CA"
            },{
                iata: "BTV",
                name: "Burlington, VT"
            }
        ];

    const departureSearch = document.getElementById("departure-search");
    const departureDropdown = document.getElementById("departure-dropdown");

    function renderResults(query = ""){
        departureDropdown.innerHTML = "";
        const matches = airports.filter(a =>
            `${a.iata} ${a.name}`.toLowerCase().includes(query.toLowerCase()));
        matches.forEach(airport => {
            const item = document.createElement("div");
            item.className = "dropdown-item";

            item.innerHTML = `
            <b>${airport.iata}</b> – ${airport.name}`;

            item.addEventListener("click", () => {
                departureSearch.value = `${airport.iata} – ${airport.name}`;
                departureDropdown.style.display = "none";
            });

            departureDropdown.appendChild(item);
        });

        departureDropdown.style.display = matches.length ? "block" : "none";
    }

    departureSearch.addEventListener("focus", () => {
        renderResults(departureSearch.value);
    });

    departureSearch.addEventListener("input", () => {
        renderResults(departureSearch.value);
    });

    document.addEventListener("click", e => {
        if(!e.target.closest(".departure-picker")){
            departureDropdown.style.display = "none";
        }
    })
});