import axios from "axios";

/* ---------- Backend URL ---------- */

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "http://localhost:8000";

/* ---------- API Base ---------- */

export const API = `${BACKEND_URL}/api`;

/* ---------- Axios Instance ---------- */

const api = axios.create({
  baseURL: API,

  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------- Request Interceptor ---------- */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/* ---------- Response Interceptor ---------- */

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
    }

    return Promise.reject(error);
  }
);

/* ---------- Error Formatter ---------- */

export const formatApiErrorDetail = (detail) => {
  if (!detail) {
    return "Something went wrong. Please try again.";
  }

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (item?.msg) return item.msg;

        return JSON.stringify(item);
      })
      .join(" ");
  }

  if (typeof detail === "object") {
    if (detail.msg) {
      return detail.msg;
    }

    return JSON.stringify(detail);
  }

  return String(detail);
};

export default api;