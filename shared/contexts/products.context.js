import { createContext, useState } from 'react';

export const ProductsContext = createContext();

export function ProductWrapper({ children }) {
  const [productCategory, setProductCategory] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [selectedPage, setSelectedPage] = useState(1);

  return (
    <ProductsContext.Provider
      value={{
        productCategory,
        setProductCategory,
        searchProduct,
        setSearchProduct,
        selectedPage,
        setSelectedPage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
}
