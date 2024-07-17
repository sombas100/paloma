import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchProducts, selectAccessories } from "../redux/slices/productSlice";
import ProductItem from "./ProductItem";
import { Product } from "../types";
import "./ProductList.css";
import { Spinner } from "flowbite-react";

const AccessoriesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessories = useSelector((state: RootState) =>
    selectAccessories(state.products)
  );
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

  if (!accessories) return null;
  return (
    <div className="product-list-container">
      <div className="product-list">
        {accessories.map((accessory: Product) => (
          <ProductItem key={accessory._id} product={accessory} />
        ))}
      </div>
    </div>
  );
};

export default AccessoriesList;
