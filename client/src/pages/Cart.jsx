import { useMemo } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../utils/CartContext";

const Cart = () => {
  const { cart } = useCart();
  const itemArr = Array.from(cart.keys());

  // disable checkout button if any item is out of stock
  let disableCheckout = false;
  for (const [k, v] of cart) {
    if (v.qty === 0) {
      disableCheckout = true;
      break;
    }
  }

  // calculate sub total of current
  const calculateTotal = () => {
    let total = 0;
    for (const [_, value] of cart) {
      total += value.price * value.qty;
    }
    return total;
  };
  const total = useMemo(() => calculateTotal(), [cart]);

  return (
    <div className="w-full md:max-w-[90%] lg:max-w-[min(80%,60rem)]">
      <h1 className="font-bold text-[1.5rem] mb-4">Shopping Cart</h1>
      {itemArr.length === 0 ? (
        <div>
          <p>Your shopping cart is empty</p>
          <Link to="/" className="bg-black text-white mt-4 p-4 block w-fit">
            Continue browsing
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid gap-10 max-h-[50vh] overflow-auto scrollbar-hide pt-4 border-t-2">
            {itemArr.map((e) => (
              <CartItem item={cart.get(e)} key={e} />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t-2">
            <p className="text-[0.8rem] mb-3 mt-2">
              Shipping & taxes calculated at checkout
            </p>
            <div className="flex w-full">
              <p className="font-semibold">Subtotal</p>
              <p className="ml-auto font-semibold">${total.toFixed(2)}</p>
            </div>

            <Link to="/checkout">
              <button
                className="bg-black text-white w-full h-[2.5rem] mt-3 font-bold"
                disabled={disableCheckout}
              >
                CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
