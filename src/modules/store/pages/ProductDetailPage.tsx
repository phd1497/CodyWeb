import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RiArrowLeftLine, RiHeart3Line, RiShoppingCart2Line, RiStarFill } from 'react-icons/ri';
import { productService } from '../services/productService';
import type { Product } from '../../../types/product';
import SkeletonGrid from '../../../shared/components/SkeletonGrid';
import StateMessage from '../../../shared/components/StateMessage';
import { useCart } from '../../../contexts/cart/CartContext';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        setError(null);
        const response = await productService.getProductById(productId);

        if (!response) {
          setError('The product you requested does not exist.');
          return;
        }

        setProduct(response);
      } catch {
        setError('Unable to load the product details.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) return <SkeletonGrid />;

  if (error || !product) {
    return <StateMessage title="Product unavailable" message={error || 'Unknown error'} />;
  }

  return (
    <section className="product-detail-page">
      <Link to="/user/home" className="product-detail-back">
        <RiArrowLeftLine /> Back to Menu
      </Link>

      <div className="product-detail-card">
        <img src={product.image} alt={product.name} className="product-detail-image" loading="lazy" />
        <div className="product-detail-content">
          <span className="product-card-badge">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.longDescription}</p>

          <div className="product-detail-meta">
            <span>
              <RiStarFill /> {product.rating}
            </span>
            <span>${product.price.toFixed(2)}</span>
            <span>{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</span>
          </div>

          <div className="product-modal-actions">
            <button
              className="product-modal-cart-btn"
              disabled={product.stock === 0}
              onClick={() => addItem(product.id)}
            >
              <RiShoppingCart2Line />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button className="product-modal-wishlist-btn" aria-label="Add to wishlist">
              <RiHeart3Line />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
