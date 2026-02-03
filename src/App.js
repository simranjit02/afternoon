import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import FooterSection from "./Components/FooterSection";

import LayoutSection from "./Components/LayoutSection";
import ShopAll from "./Components/ShopAll";
import Furniture from "./Components/Furniture";
import Lights from "./Components/Lights";
import Rugs from "./Components/Rugs";
import LayoutCart from "./Components/LayoutCart";
import ViewCart from "./Components/ViewCart";
import About from "./Components/About";

import Sale from "./Components/Sale";
import Neww from "./Components/Neww";
import Best from "./Components/Best";

import Contact from "./Components/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./Components/Cart";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shopAll"
          element={
            <LayoutSection>
              <ShopAll />
            </LayoutSection>
          }
        />
        <Route
          path="/furniture"
          element={
            <LayoutSection>
              <Furniture />
            </LayoutSection>
          }
        />
        <Route
          path="/lighting"
          element={
            <LayoutSection>
              <Lights />
            </LayoutSection>
          }
        />
        <Route
          path="/rugs"
          element={
            <LayoutSection>
              <Rugs />
            </LayoutSection>
          }
        />
        <Route
          path="/sale"
          element={
            <LayoutSection>
              <Sale />
            </LayoutSection>
          }
        />
        <Route
          path="/new"
          element={
            <LayoutSection>
              <Neww />
            </LayoutSection>
          }
        />
        <Route
          path="/bestSeller"
          element={
            <LayoutSection>
              <Best />
            </LayoutSection>
          }
        />
        <Route
          path="/about"
          element={
            <LayoutCart>
              <About />
            </LayoutCart>
          }
        />
        <Route
          path="/contact"
          element={
            <LayoutCart>
              <Contact />
            </LayoutCart>
          }
        />
        <Route
          path="/product"
          element={
            <LayoutCart>
              <Cart />
            </LayoutCart>
          }
        />
        <Route
          path="/cartView"
          element={
            <LayoutCart>
              <ViewCart />
            </LayoutCart>
          }
        />
      </Routes>

      <FooterSection />
    </>
  );
}

export default App;
