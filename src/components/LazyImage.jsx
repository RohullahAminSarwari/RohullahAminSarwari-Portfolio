import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/placeholder.jpg',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    let observer;
    if (imageRef && !isInView) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(imageRef);
    }
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, isInView]);

  useEffect(() => {
    if (isInView) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [isInView, src]);

  return (
    <div
      ref={setImageRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={`transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-70 scale-105'
        }`}
      />
      
      {/* Loading shimmer effect */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
      )}
    </div>
  );
};

export default LazyImage;
