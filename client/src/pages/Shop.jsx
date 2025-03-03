import React, { useEffect, useState } from "react";
import Products from "../components/Products";
import { useLB } from "../utils/LoadBalancerContext";

const Shop = () => {
  const [items, setItems] = useState([]);

  const { lbHealthCheck } = useLB();
  const fetchItemsData = async () => {
    try {
      const curLB = await lbHealthCheck();
      const url = `${curLB}/api/items`;
      const res = await fetch(url);
      const items = await res.json();
      setItems(items);
    } catch (error) {
      console.error("Error fetching items data:", error.message);
    }
  };

  useEffect(() => {
    fetchItemsData();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <Products items={items} />
    </div>
  );
};

export default Shop;
