import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
