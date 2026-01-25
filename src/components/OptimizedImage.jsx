import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function OptimizedImage({ src, alt, className = '', width, height, priority = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate srcset for responsive images
  const generateSrcSet = (imageSrc) => {
    // For local images, just return the src
    if (!imageSrc || imageSrc.startsWith('/')) return imageSrc;
    return imageSrc;
  };

  return (
    <img
      src={generateSrcSet(src)}
      alt={alt}
      className={`optimized-image ${isLoaded ? 'loaded' : ''} ${className}`}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      decoding="async"
      style={{
        opacity: isLoaded && !hasError ? 1 : 0.7,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  priority: PropTypes.bool,
};
