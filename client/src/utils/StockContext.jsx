import { createContext, useContext, useState } from "react";

const StockContext = createContext();
export const useStock = () => useContext(StockContext);

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState(new Map());

  const updateStock = (key, qty) => {
    // key will be item name + size
    stock.set(key, qty);
    setStock(new Map(stock));
  };

  return (
    <StockContext.Provider value={{ stock, updateStock }}>
      {children}
    </StockContext.Provider>
  );
};
