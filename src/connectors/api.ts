const API_BASE_URL = 'https://exchangeapi.2local.io';

const fetchData = function (url) {
    return new Promise(
        (resolve, reject) => fetch(`${API_BASE_URL}/${url}`)
            .then(response => {
                if (!response || !response.ok) reject(new Error('Response not OK'));

                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(data => data.success ? resolve(data.data) : reject(data.error));
                }
                
                return response.text().then(text => resolve(text));
            })
            .catch(err => {
                reject(err);
            })
    )
}

export default {
    fetchData,
}