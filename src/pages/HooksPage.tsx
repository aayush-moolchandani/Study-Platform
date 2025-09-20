import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import './HooksPage.css';

interface HookTemplate {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  boilerplate: string;
  testCases: string[];
}

const HooksPage: React.FC = () => {
  const [selectedHook, setSelectedHook] = useState<string>('useState');

  const hookTemplates: HookTemplate[] = [
    {
      id: 'useState',
      name: 'useState',
      description: 'A hook that lets you add state to functional components.',
      difficulty: 'Beginner',
      boilerplate: `// useState polyfill implementation
let currentHookIndex = 0;
let hooks = [];

function useState(initialValue) {
  const hookIndex = currentHookIndex++;
  
  // Initialize hook if it doesn't exist
  if (hooks[hookIndex] === undefined) {
    hooks[hookIndex] = {
      state: typeof initialValue === 'function' ? initialValue() : initialValue,
      setState: function(newValue) {
        const prevState = hooks[hookIndex].state;
        const nextState = typeof newValue === 'function' ? newValue(prevState) : newValue;
        
        if (prevState !== nextState) {
          hooks[hookIndex].state = nextState;
          // In a real implementation, this would trigger a re-render
          console.log('State updated:', nextState);
        }
      }
    };
  }
  
  return [hooks[hookIndex].state, hooks[hookIndex].setState];
}

// Test your implementation
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Counter');
  
  console.log(\`\${name}: \${count}\`);
  
  // Simulate button clicks
  setCount(count + 1);
  setCount(prev => prev + 1);
  setName('Updated Counter');
  
  return { count, name };
}

// Reset for testing
currentHookIndex = 0;
hooks = [];

const result = Counter();
console.log('Final result:', result);`,
      testCases: [
        'Should initialize with provided value',
        'Should update state when setState is called',
        'Should handle function initializer',
        'Should trigger re-render on state change',
        'Should maintain state between renders'
      ]
    },
    {
      id: 'useEffect',
      name: 'useEffect',
      description: 'A hook that lets you perform side effects in functional components.',
      difficulty: 'Intermediate',
      boilerplate: `// useEffect polyfill implementation
let effectIndex = 0;
let effects = [];
let cleanupFunctions = [];

function useEffect(effect, deps) {
  const currentIndex = effectIndex++;
  
  // Check if dependencies have changed
  const hasChanged = !effects[currentIndex] || 
    !deps || 
    deps.length !== effects[currentIndex].deps.length ||
    deps.some((dep, i) => dep !== effects[currentIndex].deps[i]);
  
  if (hasChanged) {
    // Cleanup previous effect
    if (cleanupFunctions[currentIndex]) {
      cleanupFunctions[currentIndex]();
    }
    
    // Run new effect
    const cleanup = effect();
    if (typeof cleanup === 'function') {
      cleanupFunctions[currentIndex] = cleanup;
    }
    
    // Store dependencies
    effects[currentIndex] = { deps: deps ? [...deps] : null };
  }
}

// Test your implementation
let data = null;
let loading = true;

function DataFetcher(url) {
  useEffect(() => {
    console.log('Effect running for URL:', url);
    loading = true;
    
    // Simulate async operation
    setTimeout(() => {
      data = { message: 'Data fetched successfully', url };
      loading = false;
      console.log('Data loaded:', data);
    }, 1000);
    
    // Cleanup function
    return () => {
      console.log('Cleanup: canceling request for', url);
    };
  }, [url]);
  
  return { data, loading };
}

// Test with different URLs
console.log('Testing useEffect...');
DataFetcher('https://api.example.com/users');
DataFetcher('https://api.example.com/users'); // Same URL, should not run
DataFetcher('https://api.example.com/posts'); // Different URL, should run`,
      testCases: [
        'Should run effect on mount',
        'Should run effect when dependencies change',
        'Should not run effect when dependencies unchanged',
        'Should cleanup on unmount',
        'Should handle async effects properly'
      ]
    },
    {
      id: 'useContext',
      name: 'useContext',
      description: 'A hook that lets you consume context values in functional components.',
      difficulty: 'Intermediate',
      boilerplate: `import { createContext, useContext } from 'react';

// Your useContext polyfill implementation
function createContext(defaultValue) {
  // TODO: Implement createContext polyfill
  // Should return context object with Provider and Consumer
  
  return {
    Provider: ({ value, children }) => children,
    Consumer: ({ children }) => children(defaultValue)
  };
}

function useContext(context) {
  // TODO: Implement useContext polyfill
  // Should return current context value
  // Should subscribe to context changes
  
  return context._currentValue;
}

// Test your implementation
const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button 
      style={{ 
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Toggle Theme
    </button>
  );
}`,
      testCases: [
        'Should return default value when no Provider',
        'Should return Provider value when available',
        'Should update when Provider value changes',
        'Should work with nested Providers',
        'Should handle context updates properly'
      ]
    },
    {
      id: 'useReducer',
      name: 'useReducer',
      description: 'A hook that lets you manage complex state logic with reducers.',
      difficulty: 'Advanced',
      boilerplate: `import { useReducer } from 'react';

// Your useReducer polyfill implementation
function useReducer(reducer, initialState, init) {
  // TODO: Implement useReducer polyfill
  // Should handle initializer function
  // Should return [state, dispatch] tuple
  // Should update state based on action
  
  const [state, setState] = useState(init ? init(initialState) : initialState);
  
  const dispatch = (action) => {
    setState(prevState => reducer(prevState, action));
  };
  
  return [state, dispatch];
}

// Test your implementation
const initialState = { count: 0 };

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}`,
      testCases: [
        'Should initialize with initial state',
        'Should handle initializer function',
        'Should update state based on action',
        'Should maintain state between renders',
        'Should handle complex state updates'
      ]
    },
    {
      id: 'useMemo',
      name: 'useMemo',
      description: 'A hook that lets you memoize expensive calculations.',
      difficulty: 'Advanced',
      boilerplate: `import { useMemo } from 'react';

// Your useMemo polyfill implementation
function useMemo(factory, deps) {
  // TODO: Implement useMemo polyfill
  // Should cache result based on dependencies
  // Should recalculate when dependencies change
  // Should handle dependency comparison
  
  // Implementation here
}

// Test your implementation
function ExpensiveComponent({ items, filter }) {
  const expensiveValue = useMemo(() => {
    console.log('Expensive calculation running...');
    return items
      .filter(item => item.includes(filter))
      .map(item => item.toUpperCase())
      .sort();
  }, [items, filter]);
  
  return (
    <div>
      <h3>Filtered Items:</h3>
      <ul>
        {expensiveValue.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`,
      testCases: [
        'Should cache result when dependencies unchanged',
        'Should recalculate when dependencies change',
        'Should handle empty dependency array',
        'Should handle undefined dependencies',
        'Should optimize performance'
      ]
    },
    {
      id: 'useCallback',
      name: 'useCallback',
      description: 'A hook that lets you memoize callback functions.',
      difficulty: 'Advanced',
      boilerplate: `import { useCallback } from 'react';

// Your useCallback polyfill implementation
function useCallback(callback, deps) {
  // TODO: Implement useCallback polyfill
  // Should cache callback based on dependencies
  // Should return new callback when dependencies change
  // Should handle dependency comparison
  
  // Implementation here
}

// Test your implementation
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  const handleClick = useCallback(() => {
    console.log('Button clicked!', count);
  }, [count]);
  
  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);
  
  return (
    <div>
      <input value={name} onChange={handleNameChange} placeholder="Name" />
      <button onClick={handleClick}>Click me ({count})</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
      testCases: [
        'Should cache callback when dependencies unchanged',
        'Should return new callback when dependencies change',
        'Should handle empty dependency array',
        'Should optimize child re-renders',
        'Should maintain referential equality'
      ]
    }
  ];

  const selectedTemplate = hookTemplates.find(hook => hook.id === selectedHook);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#607D8B';
    }
  };

  return (
    <div className="hooks-page">
      <div className="page-header">
        <h1>🎣 React Hooks Polyfill Practice</h1>
        <p>Practice implementing React hooks from scratch. Choose a hook and implement it!</p>
      </div>

      <div className="hooks-container">
        <div className="hooks-sidebar">
          <h3>Available Hooks</h3>
          <div className="hooks-list">
            {hookTemplates.map((hook) => (
              <button
                key={hook.id}
                className={`hook-item ${selectedHook === hook.id ? 'active' : ''}`}
                onClick={() => setSelectedHook(hook.id)}
              >
                <div className="hook-header">
                  <span className="hook-name">{hook.name}</span>
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(hook.difficulty) }}
                  >
                    {hook.difficulty}
                  </span>
                </div>
                <p className="hook-description">{hook.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="hooks-content">
          {selectedTemplate && (
            <div className="hook-details">
              <div className="hook-info">
                <h2>{selectedTemplate.name}</h2>
                <p>{selectedTemplate.description}</p>
                <div className="difficulty-info">
                  <span>Difficulty: </span>
                  <span 
                    className="difficulty-text"
                    style={{ color: getDifficultyColor(selectedTemplate.difficulty) }}
                  >
                    {selectedTemplate.difficulty}
                  </span>
                </div>
              </div>

              <div className="boilerplate-section">
                <h3>📝 Interactive Implementation</h3>
                <div className="code-editor-wrapper">
                  <CodeEditor
                    initialCode={selectedTemplate.boilerplate}
                    onCodeChange={(code) => {
                      // Handle code changes if needed
                    }}
                    onRun={(code) => {
                      console.log('Running hook implementation:', code);
                    }}
                    language="javascript"
                    height="400px"
                  />
                </div>
              </div>

              <div className="test-cases-section">
                <h3>✅ Test Cases to Verify</h3>
                <ul className="test-cases">
                  {selectedTemplate.testCases.map((testCase, index) => (
                    <li key={index} className="test-case">
                      <span className="test-number">{index + 1}</span>
                      <span className="test-description">{testCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="practice-tips">
                <h3>💡 Practice Tips</h3>
                <ul>
                  <li>Start with the basic functionality first</li>
                  <li>Test each feature incrementally</li>
                  <li>Consider edge cases and error handling</li>
                  <li>Compare your implementation with React's behavior</li>
                  <li>Use browser dev tools to debug</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HooksPage;
