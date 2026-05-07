const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const getOptimizedImage = (publicId, width = 600) => {
  if (!publicId) return '';
  
  // Si ya viene una URL completa
  if (publicId.includes('cloudinary.com')) {
    const publicIdClean = publicId.split('/').pop().split('.')[0];
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_limit,w_${width},q_auto,f_webp/${publicIdClean}`;
  }
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_limit,w_${width},q_auto,f_webp/${publicId}`;
};
