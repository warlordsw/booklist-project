import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

export const login = (loginData) => API.post('/users/login', loginData)
export const register = (registerData) =>
  API.post('/users/register', registerData)
