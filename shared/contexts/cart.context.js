import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartWrapper({ children }) {
  const [userCartLength, setUserCartLength] = useState(0);
  const [cartFlag, setUserCartFlag] = useState(false);

  return (
    <CartContext.Provider
      value={{
        userCartLength,
        setUserCartLength,
        cartFlag,
        setUserCartFlag,
      }}>
      {children}
    </CartContext.Provider>
  );
}
