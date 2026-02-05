import axios from "axios";
import { API_URL } from "./env";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network or server down
    if (!error.response) {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
