import hero_image from "../../assets/hero2.png";
import "./Hero.css";
import { Button } from "flowbite-react";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New Arrivals</h2>
        <p>Latest vintage clothing</p>
        <p>for women</p>
        <div style={{ marginTop: "16px" }}>
          <Button gradientMonochrome="pink">
            Browse Collections
            <FaArrowRightLong
              size={15}
              style={{ marginLeft: "12px", marginTop: "3px" }}
            />
          </Button>
        </div>
      </div>
      <div className="hero-right"></div>
      <img className="hero-img" src={hero_image} />
    </div>
  );
};

export default Hero;
