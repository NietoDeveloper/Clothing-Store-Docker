import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

const Header = () => {
  const [isOpenModal, setIsOPenModal] = useState(false);
  const { numItem } = useCart();
  return (
    <div className="flex cursor-crosshair mb-10 md:mb-17 w-full lg:px-[5%]">
      <div className="flex-1 lg:flex items-center gap-x-6 hidden">
        <span className="font-bold text-lg">SHOP</span>
        <span className="font-bold text-lg">COLLECTIONS</span>
        <span className="font-bold text-lg">ABOUT</span>
      </div>
      <button
        className="flex-1 font-bold text-lg grid items-center justify-start lg:hidden"
        onClick={() => setIsOPenModal(!isOpenModal)}
      >
        MENU
      </button>
      <Link to="/" className="flex-1 flex justify-center">
        <img
          src="/logo.png"
          className="w-full h-full object-cover md:w-1/2 max-w-[12rem] pointer-events-none"
        ></img>
      </Link>
      <Link
        to="/cart"
        className="flex-1 text-end font-bold text-lg grid items-center"
      >
        CART ({numItem})
      </Link>
      <div
        className={`${isOpenModal ? "w-full" : "w-0"
          } h-full bg-black opacity-20 fixed top-0 right-0`}
        onClick={() => setIsOPenModal(!isOpenModal)}
      ></div>
      <div
        className={`h-full ${isOpenModal ? "w-1/2" : "w-0"
          } transition-all bg-white fixed top-0 left-0 py-16 overflow-hidden flex flex-col pl-4 gap-y-6`}
      >
        <span className="font-bold text-lg">SHOP</span>
        <span className="font-bold text-lg">COLLECTION</span>
        <span className="font-bold text-lg">ABOUT</span>
      </div>
    </div>
  );
};

export default Header;
