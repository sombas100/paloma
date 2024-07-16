import React from "react";
import banner from "../assets/vintagebanner.jpg";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

export const Banner: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="banner-container">
      <img
        onClick={() => navigate("/dresses")}
        className="banner-image"
        src={banner}
        alt="Vintage Banner"
      />
      <div className="banner-overlay">
        <p className="banner-text-overlay">
          Choose from our wide selection of vintage clothing
        </p>
        <span
          onClick={() => navigate("/dresses")}
          className="banner-link-overlay"
        >
          Shop now
        </span>
      </div>
    </div>
  );
};
