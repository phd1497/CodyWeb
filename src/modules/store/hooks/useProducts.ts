import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Product, ProductCategory } from '../../../types/product';
import { productService } from '../services/productService';

interface UseProductsParams {
  search: string;
  category: ProductCategory | null;
}

export const useProducts = ({ search, category }: UseProductsParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts();
      setProducts(data);
    } catch {
      setError('Unable to load menu right now. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesSearch = query
        ? product.name.toLowerCase().includes(query)
          || product.shortDescription.toLowerCase().includes(query)
        : true;

      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return { products: filteredProducts, loading, error, reload: loadProducts };
};
