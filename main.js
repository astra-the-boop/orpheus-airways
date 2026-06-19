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

    function predictPrice(){
        const predictLine = document.getElementById('price-predict');
        const departureSearch = document.getElementById('departure-search');
        const arrivalSearch = document.getElementById('arrival-search');
        const prediction = document.getElementById("flight-price-prediction");

        if(departureSearch.value.trim() === arrivalSearch.value.trim()){
            prediction.innerText = "$0"
        }

        if(departureSearch.value.trim() && arrivalSearch.value.trim()){
            predictLine.style.display = 'block';
        }else{
            predictLine.style.display = 'none';
        }

    }

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

                item.innerHTML = `<b>${airport.iata}</b> – ${airport.name}`;

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
            predictPrice();
        });

        search.addEventListener("input", () => {
            renderResults(search.value);
            predictPrice()
        });

        document.addEventListener("click", e => {
            if(!e.target.closest(pickerClass)){
                dropdown.style.display = "none";
            }
            predictPrice();
        });
    }

    airportSelector("departure-search", "departure-dropdown", ".departure-picker");
    airportSelector("arrival-search", "arrival-dropdown", ".arrival-picker");

    const swapButton = document.getElementById("swap-locations");

    swapButton.addEventListener("click", (e) => {
        const departure = document.getElementById("departure-search");
        const arrival = document.getElementById("arrival-search");
        
        [departure.value, arrival.value] = [arrival.value, departure.value];
    });

    const routeInput = document.getElementById("route-type-input");
    const routeDropdown = document.getElementById("route-type-dropdown");

    routeDropdown.style.display = "none";

    routeInput.addEventListener("click", ()=>{
        if(routeDropdown.style.display === "none"){
            routeDropdown.style.display = "block";
        }else{
            routeDropdown.style.display = "none";
        }
    });

    routeDropdown.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", ()=>{
            routeInput.value = item.textContent.trim();
            routeInput.dataset.value = item.dataset.value;
            routeDropdown.style.display="none";
            routeInput.classList.add("selected");
            if(routeInput.dataset.value === "one"){
                routeInput.innerText = "One way";
                flatpickr("#date-input", {
                    mode: "single",
                    minDate: "today",
                    dateFormat: "d M Y",
                    showMonths: 2,
                    locale: {
                        rangeSeparator: "  to  "
                    }
                });

            }else{
                routeInput.innerText = "Round trip";
                flatpickr("#date-input", {
                    mode: "range",
                    minDate: "today",
                    dateFormat: "d M Y",
                    showMonths: 2,
                    locale: {
                        rangeSeparator: "  to  "
                    }
                });
            }
        })
    });

    const classInput = document.getElementById("class-input");
    const classDropdown = document.getElementById("class-dropdown");

    classDropdown.style.display = "none";

    classInput.addEventListener("click", ()=>{
        if(classDropdown.style.display === "none"){
            classDropdown.style.display = "block";
        }else{
            classDropdown.style.display = "none";
        }
    });

    let cabin = "Economy class";

    document.querySelectorAll(".class-btn").forEach(button => {
        button.addEventListener("click", ()=>{
            document.querySelectorAll(".class-btn").forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");
            cabin = button.dataset.class;
        });
    });

    document.getElementById("class-done-btn").addEventListener("click", () => {
        const adults = Number(document.getElementById("adult-count").value);
        const children = Number(document.getElementById("children-count").value);
        const infants = Number(document.getElementById("infant-count").value);

        const passengers = adults + children + infants;

        classInput.textContent = `${cabin}, ${passengers} Passenger${passengers !== 1 ? "s" : ""}`

        classDropdown.style.display = "none";
    });

    function passengerPlusMinusBtn(container, btnClass){
        const cont = document.getElementById(container);
        const input = cont.querySelector(".pass-input");

        cont.querySelector(`.${btnClass}`).addEventListener("click", ()=>{
            if(btnClass==="plus"){
                input.value = Number(input.value) + 1;
            }else{
                if(container === "adult-pass"){
                    if(Number(input.value) > 1){
                        input.value = Number(input.value) - 1;
                    }else if(Number(input.value) <= 1){
                        input.value = 1;
                    }
                }else if(container !== "adult-pass"){
                    if(Number(input.value) > 0){
                        input.value = Number(input.value) - 1;
                    }else if(Number(input.value) <=0){
                        input.value = 0;
                    }
                }
            }
        })
    }

    passengerPlusMinusBtn("adult-pass", "plus");
    passengerPlusMinusBtn("child-pass", "plus");
    passengerPlusMinusBtn("infant-pass", "plus");
    passengerPlusMinusBtn("adult-pass", "minus");
    passengerPlusMinusBtn("child-pass", "minus");
    passengerPlusMinusBtn("infant-pass", "minus");

    document.addEventListener("click", (e) => {
        if(!e.target.closest(".type-picker")){
            routeDropdown.style.display = "none";
        }
        if(!e.target.closest(".class-picker")){
            classDropdown.style.display = "none";
        }
    });

    flatpickr("#date-input", {
        mode: "range",
        minDate: "today",
        dateFormat: "d M Y",
        showMonths: 2,
        locale: {
            rangeSeparator: "  to  "
        }
    });
});