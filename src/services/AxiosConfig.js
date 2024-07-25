import axios from "axios"

const baseURL = 'http://localhost:8080'

const instance = axios.create({
    baseURL,
    withCredentials: true
})

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

const PrivateRoute = axios.create({
    baseURL,
    withCredentials: true
})

PrivateRoute.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

PrivateRoute.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            // handle refresh token logic here
        }
        return Promise.reject(error)
    }
)

export { instance, PrivateRoute }