import React, { useState } from 'react';
import './MachineCodingPage.css';

interface CodingQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'System Design' | 'Data Structures' | 'Algorithms' | 'Frontend' | 'Backend';
  timeLimit: string;
  requirements: string[];
  boilerplate: string;
  testCases: string[];
  hints: string[];
}

const MachineCodingPage: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<string>('debounce');

  const codingQuestions: CodingQuestion[] = [
    {
      id: 'debounce',
      title: 'Debounce Function',
      description: 'Implement a debounce function that delays the execution of a function until after a specified delay has passed since its last invocation.',
      difficulty: 'Easy',
      category: 'Frontend',
      timeLimit: '30 minutes',
      requirements: [
        'Function should accept a callback and delay as parameters',
        'Should cancel previous timeout when called again',
        'Should return a new function that can be called multiple times',
        'Should handle edge cases (null callback, negative delay)',
        'Should maintain the original function\'s context and arguments'
      ],
      boilerplate: `// Implement debounce function
function debounce(func, delay) {
  // TODO: Your implementation here
  
}

// Test cases
const expensiveFunction = (value) => {
  console.log('Expensive operation:', value);
};

const debouncedFunction = debounce(expensiveFunction, 300);

// Test 1: Basic functionality
debouncedFunction('test1');
debouncedFunction('test2');
debouncedFunction('test3');
// Should only log 'test3' after 300ms

// Test 2: Multiple calls
setTimeout(() => debouncedFunction('delayed'), 100);
setTimeout(() => debouncedFunction('delayed2'), 200);
// Should only log 'delayed2' after 500ms total

// Test 3: Edge cases
const debouncedNull = debounce(null, 100); // Should handle gracefully
const debouncedNegative = debounce(expensiveFunction, -100); // Should handle gracefully`,
      testCases: [
        'Basic debouncing - only last call should execute',
        'Multiple rapid calls - should cancel previous calls',
        'Delayed calls - should work with setTimeout',
        'Edge case - null callback should not throw error',
        'Edge case - negative delay should be handled',
        'Context preservation - this should be maintained',
        'Arguments preservation - all arguments should be passed'
      ],
      hints: [
        'Use setTimeout and clearTimeout',
        'Store the timeout ID in a closure',
        'Return a new function that manages the timeout',
        'Clear previous timeout before setting new one',
        'Handle edge cases with proper validation'
      ]
    },
    {
      id: 'throttle',
      title: 'Throttle Function',
      description: 'Implement a throttle function that limits the rate at which a function can be called.',
      difficulty: 'Easy',
      category: 'Frontend',
      timeLimit: '30 minutes',
      requirements: [
        'Function should accept a callback and limit as parameters',
        'Should execute immediately on first call',
        'Should ignore subsequent calls until limit period passes',
        'Should handle edge cases properly',
        'Should maintain function context and arguments'
      ],
      boilerplate: `// Implement throttle function
function throttle(func, limit) {
  // TODO: Your implementation here
  
}

// Test cases
const expensiveFunction = (value) => {
  console.log('Throttled operation:', value, new Date().getTime());
};

const throttledFunction = throttle(expensiveFunction, 1000);

// Test 1: Basic throttling
throttledFunction('test1');
throttledFunction('test2'); // Should be ignored
throttledFunction('test3'); // Should be ignored
// Should only log 'test1'

// Test 2: After limit period
setTimeout(() => throttledFunction('delayed'), 1100);
// Should log 'delayed' after 1100ms

// Test 3: Multiple throttled calls
for (let i = 0; i < 5; i++) {
  setTimeout(() => throttledFunction(\`call-\${i}\`), i * 200);
}
// Should only log first and last calls`,
      testCases: [
        'Basic throttling - first call should execute immediately',
        'Subsequent calls - should be ignored within limit period',
        'After limit period - should allow next call',
        'Multiple rapid calls - should respect throttle limit',
        'Edge case - null callback should not throw error',
        'Edge case - zero or negative limit should be handled',
        'Context and arguments should be preserved'
      ],
      hints: [
        'Track the last execution time',
        'Compare current time with last execution time',
        'Execute immediately if enough time has passed',
        'Use a flag or timestamp to track state',
        'Handle edge cases with proper validation'
      ]
    },
    {
      id: 'event-emitter',
      title: 'Event Emitter',
      description: 'Implement a simple Event Emitter class that can register event listeners and emit events.',
      difficulty: 'Medium',
      category: 'System Design',
      timeLimit: '45 minutes',
      requirements: [
        'Should have on() method to register event listeners',
        'Should have emit() method to trigger events',
        'Should have off() method to remove event listeners',
        'Should support multiple listeners for same event',
        'Should handle event data/payload',
        'Should not throw errors for non-existent events'
      ],
      boilerplate: `// Implement EventEmitter class
class EventEmitter {
  constructor() {
    // TODO: Initialize your data structures here
    
  }
  
  on(event, callback) {
    // TODO: Register event listener
    
  }
  
  emit(event, ...args) {
    // TODO: Trigger event and call all listeners
    
  }
  
  off(event, callback) {
    // TODO: Remove specific event listener
    
  }
  
  once(event, callback) {
    // TODO: Register one-time event listener (bonus)
    
  }
}

// Test cases
const emitter = new EventEmitter();

// Test 1: Basic event handling
emitter.on('test', (data) => {
  console.log('Event received:', data);
});

emitter.emit('test', 'Hello World');
// Should log: Event received: Hello World

// Test 2: Multiple listeners
emitter.on('test', (data) => {
  console.log('Second listener:', data);
});

emitter.emit('test', 'Multiple listeners');
// Should log both messages

// Test 3: Remove listener
const listener = (data) => console.log('Removable listener:', data);
emitter.on('test', listener);
emitter.off('test', listener);
emitter.emit('test', 'Should not see removable listener');
// Should not log removable listener message

// Test 4: Non-existent event
emitter.emit('nonexistent', 'data');
// Should not throw error`,
      testCases: [
        'Basic event registration and emission',
        'Multiple listeners for same event',
        'Event data/payload handling',
        'Listener removal functionality',
        'Non-existent event handling',
        'One-time event listeners (bonus)',
        'Memory leak prevention'
      ],
      hints: [
        'Use a Map or object to store event listeners',
        'Store listeners as arrays for each event',
        'Handle multiple arguments in emit method',
        'Implement proper cleanup in off method',
        'Consider using WeakMap for memory efficiency'
      ]
    },
    {
      id: 'promise-all',
      title: 'Promise.all Implementation',
      description: 'Implement your own version of Promise.all that handles an array of promises.',
      difficulty: 'Medium',
      category: 'Algorithms',
      timeLimit: '45 minutes',
      requirements: [
        'Should accept an array of promises or values',
        'Should return a single promise',
        'Should resolve with array of results when all promises resolve',
        'Should reject immediately if any promise rejects',
        'Should handle empty array',
        'Should preserve order of results'
      ],
      boilerplate: `// Implement Promise.all
function promiseAll(promises) {
  // TODO: Your implementation here
  
}

// Test cases
// Test 1: All promises resolve
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

promiseAll([promise1, promise2, promise3])
  .then(results => {
    console.log('All resolved:', results);
    // Should log: [1, 2, 3]
  });

// Test 2: One promise rejects
const goodPromise = Promise.resolve('success');
const badPromise = Promise.reject('error');

promiseAll([goodPromise, badPromise])
  .then(results => {
    console.log('Should not reach here');
  })
  .catch(error => {
    console.log('Caught error:', error);
    // Should log: error
  });

// Test 3: Mixed promises and values
promiseAll([1, Promise.resolve(2), 3])
  .then(results => {
    console.log('Mixed results:', results);
    // Should log: [1, 2, 3]
  });

// Test 4: Empty array
promiseAll([])
  .then(results => {
    console.log('Empty array:', results);
    // Should log: []
  });`,
      testCases: [
        'All promises resolve successfully',
        'One promise rejects - should reject immediately',
        'Mixed promises and non-promise values',
        'Empty array should resolve with empty array',
        'Order of results should match input order',
        'Should handle Promise.resolve() and Promise.reject()',
        'Should work with async functions'
      ],
      hints: [
        'Return a new Promise',
        'Track resolved promises count',
        'Store results in correct order',
        'Handle both promises and non-promise values',
        'Reject immediately on first rejection',
        'Resolve when all promises are done'
      ]
    },
    {
      id: 'deep-clone',
      title: 'Deep Clone Function',
      description: 'Implement a deep clone function that creates a complete copy of nested objects and arrays.',
      difficulty: 'Medium',
      category: 'Algorithms',
      timeLimit: '45 minutes',
      requirements: [
        'Should handle objects, arrays, primitives',
        'Should handle nested structures',
        'Should handle circular references',
        'Should handle Date, RegExp, and other special objects',
        'Should not mutate original object',
        'Should handle null and undefined'
      ],
      boilerplate: `// Implement deep clone function
function deepClone(obj) {
  // TODO: Your implementation here
  
}

// Test cases
// Test 1: Basic object cloning
const original = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'coding']
};

const cloned = deepClone(original);
cloned.name = 'Jane';
cloned.hobbies.push('gaming');

console.log('Original:', original);
console.log('Cloned:', cloned);
// Original should remain unchanged

// Test 2: Nested objects
const nested = {
  user: {
    profile: {
      name: 'Alice',
      settings: {
        theme: 'dark',
        notifications: true
      }
    }
  }
};

const clonedNested = deepClone(nested);
clonedNested.user.profile.settings.theme = 'light';
console.log('Original theme:', nested.user.profile.settings.theme);
console.log('Cloned theme:', clonedNested.user.profile.settings.theme);

// Test 3: Arrays with objects
const arrayWithObjects = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

const clonedArray = deepClone(arrayWithObjects);
clonedArray[0].name = 'Modified Item 1';
console.log('Original first item:', arrayWithObjects[0].name);
console.log('Cloned first item:', clonedArray[0].name);

// Test 4: Special objects
const special = {
  date: new Date(),
  regex: /test/gi,
  func: function() { return 'test'; },
  nullValue: null,
  undefinedValue: undefined
};

const clonedSpecial = deepClone(special);
console.log('Special objects cloned:', clonedSpecial);`,
      testCases: [
        'Basic object and array cloning',
        'Nested object structures',
        'Arrays containing objects',
        'Primitive values (string, number, boolean)',
        'Null and undefined values',
        'Date and RegExp objects',
        'Function objects (bonus)',
        'Circular references (bonus)'
      ],
      hints: [
        'Check the type of the input value',
        'Handle primitives, arrays, and objects separately',
        'Use recursion for nested structures',
        'Consider using Map to track circular references',
        'Handle special objects like Date and RegExp',
        'Test thoroughly with different data types'
      ]
    },
    {
      id: 'lru-cache',
      title: 'LRU Cache Implementation',
      description: 'Implement a Least Recently Used (LRU) cache with get and put operations.',
      difficulty: 'Hard',
      category: 'Data Structures',
      timeLimit: '60 minutes',
      requirements: [
        'Should have fixed capacity',
        'Should support get(key) and put(key, value) operations',
        'Should evict least recently used item when capacity exceeded',
        'Should update access time on get operations',
        'Should handle edge cases (capacity 0, negative capacity)',
        'Should have O(1) time complexity for both operations'
      ],
      boilerplate: `// Implement LRU Cache
class LRUCache {
  constructor(capacity) {
    // TODO: Initialize your data structures here
    
  }
  
  get(key) {
    // TODO: Get value and update access time
    
  }
  
  put(key, value) {
    // TODO: Add/update value and handle eviction
    
  }
  
  // Helper methods (optional)
  _moveToHead(node) {
    // TODO: Move node to head of list
    
  }
  
  _removeNode(node) {
    // TODO: Remove node from list
    
  }
  
  _addToHead(node) {
    // TODO: Add node to head of list
    
  }
  
  _removeTail() {
    // TODO: Remove tail node and return it
    
  }
}

// Test cases
const cache = new LRUCache(3);

// Test 1: Basic operations
cache.put(1, 'one');
cache.put(2, 'two');
cache.put(3, 'three');

console.log(cache.get(1)); // Should return 'one'
console.log(cache.get(2)); // Should return 'two'

// Test 2: Eviction
cache.put(4, 'four'); // Should evict key 3
console.log(cache.get(3)); // Should return -1 (not found)
console.log(cache.get(4)); // Should return 'four'

// Test 3: Update existing key
cache.put(2, 'two-updated');
console.log(cache.get(2)); // Should return 'two-updated'

// Test 4: Access order matters
cache.put(5, 'five'); // Should evict key 1 (least recently used)
console.log(cache.get(1)); // Should return -1
console.log(cache.get(2)); // Should return 'two-updated'`,
      testCases: [
        'Basic get and put operations',
        'Capacity limit enforcement',
        'LRU eviction when capacity exceeded',
        'Access time updates on get operations',
        'Update existing key values',
        'Edge case - capacity of 0 or 1',
        'Edge case - get non-existent key',
        'Performance - O(1) operations'
      ],
      hints: [
        'Use a combination of Map and Doubly Linked List',
        'Map provides O(1) key lookup',
        'Doubly Linked List provides O(1) insertion/deletion',
        'Track head (most recent) and tail (least recent)',
        'Update pointers when accessing existing items',
        'Remove tail when capacity exceeded'
      ]
    }
  ];

  const selectedQuestionData = codingQuestions.find(q => q.id === selectedQuestion);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#607D8B';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'System Design': return '#9C27B0';
      case 'Data Structures': return '#2196F3';
      case 'Algorithms': return '#FF9800';
      case 'Frontend': return '#4CAF50';
      case 'Backend': return '#F44336';
      default: return '#607D8B';
    }
  };

  return (
    <div className="machine-coding-page">
      <div className="page-header">
        <h1>💻 Machine Coding Questions</h1>
        <p>Practice important coding questions commonly asked in technical interviews. Choose a question and implement it!</p>
      </div>

      <div className="questions-container">
        <div className="questions-sidebar">
          <h3>Available Questions</h3>
          <div className="questions-list">
            {codingQuestions.map((question) => (
              <button
              key={question.id}
              className={`question-item ${selectedQuestion === question.id ? 'active' : ''}`}
              onClick={() => setSelectedQuestion(question.id)}
            >
              <div className="question-header">
                <span className="question-title">{question.title}</span>
                <div className="question-badges">
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(question.difficulty) }}
                  >
                    {question.difficulty}
                  </span>
                  <span 
                    className="category-badge"
                    style={{ backgroundColor: getCategoryColor(question.category) }}
                  >
                    {question.category}
                  </span>
                </div>
              </div>
            
              <div className="question-meta">
                <span className="time-limit">⏱️ {question.timeLimit}</span>
              </div>
            
              {/* description now clearly below */}
              <div className="question-description">
                {question.description}
              </div>
            </button>
            
            ))}
          </div>
        </div>

        <div className="questions-content">
          {selectedQuestionData && (
            <div className="question-details">
              <div className="question-info">
                <h2>{selectedQuestionData.title}</h2>
                <p>{selectedQuestionData.description}</p>
                <div className="question-meta-info">
                  <div className="meta-item">
                    <span>Difficulty: </span>
                    <span 
                      className="difficulty-text"
                      style={{ color: getDifficultyColor(selectedQuestionData.difficulty) }}
                    >
                      {selectedQuestionData.difficulty}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span>Category: </span>
                    <span 
                      className="category-text"
                      style={{ color: getCategoryColor(selectedQuestionData.category) }}
                    >
                      {selectedQuestionData.category}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span>Time Limit: </span>
                    <span className="time-text">{selectedQuestionData.timeLimit}</span>
                  </div>
                </div>
              </div>

              <div className="requirements-section">
                <h3>📋 Requirements</h3>
                <ul className="requirements-list">
                  {selectedQuestionData.requirements.map((requirement, index) => (
                    <li key={index} className="requirement-item">
                      <span className="requirement-number">{index + 1}</span>
                      <span className="requirement-text">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="boilerplate-section">
                <h3>📝 Implementation Boilerplate</h3>
                <div className="code-editor">
                  <pre><code>{selectedQuestionData.boilerplate}</code></pre>
                </div>
                <button className="copy-btn">📋 Copy Code</button>
              </div>

              <div className="test-cases-section">
                <h3>✅ Test Cases to Verify</h3>
                <ul className="test-cases">
                  {selectedQuestionData.testCases.map((testCase, index) => (
                    <li key={index} className="test-case">
                      <span className="test-number">{index + 1}</span>
                      <span className="test-description">{testCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hints-section">
                <h3>💡 Hints</h3>
                <ul className="hints-list">
                  {selectedQuestionData.hints.map((hint, index) => (
                    <li key={index} className="hint-item">
                      <span className="hint-number">{index + 1}</span>
                      <span className="hint-text">{hint}</span>
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

export default MachineCodingPage;
