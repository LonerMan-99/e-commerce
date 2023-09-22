import { useEffect, useState, useContext } from 'react';
import { ProductsContext } from 'shared/contexts/products.context';

const useHeader = () => {
  const { setProductCategory, setSearchProduct } = useContext(ProductsContext);
  const [category, setCategory] = useState([]);

  const handleSelectedCategory = e => {
    setSearchProduct('');
    setProductCategory(e.target.value);
  };

  const handleSearch = e => {
    setProductCategory('');
    e.preventDefault();
    setSearchProduct(e.target[0].value);
  };

  const handleCategories = async () => {
    try {
      const getCategories = await fetch(
        'https://dummyjson.com/products/categories',
      );
      const response = await getCategories.json();
      setCategory(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCategories();
  }, []);

  return {
    category,
    handleSelectedCategory,
    handleSearch,
  };
};

export default useHeader;
