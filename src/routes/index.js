import { useAuth } from "context/auth";
import HomePage from "pages/home";
import ProductPage from "pages/product";
import ShoppingCartPage from "pages/shoppingCart";
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from "../pages/login";
import { DivFont } from "./styled";

// import Login from "./Login";
// import Sobre from "./Sobre";
// import Usuario from "./Usuario";

const App = () => {
  const { signed } = useAuth();
  return (
    <DivFont>
      <BrowserRouter>
        {signed ? (
          <>
            <Routes>
              {/* <Route path="*" element={<NotFound />} /> */}
              <Route path="*" element={<HomePage />} />
              <Route path="/shopping-cart" element={<ShoppingCartPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              {/* <Route path="*" element={<NotFound />} /> */}
              <Route path="*" element={<LoginPage />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </DivFont>
  );
};

export default App;
