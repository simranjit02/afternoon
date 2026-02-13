/**
 * Sign Up page. Matches site theme (colors, fonts, spacing).
 * On success: merges guest cart with user cart, saves to backend, clears guest storage, then redirects to redirect param or cart view.
 */
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";
import {
  atomAuthToken,
  atomUser,
  atomSendCart,
} from "./store";
import authService from "../services/authService";
import {
  getGuestCartFromStorage,
  mergeGuestCartWithUser,
  clearGuestCartStorage,
  fetchUserCart,
} from "../services/cartService";

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/cartView";

  const setToken = useSetAtom(atomAuthToken);
  const setUser = useSetAtom(atomUser);
  const setCart = useSetAtom(atomSendCart);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, user } = await authService.register(name, email, password);
      setToken(token);
      authService.setToken(token);
      setUser(user);

      const guestItems = getGuestCartFromStorage();
      try {
        const mergedCart = await mergeGuestCartWithUser(guestItems);
        setCart(mergedCart);
        clearGuestCartStorage();
        toast.success("Account created successfully");
      } catch (mergeErr) {
        const backendCart = await fetchUserCart();
        setCart(backendCart);
        clearGuestCartStorage();
        toast.success("Account created. Some cart items could not be merged.");
      }
      setLoading(false);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message || "Sign up failed. Please try again.";
      toast.error(message);
      setLoading(false);
      return;
    }
  };

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="">
        <h1 className="text-6xl py-10 bg-[rgb(46,50,56)] text-white text-center mb-16">
          Sign Up
        </h1>

        <div className="flex justify-center mb-16">
          <div className="w-full max-w-md border border-black px-8 py-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-[#2E3238] text-md mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border border-black w-full bg-white p-2 outline-none text-[#5C5757]"
                />
              </div>
              <div>
                <label className="block text-[#2E3238] text-md mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-black w-full bg-white p-2 outline-none text-[#5C5757]"
                />
              </div>
              <div>
                <label className="block text-[#2E3238] text-md mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-black w-full bg-white p-2 outline-none text-[#5C5757]"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white w-full py-2 text-center hover:bg-opacity-70 disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>
            <p className="mt-6 text-center text-[#5C5757] text-md">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signin" + (redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""))}
                className="underline font-medium text-black"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
