import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const atomData = atom([]);
export const atomPrice = atom(85.0);
export const priceChangeStopAtom = atom(false);
export const cardDetails = atom([]);
export const cardRender = atom(false);
export const atomShow = atom(false);

export const atomSendCart = atom([]);
export const atomAdd = atom(1);
export const atomCartId = atom("");
export const atomProductInfo = atom([]);
export const atomCartItem = atom(0);
export const atomBuyItem = atom(false);

// Auth state: token persisted in localStorage (same key as authService) so session survives refresh
export const AUTH_TOKEN_STORAGE_KEY = "afternoon_auth_token";
export const atomAuthToken = atomWithStorage(AUTH_TOKEN_STORAGE_KEY, null);
export const atomUser = atom(null);
// Derived: true when we have a token (actual validity is checked on getMe / API calls)
export const atomIsAuthenticated = atom((get) => !!get(atomAuthToken));
