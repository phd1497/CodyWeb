import React from 'react';

const PageLoader: React.FC = () => (
  <div className="page-loader" role="status" aria-label="Loading page">
    <div className="page-loader-spinner" />
  </div>
);

export default PageLoader;
