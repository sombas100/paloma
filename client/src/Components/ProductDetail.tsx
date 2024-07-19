import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/productSlice";
import { Product } from "../types";
import "./ProductDetail.css";
import { Spinner } from "flowbite-react";
import { Button } from "flowbite-react";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    } else {
      const selectedProduct = products.find(
        (product: Product) => product._id === id
      );
      setProduct(selectedProduct || null);
    }
  }, [id, products, dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const selectedProduct = products.find(
        (product: Product) => product._id === id
      );
      setProduct(selectedProduct || null);
    }
  }, [products, id]);

  if (loading)
    return (
      <div>
        <Spinner size="lg" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-container">
      <div className="product-images">
        <img
          className="large-image"
          src={product.imageUrl}
          alt={product.name}
        />
        <div className="small-images">
          {[
            ...Array(4).map((_, index) => (
              <img
                key={index}
                className="small-image"
                src={product.imageUrl}
                alt={`${product.name} ${index}`}
              />
            )),
          ]}
        </div>
      </div>
      <div>
        <h1 className="product-title">{product.name}</h1>
        <div className="size-buttons-container">
          <Button color="gray">XS</Button>
          <Button color="gray">S</Button>
          <Button color="gray">M</Button>
          <Button color="gray">LG</Button>
          <Button color="gray">XL</Button>
        </div>
        <p className="product-description">{product.description}</p>
        <p className="product-price">£{product.price}</p>
        <p className="product-stock">Stock: {product.stock}</p>
      </div>

      <div className="add-to-basket">
        <Button size="lg" pill color="warning">
          Add to Basket
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
