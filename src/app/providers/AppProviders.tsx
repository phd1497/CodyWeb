import React from 'react';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartProvider } from '../../contexts/cart/CartContext';
import { UIProvider } from '../../contexts/ui/UIContext';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <UIProvider>
        <CartProvider>{children}</CartProvider>
      </UIProvider>
    </AuthProvider>
  );
};

export default AppProviders;
