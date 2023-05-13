import axios from "axios";

// axios.defaults.headers.common['Authorization'] = `Bearer ${bearerToken}`;
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL_LOGIN}`,
})

export default clienteAxios;