import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Link to={`/shop/${product.name}`} state={product}>
      <div className="flex justify-center items-end w-full aspect-[1/1.2] h-fit">
        <img
          src={product.imgURL[0]}
          className="h-fit max-h-full max-w-[80%] object-contain"
        ></img>
      </div>
      <h1 className="text-xl text-center mt-6 font-medium">{product.name}</h1>
      <span className="text-lg text-center block">
        ${product.price.toFixed(2)}
      </span>
    </Link>
  );
};

export default Product;
