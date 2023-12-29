import axios from "axios";

export const API_URL = 'http://localhost:3000';

export const DEFAULT_HEADERS = {
    'Content-type': 'application/json',
}

export const API = axios.create({
    baseURL: API_URL,
    headers: DEFAULT_HEADERS,
});
