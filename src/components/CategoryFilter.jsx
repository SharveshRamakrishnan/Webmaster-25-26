/**
 * Reusable Category Filter Component
 * Accepts categories array, selected value, onChange callback, optional counts, and optional className
 * counts is an optional object mapping category names to their counts, e.g., { "Health": 24, "Education": 18 }
 */

import PropTypes from 'prop-types';

const CategoryFilter = ({ categories, selected, onChange, counts = null, className = '' }) => {
  return (
    <div className={`category-filters ${className}`}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`category-btn ${selected === category ? 'active' : ''}`}
        >
          {category}
          {counts && counts[category] !== undefined && (
            <span className="category-count">{counts[category]}</span>
          )}
        </button>
      ))}
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  counts: PropTypes.object,
  className: PropTypes.string,
};

export default CategoryFilter;
