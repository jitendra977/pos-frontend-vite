/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

// we need to pass the baseURL as an object
const API = axios.create({
  baseURL: "http://localhost:8081/api",
});

export default API;