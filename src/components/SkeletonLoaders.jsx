import React from 'react';
import PropTypes from 'prop-types';
import '../css/skeleton.css';

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="skeleton-table">
      <div className="skeleton-header"></div>
      <div className="skeleton-row"></div>
      <div className="skeleton-row"></div>
      <div className="skeleton-row"></div>
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="skeleton-loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

SkeletonCard.propTypes = {};

SkeletonGrid.propTypes = {
  count: PropTypes.number,
};

SkeletonTable.propTypes = {};

SkeletonLoader.propTypes = {};
