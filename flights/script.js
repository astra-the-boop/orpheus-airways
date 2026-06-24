document.addEventListener('DOMContentLoaded', ()=> {
    const params = new URLSearchParams(window.location.search);

    const from = params.get("from");
    const to = params.get("to");
    const type = params.get("type");

    const adults = params.get("adults");
    const children = params.get("children");
    const infants = params.get("infants");

    const dateFrom = params.get("date_from");
    const dateTo = params.get("date_to");

    const dateFromObj = new Date(dateFrom);
    const dateToObj = new Date(dateTo);

    const dateFromFormat = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short"
    }).format(dateFromObj);

    const dateToFormat = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short"
    }).format(dateToObj);

    document.getElementById("from-location").innerText = from;
    document.getElementById("to-location").innerText = to;

    if(type === "round"){
        document.getElementById("type").innerText = "Round trip";

        document.getElementById("date").innerText = `${dateFromFormat} to ${dateToFormat}`;
    }else{
        document.getElementById("type").innerText = "One way"
    }
});