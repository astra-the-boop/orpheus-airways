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

    function airportSelector(inputId, dropdownId, pickerClass){
        const search = document.getElementById(inputId);
        const dropdown = document.getElementById(dropdownId);

        function renderResults(query = ""){
            dropdown.innerHTML = "";

            const matches = airports.filter(a =>
                `${a.iata} ${a.name}`.toLowerCase().includes(query.toLowerCase()));

            matches.forEach(airport => {
                const item = document.createElement("div");

                item.className = "dropdown-item";

                item.innerHTML = `<b>${airport.iata} – ${airport.name}`;

                item.addEventListener("click", () => {
                    search.value = `${airport.iata} – ${airport.name}`;

                    dropdown.style.display = "none";
                });

                dropdown.appendChild(item);
            });

            dropdown.style.display = matches.length ? "block" : "none";
        }

        search.addEventListener("focus", () => {
            renderResults(search.value);
        });

        search.addEventListener("input", () => {
            renderResults(search.value);
        });

        document.addEventListener("click", e => {
            if(!e.target.closest(pickerClass)){
                dropdown.style.display = "none";
            }
        });
    }

    airportSelector("departure-search", "departure-dropdown", ".departure-picker");
    airportSelector("arrival-search", "arrival-dropdown", ".arrival-picker");

    const swapButton = document.getElementById("swap-locations");

    swapButton.addEventListener("click", (e) => {
        const departure = document.getElementById("departure-search");
        const arrival = document.getElementById("arrival-search");
        
        [departure.value, arrival.value] = [arrival.value, departure.value];
    })
});