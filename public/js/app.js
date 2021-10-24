document.getElementById('country-selection').addEventListener('change', async e => {
    let dataTitle = 'Semua Dunia'
    if(e.target.value == '0'){
        await Api.getGlobalData();
    }else{

        Api.countries.forEach(country => {
            if(e.target.value == country.iso3) dataTitle = country.name
        });

        const params = {
            id: e.target.value,
            country: dataTitle
        }
        await Api.getLokalData(params)
    }
})

document.addEventListener('DOMContentLoaded', async (e) =>{
    await Api.getCountry();
    await Api.getGlobalData();
})

