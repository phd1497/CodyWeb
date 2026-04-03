import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  HeroBanner,
  CategoryFilter,
  ProductGrid,
  ProductDetailModal,
  SearchBar,
} from '../../components/store';
import { mockProducts } from '../../data/mockProducts';
import type { Product, ProductCategory } from '../../types/product';
import '../../styles/Store.css';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productSectionRef = useRef<HTMLDivElement>(null);

  /* ── Filtered products ── */
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return mockProducts.filter((product) => {
      const matchesCategory = activeCategory === null || product.category === activeCategory;
      const matchesSearch = query === '' || product.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  /* ── Handlers ── */
  const handleExplore = useCallback(() => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleCategorySelect = useCallback((category: ProductCategory | null) => {
    setActiveCategory(category);
    setSearchQuery('');
  }, []);

  const handleViewDetail = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <div className="home-page">
      {/* Section 1: Hero */}
      <HeroBanner onExplore={handleExplore} />

      {/* Section 2: Categories */}
      <CategoryFilter
        activeCategory={activeCategory}
        onSelect={handleCategorySelect}
      />

      {/* Search & Filter */}
      <div ref={productSectionRef}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filteredProducts.length}
        />
      </div>

      {/* Section 3: Product Grid */}
      <ProductGrid
        products={filteredProducts}
        onViewDetail={handleViewDetail}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default HomePage;
