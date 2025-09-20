import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PolyfillInfo } from '../types/PolyfillTypes';
import './PolyfillCard.css';

interface PolyfillCardProps {
  polyfill: PolyfillInfo;
  onRunExample: (exampleId: string, code: string) => void;
}

const PolyfillCard: React.FC<PolyfillCardProps> = ({ polyfill, onRunExample }) => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Array': '#4CAF50',
      'Object': '#2196F3',
      'Function': '#FF9800',
      'String': '#9C27B0',
      'Number': '#F44336',
      'Other': '#607D8B'
    };
    return colors[category] || '#607D8B';
  };

  const handleOpenCompiler = (code: string, title: string) => {
    // Store the code in sessionStorage to pass to compiler
    sessionStorage.setItem('compilerCode', code);
    sessionStorage.setItem('compilerTitle', `${polyfill.name} - ${title}`);
    navigate('/compiler');
  };

  return (
    <div className="polyfill-card">
      <div className="polyfill-header">
        <div className="polyfill-title">
          <h3>{polyfill.name}</h3>
          <span 
            className="category-badge" 
            style={{ backgroundColor: getCategoryColor(polyfill.category) }}
          >
            {polyfill.category}
          </span>
        </div>
        <div className="polyfill-status">
          <span className={`status ${polyfill.isImplemented ? 'implemented' : 'not-implemented'}`}>
            {polyfill.isImplemented ? '✓ Implemented' : '✗ Not Implemented'}
          </span>
          <span className={`native-support ${polyfill.nativeSupport ? 'supported' : 'not-supported'}`}>
            {polyfill.nativeSupport ? 'Native' : 'Polyfill'}
          </span>
        </div>
      </div>
      
      <p className="polyfill-description">{polyfill.description}</p>
      
      <div className="examples-section">
        <div className="examples-header">
          <h4>Examples ({polyfill.examples.length})</h4>
          <button 
            className="toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
        
        {isExpanded && (
          <div className="examples-content">
            <div className="example-selector">
              {polyfill.examples.map((example, index) => (
                <button
                  key={example.id}
                  className={`example-tab ${selectedExample === index ? 'active' : ''}`}
                  onClick={() => setSelectedExample(index)}
                >
                  {example.title}
                </button>
              ))}
            </div>
            
            {polyfill.examples[selectedExample] && (
              <div className="example-details">
                <h5>{polyfill.examples[selectedExample].title}</h5>
                <p>{polyfill.examples[selectedExample].description}</p>
                
                <div className="code-preview">
                  <div className="code-header">
                    <span>Code Preview:</span>
                    <button 
                      className="open-compiler-btn"
                      onClick={() => handleOpenCompiler(
                        polyfill.examples[selectedExample].code,
                        polyfill.examples[selectedExample].title
                      )}
                    >
                      🚀 Open in Compiler
                    </button>
                  </div>
                  <div className="code-snippet">
                    <pre><code>{polyfill.examples[selectedExample].code}</code></pre>
                  </div>
                </div>
                
                <div className="expected-output">
                  <strong>Expected Output:</strong>
                  <pre>{polyfill.examples[selectedExample].expectedOutput}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PolyfillCard;
