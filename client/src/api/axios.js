import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://job-opportunity-ps5r.vercel.app/api", // Update the base URL to your backend
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
