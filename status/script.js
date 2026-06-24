document.addEventListener('DOMContentLoaded', () => {
   const params = new URLSearchParams(window.location.search);

   const date = params.get("date");
   const dateObj = new Date(date);
   const dateFormat = new Intl.DateTimeFormat("en-GB", {
       day: "numeric",
       month: "short"
   }).format(dateObj);

   const searchBy = params.get("search_by");

   document.getElementById("date").innerHTML = `<p>${dateFormat}</p>`;

   if(searchBy === "flight_number"){
       const flightNo = params.get("flight_number");
       document.getElementById("flight-search").innerHTML = `<h2>${flightNo}</h2>`;
   }else{
       const from = params.get("from").replaceAll("_", "/");
       const to = params.get("to").replaceAll("_", "/");

       document.getElementById("flight-search").innerHTML = `<h2>${from} → ${to}</h2>`
   }

});