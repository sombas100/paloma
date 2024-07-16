import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductItem from "./ProductItem";
import { Product } from "../types";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!products) return null;
  return (
    <div className="product-list-container">
      <div className="product-list">
        {products.slice(0, 20).map((product: Product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
