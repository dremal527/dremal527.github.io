const Dadata = {
    url:   "http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party",
    token: "3f1cc0163e0ea7a94499a1c8fe29bb8ffa7e7364",

    getFullNameByInn: (inn) => {
        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + Dadata.token 
            },
            body: JSON.stringify({query: inn})
        }

        return fetch(Dadata.url, options)
            .then(response => response.json())
            .then(result => result.suggestions[0].data.name.full)
            .catch(error => null);
    }
}

export default Dadata;