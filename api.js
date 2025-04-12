import axios from "axios"
import React from "react"
// Create axios instance
const API_URL =
  typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Auth services
export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  },

  logout: async () => {
    const response = await api.post("/auth/logout")
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me")
    return response.data
  },
}

// Form services
export const formService = {
  submitForm: async (formData) => {
    const response = await api.post("/forms/submit", formData)
    return response.data
  },

  getSubmissions: async (params = {}) => {
    const response = await api.get("/forms", { params })
    return response.data
  },

  getSubmission: async (id) => {
    const response = await api.get(`/forms/${id}`)
    return response.data
  },

  updateStatus: async (id, status, notes) => {
    const response = await api.patch(`/forms/${id}/status`, { status, notes })
    return response.data
  },

  deleteSubmission: async (id) => {
    const response = await api.delete(`/forms/${id}`)
    return response.data
  },
}

// Content services
export const contentService = {
  getContent: async (type) => {
    const params = type ? { type } : {}
    const response = await api.get("/content", { params })
    return response.data
  },

  updateContent: async (key, type, data) => {
    const response = await api.put(`/content/${key}`, { type, data })
    return response.data
  },

  getLocations: async () => {
    const response = await api.get("/content/locations")
    return response.data
  },

  getLocation: async (id) => {
    const response = await api.get(`/content/locations/${id}`)
    return response.data
  },

  updateLocation: async (id, locationData) => {
    const response = await api.put(`/content/locations/${id}`, locationData)
    return response.data
  },

  deleteLocation: async (id) => {
    const response = await api.delete(`/content/locations/${id}`)
    return response.data
  },
}

// Admin services
export const adminService = {
  getDashboardStats: async () => {
    const response = await api.get("/admin/dashboard/stats")
    return response.data
  },

  getUsers: async () => {
    const response = await api.get("/admin/users")
    return response.data
  },

  createUser: async (userData) => {
    const response = await api.post("/admin/users", userData)
    return response.data
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData)
    return response.data
  },

  changePassword: async (id, password) => {
    const response = await api.put(`/admin/users/${id}/password`, { password })
    return response.data
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`)
    return response.data
  },
}

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration
    if (error.response && error.response.status === 401) {
      // Clear local storage
      localStorage.removeItem("token")

      // Redirect to login if not already there
      if (window.location.pathname !== "/sariadmin/login") {
        window.location.href = "/sariadmin/login"
      }
    }
    return Promise.reject(error)
  },
)

export default api
