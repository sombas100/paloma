import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/productSlice";
import { Product } from "../types";
import "./ProductDetail.css";
import { Spinner, Button } from "flowbite-react";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

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

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          product: product._id,
          name: product.name,
          image: product.imageUrl,
          price: product.price,
          countInStock: product.stock,
          qty: quantity,
        })
      );
    }
    navigate("/cart");
  };

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-images">
        <img
          className="large-image"
          src={product.imageUrl}
          alt={product.name}
        />
        <div className="small-images">
          <img
            className="small-image"
            src={product.imageUrl}
            alt={product.name}
          />
          <img
            className="small-image"
            src={product.imageUrl}
            alt={product.name}
          />
          <img
            className="small-image"
            src={product.imageUrl}
            alt={product.name}
          />
          <img
            className="small-image"
            src={product.imageUrl}
            alt={product.name}
          />
          <img
            className="small-image"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
      </div>
      <div className="product-board">
        <h1 className="product-title">{product.name}</h1>

        {product.category !== "accessories" && (
          <div className="size-buttons-container">
            {product.category === "shoes" ? (
              <>
                <Button color="gray">5</Button>
                <Button color="gray">6</Button>
                <Button color="gray">7</Button>
                <Button color="gray">8</Button>
                <Button color="gray">9</Button>
              </>
            ) : (
              <>
                <Button color="gray">XS</Button>
                <Button color="gray">S</Button>
                <Button color="gray">M</Button>
                <Button color="gray">L</Button>
                <Button color="gray">XL</Button>
              </>
            )}
          </div>
        )}

        <div className="quantity-selector">
          <Button color="gray" onClick={handleDecrement}>
            -
          </Button>
          <input
            type="text"
            inputMode="numeric"
            className="quantity-input"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
          />
          <Button color="gray" onClick={handleIncrement}>
            +
          </Button>
        </div>
        <p className="product-description">{product.description}</p>
        <p className="product-price">£{product.price}</p>
        <p className="product-stock">Stock: {product.stock}</p>
      </div>

      <div className="add-to-basket">
        <Button
          onClick={handleAddToCart}
          size="lg"
          pill
          gradientMonochrome="pink"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
