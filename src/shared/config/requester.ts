import axios from 'axios';


export const API_BASE = 'https://api.github.com/search'
export const requester = axios.create({ baseURL: API_BASE });


