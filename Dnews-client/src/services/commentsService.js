import * as request from '../services/apiService'

// const apiUrl = 'http://localhost:3030/data/comments';

const apiUrl = 'https://server-dnews-site.onrender.com';


export const getAllNewsComments = async (newsID) => {
    const query = new URLSearchParams({
        where: `newsID="${newsID}"`,
        load: `owner=_ownerId:users`,
    });

    const result = await request.get(`${apiUrl}?${query}`);

    return result;
};

export const create = async (newsID, text) => {
    const newComment = await request.post(apiUrl, {
        newsID,
        text,
     });

    return newComment;
};
