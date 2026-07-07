const apiKey = "98fb7489b8c40d28c3642effcff5dd61";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

// Recherche via bouton
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Veuillez entrer le nom d'une ville !");
    return;
  }
  getWeather(city);
});

// Recherche via Enter
cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=fr`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      showWeather(data);
    } else {
      console.log(data);
      alert("Ville introuvable ! Vérifiez l'orthographe.");
    }
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la récupération des données !");
  }
}

function showWeather(data) {
  weatherResult.classList.remove("hidden");

  // Ville et pays
  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent = `🌡️ Température : ${data.main.temp} °C`;
  document.getElementById("humidity").textContent = `💧 Humidité : ${data.main.humidity}%`;
  document.getElementById("description").textContent = `🌤️ ${data.weather[0].description}`;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("weatherIcon").alt = data.weather[0].description;

  // Vent et pression
  document.getElementById("wind").textContent = `💨 Vent : ${data.wind.speed} m/s`;
  document.getElementById("pressure").textContent = `⚡ Pression : ${data.main.pressure} hPa`;

  // Lever et coucher du soleil
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});
  document.getElementById("sunrise").textContent = `🌅 Lever du soleil : ${sunrise}`;
  document.getElementById("sunset").textContent = `🌇 Coucher du soleil : ${sunset}`;

  // Fond dynamique selon le temps
  const mainWeather = data.weather[0].main.toLowerCase();
  if(mainWeather.includes("cloud")) {
    document.body.style.background = "linear-gradient(to top, #bdc3c7, #2c3e50)";
  } else if(mainWeather.includes("rain")) {
    document.body.style.background = "linear-gradient(to top, #4e54c8, #8f94fb)";
  } else if(mainWeather.includes("clear")) {
    document.body.style.background = "linear-gradient(to top, #fceabb, #f8b500)";
  } else if(mainWeather.includes("snow")) {
    document.body.style.background = "linear-gradient(to top, #e6dada, #274046)";
  } else {
    document.body.style.background = "linear-gradient(to top, #74ebd5, #ACB6E5)";
  }
}


// Modification pour le badge Pull Shark