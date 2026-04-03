import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
  onViewDetail: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onViewDetail }) => {
  if (products.length === 0) {
    return (
      <section className="product-section">
        <div className="products-grid">
          <div className="products-empty">
            <div className="products-empty-icon">🔍</div>
            <h3>No drinks found</h3>
            <p>Try a different search term or category.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-section" id="product-section">
      <div className="section-header">
        <h2 className="section-title">Our Menu</h2>
        <span className="section-subtitle">
          {products.length} drink{products.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(ProductGrid);
