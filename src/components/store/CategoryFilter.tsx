import React from 'react';
import {
  RiCupLine,
  RiGobletLine,
  RiContrastDrop2Line,
  RiDrinks2Line,
  RiGridLine,
} from 'react-icons/ri';
import type { ProductCategory } from '../../types/product';
import { CATEGORIES, mockProducts } from '../../data/mockProducts';

interface CategoryFilterProps {
  activeCategory: ProductCategory | null;
  onSelect: (category: ProductCategory | null) => void;
}

const CATEGORY_META: Record<
  ProductCategory,
  { icon: React.ReactNode; cssClass: string }
> = {
  Juice: { icon: <RiGobletLine />, cssClass: 'juice' },
  Coffee: { icon: <RiCupLine />, cssClass: 'coffee' },
  'Milk Tea': { icon: <RiContrastDrop2Line />, cssClass: 'milktea' },
  'Soft Drink': { icon: <RiDrinks2Line />, cssClass: 'softdrink' },
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onSelect }) => {
  const getCategoryCount = (cat: ProductCategory): number =>
    mockProducts.filter((p) => p.category === cat).length;

  return (
    <section className="category-section" id="category-section">
      <div className="section-header">
        <h2 className="section-title">Browse Categories</h2>
        <span className="section-subtitle">{CATEGORIES.length} categories</span>
      </div>

      <div className="category-grid">
        {/* All category card */}
        <div
          className={`category-card category-card-all ${activeCategory === null ? 'active' : ''}`}
          onClick={() => onSelect(null)}
          role="button"
          tabIndex={0}
          id="category-all"
          onKeyDown={(e) => e.key === 'Enter' && onSelect(null)}
        >
          <div className="category-icon">
            <RiGridLine />
          </div>
          <span className="category-card-name">All Drinks</span>
          <span className="category-card-count">{mockProducts.length} items</span>
        </div>

        {CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <div
              key={cat}
              className={`category-card ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => onSelect(cat)}
              role="button"
              tabIndex={0}
              id={`category-${cat.toLowerCase().replace(/\s/g, '-')}`}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(cat)}
            >
              <div className={`category-icon ${meta.cssClass}`}>{meta.icon}</div>
              <span className="category-card-name">{cat}</span>
              <span className="category-card-count">{getCategoryCount(cat)} items</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(CategoryFilter);
