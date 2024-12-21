import React, { useEffect, useState } from "react";
import "./Swiper.css";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  // initially the index is saved with 1.
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // extended images with duplicate for seamless looping.(creating infinite carousel effect.)
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const mouseEntered = () => setIsPaused(true);
  const mouseLeaved = () => setIsPaused(false);
  const goToNext = () => {
    if (!isTransitioning) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsTransitioning(true);
    }
  };

  const goToPrev = () => {
    if (!isTransitioning) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setIsTransitioning(true);
    }
  };
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    // we swaping the positions if they reached its duplicate places
    if (currentIndex === 0) setCurrentIndex(extendedImages.length - 2);
    if (currentIndex === extendedImages.length - 1) setCurrentIndex(1);
  };
  //for automatic scrolling
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(goToNext, 2000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <div
      className="slider-container"
      onMouseEnter={mouseEntered}
      onMouseLeave={mouseLeaved}
    >
      <button className="slider-button prev" onClick={goToPrev}>
        &#10094;
      </button>
      <div className="slider-wrapper">
        <div
          className="slider"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? `transform 0.5s ease-in-out` : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedImages.map((image, index) => (
            <div key={index} className="slide">
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>
      <button className="slider-button next" onClick={goToNext}>
        &#10095;
      </button>
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
