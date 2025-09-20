import React, { useState, useEffect } from 'react';
import { PolyfillInfo } from '../types/PolyfillTypes';
import { polyfillRegistry, getPolyfillsByCategory } from '../polyfills';
// import { debounce, throttle, memoize } from '../polyfills/JsPolyfill';
import PolyfillCard from './PolyfillCard';
import './PolyfillDashboard.css';

const PolyfillDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPolyfills, setFilteredPolyfills] = useState<PolyfillInfo[]>(polyfillRegistry);

  const categories = ['All', 'Array', 'Object', 'Function', 'String', 'Number', 'Other'];

  useEffect(() => {
    let filtered = polyfillRegistry;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = getPolyfillsByCategory(selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(polyfill =>
        polyfill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        polyfill.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPolyfills(filtered);
  }, [selectedCategory, searchTerm]);

  const handleRunExample = (exampleId: string, code: string) => {
    try {
      // The CodeEditor now handles execution internally
      // This function is mainly for tracking which example was run
      console.log(`Running example: ${exampleId}`);
      
      // You could add additional logic here like:
      // - Tracking which examples have been run
      // - Storing user modifications
      // - Analytics tracking
      
    } catch (error) {
      console.error('Error in example handler:', error);
    }
  };

  const stats = {
    total: polyfillRegistry.length,
    implemented: polyfillRegistry.filter(p => p.isImplemented).length,
    categories: categories.length - 1 // Exclude 'All'
  };

  return (
    <div className="polyfill-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>JavaScript Polyfill Practice</h1>
          <p>Learn and practice JavaScript polyfills with interactive examples</p>
        </div>
        
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Polyfills</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.implemented}</span>
            <span className="stat-label">Implemented</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.categories}</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </header>

      <div className="dashboard-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search polyfills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="polyfills-grid">
        {filteredPolyfills.length > 0 ? (
          filteredPolyfills.map(polyfill => (
            <PolyfillCard
              key={polyfill.id}
              polyfill={polyfill}
              onRunExample={handleRunExample}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>No polyfills found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        )}
      </div>

      <footer className="dashboard-footer">
        <p>
          💡 <strong>Tip:</strong> Click on examples to expand them and use the "Run" button to execute code and see results.
        </p>
        <p>
          🚀 <strong>Practice:</strong> Add your own polyfill implementations to the <code>src/polyfills/</code> directory.
        </p>
      </footer>
    </div>
  );
};

export default PolyfillDashboard;
