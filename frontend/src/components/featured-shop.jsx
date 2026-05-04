import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import api from '../api/axiosConfig';
import shopImg from '../assets/featured-shop.png';
import { Link } from 'react-router-dom';

const FeaturedShop = ({ shopId }) => {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchShop = useCallback(async () => {
    try {
      const response = await api.get(`/shops/${shopId}`);
      setShop(response.data || null);
    } catch (error) {
      console.error('Error fetching shop:', error);
      setShop(null);
    }
  }, [shopId]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get(`/products/by/${shopId}`);
      const safeProducts = Array.isArray(response.data) ? response.data : [];
      setProducts(safeProducts.slice(0, 3));
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  }, [shopId]);

  useEffect(() => {
    fetchShop();
    fetchProducts();
  }, [fetchShop, fetchProducts]);

  console.log('SHOP:', shop);
  console.log('PRODUCTS:', products);

  if (!shop) return <div>Cargando...</div>;

  return (
    <>
      <h1 className="h-special">Tienda destacada</h1>

      <Link to={`/shop/${shopId}`}>
        <div
          className="relative m-auto max-w-screen-sm bg-cover bg-center" // ❗ saqué scale-90
          style={{
            backgroundImage: `url(${shopImg})`,
            aspectRatio: '1284/1719'
          }}
        >
          {/* LOGO */}
          <img
            src={shop.logo_url || ''}
            alt="Logo"
            className="absolute top-0 right-1/2 translate-x-24 w-48 aspect-square rounded-full bg-white p-1 border-4 border-red-500"
          />

          {/* DEBUG: mostrar SIEMPRE las imágenes en flujo normal */}
          <div style={{ position: 'relative', zIndex: 9999 }}>
            {products.map((p, i) => (
              <img
                key={i}
                src={p.image}
                alt={p.name}
                style={{
                  width: '120px',
                  display: 'block',
                  margin: '10px',
                  border: '3px solid red'
                }}
              />
            ))}
          </div>

          {/* TU LAYOUT ORIGINAL */}
          {products.length > 0 && (
            <>
              {products[0] && (
                <img
                  src={products[0].image || ''}
                  alt={products[0].name || 'product'}
                  className="absolute object-cover rounded-md shadow shadow-inner shadow-sm border-4 border-red-500"
                  style={{
                    top: '224px',
                    right: '118px',
                    width: '146px',
                    height: '120px'
                  }}
                />
              )}

              {products[1] && (
                <img
                  src={products[1].image || ''}
                  alt={products[1].name || 'product'}
                  className="absolute object-cover rounded-md shadow shadow-inner shadow-sm border-4 border-red-500"
                  style={{
                    top: '386px',
                    right: '118px',
                    width: '146px',
                    height: '120px'
                  }}
                />
              )}

              {(products[2] || shop.cover_url) && (
                <img
                  src={products[2]?.image || shop.cover_url || ''}
                  alt={products[2]?.name || 'cover'}
                  className="absolute transform translate-x-1/2 object-cover rounded-2xl shadow shadow-inner shadow-sm border-4 border-red-500"
                  style={{
                    bottom: '100px',
                    right: '324px',
                    width: '320px',
                    height: '168px'
                  }}
                />
              )}
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
