import React, { useState, useCallback } from 'react';
import { RiStarFill, RiEyeLine } from 'react-icons/ri';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetail }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = useCallback(() => {
    onViewDetail(product);
  }, [product, onViewDetail]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') onViewDetail(product);
    },
    [product, onViewDetail],
  );

  return (
    <article
      className="product-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      id={`product-${product.id}`}
    >
      <div className="product-card-image">
        {!imageLoaded && <div className="img-skeleton" />}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        <span className="product-card-badge">{product.category}</span>
        <span className="product-card-rating">
          <RiStarFill /> {product.rating}
        </span>
      </div>

      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{product.shortDescription}</p>

        <div className="product-card-footer">
          <div className="product-card-price">
            ${product.price.toFixed(2)}
          </div>
          <button
            className="product-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail(product);
            }}
            id={`view-btn-${product.id}`}
          >
            <RiEyeLine /> View
          </button>
        </div>
      </div>
    </article>
  );
};

export default React.memo(ProductCard);
