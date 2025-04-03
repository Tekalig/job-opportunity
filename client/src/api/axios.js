import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Update the base URL to your backend
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
