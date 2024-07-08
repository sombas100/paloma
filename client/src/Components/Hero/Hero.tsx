import React from "react";
import hero_image from "../../assets/hero2.png";
import "./Hero.css";
import { Button } from "flowbite-react";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New Arrivals</h2>
        <p>Latest vintage clothing</p>
        <p>for everyone</p>
        <div style={{ marginTop: "16px" }}>
          <Button gradientMonochrome="pink">Browse Collections</Button>
        </div>
      </div>
      <div className="hero-right"></div>
      <img src={hero_image} />
    </div>
  );
};

export default Hero;
