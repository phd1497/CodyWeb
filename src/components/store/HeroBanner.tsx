import React from 'react';
import { RiArrowRightLine, RiLeafLine } from 'react-icons/ri';

interface HeroBannerProps {
  onExplore: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  return (
    <section className="hero-banner" id="hero-banner">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Fresh & Handcrafted Daily
        </div>

        <h1 className="hero-title">
          Discover Your <span>Perfect Drink</span> Today
        </h1>

        <p className="hero-subtitle">
          From cold-pressed juices to artisan coffee and bubble tea —
          explore our curated collection of premium beverages made with love.
        </p>

        <div className="hero-actions">
          <button
            className="hero-btn-primary"
            id="hero-explore-btn"
            onClick={onExplore}
          >
            Explore Menu <RiArrowRightLine />
          </button>
          <button className="hero-btn-secondary" id="hero-fresh-btn">
            <RiLeafLine /> Our Story
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">50+</div>
            <div className="hero-stat-label">Drinks</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">12k+</div>
            <div className="hero-stat-label">Happy Customers</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">4.9</div>
            <div className="hero-stat-label">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroBanner);
