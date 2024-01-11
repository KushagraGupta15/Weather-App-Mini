const apiKey ="76d7ed8102a7e3e2a10a289445dcbea5";
    const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchbox=document.querySelector(".search input");
    const searchbtn=document.querySelector(".search button");
    const weatherIcon =document.querySelector(".weather-icon");
    async function checkWeather(city){
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if(response.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
        document.querySelector(".days-forecast").style.display="none";
      }
      else{
        var data = await response.json();
      console.log(data);

      document.querySelector(".city").innerHTML=data.name;
      document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
      document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
      document.querySelector(".wind").innerHTML=data.wind.speed+"km/h";
      if(data.weather[0].main =="Clouds"){
        weatherIcon.src="clouds.png";
      }
      else if(data.weather[0].main =="Rain"){
        weatherIcon.src="rain.png";
      }
      else if(data.weather[0].main =="Drizzle"){
        weatherIcon.src="drizzle.png";
      }
      else if(data.weather[0].main =="Clear"){
        weatherIcon.src="clear.png";
      }
      document.querySelector(".weather").style.display="block";
      document.querySelector(".error").style.display="none";
      document.querySelector(".days-forecast").style.display="block";
      }
    }
    searchbtn.addEventListener("click",()=>{
      checkWeather(searchbox.value);
    })
  
    

const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const API_KEY = "76d7ed8102a7e3e2a10a289445dcbea5"; // API key for OpenWeatherMap API
const createWeatherCard = (cityName, weatherItem, index) => {
    // if(index === 0) { // HTML for the main weather card
    //     return `<div class="weather">
    //     <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
    //     <h1 class="temp">${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h1>
    //                 <h2>${cityName}</h2>
    //                 <div class="details">
    //                 <div class="col">
    //                 <img src="humidity.png">
    //                 <div>
    //                 <p class="humidity">${weatherItem.main.humidity}%</p>
    //         <p>Humidity</p>
    //       </div>
    //     </div> 
    //     <div class="col">
    //       <img src="wind.png">
    //       <div>
    //         <p class="wind">${weatherItem.wind.speed} km/h</p>
    //         <p>Wind Speed</p>
    //       </div>
    //     </div>`;
    // } else { // HTML for the other five day forecast card
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} km/h</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    // }
}
const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        // Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
        // Clearing previous weather data
      searchbox.value = "";
        searchbox.innerHTML = "";
        weatherCardsDiv.innerHTML = "";
        // Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                searchbox.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}
const getCityCoordinates = () => {
    const cityName = searchbox.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });
}
searchbtn.addEventListener("click", getCityCoordinates);
searchbox.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());
