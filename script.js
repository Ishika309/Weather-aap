async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = 'eeb27717117af203a7bf4c6f59a6d2df';
  const resultBox = document.getElementById('weatherResult');

  if (!city) {
    resultBox.innerHTML = `<p style="color:red;">❗ Please enter a city name.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  console.log("City:", city);
  console.log("Fetch URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    resultBox.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Weather:</strong> ${data.weather[0].main} - ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultBox.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
  }
}
