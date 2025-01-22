import axios from "axios";

export const backendApi  = axios.create({
    baseURL: 'https://strapi-store-server.onrender.com/api'
})