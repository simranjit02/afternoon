// Global API configuration
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001/api";
export const API_PRODUCTS = `${API_BASE_URL}/products`;
export const API_AUTH = `${API_BASE_URL}/auth`;
export const API_CART = `${API_BASE_URL}/cart`;
export const API_INQUIRIES = `${API_BASE_URL}/inquiries`;
