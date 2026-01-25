/**
 * Image Optimization Utilities
 * Provides utilities for serving optimized images with proper formats and sizes
 */

/**
 * Get optimized image URL with query parameters
 * Can be used with image optimization services (Cloudinary, ImageKit, etc.)
 */
export function getOptimizedImageUrl(src) {
  // If using local images, return as-is
  if (!src || src.startsWith('/')) return src;

  // For external images, you could add CDN transformation logic here
  // Example with Cloudinary:
  // return `https://res.cloudinary.com/your-cloud/image/fetch/w_${width},h_${height},q_${quality},f_${format}/`;

  return src;
}

/**
 * Get responsive image srcset
 */
export function generateSrcSet(src, widths = [320, 640, 1024]) {
  return widths.map(w => `${getOptimizedImageUrl(src, { width: w })} ${w}w`).join(', ');
}

/**
 * Preload critical images
 */
export function preloadImage(src) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}
