import React, { useState } from 'react';
import './JSTheoryPage.css';

interface TheoryTopic {
  id: string;
  title: string;
  description: string;
  category: 'Fundamentals' | 'Advanced' | 'ES6+' | 'Async' | 'DOM' | 'Performance';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  concepts: string[];
  examples: string[];
  questions: string[];
}

const JSTheoryPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('closures');

  const theoryTopics: TheoryTopic[] = [
    {
      id: 'closures',
      title: 'Closures',
      description: 'Understanding how closures work in JavaScript and their practical applications.',
      category: 'Fundamentals',
      difficulty: 'Intermediate',
      concepts: [
        'Lexical Scoping',
        'Function Scope vs Block Scope',
        'Closure Definition',
        'Memory Management',
        'Practical Use Cases'
      ],
      examples: [
        `// Basic Closure Example
function outerFunction(x) {
  // Outer function's variable
  return function innerFunction(y) {
    // Inner function has access to outer function's variable
    return x + y;
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8
console.log(addFive(10)); // 15`,

        `// Module Pattern with Closure
const counter = (function() {
  let privateCounter = 0;
  
  return {
    increment: function() {
      privateCounter++;
    },
    decrement: function() {
      privateCounter--;
    },
    value: function() {
      return privateCounter;
    }
  };
})();

counter.increment();
counter.increment();
console.log(counter.value()); // 2`,

        `// Closure in Event Handlers
function attachListeners() {
  const buttons = document.querySelectorAll('.btn');
  
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      console.log('Button ' + i + ' clicked');
    });
  }
}`,

        `// Closure with setTimeout
function delayedGreeting(name) {
  return function() {
    console.log('Hello, ' + name + '!');
  };
}

const greetJohn = delayedGreeting('John');
setTimeout(greetJohn, 1000); // "Hello, John!" after 1 second`
      ],
      questions: [
        'What is a closure in JavaScript?',
        'How do closures help with data privacy?',
        'What is the difference between lexical scoping and dynamic scoping?',
        'How do closures affect memory management?',
        'Can you explain the module pattern using closures?',
        'What happens to variables in closures when the outer function returns?',
        'How do closures work with loops and event handlers?',
        'What are the common use cases for closures?'
      ]
    },
    {
      id: 'prototypes',
      title: 'Prototypes & Inheritance',
      description: 'Understanding JavaScript\'s prototype-based inheritance system.',
      category: 'Fundamentals',
      difficulty: 'Intermediate',
      concepts: [
        'Prototype Chain',
        'Object.create()',
        'Constructor Functions',
        'Class Syntax (ES6)',
        'Prototype vs __proto__',
        'Method Inheritance'
      ],
      examples: [
        `// Constructor Function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return \`Hello, I'm \${this.name}\`;
};

const john = new Person('John', 30);
console.log(john.greet()); // "Hello, I'm John"`,

        `// Prototype Chain
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return \`\${this.name} makes a sound\`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  return \`\${this.name} barks\`;
};

const dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog.speak()); // "Buddy barks"`,

        `// ES6 Class Syntax
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }
  
  start() {
    return \`\${this.brand} is starting\`;
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super(brand);
    this.model = model;
  }
  
  drive() {
    return \`Driving \${this.brand} \${this.model}\`;
  }
}

const myCar = new Car('Toyota', 'Camry');
console.log(myCar.start()); // "Toyota is starting"
console.log(myCar.drive()); // "Driving Toyota Camry"`
      ],
      questions: [
        'What is the prototype chain in JavaScript?',
        'How does Object.create() work?',
        'What is the difference between prototype and __proto__?',
        'How do constructor functions work?',
        'What is the difference between class and constructor functions?',
        'How does inheritance work in JavaScript?',
        'What is method overriding in prototypes?',
        'How do you check if an object has a property?'
      ]
    },
    {
      id: 'async-await',
      title: 'Async/Await & Promises',
      description: 'Understanding asynchronous JavaScript with Promises and async/await.',
      category: 'Async',
      difficulty: 'Intermediate',
      concepts: [
        'Promise States',
        'Promise Methods',
        'Async/Await Syntax',
        'Error Handling',
        'Promise Chaining',
        'Concurrent vs Sequential'
      ],
      examples: [
        `// Basic Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched successfully');
    }, 1000);
  });
};

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));`,

        `// Async/Await
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Usage
fetchUserData(123)
  .then(user => console.log(user))
  .catch(error => console.error(error));`,

        `// Promise.all vs Promise.allSettled
const promises = [
  fetch('/api/data1'),
  fetch('/api/data2'),
  fetch('/api/data3')
];

// Promise.all - fails if any promise fails
Promise.all(promises)
  .then(results => console.log('All succeeded:', results))
  .catch(error => console.error('One failed:', error));

// Promise.allSettled - waits for all to complete
Promise.allSettled(promises)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(\`Promise \${index} succeeded:\`, result.value);
      } else {
        console.log(\`Promise \${index} failed:\`, result.reason);
      }
    });
  });`
      ],
      questions: [
        'What are the three states of a Promise?',
        'What is the difference between Promise.all and Promise.allSettled?',
        'How do you handle errors in async/await?',
        'What is the difference between async/await and Promise.then()?',
        'How do you run promises concurrently vs sequentially?',
        'What is Promise.race() and when would you use it?',
        'How do you convert a callback-based function to use Promises?',
        'What happens if you don\'t handle Promise rejections?'
      ]
    },
    {
      id: 'event-loop',
      title: 'Event Loop & Call Stack',
      description: 'Understanding JavaScript\'s execution model and how the event loop works.',
      category: 'Advanced',
      difficulty: 'Advanced',
      concepts: [
        'Call Stack',
        'Web APIs',
        'Task Queue',
        'Microtask Queue',
        'Execution Order',
        'Blocking vs Non-blocking'
      ],
      examples: [
        `// Understanding Execution Order
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Output: 1, 4, 3, 2`,

        `// Microtasks vs Macrotasks
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
  return Promise.resolve();
}).then(() => console.log('Promise 2'));

setTimeout(() => console.log('Timeout 2'), 0);

console.log('End');

// Output: Start, End, Promise 1, Promise 2, Timeout, Timeout 2`,

        `// Blocking vs Non-blocking
// Blocking operation
function blockingOperation() {
  const start = Date.now();
  while (Date.now() - start < 3000) {
    // Block for 3 seconds
  }
  console.log('Blocking operation completed');
}

// Non-blocking operation
function nonBlockingOperation() {
  setTimeout(() => {
    console.log('Non-blocking operation completed');
  }, 3000);
}

console.log('Before blocking');
blockingOperation();
console.log('After blocking');

console.log('Before non-blocking');
nonBlockingOperation();
console.log('After non-blocking');`
      ],
      questions: [
        'What is the call stack in JavaScript?',
        'How does the event loop work?',
        'What is the difference between microtasks and macrotasks?',
        'What is the execution order of setTimeout, Promise, and console.log?',
        'How do Web APIs interact with the event loop?',
        'What causes blocking in JavaScript?',
        'How do you avoid blocking the main thread?',
        'What is the difference between synchronous and asynchronous code?'
      ]
    },
    {
      id: 'hoisting',
      title: 'Hoisting & Temporal Dead Zone',
      description: 'Understanding how JavaScript handles variable and function declarations.',
      category: 'Fundamentals',
      difficulty: 'Beginner',
      concepts: [
        'Variable Hoisting',
        'Function Hoisting',
        'Temporal Dead Zone',
        'Let vs Var vs Const',
        'Function Expressions vs Declarations'
      ],
      examples: [
        `// Variable Hoisting
console.log(x); // undefined (not ReferenceError)
var x = 5;

// Equivalent to:
var x;
console.log(x); // undefined
x = 5;`,

        `// Function Hoisting
sayHello(); // "Hello!" (works)

function sayHello() {
  console.log('Hello!');
}

// Function expressions are NOT hoisted
sayGoodbye(); // ReferenceError

var sayGoodbye = function() {
  console.log('Goodbye!');
};`,

        `// Temporal Dead Zone
console.log(y); // ReferenceError
let y = 10;

// TDZ with const
console.log(z); // ReferenceError
const z = 20;`,

        `// Hoisting with let/const
function example() {
  console.log(a); // undefined
  console.log(b); // ReferenceError
  console.log(c); // ReferenceError
  
  var a = 1;
  let b = 2;
  const c = 3;
}`
      ],
      questions: [
        'What is hoisting in JavaScript?',
        'What is the difference between var, let, and const hoisting?',
        'What is the Temporal Dead Zone?',
        'Are function declarations hoisted?',
        'Are function expressions hoisted?',
        'What happens when you access a variable before declaration?',
        'How does hoisting work with block scope?',
        'What is the difference between function declaration and function expression?'
      ]
    },
    {
      id: 'this-keyword',
      title: 'The \'this\' Keyword',
      description: 'Understanding how the \'this\' keyword works in different contexts.',
      category: 'Fundamentals',
      difficulty: 'Intermediate',
      concepts: [
        'Default Binding',
        'Implicit Binding',
        'Explicit Binding',
        'New Binding',
        'Arrow Functions',
        'Strict Mode'
      ],
      examples: [
        `// Default Binding
function sayName() {
  console.log(this.name);
}

var name = 'Global';
sayName(); // "Global" (in non-strict mode)`,

        `// Implicit Binding
const person = {
  name: 'John',
  sayName: function() {
    console.log(this.name);
  }
};

person.sayName(); // "John"`,

        `// Explicit Binding
function greet() {
  console.log(\`Hello, \${this.name}\`);
}

const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };

greet.call(person1); // "Hello, Alice"
greet.apply(person2); // "Hello, Bob"

const boundGreet = greet.bind(person1);
boundGreet(); // "Hello, Alice"`,

        `// Arrow Functions
const obj = {
  name: 'Test',
  regularFunction: function() {
    console.log('Regular:', this.name);
    
    const arrowFunction = () => {
      console.log('Arrow:', this.name);
    };
    
    arrowFunction();
  }
};

obj.regularFunction(); // "Regular: Test", "Arrow: Test"`
      ],
      questions: [
        'What are the four rules for determining \'this\'?',
        'How does \'this\' work in arrow functions?',
        'What is the difference between call, apply, and bind?',
        'How does \'this\' work in strict mode?',
        'What happens to \'this\' when a method is passed as a callback?',
        'How do you preserve \'this\' context in event handlers?',
        'What is the difference between implicit and explicit binding?',
        'How does \'this\' work with constructor functions?'
      ]
    }
  ];

  const selectedTopicData = theoryTopics.find(topic => topic.id === selectedTopic);

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
      case 'Advanced': return '#9C27B0';
      case 'ES6+': return '#4CAF50';
      case 'Async': return '#FF9800';
      case 'DOM': return '#F44336';
      case 'Performance': return '#607D8B';
      default: return '#607D8B';
    }
  };

  return (
    <div className="js-theory-page">
      <div className="page-header">
        <h1>📚 JavaScript Theory</h1>
        <p>Master JavaScript concepts with detailed explanations, examples, and practice questions.</p>
      </div>

      <div className="theory-container">
        <div className="theory-sidebar">
          <h3>Topics</h3>
          <div className="topics-list">
            {theoryTopics.map((topic) => (
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

export default JSTheoryPage;
