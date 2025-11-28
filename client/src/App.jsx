import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductPage from "./pages/ProductPage";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import { CartProvider } from "./utils/CartContext";
import { StockProvider } from "./utils/StockContext";
import { LBProvider } from "./utils/LoadBalancerContext";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import Thankyou from "./pages/Thankyou";

function App() {
  return (
    <LBProvider>
      <CartProvider>
        <StockProvider>
          <div className="w-full px-4 py-10 lg:px-6 flex flex-col items-center font-montserrat overflow-x-hidden cursor-crosshair">
            <Header />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/shop/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/Thankyou" element={<Thankyou />} />
            </Routes>
            <Footer />
          </div>
        </StockProvider>
      </CartProvider>
    </LBProvider>
  );
}

export default App;
