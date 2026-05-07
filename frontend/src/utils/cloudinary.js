const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const getOptimizedImage = (publicIdOrUrl, width = 600) => {
  if (!publicIdOrUrl) return '';

  // Si NO es URL de Cloudinary, asumimos que ya es un public_id directo
  if (!publicIdOrUrl.includes('cloudinary.com')) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_limit,w_${width},q_auto,f_webp/${publicIdOrUrl}`;
  }

  // Si ya es una URL de Cloudinary, extraemos el public_id correctamente
  try {
    // Eliminar transformaciones existentes y extraer el public_id
    const uploadIndex = publicIdOrUrl.indexOf('/upload/');
    if (uploadIndex === -1) return publicIdOrUrl; // fallback a URL original

    const afterUpload = publicIdOrUrl.substring(uploadIndex + 8); // después de "/upload/"

    // Saltar versión (v1234567890/) si existe
    const withoutVersion = afterUpload.replace(/^v\d+\//, '');

    // Eliminar extensión del archivo
    const publicId = withoutVersion.replace(/\.[^.]+$/, '');

    // Saltar si era una URL con transformaciones (empieza con letras seguidas de _, como c_, w_, q_)
    const cleanId = publicId.replace(/^(?:[a-z]_[^/]+,?)+\//, '');

    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_limit,w_${width},q_auto,f_webp/${cleanId}`;
  } catch {
    return publicIdOrUrl; // fallback seguro a la URL original
  }
};
