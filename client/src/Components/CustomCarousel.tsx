import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CustomCarousel.css"; // Import the CSS file

const CustomCarousel: React.FC = () => {
  return (
    <div className="carousel-container">
      <div className="carousel-content">
        <Carousel
          showArrows={true}
          autoPlay
          interval={5000}
          infiniteLoop
          showThumbs={false}
        >
          <div className="carousel-item">
            <img
              src="vintage1.jpg"
              alt="Vintage 1"
              className="carousel-image"
            />
            <p className="carousel-description">Number 1</p>
          </div>
          <div className="carousel-item">
            <img
              src="vintage2.jpg"
              alt="Vintage 2"
              className="carousel-image"
            />
            <p className="carousel-description">Number 2</p>
          </div>
          <div className="carousel-item">
            <img
              src="vintage3.jpg"
              alt="Vintage 3"
              className="carousel-image"
            />
            <p className="carousel-description">Number 3</p>
          </div>
          <div className="carousel-item">
            <img
              src="vintage4.jpg"
              alt="Vintage 4"
              className="carousel-image"
            />
            <p className="carousel-description">Number 4</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CustomCarousel;
