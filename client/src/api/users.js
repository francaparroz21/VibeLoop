import axios from "./axios.js";

export const postUser = (data) => {
    return axios.post('/auth/register', data, {
        withCredentials: true,
    });
};
export const loginUser = (data) => {
    return axios.post('/auth/login', data, {
        withCredentials: true,
    });
};
export const logoutUser = () => {
    return axios.post('/auth/logout', {
        withCredentials: true,
    });
};
