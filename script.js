const cityForm = document.querySelector('form');
const cards = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
 
    console.log(data);
    //const citydets = data.citydets;
    //const weather = data.weather;
    
    //destructing
    const {citydets, weather} = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${citydets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
     
    //create the night and day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);



    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }else{
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);



    //remove the d-none class if present
    if(cards.classList.contains('d-none')){
        cards.classList.remove('d-none');
    }
}


const updateCity = async (city) =>{
 
    const citydets = await getCity(city);
    const weather = await getWeather(citydets.Key);

    return {citydets, weather }
}




cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with the new city
    updateCity(city)
      .then(data => updateUI(data))
      .catch(err => console.log(err));

      //set localstorage
      localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
      .then(data => updateUI(data))
      .catch(err => console.log(err));
}
