import { HeartIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NumberFormatter from "./number-formatter";
import PropTypes from 'prop-types';
import { getOptimizedImage } from '../utils/cloudinary';

const ProductList = ({ products = [], isLoading }) => {

  const [prodArray, setProdArray] = useState([]);

  useEffect(() => {
    setProdArray(Array.isArray(products) ? products : []);
  }, [products]);

  const cards = Array.isArray(prodArray)
    ? prodArray.map((product) => (
        <Link to={`/products/${product._id}`} key={product._id}>
          <div className="text-left hover:scale-105 ease-in-out duration-200 appear">
            <div className="relative aspect-square rounded-3xl bg-neutral-500 grid place-items-center overflow-hidden">
              <img
                src={getOptimizedImage(product.image, 450)}
                alt={product.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              />
              <span className="tag-left top-5 text-xl z-10">
  $ <NumberFormatter number={product.price} />
</span>
              <HeartIcon className="h-10 absolute top-5 right-5 hover:scale-125 ease-in-out duration-200 z-10" />
              {!product.image && (
                <div className="flex flex-col items-center z-10">
                  <PhotoIcon className="w-12" />
                  <span>Sin imagen</span>
                </div>
              )}
            </div>
            <p className="py-2 font-semibold text-lg text-left">{product.name}</p>
          </div>
        </Link>
      ))
    : [];

  const skeletonCards = Array(6).fill().map((_, index) => (
    <div className="text-left hover:scale-105 ease-in-out duration-200 appear" key={index}>
      <div className="relative aspect-square rounded-3xl bg-neutral-500 grid place-items-center animate-pulse">
        <span className="tag-left top-5 text-xl">$</span>
        <HeartIcon className="h-10 absolute top-5 right-5" />
      </div>
      <p className="py-2 font-semibold text-lg text-left">cargando...</p>
    </div>
  ));

  return (
    <section className="pt-10 pb-10 min-h-screen">
      <div className="grid grid-flow-* md:grid-cols-3 md:grid-rows-3 gap-8">
        {isLoading && skeletonCards}
        {!isLoading && (
          prodArray.length > 0
            ? cards
            : <p className="p-4 bg-blue-500/50 text-center col-span-full">
                No se encontraron productos.
              </p>
        )}
      </div>
    </section>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
};

export default ProductList;
