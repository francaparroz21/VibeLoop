import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const token = localStorage.getItem('token')

const instanceAxios = axios.create({
    baseURL: `${backendUrl}/api`,
    withCredentials: true,
    headers:{'Authorization': `Bearer ${token}`}
})  

export default instanceAxios