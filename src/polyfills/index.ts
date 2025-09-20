import { PolyfillInfo } from '../types/PolyfillTypes';

// Import your polyfill implementations here
import './JsPolyfill';

// Polyfill registry - add your polyfills here
export const polyfillRegistry: PolyfillInfo[] = [
  {
    id: 'function-call',
    name: 'Function.prototype.call',
    description: 'Calls a function with a given this value and arguments provided individually.',
    category: 'Function',
    isImplemented: true,
    nativeSupport: true,
    examples: [
      {
        id: 'call-basic',
        title: 'Basic call usage',
        description: 'Using call to invoke a function with a specific context',
        code: `// Function.prototype.call polyfill implementation
if (!Function.prototype.call) {
  Function.prototype.call = function (context, ...args) {
    if (typeof this !== 'function') {
      throw new Error('context must be a function');
    }
    
    context = context || globalThis;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
  };
}

// Test the implementation
function greet() {
  return \`Hello, \${this.name}!\`;
}

const person = { name: 'John' };
const result = greet.call(person);
console.log(result);`,
        expectedOutput: "Hello, John!"
      },
      {
        id: 'call-with-args',
        title: 'Call with arguments',
        description: 'Using call to pass arguments to a function',
        code: `// Function.prototype.call polyfill implementation
if (!Function.prototype.call) {
  Function.prototype.call = function (context, ...args) {
    if (typeof this !== 'function') {
      throw new Error('context must be a function');
    }
    
    context = context || globalThis;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
  };
}

// Test with arguments
function introduce(age, city) {
  return \`Hi, I'm \${this.name}, \${age} years old, from \${city}\`;
}

const person = { name: 'Alice' };
const result = introduce.call(person, 25, 'New York');
console.log(result);`,
        expectedOutput: "Hi, I'm Alice, 25 years old, from New York"
      }
    ]
  },
  {
    id: 'function-apply',
    name: 'Function.prototype.apply',
    description: 'Calls a function with a given this value and arguments provided as an array.',
    category: 'Function',
    isImplemented: true,
    nativeSupport: true,
    examples: [
      {
        id: 'apply-basic',
        title: 'Basic apply usage',
        description: 'Using apply to pass arguments as an array',
        code: `// Function.prototype.apply polyfill implementation
if (!Function.prototype.apply) {
  Function.prototype.apply = function (context, args) {
    if (typeof this !== 'function') {
      throw new Error('context must be a function');
    }
    
    context = context || globalThis;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
  };
}

// Test the implementation
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
const result = sum.apply(null, numbers);
console.log(result);`,
        expectedOutput: "6"
      },
      {
        id: 'apply-context',
        title: 'Apply with context',
        description: 'Using apply with a specific context',
        code: `function getFullName() {
  return \`\${this.firstName} \${this.lastName}\`;
}

const person = { firstName: 'John', lastName: 'Doe' };
const result = getFullName.apply(person);
console.log(result);`,
        expectedOutput: "John Doe"
      }
    ]
  },
  {
    id: 'function-bind',
    name: 'Function.prototype.bind',
    description: 'Creates a new function that, when called, has its this keyword set to the provided value.',
    category: 'Function',
    isImplemented: true,
    nativeSupport: true,
    examples: [
      {
        id: 'bind-basic',
        title: 'Basic bind usage',
        description: 'Using bind to create a function with bound context',
        code: `function greet(greeting) {
  return \`\${greeting}, \${this.name}!\`;
}

const person = { name: 'Alice' };
const boundGreet = greet.bind(person);
const result = boundGreet('Hello');
console.log(result);`,
        expectedOutput: "Hello, Alice!"
      },
      {
        id: 'bind-partial',
        title: 'Partial application with bind',
        description: 'Using bind to pre-fill some arguments',
        code: `function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
const result = double(5);
console.log(result);`,
        expectedOutput: "10"
      }
    ]
  },
  {
    id: 'array-map',
    name: 'Array.prototype.map',
    description: 'Creates a new array with the results of calling a function for every array element.',
    category: 'Array',
    isImplemented: true,
    nativeSupport: true,
    examples: [
      {
        id: 'map-basic',
        title: 'Basic map usage',
        description: 'Using map to transform array elements',
        code: `// Array.prototype.map polyfill implementation
if (!Array.prototype.map) {
  Array.prototype.map = function (callback, thisArg) {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function');
    }
    
    let result = [];
    for (let i = 0; i < this.length; i++) {
      let value = callback.call(thisArg, this[i], i, this);
      result.push(value);
    }
    return result;
  };
}

// Test the implementation
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log(doubled);`,
        expectedOutput: "[2, 4, 6, 8, 10]"
      },
      {
        id: 'map-objects',
        title: 'Map with objects',
        description: 'Using map to extract properties from objects',
        code: `const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];
const names = users.map(user => user.name);
console.log(names);`,
        expectedOutput: "['John', 'Jane']"
      }
    ]
  },
  {
    id: 'array-filter',
    name: 'Array.prototype.filter',
    description: 'Creates a new array with all elements that pass the test implemented by the provided function.',
    category: 'Array',
    isImplemented: true,
    nativeSupport: true,
    examples: [
      {
        id: 'filter-basic',
        title: 'Basic filter usage',
        description: 'Using filter to get even numbers',
        code: `const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens);`,
        expectedOutput: "[2, 4, 6]"
      },
      {
        id: 'filter-objects',
        title: 'Filter objects',
        description: 'Using filter to find users above certain age',
        code: `const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];
const adults = users.filter(user => user.age >= 30);
console.log(adults.map(u => u.name));`,
        expectedOutput: "['John', 'Bob']"
      }
    ]
  },
  {
    id: 'array-reduce',
    name: 'Array.prototype.reduce',
    description: 'Executes a reducer function on each element of the array, resulting in a single output value.',
    category: 'Array',
    isImplemented: true,
    nativeSupport: true,
    examples: [
      {
        id: 'reduce-sum',
        title: 'Sum with reduce',
        description: 'Using reduce to calculate sum of numbers',
        code: `const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum);`,
        expectedOutput: "15"
      },
      {
        id: 'reduce-max',
        title: 'Find maximum',
        description: 'Using reduce to find the maximum number',
        code: `const numbers = [3, 7, 2, 9, 1];
const max = numbers.reduce((acc, curr) => curr > acc ? curr : acc);
console.log(max);`,
        expectedOutput: "9"
      }
    ]
  },
  {
    id: 'promise-all',
    name: 'Promise.all',
    description: 'Returns a promise that resolves when all of the input promises have resolved.',
    category: 'Other',
    isImplemented: true,
    nativeSupport: true,
    examples: [
      {
        id: 'promise-all-basic',
        title: 'Basic Promise.all',
        description: 'Using Promise.all to wait for multiple promises',
        code: `const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values);
  });`,
        expectedOutput: "[1, 2, 3]"
      },
      {
        id: 'promise-all-fetch',
        title: 'Promise.all with async operations',
        description: 'Using Promise.all with simulated async operations',
        code: `const delay = (ms, value) => new Promise(resolve => 
  setTimeout(() => resolve(value), ms)
);

Promise.all([
  delay(100, 'First'),
  delay(200, 'Second'),
  delay(50, 'Third')
]).then(results => {
  console.log(results);
});`,
        expectedOutput: "['First', 'Second', 'Third']"
      }
    ]
  },
  {
    id: 'debounce',
    name: 'Debounce Function',
    description: 'A utility function that delays the execution of a function until after a specified delay has passed.',
    category: 'Other',
    isImplemented: true,
    nativeSupport: false,
    examples: [
      {
        id: 'debounce-basic',
        title: 'Basic debounce',
        description: 'Using debounce to limit function calls',
        code: `function search(query) {
  console.log('Searching for:', query);
}

const debouncedSearch = debounce(search, 300);
debouncedSearch('a');
debouncedSearch('ab');
debouncedSearch('abc');
setTimeout(() => console.log('Done'), 500);`,
        expectedOutput: "Searching for: abc\nDone"
      }
    ]
  },
  {
    id: 'throttle',
    name: 'Throttle Function',
    description: 'A utility function that limits the rate at which a function can be called.',
    category: 'Other',
    isImplemented: true,
    nativeSupport: false,
    examples: [
      {
        id: 'throttle-basic',
        title: 'Basic throttle',
        description: 'Using throttle to limit function execution rate',
        code: `function logMessage(msg) {
  console.log('Message:', msg, new Date().getTime());
}

const throttledLog = throttle(logMessage, 1000);
throttledLog('First');
throttledLog('Second');
throttledLog('Third');
setTimeout(() => console.log('Done'), 1500);`,
        expectedOutput: "Message: First [timestamp]\nDone"
      }
    ]
  },
  {
    id: 'memoize',
    name: 'Memoize Function',
    description: 'A utility function that caches the results of function calls to avoid redundant computations.',
    category: 'Other',
    isImplemented: true,
    nativeSupport: false,
    examples: [
      {
        id: 'memoize-fibonacci',
        title: 'Memoized Fibonacci',
        description: 'Using memoize to cache expensive calculations',
        code: `function fibonacci(n) {
  console.log('Calculating fibonacci(' + n + ')');
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);
console.log(memoizedFib(5));
console.log(memoizedFib(5)); // Should use cache`,
        expectedOutput: "Calculating fibonacci(5)\nCalculating fibonacci(4)\nCalculating fibonacci(3)\nCalculating fibonacci(2)\nCalculating fibonacci(1)\nCalculating fibonacci(0)\n5\n5"
      }
    ]
  }
];

// Function to get polyfill by ID
export const getPolyfillById = (id: string): PolyfillInfo | undefined => {
  return polyfillRegistry.find(polyfill => polyfill.id === id);
};

// Function to get polyfills by category
export const getPolyfillsByCategory = (category: string): PolyfillInfo[] => {
  return polyfillRegistry.filter(polyfill => polyfill.category === category);
};
