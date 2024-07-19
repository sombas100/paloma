import React from "react";
import { Product } from "../types";
import { Link } from "react-router-dom";
import "./ProductItem.css";

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-item-container">
      <Link to={`/product/${product._id}`}>
        <img
          className="product-image"
          src={product.imageUrl}
          alt={product.name}
        />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-details">{product.description}</p>
        <p className="product-price">Price: £{product.price}</p>
        <p className="product-stock">In Stock: {product.stock}</p>
      </Link>
    </div>
  );
};

export default ProductItem;
