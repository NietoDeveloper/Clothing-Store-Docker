import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useCartUpdate } from "../utils/CartContext";
import { useLB } from "../utils/LoadBalancerContext";

const ProductPage = () => {
  const location = useLocation();
  const product = location.state;
  const [qty, setQty] = useState({});
  // use to set disable add to bag button when item is out of stock
  const [disabled, setDisabled] = useState(false);
  const { lbHealthCheck } = useLB();

  // fetch the qty of the item. Example response
  // {
  //   S: 5,
  //   M: 2
  // }
  const fetchQty = async () => {
    try {
      const curLB = await lbHealthCheck();
      const url = `${curLB}/api/qty/${product.name}`;
      const res = await fetch(url);
      const qty = await res.json();
      setQty(qty);
    } catch (error) {
      console.error("Error fetching quantity data:", error.message);
    }
  };

  // Get update function
  const { addItem } = useCartUpdate();
  // Get size input
  const sizeInput = useRef();

  // toggle disabled add to cart button if user choose an item out of .....
  const handleSizeChange = () => {
    const value = sizeInput.current.value[0];
    qty[value] === 0 ? setDisabled(true) : setDisabled(false);
  };

  useEffect(() => {
    fetchQty();
  }, []);

  // use to read value of sizeinput on page load. We need to figure if the first value is out of stock to toggle the button
  useEffect(() => {
    const value = sizeInput.current.value[0];
    qty[value] === 0 ? setDisabled(true) : setDisabled(false);
  }, [sizeInput.current?.value]);

  return (
    <div className="md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] md:grid grid-cols-[2fr,1fr] gap-x-4 lg:gap-x-14">
      <Carousel product={product} />
      <div>
        <h1 className="font-medium text-[1.5rem] w-[60%] break-words">
          {product.name}
        </h1>
        <h2 className="text-[1.3rem]">${product.price.toFixed(2)}</h2>
        <select
          className="border-[1px] border-black w-full mt-4 h-[2.5rem] px-2"
          ref={sizeInput}
          onChange={handleSizeChange}
        >
          {product.sizes.map((e, i) => {
            if (qty[e] !== 0) {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              );
            } else {
              return (
                <option key={e} value={null}>
                  {e} - OUT OF STOCK
                </option>
              );
            }
          })}
        </select>
        <button
          className="w-full mt-8 font-bold text-white bg-black h-[2.5rem]"
          onClick={() => addItem(product, sizeInput.current.value)}
          disabled={disabled}
        >
          ADD TO CART
        </button>
        {/* testing */}
        {/* <p className="pt-6">{JSON.stringify(qty)}</p> */}
      </div>
    </div>
  );
};

export default ProductPage;
