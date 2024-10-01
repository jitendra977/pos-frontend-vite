// src/config.js or a similar config file

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const baseUrl = isLocalhost ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_BASE_URL_LOCAL;

export default baseUrl;