/**
 * Authentication service – handles login, register, getMe, and token storage.
 * Token is persisted in localStorage so the user stays logged in across refreshes.
 */
import axios from "axios";
import { API_AUTH } from "../config/api";

const TOKEN_KEY = "afternoon_auth_token";

export const authService = {
  getToken() {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  },

  setToken(token) {
    if (token) {
      localStorage.setItem(TOKEN_KEY, typeof token === "string" ? token : JSON.stringify(token));
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Login with email and password. Returns { token, user } on success.
   */
  async login(email, password) {
    const { data } = await axios.post(`${API_AUTH}/login`, { email, password });
    return data;
  },

  /**
   * Register with name, email, password. Returns { token, user } on success.
   */
  async register(name, email, password) {
    const { data } = await axios.post(`${API_AUTH}/register`, {
      name,
      email,
      password,
    });
    return data;
  },

  /**
   * Get current user from backend using stored token. Used on app load and to validate token.
   */
  async getMe() {
    const token = this.getToken();
    if (!token) return null;
    const { data } = await axios.get(`${API_AUTH}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.user;
  },
};

export default authService;
