
// Creaamos una constante con la key para acceder a la api del clima(https://home.openweathermap.org)
const API_KEY = `244337e0301d76c4e7a92aa270dd0e2a`;

const fetchData = position =>{
    const {latitude, longitude} = position.coords;
    fetch(` https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}
const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location:'Usted se encuentra en :' + '   ' +  data.name,
        description:'El cielo está:' + ' ' + data.weather[0].main,
        humidity:'La humedad en el ambiente :'+ ' ' + data.main.humidity +'%',
        pressure:'La presión atmosferica :' + ' ' + data.main.pressure + ' ' + 'Hectopascales',
        temperature:'La temperatura :' + ' ' +data.main.temp + '°C',
        date: ' La fecha de hoy :' + +'' +getDate(),
        
    }

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    cleanUp();
}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
    container.style.display ='flex';
    
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0'+(date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}



// Creamos una variable para obtener la posicion donde se encuentra el usuario
const onload = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}
