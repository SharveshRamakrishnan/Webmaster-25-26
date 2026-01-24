import React from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // You could also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: '40px 20px',
          textAlign: 'center',
          backgroundColor: '#fef2f2',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          <h2 style={{ color: '#991b1b', marginBottom: '12px', fontSize: '24px' }}>
            Oops! Something went wrong
          </h2>
          <p style={{ color: '#7f1d1d', marginBottom: '24px', fontSize: '16px', maxWidth: '500px' }}>
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
