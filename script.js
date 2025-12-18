const cityList = [
    "Aracaju (SE)",
    "Belém (PA)",
    "Belo Horizonte (MG)",
    "Boa Vista (RR)",
    "Brasília (DF)",
    "Campo Grande (MS)",
    "Cuiabá (MT)",
    "Curitiba (PR)",
    "Florianópolis (SC)",
    "Fortaleza (CE)",
    "Goiânia (GO)",
    "João Pessoa (PB)",
    "Joinville (SC)",
    "Macapá (AP)",
    "Maceió (AL)",
    "Manaus (AM)",
    "Natal (RN)",
    "Palmas (TO)",
    "Porto Alegre (RS)",
    "Porto Velho (RO)",
    "Recife (PE)",
    "Rio Branco (AC)",
    "Rio de Janeiro (RJ)",
    "Salvador (BA)",
    "Serra (ES)",
    "São Luís (MA)",
    "São Paulo (SP)",
    "Teresina (PI)",
    "Vitória (ES)"
];

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

inputDigit.addEventListener('input', (e) => { //Recieve what user is typing
    let nameTyped = e.target.value
    let filter = cityList.filter(c => c.toLowerCase().includes(nameTyped.toLowerCase())) //Filter the name of city comparing to the city list

    suggestCity.innerHTML = ''
    filter.forEach(city => {
        let option = document.createElement('option')
        option.textContent = city
        suggestCity.appendChild(option) // Suggest the city according to the filter
    })
})

submitCity.addEventListener('submit', (e) => { //Recieve the city chosen
    e.preventDefault() //Prevent the page of recharging
    let cityChosen = inputDigit.value
    if(cityChosen.includes(cityList)){ //Verify if exist the city on the list
        searchCity(cityChosen)
    } else{
        window.alert('Selecione uma cidade presente nas sugestões enquanto digita.')
    }
})

function searchCity(){
    //continue
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