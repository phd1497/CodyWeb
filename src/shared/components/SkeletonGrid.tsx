import React from 'react';

const SkeletonGrid: React.FC = () => {
  return (
    <section className="product-section">
      <div className="products-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="product-skeleton" key={index} />
        ))}
      </div>
    </section>
  );
};

export default SkeletonGrid;
