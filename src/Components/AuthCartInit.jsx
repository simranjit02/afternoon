/**
 * Initializes auth state and cart on app load, and persists guest cart when user is not logged in.
 * - If token exists: validate with getMe, fetch user cart, set user and cart.
 * - If no token: load guest cart from localStorage into atomSendCart.
 * - When guest: every change to atomSendCart is persisted to localStorage so cart survives refresh.
 */
import { useEffect, useRef } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import {
  atomAuthToken,
  atomUser,
  atomSendCart,
  atomIsAuthenticated,
} from "./store";
import authService from "../services/authService";
import {
  getGuestCartFromStorage,
  saveGuestCartToStorage,
  fetchUserCart,
} from "../services/cartService";

export default function AuthCartInit() {
  const setUser = useSetAtom(atomUser);
  const setCart = useSetAtom(atomSendCart);
  const setToken = useSetAtom(atomAuthToken);
  const token = useAtomValue(atomAuthToken);
  const isAuthenticated = useAtomValue(atomIsAuthenticated);
  const cart = useAtomValue(atomSendCart);
  const initialLoadDone = useRef(false);

  // On mount: restore auth and cart (guest or user)
  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;

    const storedToken = authService.getToken();
    if (storedToken) {
      setToken(storedToken);
      authService
        .getMe()
        .then((user) => {
          setUser(user);
          return fetchUserCart();
        })
        .then((items) => setCart(items))
        .catch(() => {
          authService.clearToken();
          setToken(null);
          setUser(null);
          setCart(getGuestCartFromStorage());
        });
    } else {
      setCart(getGuestCartFromStorage());
    }
  }, [setToken, setUser, setCart]);

  // Persist guest cart to localStorage whenever cart changes and user is not logged in
  useEffect(() => {
    if (!isAuthenticated && Array.isArray(cart)) {
      saveGuestCartToStorage(cart);
    }
  }, [isAuthenticated, cart]);

  // On logout (from TopNavbar): clear user and cart so UI shows guest state
  useEffect(() => {
    const onLogout = () => {
      setUser(null);
      setCart([]);
    };
    window.addEventListener("afternoon-logout", onLogout);
    return () => window.removeEventListener("afternoon-logout", onLogout);
  }, [setUser, setCart]);

  return null;
}
