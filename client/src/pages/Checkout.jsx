import PaypalLogo from "../assets/paypal.svg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { useState } from "react";
import { useCart, useCartUpdate } from "../utils/CartContext";
import { useLB } from "../utils/LoadBalancerContext";
import Modal from "../components/Modal";

const Checkout = () => {
  const { cart } = useCart();
  const { changeQty, resetCart } = useCartUpdate();
  const itemArr = Array.from(cart.keys());
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowCart, setIsShowCart] = useState(false);
  const [isFetchSuccess, setIsFetchSuccess] = useState(false);
  const { lbHealthCheck } = useLB();

  let total = 0;
  itemArr.map((e) => {
    total += cart.get(e).qty * cart.get(e).price;
  });

  const sendOrder = async (data) => {
    setShowModal(!showModal);
    setIsLoading(true);

    const curLB = await lbHealthCheck();
    const URL = `${curLB}/api/addOrder`;
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setTimeout(() => setIsLoading(false), 200);

    if (res.status !== 200) {
      const msg = await res.json();
      for (const e in msg) {
        const diff = msg[e] - cart.get(e).qty;
        changeQty(cart.get(e), msg[e], diff);
      }
    } else {
      setIsFetchSuccess(true);
      resetCart();
      console.log("Success");
      window.location.href = "/Thankyou";
    }
  };

  const handleOrderSubmit = () => {
    const obj = {};
    obj.userName = "test_user";
    obj.subTotal = total;
    obj.date = new Date();
    obj.items = [];
    for (const key of cart.keys()) {
      const itemJSON = {};
      const value = cart.get(key);
      itemJSON.name = value.name;
      itemJSON.price = value.price;
      itemJSON.qty = value.qty;
      itemJSON.size = value.size;
      obj.items.push(itemJSON);
    }
    sendOrder(obj);
  };

  return (
    <div className="w-[95%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[65%] flex flex-col lg:flex-row-reverse lg:gap-8">
      <div className="w-full mb-4 lg:mb-0 flex flex-col">
        <button
          className="flex items-center bg-[#f0f0f0] h-12 px-2 border w-full rounded-sm"
          onClick={() => setIsShowCart(!isShowCart)}
        >
          <AiOutlineShoppingCart className="mr-2 w-5 h-full" />
          <h2 className="flex lg:hidden">
            {isShowCart ? "Hide" : "Show"} order summary{" "}
            {isShowCart ? (
              <AiOutlineUp className="justify-self-center self-center ml-2" />
            ) : (
              <AiOutlineDown className="justify-self-center self-center ml-2" />
            )}{" "}
          </h2>
          <h2 className="hidden lg:block">Order summary</h2>
          <span className="ml-auto font-semibold">
            ${(total * 1.05).toFixed(2)}
          </span>
        </button>
        <div
          className={`w-full ${
            isShowCart ? "max-h-[100rem]" : "max-h-0"
          } lg:max-h-[min(35rem,100%)] bg-[#fafafa] transition-all duration-300 overflow-hidden rounded-sm flex-1 flex flex-col`}
        >
          <div className="flex flex-col gap-4 my-4 flex-1 overflow-auto">
            {itemArr.map((e) => (
              <div
                className="w-full flex gap-4 items-center px-2 h-fit"
                key={e}
              >
                <div className="w-[25%] md:w-[20%] aspect-square rounded-md border-2 flex justify-center relative h-fit">
                  <img
                    src={cart.get(e).imgURL[0]}
                    className="max-h-full object-contain "
                  ></img>
                  <div className="absolute w-[24%] aspect-square bg-[#808080] right-[-7%] top-[-7%] rounded-full flex justify-center items-center text-white text-sm">
                    {cart.get(e).qty}
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-[0.9rem]">{cart.get(e).name}</h3>
                  <p className="text-[0.8rem]">{cart.get(e).size}</p>
                </div>
                <p className="ml-auto text-[0.9rem]">
                  ${(cart.get(e).price * cart.get(e).qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full mt-4 lg:mt-auto border-y grid gap-2 py-4 px-2">
            <div className="flex">
              <p>Subtotal</p>
              <p className="ml-auto">${total.toFixed(2)}</p>
            </div>
            <div className="flex">
              <p>GST/HST</p>
              <p className="ml-auto">${(total * 0.05).toFixed(2)}</p>
            </div>
          </div>
          <div className="w-full py-4 px-2 flex">
            <p className="font-semibold">Total</p>
            <p className="ml-auto font-semibold">
              ${(total * 1.05).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="grid gap-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-full bg-black"></div>
            <h1 className="min-w-fit">Express checkout</h1>
            <div className="h-[1px] w-full bg-black"></div>
          </div>
          <button className="w-full bg-[#ffc439] h-12 rounded-md flex justify-center items-center">
            <img src={PaypalLogo} alt="Paypal Logo" />
          </button>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-full bg-black"></div>
            <h1 className="min-w-fit">OR</h1>
            <div className="h-[1px] w-full bg-black"></div>
          </div>

          <div className="mt-2 grid gap-y-4">
            <div>
              <label>Email</label>
              <input className="w-full h-10 border-[#dadbdf] border-2 rounded-md px-3 mt-1 text-sm"></input>
            </div>
            <div>
              <label>Name</label>
              <input className="w-full h-10 border-[#dadbdf] border-2 rounded-md px-3 mt-1 text-sm"></input>
            </div>
            <div>
              <label>Address</label>
              <input className="w-full h-10 border-[#dadbdf] border-2 rounded-md px-3 mt-1 text-sm"></input>
            </div>
            <div className="mt-2 grid grid-cols-[1.5fr,1fr] gap-x-4">
              <div>
                <label>Card number</label>
                <input
                  className="w-full h-10 border-[#dadbdf] border-2 rounded-md px-3 mt-1 text-sm"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                ></input>
              </div>
              <div>
                <label>Expiration Date</label>
                <input
                  className="w-full h-10 border-[#dadbdf] border-2 rounded-md px-3 mt-1 text-sm"
                  placeholder="MM/YY"
                ></input>
              </div>
            </div>
            <div className="grid grid-cols-[1.5fr,1fr] gap-x-4">
              <div>
                <label>Cardholder's name</label>
                <input className="w-full h-10 border-[#dadbdf] border-2 rounded-md px-3 mt-1"></input>
              </div>
              <div>
                <label>Security code</label>
                <input
                  className="w-full h-10 border-[#dadbdf] border-2 rounded-md px-3 mt-1"
                  placeholder="CVC"
                ></input>
              </div>
            </div>
            <button
              className="w-full bg-black text-white h-[2.5rem] mt-2 font-semibold"
              onClick={handleOrderSubmit}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
      <Modal
        hidden={showModal}
        setHidden={setShowModal}
        isLoading={isLoading}
        isFetchSuccess={isFetchSuccess}
      ></Modal>
    </div>
  );
};

export default Checkout;
