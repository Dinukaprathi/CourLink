import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  //baseURL: "https://turf-spot-be.vercel.app",
  baseURL: "http://localhost:5000",
});

axiosInstance.interceptors.request.use((config) => {
  let token = null;
  
  // First try to get token from localStorage (persisted state)
  try {
    const persistedUser = localStorage.getItem("persist:root");
    if (persistedUser) {
      const parsedUser = JSON.parse(persistedUser);
      if (parsedUser.auth) {
        const parsedAuth = JSON.parse(parsedUser.auth);
        token = parsedAuth.token;
      }
    }
  } catch (error) {
    console.error("Error parsing persisted user data:", error);
  }

  // If no token found in localStorage, check axios defaults (for immediate use after login)
  if (!token && axiosInstance.defaults.headers.common["Authorization"]) {
    token = axiosInstance.defaults.headers.common["Authorization"].replace("Bearer ", "");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token found and added to request:", token.substring(0, 20) + "...");
  } else {
    delete config.headers.Authorization;
    console.log("No token found for request");
  }

  return config;
});

export default axiosInstance;
