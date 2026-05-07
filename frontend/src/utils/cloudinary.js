// frontend/src/utils/cloudinary.js

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const getOptimizedImage = (publicIdOrUrl, width = 600) => {
  if (!publicIdOrUrl) return '';

  // URLs de Unsplash u otros dominios externos → devolver tal cual (o con parámetro de tamaño)
  if (publicIdOrUrl.includes('unsplash.com')) {
    // Unsplash soporta el parámetro w= para redimensionar
    const url = new URL(publicIdOrUrl);
    url.searchParams.set('w', width);
    url.searchParams.set('q', '80');
    url.searchParams.set('fm', 'webp');
    return url.toString();
  }

  // URLs que no son de Cloudinary ni Unsplash → devolver tal cual
  if (!publicIdOrUrl.includes('cloudinary.com')) {
    // Si es un public_id directo (sin http), construimos la URL
    if (!publicIdOrUrl.startsWith('http')) {
      return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_limit,w_${width},q_auto,f_webp/${publicIdOrUrl}`;
    }
    return publicIdOrUrl;
  }

  // URLs de Cloudinary → extraer public_id y aplicar transformaciones
  try {
    const uploadIndex = publicIdOrUrl.indexOf('/upload/');
    if (uploadIndex === -1) return publicIdOrUrl;

    const afterUpload = publicIdOrUrl.substring(uploadIndex + 8);
    // Saltar versión (v1234567890/) y transformaciones existentes (c_limit,w_600,...)
    const cleaned = afterUpload
      .replace(/^v\d+\//, '')                        // quita versión
      .replace(/^(?:[a-z]{1,2}_[^/]+,?)+\//, '')     // quita transformaciones previas
      .replace(/\.[^/.]+$/, '');                      // quita extensión

    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_limit,w_${width},q_auto,f_webp/${cleaned}`;
  } catch {
    return publicIdOrUrl; // fallback seguro
  }
};
