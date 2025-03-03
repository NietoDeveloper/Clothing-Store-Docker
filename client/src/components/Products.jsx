import Product from "./Product";

const Products = ({ items }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-x-2 gap-y-14 md:grid-cols-3 lg:w-[65rem]">
      {items.map((e) => (
        <Product product={e} key={e.name} />
      ))}
    </div>
  );
};
export default Products;
