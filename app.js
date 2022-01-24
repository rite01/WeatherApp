// 54dd85896f5b4e3d74ece64ed1611050
// dd85896f5b4e3d74ece64ed1611050
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchInputBox = document.getElementById('input-box');


// Event Listner Funtion on Keypress
searchInputBox.addEventListener('keypress', (event) =>{
    if(event.keyCode == 13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
    }
});

//  get Weather report
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show weather report
function showWeatherReport(weather){
    console.log(weather);


    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`; // for change name as input 

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.round(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if (weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    } else if (weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('images/haze.jpg')";
    }else if (weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    }


}
// Data manage

function dateManage (dateArg){

    let days = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["jan", "feb", "march", "April", "May", "june", "july", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} ${day}, ${year}`;

}