import axios from "axios";

export const API_URL = 'localhost:3000';

export const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-type': 'application/json',
}

export const API = axios.create({
    baseURL: API_URL,
    headers: DEFAULT_HEADERS,
});
