/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

// we need to pass the baseURL as an object
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default API;