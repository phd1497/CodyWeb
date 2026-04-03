import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryFilter, HeroBanner, ProductGrid, SearchBar } from '../../../components/store';
import type { ProductCategory } from '../../../types/product';
import { useProducts } from '../hooks/useProducts';
import SkeletonGrid from '../../../shared/components/SkeletonGrid';
import StateMessage from '../../../shared/components/StateMessage';
import '../../../styles/Store.css';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);
  const productSectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { products, loading, error, reload } = useProducts({ search: searchQuery, category: activeCategory });

  const handleExplore = useCallback(() => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleCategorySelect = useCallback((category: ProductCategory | null) => {
    setActiveCategory(category);
    setSearchQuery('');
  }, []);

  const handleViewDetail = useCallback(
    (productId: string) => {
      navigate(`/user/products/${productId}`);
    },
    [navigate],
  );

  const content = useMemo(() => {
    if (loading) return <SkeletonGrid />;

    if (error) {
      return (
        <StateMessage
          title="We couldn't load products"
          message={error}
          actionLabel="Retry"
          onAction={reload}
        />
      );
    }

    return <ProductGrid products={products} onViewDetail={handleViewDetail} />;
  }, [loading, error, reload, products, handleViewDetail]);

  return (
    <div className="home-page">
      <HeroBanner onExplore={handleExplore} />

      <CategoryFilter activeCategory={activeCategory} onSelect={handleCategorySelect} />

      <div ref={productSectionRef}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} resultCount={products.length} />
      </div>

      {content}
    </div>
  );
};

export default HomePage;
