const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const getOptimizedImage = (publicIdOrUrl, width = 600) => {
  if (!publicIdOrUrl) return '';

  let publicId = publicIdOrUrl;

  // Si es URL completa de Cloudinary, extraemos el public_id
  if (publicIdOrUrl.includes('cloudinary.com')) {
    const matches = publicIdOrUrl.match(/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
    publicId = matches ? matches[1] : publicIdOrUrl.split('/').pop().split('.')[0];
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_limit,w_${width},q_auto,f_webp/${publicId}`;
};
