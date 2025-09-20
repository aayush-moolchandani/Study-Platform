export interface PolyfillExample {
  id: string;
  title: string;
  description: string;
  code: string;
  expectedOutput: string;
  actualOutput?: string;
  isWorking?: boolean;
}

export interface PolyfillInfo {
  id: string;
  name: string;
  description: string;
  category: 'Array' | 'Object' | 'Function' | 'String' | 'Number' | 'Other';
  isImplemented: boolean;
  examples: PolyfillExample[];
  nativeSupport: boolean;
  browserSupport?: string[];
}

export interface PolyfillCategory {
  name: string;
  polyfills: PolyfillInfo[];
}
