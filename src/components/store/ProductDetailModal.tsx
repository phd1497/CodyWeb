import React, { useCallback, useEffect } from 'react';
import {
  RiCloseLine,
  RiStarFill,
  RiShoppingCart2Line,
  RiHeart3Line,
} from 'react-icons/ri';
import type { Product } from '../../types/product';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  /* Close on Escape key */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  /* Close when clicking backdrop */
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', className: 'out-of-stock' };
    if (stock <= 10) return { text: `Low Stock — ${stock} left`, className: 'low-stock' };
    return { text: `In Stock — ${stock} available`, className: 'in-stock' };
  };

  const stockInfo = getStockStatus(product.stock);

  return (
    <div
      className="product-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${product.name}`}
      id="product-detail-modal"
    >
      <div className="product-modal">
        <button
          className="product-modal-close"
          onClick={onClose}
          aria-label="Close modal"
          id="product-modal-close-btn"
        >
          <RiCloseLine />
        </button>

        <img
          className="product-modal-image"
          src={product.image.replace('w=400&h=400', 'w=800&h=450')}
          alt={product.name}
        />

        <div className="product-modal-body">
          {/* Meta */}
          <div className="product-modal-meta">
            <span className="product-modal-category">{product.category}</span>
            <span className="product-modal-rating">
              <RiStarFill /> {product.rating}
            </span>
            <span className={`product-modal-stock ${stockInfo.className}`}>
              {stockInfo.text}
            </span>
          </div>

          {/* Title & Price */}
          <h2 className="product-modal-name">{product.name}</h2>
          <div className="product-modal-price">${product.price.toFixed(2)}</div>

          <hr className="product-modal-divider" />

          {/* Description */}
          <h4 className="product-modal-description-label">Description</h4>
          <p className="product-modal-description">{product.longDescription}</p>

          {/* Actions */}
          <div className="product-modal-actions">
            <button
              className="product-modal-cart-btn"
              disabled={product.stock === 0}
              id="product-add-to-cart-btn"
            >
              <RiShoppingCart2Line />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button className="product-modal-wishlist-btn" id="product-wishlist-btn">
              <RiHeart3Line />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductDetailModal);
