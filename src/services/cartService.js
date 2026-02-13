/**
 * Cart service – guest cart in localStorage, logged-in cart via API.
 * Keeps cart logic out of UI: normalization between frontend shape and backend shape lives here.
 */

import axios from "axios";
import { API_CART } from "../config/api";
import authService from "./authService";

const GUEST_CART_KEY = "afternoon_guest_cart";

/**
 * Frontend cart item shape: { newItem: { productId, productCategory, productPrice, imageOne, quantity } }
 * Backend cart item shape: { productId, productName, productPrice, imageOne, quantity, addedAt? }
 */

/**
 * Read guest cart from localStorage. Returns array in frontend shape (with newItem wrapper).
 */
export function getGuestCartFromStorage() {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Ensure each item has newItem shape for UI
    return parsed.map((item) =>
      item.newItem ? item : { newItem: { ...item, productCategory: item.productName || item.productCategory } }
    );
  } catch {
    return [];
  }
}

/**
 * Save guest cart to localStorage. Accepts frontend shape (array of { newItem }).
 */
export function saveGuestCartToStorage(items) {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn("Failed to save guest cart", e);
  }
}

/**
 * Clear guest cart from localStorage (after merge on login/signup).
 */
export function clearGuestCartStorage() {
  localStorage.removeItem(GUEST_CART_KEY);
}

/**
 * Convert frontend cart items to backend merge payload: array of { productId, productName, productPrice, imageOne, quantity }.
 * Filters out items without valid productId so backend merge never fails due to bad guest data.
 */
export function normalizeGuestItemsForMerge(frontendItems) {
  if (!Array.isArray(frontendItems)) return [];
  return frontendItems
    .map((item) => {
      const n = item.newItem || item;
      const productId = n.productId != null ? String(n.productId) : "";
      const quantity = Number(n.quantity) || 1;
      if (!productId || quantity < 1) return null;
      return {
        productId,
        productName: n.productCategory ?? n.productName ?? "",
        productPrice: n.productPrice ?? 0,
        imageOne: n.imageOne ?? "",
        quantity,
      };
    })
    .filter(Boolean);
}

/**
 * Convert backend cart items to frontend shape (with newItem) so existing UI components keep working.
 */
export function normalizeBackendToFrontend(backendItems) {
  if (!Array.isArray(backendItems)) return [];
  return backendItems.map((item) => ({
    newItem: {
      productId: item.productId,
      productCategory: item.productName ?? item.productCategory,
      productPrice: item.productPrice,
      imageOne: item.imageOne ?? "",
      quantity: item.quantity ?? 1,
    },
  }));
}

function getAuthHeader() {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Fetch user cart from backend. Returns items in frontend shape.
 */
export async function fetchUserCart() {
  const { data } = await axios.get(API_CART, { headers: getAuthHeader() });
  return normalizeBackendToFrontend(data.items || []);
}

/**
 * Merge guest cart (from localStorage) with user's backend cart, then return merged cart in frontend shape.
 * Call after login/signup: pass guest items in frontend shape; backend merges (same productId → sum quantities, new → append); we normalize and return.
 * Caller must then set atomSendCart with result and clear guest localStorage so logged-in cart is single source of truth.
 */
export async function mergeGuestCartWithUser(guestItemsFrontendShape) {
  const guestPayload = normalizeGuestItemsForMerge(guestItemsFrontendShape);
  const { data } = await axios.post(
    `${API_CART}/merge`,
    { guestItems: guestPayload },
    { headers: getAuthHeader() }
  );
  return normalizeBackendToFrontend(data.items || []);
}

/**
 * Update quantity for one item (logged-in user). Syncs to backend and returns new cart in frontend shape.
 */
export async function updateCartItemQuantity(productId, quantity) {
  const cart = await fetchUserCart();
  const normalized = cart.map((item) => item.newItem);
  const updated = normalized.map((it) =>
    it.productId === productId ? { ...it, quantity } : it
  );
  const valid = updated.filter((it) => it.quantity > 0);
  const backendItems = valid.map((it) => ({
    productId: it.productId,
    productName: it.productCategory ?? it.productName,
    productPrice: it.productPrice,
    imageOne: it.imageOne ?? "",
    quantity: it.quantity,
  }));
  const { data } = await axios.post(
    `${API_CART}/sync`,
    { items: backendItems },
    { headers: getAuthHeader() }
  );
  return normalizeBackendToFrontend(data.items || []);
}

/**
 * Remove item from cart (logged-in user).
 */
export async function removeCartItem(productId) {
  await axios.delete(`${API_CART}/${productId}`, {
    headers: getAuthHeader(),
  });
  return fetchUserCart();
}

/**
 * Add item to user cart (logged-in user). product: { productId, productName/productCategory, productPrice, imageOne }, quantity: number.
 */
export async function addItemToUserCart(product, quantity = 1) {
  const productId = product?.productId != null ? String(product.productId) : "";
  if (!productId) {
    throw new Error("Product ID is required");
  }
  const payload = {
    product: {
      productId,
      productName: product.productName ?? product.productCategory ?? "",
      productPrice: product.productPrice ?? 0,
      imageOne: product.imageOne ?? "",
    },
    quantity: Number(quantity) || 1,
  };
  const headers = getAuthHeader();
  if (!headers.Authorization) {
    throw new Error("Not authenticated");
  }
  const { data } = await axios.post(`${API_CART}/add`, payload, { headers });
  return normalizeBackendToFrontend(data.items || []);
}

export default {
  getGuestCartFromStorage,
  saveGuestCartToStorage,
  clearGuestCartStorage,
  normalizeGuestItemsForMerge,
  normalizeBackendToFrontend,
  fetchUserCart,
  mergeGuestCartWithUser,
  updateCartItemQuantity,
  removeCartItem,
  addItemToUserCart,
};
