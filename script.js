const keyApiWeather = '52ee7dee89097d90eaa50a080a14f6d8'
let listDataClimate = []

const cityList = [
    "Aracaju - SE",
    "Belém - PA",
    "Belo Horizonte - MG",
    "Boa Vista - RR",
    "Brasília - DF",
    "Campinas - SP",
    "Campo Grande - MS",
    "Cuiabá - MT",
    "Curitiba - PR",
    "Florianópolis - SC",
    "Fortaleza - CE",
    "Goiânia - GO",
    "João Pessoa - PB",
    "Joinville - SC",
    "Macapá - AP",
    "Maceió - AL",
    "Manaus - AM",
    "Natal - RN",
    "Palmas - TO",
    "Paulínia - SP",
    "Porto Alegre - RS",
    "Porto Velho - RO",
    "Recife - PE",
    "Rio Branco - AC",
    "Rio de Janeiro - RJ",
    "Salvador - BA",
    "Serra - ES",
    "São Luís - MA",
    "São Paulo - SP",
    "Teresina - PI",
    "Vitória - ES"
]

const inputDigit = document.querySelector("#typeCity")
const suggestCity = document.querySelector("#suggestCity")
const submitCity = document.querySelector("#formCity")
const showList = document.querySelector('#showList')

let showOptions = cityList

showOptions.forEach(city => {
    let li = document.createElement('li')
    li.textContent = city
    showList.appendChild(li) // Suggest the city according to the filter
})

showList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const city = e.target.textContent
        inputDigit.value = city
    }
})

inputDigit.addEventListener('input', (e) => { //Recieve what user is typing
    let delay

    inputDigit.addEventListener('input', (e) => {
        clearTimeout(delay) //Clean the delay timer

        delay = setTimeout(() => { //start a new timer for delay
            let nameTyped = e.target.value

            if (nameTyped === "") {
                suggestCity.innerHTML = ''
                return
            }

            let filter = cityList.filter(c => c.toLowerCase().includes(nameTyped.toLowerCase()))

            suggestCity.innerHTML = ''
            filter.forEach(city => {
                let option = document.createElement('option')
                option.textContent = city
                suggestCity.appendChild(option)
            })
        }, 500)
    })
})

submitCity.addEventListener('submit', (e) => { //Recieve the city chosen
    e.preventDefault() //Prevent the page of recharging
    let cityChosen = inputDigit.value
    if (cityList.includes(cityChosen)) { //Verify if exist the city on the list
        searchCity(cityChosen)
    }
    else {
        window.alert(`Selecione uma cidade presente nas sugestões enquanto digita.`)
    }
})

function searchCity(cityChosen) {
    const country = 'BR'
    let cityName = cityChosen.slice(0, -5)
    let state = cityChosen.slice(-2)
    let latitude = ''
    let longitude = ''
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},${country}&appid=${keyApiWeather}`) //necessary ask to take the latitude and longitude for the search on the Forecasts API
        .then(resp => resp.json())
        .then(data => {
            //console.log(data)
            latitude = data[0].lat
            longitude = data[0].lon
            callWeatherApi(cityChosen, latitude, longitude)
        })
}

//show the time of sunrise and sunset based on the timezone of São Paulo
/*function showSunTimes(sunriseUnix, sunsetUnix, timeZone) { 
    console.log(`Sunrise (${timeZone}):`, new Date(sunriseUnix * 1000).toLocaleString('default', { timeZone }))
    console.log(`Sunset (${timeZone}):`, new Date(sunsetUnix * 1000).toLocaleString('default', { timeZone }))
}
showSunTimes(sunriseUnix, sunsetUnix, 'America/Sao_Paulo')
showSunTimes(sunriseUnix, sunsetUnix, 'UTC')*/


function callWeatherApi(cityChosen, lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=pt_br&appid=${keyApiWeather}&units=metric`)
        .then(resp => resp.json())
        .then(data => {
            //console.log(data)

            const forecastListAll = data.list.map(m => { //reagrouping 40 arrays to be used on 'forecastDays'
                return {
                    date: m.dt_txt.slice(0, -9),
                    tempMax: Math.round(m.main.temp_max),
                    tempMin: Math.round(m.main.temp_min),
                    probRain: Math.round(m.pop * 100), //probabilty of raining
                }
            })

            let forecastDays = {
                city: cityChosen,
                tempActual: Math.round(data.list[0].main.temp),
                icon: data.list[0].weather[0].icon,
                weather: data.list[0].weather[0].main,
                descriptionWeather: data.list[0].weather[0].description,
                list: forecastListAll //receive the list with the 40 arrays
            }
            //console.log(forecastDays)

            filterForecast(forecastDays)
            forecastDays = ''
        })
}

function filterForecast(forecastDays) {
    let newList = []
    let pos = 0
    let previousDate = forecastDays.list[0].date
    let newDate = ''

    for (pos; pos < forecastDays.list.length; pos++) { //check all datas on the array
        newDate = forecastDays.list[pos].date //check the date according to the 'pos' on the array

        if (newDate !== previousDate) {
            previousDate = newDate //update 'previousDate'
            let filter = forecastDays.list.filter(d => d.date === previousDate) //filter day by day
            let lastIndex = forecastDays.list.findLastIndex(f => f.date === previousDate) //update the new value to 'pos' after taking a bunch of arrays with the same date
            let results = compare(filter)
            pos = lastIndex
            newList.push(results)
        }
        else { //same idea of the previous one ^^^^^
            let filter = forecastDays.list.filter(d => d.date === previousDate)
            let lastIndex = forecastDays.list.findLastIndex(f => f.date === previousDate)
            let results = compare(filter)
            pos = lastIndex
            newList.push(results)
        }
    }
    //console.log(newList)
    forecastDays.list = newList
    //console.log(forecastDays)
    updateFinalList(forecastDays)
}

function compare(filter) { //compare every atribute to show only one result per day, not 6 differents info for the same day (because of the fact the API update the forecast every 3 hours)
    let tempBigg = filter[0].tempMax
    let tempSmall = filter[0].tempMin
    let probBigg = filter[0].probRain
    filter.forEach(e => {
        if (e.tempMax > tempBigg) tempBigg = e.tempMax //take the biggest
        if (e.tempMin < tempSmall) tempSmall = e.tempMin //take the smaller
        if (e.probRain > probBigg) probBigg = e.probRain //take the biggest
    })
    return {
        date: filter[0].date,
        tempMax: tempBigg,
        tempMin: tempSmall,
        probRain: probBigg
    }
}

function updateFinalList(forecastDays) {
    let index = listDataClimate.findIndex(f => f.city === forecastDays.city)
    if (index !== -1) {
        listDataClimate[index] = forecastDays
    }
    else {
        listDataClimate.push(forecastDays)
    }
    //console.log(listDataClimate)
    createCards(listDataClimate)
}

function createCards(listDataClimate) {
    const container = document.getElementById('containerCards')
    const htmlCards = listDataClimate.map(m => {
        const iconUrl = `https://openweathermap.org/img/wn/${m.icon}@2x.png`
        return `
            <a href="weather.html?cidade=${m.city}" class="card-link">
                <div class='card fade-in'>
                    <h2>${m.city}</h2>
                    <div class="temp-actual">${m.tempActual}°C</div>
                    <img src="${iconUrl}" alt="Ícone do tempo">
                    <p class="desc">${m.descriptionWeather}</p>
                    <div class="forecast-card">
                        <span><strong>Temp Máxima:</strong> ${m.list[0].tempMax}°C</span>
                        <span><strong>Temp Mínima:</strong> ${m.list[0].tempMin}°C</span>
                        <span><strong>Chance de Chuva:</strong> ${m.list[0].probRain}%</span>
                    </div>
                </div>
            </a>
        `
    }).join('')

    container.innerHTML = htmlCards
}

function updateTheme() {
    let timeNow = new Date()
    let hours = timeNow.getHours()
    let img = document.querySelector('img')

    if (hours > 6 && hours < 13) { //Morning Theme
        document.documentElement.style.setProperty('--bg-color', '#fef9e7')
        document.documentElement.style.setProperty('--text-color', '#2c3e50')
        document.documentElement.style.setProperty('--border-color', '#f0d9b5')
        document.documentElement.style.setProperty('--input-bg', '#fffbf0')
        document.documentElement.style.setProperty('--hover-color', '#f59e0b')
        document.documentElement.style.setProperty('--focus-color', '#f59e0b')
        img.src = 'midia/simbolo-de-sol-preto-solido.png'
    }
    else if (hours > 12 && hours < 18) { //Afternoon Theme
        document.documentElement.style.setProperty('--bg-color', '#ff6b35')
        document.documentElement.style.setProperty('--text-color', '#fff5e1')
        document.documentElement.style.setProperty('--border-color', '#f7931e')
        document.documentElement.style.setProperty('--input-bg', '#ffb347')
        document.documentElement.style.setProperty('--hover-color', '#dc2626')
        document.documentElement.style.setProperty('--focus-color', '#dc2626')
        img.src = 'midia/nascer-do-sol.png'
    }
    else { //Night Theme
        document.documentElement.style.setProperty('--bg-color', '#0a0e27')
        document.documentElement.style.setProperty('--text-color', '#a8d8ff')
        document.documentElement.style.setProperty('--border-color', '#1e3a8a')
        document.documentElement.style.setProperty('--input-bg', '#0f1729')
        document.documentElement.style.setProperty('--hover-color', '#c084fc')
        document.documentElement.style.setProperty('--focus-color', '#c084fc')
        img.src = 'midia/noite.png'
    }
}

updateTheme()

setInterval(updateTheme, 60000)

//construir tema para chuva, sol ou neve
//construir html para cards
//construir uma nova page html para evixibir mais infos do dia na tela?