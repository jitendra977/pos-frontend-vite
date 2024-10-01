/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import baseUrl from "../config";

// we need to pass the baseURL as an object
const API = axios.create({
  baseURL: baseUrl
});

export default API;