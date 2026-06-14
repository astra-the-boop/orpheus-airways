window.addEventListener('DOMContentLoaded', () => {
    new Choices("#departure-select", {
        searchEnabled: true,
        itemSelectText: "",
        shouldSort: false
    });

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
        ]
});