import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CustomCarousel.css"; // Import the CSS file

const CustomCarousel: React.FC = () => {
  return (
    <section className="carousel-container">
      <div className="carousel-content">
        <div className="carousel-title">This weeks offers</div>
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
            <p className="carousel-description">
              £19.99 |{" "}
              <span style={{ textDecoration: "line-through" }}>£32.99</span>
            </p>
          </div>
          <div className="carousel-item">
            <img
              src="vintage2.jpg"
              alt="Vintage 2"
              className="carousel-image"
            />
            <p className="carousel-description">
              £14.99 |{" "}
              <span style={{ textDecoration: "line-through" }}>£24.99</span>
            </p>
          </div>
          <div className="carousel-item">
            <img
              src="vintage3.jpg"
              alt="Vintage 3"
              className="carousel-image"
            />
            <p className="carousel-description">
              £32.99 |{" "}
              <span style={{ textDecoration: "line-through" }}>£44.99</span>
            </p>
          </div>
          <div className="carousel-item">
            <img
              src="vintage4.jpg"
              alt="Vintage 4"
              className="carousel-image"
            />
            <p className="carousel-description">
              £4.99 |{" "}
              <span style={{ textDecoration: "line-through" }}>£9.99</span>
            </p>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CustomCarousel;
