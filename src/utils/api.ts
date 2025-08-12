import axios from "axios";
import { baseURL } from "../config/config";

const api = axios.create({
    baseURL,
});
api.interceptors.request.use(request => {
    console.log('Starting Request', request.url)
    return request
})

api.interceptors.response.use(response => {
    console.log('Response:', response.data)
    return response
})
export default api;