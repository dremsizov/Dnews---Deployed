
const buildOptions = (data) => {
    const options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json'
        };
    }


    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        const token = user.accessToken;
        options.headers = {
            ...options.headers,
            'X-Authorization': token
        };
    }


    return options;
};



const request = async (method, url, data) => {
    const response = await fetch(url, { ...buildOptions(data), method });

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {

        if (response.status == 403) {
            localStorage.removeItem('user');
        }

        throw result;
    }

    return result;
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');

