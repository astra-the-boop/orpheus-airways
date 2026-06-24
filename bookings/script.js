document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const surname = params.get("surname");
    const givenName = params.get("given_name");
    const bookingRef = params.get("booking_ref");

    document.getElementById("booking-ref").innerHTML = `<h2>${bookingRef}</h2>`;
    document.getElementById("surname").innerText = surname;
    document.getElementById("given-name").innerText = givenName;
})