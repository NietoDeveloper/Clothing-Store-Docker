import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const Carousel = ({ product }) => {
  const imgs = product.imgURL;
  const [curIndex, setCurIndex] = useState(0);
  const translateX = -100;

  const buttonHandle = (direction) => {
    if (direction === 1 && curIndex === imgs.length - 1) {
      setCurIndex(0);
    } else if (direction === -1 && curIndex === 0) {
      setCurIndex(imgs.length - 1);
    } else setCurIndex(curIndex + direction);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => buttonHandle(1),
    onSwipedRight: () => buttonHandle(-1),
  });

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-full aspect-square transition ease-in-out duration-200 md:hidden`}
        style={{ transform: `translateX(${curIndex * translateX}%)` }}
        {...swipeHandlers}
      >
        {imgs.map((e) => (
          <div className="min-w-full flex justify-center max-h-full" key={e}>
            <img
              src={e}
              className="max-w-[70%] max-h-full object-contain"
              alt={product.name}
            ></img>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center text-center gap-[2%] text-[1.5rem] my-4 md:hidden">
        {imgs.map((e, i) => (
          <button
            key={i}
            className={`w-[2%] aspect-square bg-zinc-400 rounded-full transition duration-300 ${
              i === curIndex && "bg-zinc-600"
            }`}
          ></button>
        ))}
      </div>
      {/* medium image display html */}
      <div className="w-full aspect-square md:min-h-[30rem] max-h-[60vh] md:flex hidden gap-4">
        <div className="w-[20%] max-h-full grid gap-4 auto-rows-fr">
          {imgs.map((e, i) => (
            <div
              className={`w-full max-h-full p-1 ${
                i === curIndex && "border border-black"
              }`}
              onClick={() => setCurIndex(i)}
              key={e}
            >
              <img
                src={e}
                className="w-full max-h-full object-contain "
                alt={product.name}
              ></img>
            </div>
          ))}
        </div>
        <div className="flex-1 max-h-full flex justify-center">
          <img
            src={imgs[curIndex]}
            className="max-w-[70%]  object-contain"
            alt={product.name}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
