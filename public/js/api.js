class Api{
    static countries = {}
    static async getLokalData(params) {
        let data = await fetch('https://covid19.mathdro.id/api/countries/' + params.id)
        data = await data.json()
        UI.createResults(data, params.country);
    }

    static async getGlobalData(){
        let data = await fetch('https://covid19.mathdro.id/api')
        data = await data.json()
        UI.createResults(data, "Seluruh Dunia");
    }

    static async getCountry(){
        let data = await fetch('https://covid19.mathdro.id/api/countries')
        data = await data.json()
        if(Object.entries(Api.countries).length == 0) Api.countries = data.countries
        UI.createCountrySelection(data.countries);
    }  
}

class UI{
    static createCountrySelection(countries){
        const selectC = document.getElementById('country-selection');
        let option = document.createElement('option')
        option.value = "0"
        option.innerText = "Seluruh Dunia"
        selectC.appendChild(option);

        countries.forEach(country => {
            option = document.createElement('option')
            option.value = country.iso3
            option.innerText = country.name
            selectC.appendChild(option)
        });
    }

    static createResults(data, country){
        const formater = Intl.NumberFormat('en') 
        const lastUpdate = document.getElementById('lastUpdate')
        const deaths = document.getElementById('deaths')
        const confirmed = document.getElementById('confirmed')
        const title = document.getElementById('title')

        confirmed.innerText = formater.format(data.confirmed.value) + " Kasus"
        deaths.innerText = formater.format(data.deaths.value) + " Kasus"
        lastUpdate.innerText = data.lastUpdate
        title.innerText = country
    }
}