import React, { useState } from 'react';
import './ReactTheoryPage.css';

interface ReactTopic {
  id: string;
  title: string;
  description: string;
  category: 'Fundamentals' | 'Hooks' | 'Performance' | 'Advanced' | 'Patterns' | 'Testing';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  concepts: string[];
  examples: string[];
  questions: string[];
}

const ReactTheoryPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('components');

  const reactTopics: ReactTopic[] = [
    {
      id: 'components',
      title: 'Components & JSX',
      description: 'Understanding React components, JSX syntax, and component composition.',
      category: 'Fundamentals',
      difficulty: 'Beginner',
      concepts: [
        'Functional vs Class Components',
        'JSX Syntax and Rules',
        'Component Props',
        'Component Composition',
        'Children Prop',
        'Default Props'
      ],
      examples: [
        `// Functional Component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Welcome name="Sara" />`,

        `// Component with Children
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="User Profile">
  <p>This is the card content</p>
  <button>Click me</button>
</Card>`,

        `// Component Composition
function App() {
  return (
    <div>
      <Header />
      <Main>
        <Sidebar />
        <Content />
      </Main>
      <Footer />
    </div>
  );
}`,

        `// Conditional Rendering
function UserGreeting({ isLoggedIn, username }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {username}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
}`
      ],
      questions: [
        'What is JSX and how does it work?',
        'What are the differences between functional and class components?',
        'How do you pass data between components?',
        'What is the children prop and how do you use it?',
        'How do you handle conditional rendering in React?',
        'What are the rules for writing JSX?',
        'How do you set default props for components?',
        'What is component composition and why is it useful?'
      ]
    },
    {
      id: 'state-props',
      title: 'State & Props',
      description: 'Understanding React state management and prop passing patterns.',
      category: 'Fundamentals',
      difficulty: 'Beginner',
      concepts: [
        'State vs Props',
        'useState Hook',
        'State Updates',
        'Prop Drilling',
        'Immutable Updates',
        'Controlled vs Uncontrolled Components'
      ],
      examples: [
        `// useState Hook
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,

        `// Props and State
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(userData => {
      setUser(userData);
      setLoading(false);
    });
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,

        `// Controlled Component
function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
}`,

        `// State with Objects
function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0
  });
  
  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <form>
      <input
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}`
      ],
      questions: [
        'What is the difference between state and props?',
        'How do you update state in functional components?',
        'What are controlled vs uncontrolled components?',
        'How do you handle form state in React?',
        'What is prop drilling and how do you avoid it?',
        'How do you update nested state objects?',
        'When should you lift state up?',
        'What are the rules for updating state?'
      ]
    },
    {
      id: 'hooks',
      title: 'React Hooks',
      description: 'Understanding React hooks and their usage patterns.',
      category: 'Hooks',
      difficulty: 'Intermediate',
      concepts: [
        'useState Hook',
        'useEffect Hook',
        'useContext Hook',
        'useReducer Hook',
        'Custom Hooks',
        'Hook Rules'
      ],
      examples: [
        `// useEffect Hook
import { useState, useEffect } from 'react';

function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]); // Dependency array
  
  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}`,

        `// Custom Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Usage
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`,

        `// useReducer Hook
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
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
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}`
      ],
      questions: [
        'What are React hooks and why were they introduced?',
        'What are the rules of hooks?',
        'How do you create custom hooks?',
        'What is the difference between useState and useReducer?',
        'How do you handle side effects with useEffect?',
        'What is the dependency array in useEffect?',
        'How do you share state between components with useContext?',
        'When should you use useCallback and useMemo?'
      ]
    },
    {
      id: 'lifecycle',
      title: 'Component Lifecycle',
      description: 'Understanding React component lifecycle and when to use different lifecycle methods.',
      category: 'Fundamentals',
      difficulty: 'Intermediate',
      concepts: [
        'Mounting Phase',
        'Updating Phase',
        'Unmounting Phase',
        'useEffect Equivalents',
        'Cleanup Functions',
        'Error Boundaries'
      ],
      examples: [
        `// useEffect for Lifecycle
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  // ComponentDidMount + ComponentDidUpdate
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    
    // ComponentWillUnmount
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array = run once on mount
  
  return <div>Seconds: {seconds}</div>;
}`,

        `// Conditional useEffect
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    if (userId) {
      fetchUser(userId).then(setUser);
    }
  }, [userId]); // Re-run when userId changes
  
  return user ? <div>{user.name}</div> : <div>No user</div>;
}`,

        `// Cleanup Function
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    connection.connect();
    
    // Cleanup function
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  
  return <div>{/* Render messages */}</div>;
}`,

        `// Error Boundary (Class Component)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    
    return this.props.children;
  }
}`
      ],
      questions: [
        'What are the main phases of React component lifecycle?',
        'How do you replicate componentDidMount with hooks?',
        'How do you handle cleanup in useEffect?',
        'What is the difference between componentDidMount and componentDidUpdate?',
        'How do you handle errors in React components?',
        'When should you use componentDidCatch?',
        'How do you prevent memory leaks in React?',
        'What is the purpose of getDerivedStateFromError?'
      ]
    },
    {
      id: 'performance',
      title: 'Performance Optimization',
      description: 'Understanding React performance optimization techniques and best practices.',
      category: 'Performance',
      difficulty: 'Advanced',
      concepts: [
        'React.memo',
        'useMemo Hook',
        'useCallback Hook',
        'Code Splitting',
        'Lazy Loading',
        'Virtual DOM'
      ],
      examples: [
        `// React.memo for preventing unnecessary re-renders
const ExpensiveComponent = React.memo(function({ data, onUpdate }) {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div>
      <h2>{data.title}</h2>
      <button onClick={() => onUpdate(data.id)}>
        Update
      </button>
    </div>
  );
});

// Parent component
function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ id: 1, title: 'Test' });
  
  const handleUpdate = useCallback((id) => {
    setData(prev => ({ ...prev, title: 'Updated' }));
  }, []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ExpensiveComponent data={data} onUpdate={handleUpdate} />
    </div>
  );
}`,

        `// useMemo for expensive calculations
function ExpensiveList({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);
  
  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,

        `// Code Splitting with React.lazy
import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}`,

        `// useCallback for stable function references
function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  
  const handleAddItem = useCallback((item) => {
    setItems(prev => [...prev, item]);
  }, []);
  
  const handleRemoveItem = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ItemList 
        items={items}
        onAdd={handleAddItem}
        onRemove={handleRemoveItem}
      />
    </div>
  );
}`
      ],
      questions: [
        'What is React.memo and when should you use it?',
        'How do you optimize expensive calculations?',
        'What is the difference between useMemo and useCallback?',
        'How do you implement code splitting in React?',
        'What causes unnecessary re-renders in React?',
        'How do you optimize list rendering?',
        'What is the Virtual DOM and how does it work?',
        'How do you measure React performance?'
      ]
    },
    {
      id: 'patterns',
      title: 'React Patterns',
      description: 'Understanding common React patterns and architectural approaches.',
      category: 'Patterns',
      difficulty: 'Advanced',
      concepts: [
        'Higher-Order Components',
        'Render Props',
        'Compound Components',
        'Context Pattern',
        'Provider Pattern',
        'Custom Hooks Pattern'
      ],
      examples: [
        `// Higher-Order Component
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

// Usage
const UserProfile = withLoading(function({ user }) {
  return <div>{user.name}</div>;
});`,

        `// Render Props Pattern
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return render({ data, loading });
}

// Usage
<DataFetcher
  url="/api/users"
  render={({ data, loading }) => (
    loading ? <div>Loading...</div> : <UserList users={data} />
  )}
/>`,

        `// Compound Components
const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className="tabs">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: index === activeTab,
          onClick: () => setActiveTab(index)
        })
      )}
    </div>
  );
};

const Tab = ({ isActive, onClick, children }) => (
  <button
    className={\`tab \${isActive ? 'active' : ''}\`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Usage
<Tabs>
  <Tab>Tab 1</Tab>
  <Tab>Tab 2</Tab>
  <Tab>Tab 3</Tab>
</Tabs>`,

        `// Context Pattern
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
}`
      ],
      questions: [
        'What are Higher-Order Components and when should you use them?',
        'What is the render props pattern?',
        'How do you implement compound components?',
        'When should you use Context vs prop drilling?',
        'What are the benefits of custom hooks?',
        'How do you share logic between components?',
        'What is the provider pattern?',
        'How do you handle cross-cutting concerns in React?'
      ]
    }
  ];

  const selectedTopicData = reactTopics.find(topic => topic.id === selectedTopic);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#607D8B';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fundamentals': return '#2196F3';
      case 'Hooks': return '#4CAF50';
      case 'Performance': return '#FF9800';
      case 'Advanced': return '#9C27B0';
      case 'Patterns': return '#F44336';
      case 'Testing': return '#607D8B';
      default: return '#607D8B';
    }
  };

  return (
    <div className="react-theory-page">
      <div className="page-header">
        <h1>⚛️ React Theory</h1>
        <p>Master React concepts with detailed explanations, examples, and practice questions.</p>
      </div>

      <div className="theory-container">
        <div className="theory-sidebar">
          <h3>Topics</h3>
          <div className="topics-list">
            {reactTopics.map((topic) => (
              <button
                key={topic.id}
                className={`topic-item ${selectedTopic === topic.id ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic.id)}
              >
                <div className="topic-header">
                  <span className="topic-title">{topic.title}</span>
                  <div className="topic-badges">
                    <span 
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(topic.difficulty) }}
                    >
                      {topic.difficulty}
                    </span>
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(topic.category) }}
                    >
                      {topic.category}
                    </span>
                  </div>
                </div>
                <p className="topic-description">{topic.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="theory-content">
          {selectedTopicData && (
            <div className="topic-details">
              <div className="topic-info">
                <h2>{selectedTopicData.title}</h2>
                <p>{selectedTopicData.description}</p>
                <div className="topic-meta">
                  <div className="meta-item">
                    <span>Difficulty: </span>
                    <span 
                      className="difficulty-text"
                      style={{ color: getDifficultyColor(selectedTopicData.difficulty) }}
                    >
                      {selectedTopicData.difficulty}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span>Category: </span>
                    <span 
                      className="category-text"
                      style={{ color: getCategoryColor(selectedTopicData.category) }}
                    >
                      {selectedTopicData.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="concepts-section">
                <h3>🎯 Key Concepts</h3>
                <ul className="concepts-list">
                  {selectedTopicData.concepts.map((concept, index) => (
                    <li key={index} className="concept-item">
                      <span className="concept-number">{index + 1}</span>
                      <span className="concept-text">{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="examples-section">
                <h3>💻 Code Examples</h3>
                {selectedTopicData.examples.map((example, index) => (
                  <div key={index} className="example-block">
                    <div className="example-header">
                      <span className="example-title">Example {index + 1}</span>
                      <button className="copy-btn">📋 Copy</button>
                    </div>
                    <div className="code-block">
                      <pre><code>{example}</code></pre>
                    </div>
                  </div>
                ))}
              </div>

              <div className="questions-section">
                <h3>❓ Practice Questions</h3>
                <ul className="questions-list">
                  {selectedTopicData.questions.map((question, index) => (
                    <li key={index} className="question-item">
                      <span className="question-number">{index + 1}</span>
                      <span className="question-text">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactTheoryPage;
