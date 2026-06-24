window.addEventListener('DOMContentLoaded', () => {
    const airports = [
            {
                iata: "LTA",
                name: "Hackpines City / Latta Int'l Airport",
                city: "Hackpines City"
            },{
                iata: "HDI",
                name: "Hackpines City / Heidi Int'l Airport",
                city: "Hackpines City"
            },{
                iata: "LTA / HDI",
                name: "Hackpines City / All airports",
                city: "Hackpines City"
            },{
                iata: "PAR",
                name: "Parmesan",
                city: "Parmesan"
            },{
                iata: "SIN",
                name: "Singapore",
                city: "Singapore"
            },{
                iata: "JFK",
                name: "New York, NY / John F. Kennedy Int'l Airport",
                city: "New York"
            },{
                iata: "LGA",
                name: "New York, NY / LaGuardia Int'l Airport",
                city: "New York"
            },{
                iata: "JFK / LGA",
                name: "New York, NY / All airports",
                city: "New York"
            }, {
                iata: "BOS",
                name: "Boston, MA",
                city: "Boston"
            },{
                iata: "LAX",
                name: "Los Angeles, CA",
                city: "Los Angeles"
            },{
                iata: "SFO",
                name: "San Fransisco, CA",
                city: "San Fransisco"
            },{
                iata: "BTV",
                name: "Burlington, VT",
                city: "Burlington"
            }
        ];

    function predictPrice(){
        const predictLine = document.getElementById('price-predict');
        const departureSearch = document.getElementById('departure-search');
        const arrivalSearch = document.getElementById('arrival-search');
        const prediction = document.getElementById("flight-price-prediction");
        const flightsStartingFrom = document.getElementById('flights-starting-from');
        const dateInput = document.getElementById('date-input');

        const departureAirport = airports.find(
            airport => `${airport.iata} – ${airport.name}`.trim() === departureSearch.value.trim()
        );

        const arrivalAirport = airports.find(
            airport => `${airport.iata} – ${airport.name}`.trim() === arrivalSearch.value.trim()
        );


        flightsStartingFrom.innerText = "Flights starting from ";

        if(departureAirport && arrivalAirport && dateInput.value.trim()){
            predictLine.style.display = 'block';

            if(departureAirport.city === arrivalAirport.city){
                prediction.innerText = "No flights available";
                flightsStartingFrom.innerText = "";
            }else{
                prediction.innerText = "$420"
            }
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

    let adultsNo = 1;
    let childrenNo = 0;
    let infantsNo = 0;

    document.getElementById("class-done-btn").addEventListener("click", () => {
        const adults = Number(document.getElementById("adult-count").value);
        const children = Number(document.getElementById("children-count").value);
        const infants = Number(document.getElementById("infant-count").value);

        const passengers = adults + children + infants;

        classInput.textContent = `${cabin}, ${passengers} Passenger${passengers !== 1 ? "s" : ""}`;

        adultsNo = adults;
        childrenNo = children;
        infantsNo = infants;

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

    document.querySelectorAll(".tab-selector").forEach(button => {
        button.addEventListener("click", ()=>{
            document.querySelectorAll(".tab-selector").forEach(btn => {
                btn.classList.remove("active");
            });
            button.classList.add("active");
            console.log(button.id);
            const buttonClicked = button.id;

            document.querySelectorAll(".section-thing").forEach(section => {
                section.style.display = "none";
            });
            if(buttonClicked === "tab-selector-book-flight"){
                document.getElementById("book-flights").style.display = "block";
            }else if(buttonClicked === "tab-selector-check-in"){
                document.getElementById("check-in").style.display = "block";
            }else if(buttonClicked === "tab-selector-flight-status"){
                document.getElementById("flight-status").style.display = "block";
            }
        })
    });

    const searchByInput = document.getElementById("search-by-input");
    const searchByDropdown = document.getElementById("search-by-dropdown");

    const codeSection = document.getElementById("search-by-code");
    const routeSection = document.getElementById("search-by-route");

    routeSection.style.display = "none";

    searchByInput.addEventListener("click", ()=>{
        if(searchByDropdown.style.display === "block"){
            searchByDropdown.style.display = "none";
        }else{
            searchByDropdown.style.display = "block";
        }
    });

    searchByDropdown.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", () => {
            const type = item.dataset.type;
            searchByInput.textContent = item.textContent.trim();

            codeSection.style.display = "none";
            routeSection.style.display = "none";

            if(type === "code"){
                codeSection.style.display = "block";
            }else{
                routeSection.style.display = "block";
            }

            searchByDropdown.style.display = "none";
        });
    });

    window.addEventListener("click", (e) => {
        if(!e.target.closest(".search-by-picker")){
            searchByDropdown.style.display = "none";
        }
    });

    flatpickr("#flight-search-date", {
        mode: "single",
        showMonths: 1,
        dateFormat: "d M Y"
    });

    airportSelector("status-departure-input", "status-departure-dropdown", ".status-departure");
    airportSelector("status-arrival-input", "status-arrival-dropdown", ".status-arrival");

    document.querySelectorAll(".book-now").forEach(button => {
        button.addEventListener("click", () => {
            const val = button.dataset.location;
            const arrivalSearch = document.getElementById('arrival-search');

            arrivalSearch.value = val;
            document.getElementById("body").scrollIntoView({
                behavior: "smooth"
            });
        })
    });

    function parseDate(date){
        const months = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12",
        }

        const [day,month,year] = date.split(" ");
        return `${year}-${months[month]}-${day.padStart(2, "0")}`
    }

    document.getElementById("search-btn").addEventListener("click", (e) => {
        e.preventDefault();
        const departureSearch = document.getElementById("departure-search");
        const arrivalSearch = document.getElementById("arrival-search");
        const dateInput = document.getElementById("date-input");
        const routeType = routeInput.innerText.trim() === "Round trip" ? "round" : "one";
        let dateFrom;
        let dateTo;

        try{
            const fromCode = String(departureSearch.value.split(" – ")[0]).trim();
            const fromCodeParsed = fromCode.replaceAll(" / ", "_").trim();
            const fromName = String(departureSearch.value.split(" – ")[1]).trim();

            const toCode = String(arrivalSearch.value.split(" – ")[0]).trim();
            const toCodeParsed = toCode.replaceAll(" / ", "_").trim();
            const toName = String(arrivalSearch.value.split(" – ")[1]).trim();

            const fromAirport = airports.find(
                airport => airport.iata === fromCode && airport.name === fromName
            );

            const toAirport = airports.find(
                airport => airport.iata === toCode && airport.name === toName
            );

            console.log(dateInput.value.split("  to  ").length);
            if(dateInput.value.split("  to  ").length === 2){
                dateFrom = dateInput.value.split("  to  ")[0].trim();
                dateTo = dateInput.value.split("  to  ")[1].trim();
            }else{
                if(routeType === "round"){
                    dateFrom = dateInput.value.split("  to  ")[0].trim();
                    dateTo = dateInput.value.split("  to  ")[0].trim();
                }else{
                    dateFrom = dateInput.value.split("  to  ")[0].trim();
                    dateTo = "n-a";
                }
            }

            const dateFromParsed = parseDate(dateFrom);
            const dateToParsed = dateTo === "n-a" ? "n-a" : parseDate(dateTo);

            // console.log(fromAirport);
            // console.log(toAirport);
            //
            // console.log(fromCode);
            // console.log(fromName);
            // console.log(toCode);
            // console.log(toName);
            // console.log(adultsNo);
            // console.log(childrenNo);
            // console.log(infantsNo);

            if(fromAirport && toAirport){
                if(dateInput.value.trim()){
                    const params = new URLSearchParams({
                        from: fromCodeParsed,
                        to: toCodeParsed,
                        type: routeType,
                        adults: adultsNo,
                        children: childrenNo,
                        infants: infantsNo,
                        cabin: cabin.trim().toLowerCase().replaceAll(" ", "-"),
                        date_from: dateFromParsed,
                        date_to: dateToParsed
                    });

                    window.location.href = `./flights/?${params.toString()}`;
                }else{
                    alert("Please enter a valid date")
                }
            }else{
                alert("Please enter a valid airport")
            }
        }catch(e){
            console.log(e);
            alert("Please enter all fields");
        }
    });

    document.getElementById("booking-search-btn").addEventListener("click", (e) => {
        e.preventDefault();
        const surnameInput = document.getElementById("surname-input");
        const givenNameInput = document.getElementById("given-name-input");
        const bookingRefInput = document.getElementById("booking-ref-input");

        if(surnameInput.value.trim() && givenNameInput.value.trim() && bookingRefInput.value.trim()){
            if(bookingRefInput.value.trim().length === 13 || bookingRefInput.value.trim().length === 14 || bookingRefInput.value.trim().length === 6){
                const params = new URLSearchParams({
                    surname: surnameInput.value.trim().toUpperCase(),
                    given_name: givenNameInput.value.trim().toUpperCase(),
                    booking_ref: bookingRefInput.value.trim().toUpperCase(),
                });

                window.location.href = `./bookings/?${params.toString()}`;
            }else{
                alert("Please enter a valid booking reference number or e-ticket number");
            }
        }
        else{
            alert("Please enter all fields");
        }
    });

    document.getElementById("check-status").addEventListener("click", (e) => {
        e.preventDefault();
        const searchBy = document.getElementById("search-by-input");
        const statusDepartureInput = document.getElementById("status-departure-input");
        const statusArrivalInput = document.getElementById("status-arrival-input");
        const flightNoInput = document.getElementById("flight-number");
        const dateInput = document.getElementById("flight-search-date");

        const searchByParsed = searchBy.innerText.split("Search by ")[1].toLowerCase().trim().replaceAll(" ", "_");

        if(dateInput.value.trim() && ((statusDepartureInput.value.trim() && statusArrivalInput.value.trim() && searchBy.innerText.trim() === "Search by route") || (flightNoInput.value.trim() && searchBy.innerText.trim() === "Search by flight number"))){
            if(searchByParsed === "flight_number"){
                const params = new URLSearchParams({
                    search_by: searchByParsed,
                    code: `OR${flightNoInput.value.trim()}`,
                    date: parseDate(dateInput.value.trim())
                });
                window.location.href = `./status/?${params.toString()}`;
            }else{
                const fromCode = String(statusDepartureInput.value.split(" – ")[0]).trim();
                const fromCodeParsed = fromCode.replaceAll(" / ", "_").trim();
                const fromName = String(statusDepartureInput.value.split(" – ")[1]).trim();

                const toCode = String(statusArrivalInput.value.split(" – ")[0]).trim();
                const toCodeParsed = toCode.replaceAll(" / ", "_").trim();
                const toName = String(statusArrivalInput.value.split(" – ")[1]).trim();

                const fromAirport = airports.find(
                    airport => airport.iata === fromCode && airport.name === fromName
                );

                const toAirport = airports.find(
                    airport => airport.iata === toCode && airport.name === toName
                );

                if(fromAirport && toAirport){
                    const params = new URLSearchParams({
                        search_by: searchByParsed,
                        date: parseDate(dateInput.value.trim()),
                        from: fromCodeParsed,
                        to: toCodeParsed
                    });

                    window.location.href = `./status/?${params.toString()}`;
                }else{
                    console.log(searchByParsed);
                    alert("Please enter a valid airport");
                }
            }
        }else{
            alert("Please enter all fields");
        }
    });
});