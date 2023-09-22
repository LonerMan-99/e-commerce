import React, { useEffect, useState, useContext } from 'react';
import { ProductsContext } from 'shared/contexts/products.context';

const useRecommendCaraousel = () => {
  const { setProductCategory, setSearchProduct } = useContext(ProductsContext);
  const [recommendCategory, setRecommendCategory] = useState([]);

  const selectRecomendationCategory = data => {
    setSearchProduct('');
    setProductCategory(data);
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(res => setRecommendCategory(res));
  }, []);

  return { recommendCategory, selectRecomendationCategory };
};

export default useRecommendCaraousel;
