import hero_image from "../../assets/hero2.png";
import "./Hero.css";
import { Button } from "flowbite-react";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  const scrollToMiddle = () => {
    const middlePosition = document.documentElement.scrollHeight / 2;
    const startPosition = window.pageYOffset;
    const distance = middlePosition - startPosition;
    const duration = 1000;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New Arrivals</h2>
        <p>Latest vintage clothing</p>
        <p>for women</p>
        <div style={{ marginTop: "16px" }}>
          <Button onClick={scrollToMiddle} gradientMonochrome="pink">
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
