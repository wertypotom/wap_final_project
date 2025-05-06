import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export { api }
