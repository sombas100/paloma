import "./Display.css";
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

const displayProducts: Product[] = [
  {
    name: "Floral Print Bohemian Dresses",
    description:
      "A flowy bohemian dress with floral prints and a v-neckline, perfect for summer outings.",
    price: 45.99,
    imageUrl:
      "https://ml.thcdn.com/productimg/960/960/15385393-1555151161251638.jpg",
    stock: 22,
  },
  {
    name: "1950s Polka Dot Swing Dresses",
    description:
      "A classic 1950s style swing dress with a charming polka dot pattern and a cinched waist.",
    price: 55.99,
    imageUrl:
      "https://cdn.onbuy.com/product/65b6f4829fe69/990-990/royal-blue-ruffle-hem-large-retro-polka-dot-dress-for-womens-vintage-1950s-casual-cocktail-party-swing-dresses-summer-wedding-guest-a-line-gown.jpg",
    stock: 31,
  },
  {
    name: "Vintage Lace A-Line Dresses",
    description:
      "An elegant vintage lace dress with an A-line silhouette, ideal for formal occasions.",
    price: 60.99,
    imageUrl: "https://m.media-amazon.com/images/I/71OANFC5ZsL._AC_UY1000_.jpg",
    stock: 7,
  },
  {
    name: "Retro Striped Midi Dresses",
    description:
      "A retro-inspired midi dress with bold stripes and a flattering fit, perfect for a chic look.",
    price: 48.99,
    imageUrl:
      "https://www.voodoovixen.co.uk/media/catalog/product/d/r/dra_9225-bi-03_zdfoblkskqkn62cg.jpg",
    stock: 15,
  },
];

const Display: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="display-list-container">
      {displayProducts.map((product, index) => (
        <div
          onClick={() => navigate("/dresses")}
          key={index}
          className="display-product-card"
        >
          <img
            onClick={() => navigate("/dresses")}
            src={product.imageUrl}
            alt={product.name}
            className="-display-product-image"
          />
          <div className="display-name-overlay">{product.name}</div>
          <div className="display-product-details"></div>
        </div>
      ))}
    </div>
  );
};

export default Display;
