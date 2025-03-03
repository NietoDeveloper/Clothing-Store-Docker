import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const CartUpdateContext = createContext();

export const useCart = () => useContext(CartContext);
export const useCartUpdate = () => useContext(CartUpdateContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(new Map());
  const [numItem, setNumItem] = useState(0);

  const addItem = (item, size) => {
    // key will be item name + size
    const key = item.name + size;

    const itemObj = { ...item, size };
    if (cart.has(key)) {
      itemObj.qty = cart.get(key).qty + 1;
      cart.set(key, itemObj);
      setCart(new Map(cart));
    } else {
      itemObj.qty = 1;
      cart.set(key, itemObj);
      setCart(new Map(cart));
    }

    setNumItem(numItem + 1);
  };

  const removeItem = (item) => {
    const isDelete = cart.delete(item.name + item.size);
    setCart(new Map(cart));
    isDelete && setNumItem(numItem - item.qty);
  };

  const changeQty = (item, qty, diff) => {
    cart.set(item.name + item.size, { ...item, qty });
    setCart(new Map(cart));
    setNumItem((numItem) => numItem + diff);
  };

  const resetCart = () => {
    setCart(new Map());
    setNumItem(0);
  };

  useEffect(() => console.log(cart), [cart]);

  return (
    <CartContext.Provider value={{ cart, numItem }}>
      <CartUpdateContext.Provider
        value={{ addItem, removeItem, changeQty, resetCart }}
      >
        {children}
      </CartUpdateContext.Provider>
    </CartContext.Provider>
  );
};
