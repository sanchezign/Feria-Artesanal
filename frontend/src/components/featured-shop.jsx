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

  if (!shop) return <div>Cargando...</div>;

  return (
    <>
      <h1 className="h-special text-center mb-4">Tienda destacada</h1>

      <Link to={`/shop/${shopId}`}>
        <div
          className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-cover bg-center"
          style={{
            backgroundImage: `url(${shopImg})`,
            aspectRatio: '3 / 4'
          }}
        >
          {/* LOGO */}
          <img
            src={shop.logo_url || ''}
            alt="Logo"
            className="
              absolute
              top-[5%]
              left-1/2 -translate-x-1/2
              w-20 sm:w-28 md:w-36 lg:w-40
              aspect-square
              rounded-full
              bg-white
              p-1
              shadow-md
            "
          />

          {/* PRODUCTOS */}
          {products.length > 0 && (
            <>
              {/* PRODUCTO 1 */}
              {products[0] && (
                <img
                  src={products[0].image || ''}
                  alt={products[0].name || 'product'}
                  className="
                    absolute object-cover rounded-md shadow-md
                    w-[28%] h-[18%]
                    top-[26%] right-[10%]
                  "
                />
              )}

              {/* PRODUCTO 2 */}
              {products[1] && (
                <img
                  src={products[1].image || ''}
                  alt={products[1].name || 'product'}
                  className="
                    absolute object-cover rounded-md shadow-md
                    w-[28%] h-[18%]
                    top-[45%] right-[10%]
                  "
                />
              )}

              {/* PRODUCTO 3 / COVER (FIX CENTRADO) */}
              {(products[2] || shop.cover_url) && (
                <img
                  src={products[2]?.image || shop.cover_url || ''}
                  alt={products[2]?.name || 'cover'}
                  className="
                    absolute object-cover rounded-xl shadow-md
                    w-[60%] h-[22%]
                    bottom-[8%]
                    left-1/2 -translate-x-1/2
                  "
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
