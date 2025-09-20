import React, { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import './CompilerPage.css';

const CompilerPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('blank');
  const [code, setCode] = useState('');
  const [pageTitle, setPageTitle] = useState('Online Compiler');

  // Check for pre-loaded code from polyfill examples
  useEffect(() => {
    const preloadedCode = sessionStorage.getItem('compilerCode');
    const preloadedTitle = sessionStorage.getItem('compilerTitle');
    
    if (preloadedCode) {
      setCode(preloadedCode);
      setSelectedTemplate('custom');
      if (preloadedTitle) {
        setPageTitle(preloadedTitle);
      }
      // Clear the session storage after loading
      sessionStorage.removeItem('compilerCode');
      sessionStorage.removeItem('compilerTitle');
    }
  }, []);

  const templates = [
    {
      id: 'blank',
      name: 'Blank Template',
      description: 'Start with a clean slate',
      code: '// Write your JavaScript code here\nconsole.log("Hello, World!");'
    },
    {
      id: 'custom',
      name: 'Custom Code',
      description: 'Pre-loaded from polyfill example',
      code: code || '// Custom code loaded from polyfill example'
    },
    {
      id: 'polyfill',
      name: 'Polyfill Template',
      description: 'Template for implementing polyfills',
      code: `// Polyfill Template
function myPolyfill() {
  // TODO: Implement your polyfill here
  
}

// Test your implementation
console.log('Testing polyfill...');
// Add your test cases here`
    },
    {
      id: 'react-hook',
      name: 'React Hook Template',
      description: 'Template for custom React hooks',
      code: `// Custom React Hook Template
function useCustomHook(initialValue) {
  // TODO: Implement your custom hook
  
  return {
    // Return your hook's interface
  };
}

// Test your hook
console.log('Testing custom hook...');
// Add your test cases here`
    },
    {
      id: 'algorithm',
      name: 'Algorithm Template',
      description: 'Template for algorithm problems',
      code: `// Algorithm Template
function solveProblem(input) {
  // TODO: Implement your algorithm
  
}

// Test cases
console.log('Testing algorithm...');
console.log(solveProblem('test input'));`
    },
    {
      id: 'async',
      name: 'Async/Await Template',
      description: 'Template for async operations',
      code: `// Async/Await Template
async function fetchData() {
  try {
    // TODO: Implement async operation
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Test async function
fetchData().then(data => {
  console.log('Data:', data);
});`
    },
    {
      id: 'dom',
      name: 'DOM Manipulation Template',
      description: 'Template for DOM operations',
      code: `// DOM Manipulation Template
function manipulateDOM() {
  // TODO: Implement DOM operations
  
  // Example:
  // const element = document.createElement('div');
  // element.textContent = 'Hello, DOM!';
  // document.body.appendChild(element);
}

// Test DOM manipulation
console.log('Testing DOM manipulation...');
manipulateDOM();`
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setCode(template.code);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRun = (code: string) => {
    console.log('Code executed:', code);
  };

  return (
    <div className="compiler-page">
      <div className="page-header">
        <h1>💻 {pageTitle}</h1>
        <p>Write, run, and test your JavaScript code in real-time. Perfect for practicing polyfills, algorithms, and more!</p>
      </div>

      <div className="compiler-container">
        <div className="templates-sidebar">
          <h3>Code Templates</h3>
          <div className="templates-list">
            {templates.map((template) => (
              <button
                key={template.id}
                className={`template-item ${selectedTemplate === template.id ? 'active' : ''}`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="template-header">
                  <span className="template-name">{template.name}</span>
                </div>
                <p className="template-description">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="compiler-main">
          <div className="compiler-editor">
            <CodeEditor
              initialCode={code}
              onCodeChange={handleCodeChange}
              onRun={handleRun}
              language="javascript"
              height="600px"
            />
          </div>
        </div>
      </div>

      <div className="compiler-features">
        <div className="features-container">
          <h2>Compiler Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Execution</h3>
              <p>Run your code instantly and see results in real-time with our JavaScript engine.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📝</div>
              <h3>Code Templates</h3>
              <p>Start with pre-built templates for common coding scenarios and patterns.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔧</div>
              <h3>Syntax Highlighting</h3>
              <p>Beautiful syntax highlighting for better code readability and development experience.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📋</div>
              <h3>Copy & Share</h3>
              <p>Easily copy your code or share it with others for collaboration and feedback.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🛡️</div>
              <h3>Safe Execution</h3>
              <p>Run code in a secure sandboxed environment without affecting your system.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Responsive design that works perfectly on desktop, tablet, and mobile devices.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="compiler-tips">
        <div className="tips-container">
          <h2>💡 Pro Tips</h2>
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-icon">🎯</span>
              <div className="tip-content">
                <h4>Use Templates</h4>
                <p>Start with our pre-built templates to save time and focus on the core logic.</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🔍</span>
              <div className="tip-content">
                <h4>Test Incrementally</h4>
                <p>Test your code frequently as you build it to catch errors early.</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📚</span>
              <div className="tip-content">
                <h4>Practice Patterns</h4>
                <p>Use this compiler to practice common JavaScript patterns and algorithms.</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">⚡</span>
              <div className="tip-content">
                <h4>Keyboard Shortcuts</h4>
                <p>Use Tab for indentation and Ctrl+Enter (Cmd+Enter on Mac) to run code quickly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompilerPage;
