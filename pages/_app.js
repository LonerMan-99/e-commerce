'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { Suspense } from 'react';
import '../styles/globals.css';
import { ProductWrapper } from 'shared/contexts/products.context';
import { CartWrapper } from 'shared/contexts/cart.context';
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CartWrapper>
        <ProductWrapper>
          <Suspense fallback={<h1>LOADING....</h1>}>
            <Component {...pageProps} />
          </Suspense>
        </ProductWrapper>
      </CartWrapper>
    </ChakraProvider>
  );
}

export default MyApp;
