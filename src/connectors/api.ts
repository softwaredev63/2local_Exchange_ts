export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const SOCKET_BASE_URL = process.env.REACT_APP_SOCKET_BASE_URL;

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