import axios from "axios";

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API_URL
  : import.meta.env.VITE_PROD_API_URL;

export const instant = axios.create({
  baseURL,
});
