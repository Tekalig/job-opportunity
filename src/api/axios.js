import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://job-opportunity-server.onrender.com/api", // Update the base URL to your backend
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
