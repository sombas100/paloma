import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductItem from "./ProductItem";
import { Product } from "../types";
import "./ProductList.css";
import { Spinner } from "flowbite-react";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

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

  if (!products) return null;
  return (
    <div className="product-list-container">
      <div className="product-list">
        {products.slice(0, 20).map((product: Product) => (
          <div key={product._id} className="product-item">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
