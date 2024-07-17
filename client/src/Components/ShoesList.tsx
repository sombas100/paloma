import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchProducts, selectShoes } from "../redux/slices/productSlice";
import ProductItem from "./ProductItem";
import { Product } from "../types";
import "./ProductList.css";
import { Spinner } from "flowbite-react";

const ShoesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shoes = useSelector((state: RootState) => selectShoes(state.products));
  const { loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading)
    return (
      <div>
        <Spinner size="lg" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  if (!shoes) return null;
  return (
    <div className="product-list-container">
      <div className="product-list">
        {shoes.map((shoe: Product) => (
          <ProductItem key={shoe._id} product={shoe} />
        ))}
      </div>
    </div>
  );
};

export default ShoesList;
