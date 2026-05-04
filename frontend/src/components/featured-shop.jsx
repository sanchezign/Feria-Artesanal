import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import api from '../api/axiosConfig';
import shopImg from '../assets/featured-shop.png';
import { Link } from 'react-router-dom';

const FeaturedShop = ({ shopId }) => {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchShop = useCallback(async () => {
    try {
      const response = await api.get(`/shops/${shopId}`);
      // Protección
      setShop(response.data || null);
    } catch (error) {
      console.error('Error fetching shop:', error);
      setShop(null);
    }
  }, [shopId]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get(`/products/by/${shopId}`);
      // Protección fuerte
      const safeProducts = Array.isArray(response.data) ? response.data : [];
      setProducts(safeProducts.slice(0, 3));
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  }, [shopId]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchShop(), fetchProducts()]);
      setIsLoading(false);
    };

    loadData();
  }, [fetchShop, fetchProducts]);

  if (isLoading) {
    return (
      <div className="h-special animate-pulse">
        Cargando...
      </div>
    );
  }

  if (!shop) return null;

  return (
    <>
      <h1 className="h-special">Tienda destacada</h1>

      <Link to={`/shop/${shopId || '#'}`}>
        <div
          className="relative scale-90 m-auto max-w-screen-sm bg-cover bg-center"
          style={{
            backgroundImage: `url(${shopImg})`,
            aspectRatio: '1284/1719'
          }}
        >
          <img
            src={shop.logo_url || ''}
            alt="Logo"
            className="absolute top-0 right-1/2 translate-x-24 w-48 aspect-square rounded-full bg-white p-1"
          />

          {products.length >= 3 && (
            <>
              <img
                src={products[0]?.image || ''}
                alt={products[0]?.name || 'product'}
                className="absolute object-cover rounded-md shadow shadow-inner shadow-sm"
                style={{ top: '224px', right: '118px', width: '146px', height: '120px' }}
              />

              <img
                src={products[1]?.image || ''}
                alt={products[1]?.name || 'product'}
                className="absolute object-cover rounded-md shadow shadow-inner shadow-sm"
                style={{ top: '386px', right: '118px', width: '146px', height: '120px' }}
              />

              <img
                src={products[2]?.image || shop.cover_url || ''}
                alt={products[2]?.name || 'cover'}
                className="absolute transform translate-x-1/2 object-cover rounded-2xl shadow shadow-inner shadow-sm"
                style={{ bottom: '100px', right: '324px', width: '320px', height: '168px' }}
              />
            </>
          )}
        </div>
      </Link>
    </>
  );
};

FeaturedShop.propTypes = {
  shopId: PropTypes.string.isRequired,
};

export default FeaturedShop;
