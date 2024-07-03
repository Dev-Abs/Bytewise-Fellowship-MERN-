async function fetchData(ip) {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_IAR2Oqw32FU2N3dOxe3vVvryLa7o9&ipAddress=${ip}`
  );
  let data = await response.json();
  return data;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const ipInput = document.getElementById("ip");
  const ipAddressDisplay = document.getElementById("ip-address");
  const locationDisplay = document.getElementById("location");
  const timezoneDisplay = document.getElementById("timezone");
  const ispDisplay = document.getElementById("isp");
  const map = L.map("map").setView([0, 0], 2);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ip = ipInput.value;
    data = fetchData(ip);
    data.then((data) => {
      // why we are using then here ? , because the data is not available at the time of calling fetchData(ip) function, it is available after some time, so we are using then to get the data when it is available
      const { lat, lng } = data.location;
      var marker = L.marker([lat, lng]).addTo(map);
      map.setView([lat, lng], 13);
      var circle = L.circle([lat, lng], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(map);

      ipAddressDisplay.textContent = data.ip;
      locationDisplay.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
      timezoneDisplay.textContent = `UTC ${data.location.timezone}`;
      ispDisplay.textContent = data.isp;
    });
  });
});
