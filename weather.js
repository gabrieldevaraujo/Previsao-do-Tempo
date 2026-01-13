import { callWeatherApi, filterForecast, compare, updateFinalList, listDataClimate } from './script.js'

const params = new URLSearchParams(window.location.search)

const city = params.get('city')

const icon = params.get('icon')

let cityList = listDataClimate.find(f => f.city === city)

//console.log(listDataClimate)

function renderPage() {
    const reload = document.querySelector("#updateData")
    if(!reload) return

    reload.addEventListener('click', (c) =>{
        reloadData(cityList)
    })

    showCity(city)
    actualForecast(cityList)
    futureForecast(cityList)

}

function showCity(cityName) {
    const div = document.getElementById('cityChosen')
    if (!div) return
    div.innerHTML = `<div class='city-name'>${cityName}</div>`
}

function actualForecast(cityList) {
    const div = document.getElementById('containerActualDay')
    if (!div) return

    const date = dateFormate(cityList.list[0].date)
    div.innerHTML = `   
        <div class='card fade-in'>
            <div class="date-actual">${date}</div>
            <div class="temp-actual">${cityList.tempActual}°C</div>
            <img src="${icon}" alt="Tempo" class="weather-icon-main">
            <p class="desc">${cityList.descriptionWeather}</p>
            
            <div class="info-grid-actual">
                <div class="info-item-actual">
                    <span class="label">Max</span>
                    <span class="value">${cityList.list[0].tempMax}°C</span>
                </div>
                <div class="info-item-actual">
                    <span class="label">Min</span>
                    <span class="value">${cityList.list[0].tempMin}°C</span>
                </div>
                <div class="info-item-actual">
                    <span class="label rain-label">Chuva</span>
                    <span class="value rain-value">${cityList.list[0].probRain}%</span>
                </div>
            </div>
        </div> 
    `
}


function futureForecast(cityList) {
    const div = document.getElementById('containerFutureDays')
    if (!div) return

    const cardsHtml = cityList.list.slice(1).map(m => {
        const date = dateFormate(m.date)
        return `
            <div class="forecast-card">
                <div class="date">${date}</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="label">Max</span>
                        <span class="value">${m.tempMax}°</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Min</span>
                        <span class="value">${m.tempMin}°</span>
                    </div>
                    <div class="info-item">
                        <span class="label rain-label">Chuva</span>
                        <span class="value rain-value">${m.probRain}%</span>
                    </div>
                </div>
            </div>
        `
    }).join('')

    div.innerHTML = `
        <div class="title-forecast">Próximos Dias</div>
        <div class="forecast-list">${cardsHtml}</div>
    `
}

function dateFormate(dateApi) {
    const objectDate = new Date(dateApi + "T00:00:00")

    return objectDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit'
    })
}

function reloadData(cityList){
    const city = cityList.city
    const lat = cityList.lat
    const lon = cityList.lon
    callWeatherApi(city,lat,lon)
}

renderPage()