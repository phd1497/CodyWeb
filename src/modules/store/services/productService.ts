import { mockProducts } from '../../../data/mockProducts';
import type { Product } from '../../../types/product';

const NETWORK_DELAY_MS = 350;

export const productService = {
  async getProducts(): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));
    return mockProducts;
  },

  async getProductById(productId: string): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));
    return mockProducts.find((product) => product.id === productId) ?? null;
  },
};
