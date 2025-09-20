import React, { useState, useRef, useEffect } from 'react';
import './CodeEditor.css';

interface CodeEditorProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => void;
  language?: 'javascript' | 'typescript';
  readOnly?: boolean;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '',
  onCodeChange,
  onRun,
  language = 'javascript',
  readOnly = false,
  height = '400px'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRun = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setOutput([]);
    setError(null);

    try {
      // Create a custom console to capture output
      const consoleOutput: string[] = [];
      const customConsole = {
        log: (...args: any[]) => {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          consoleOutput.push(`> ${message}`);
        },
        error: (...args: any[]) => {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          consoleOutput.push(`❌ Error: ${message}`);
        },
        warn: (...args: any[]) => {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          consoleOutput.push(`⚠️ Warning: ${message}`);
        },
        info: (...args: any[]) => {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          consoleOutput.push(`ℹ️ Info: ${message}`);
        }
      };

      // Create a safe execution environment with common globals
      const safeGlobals = {
        console: customConsole,
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        Promise,
        Date,
        Math,
        JSON,
        Array,
        Object,
        String,
        Number,
        Boolean,
        RegExp,
        Error,
        TypeError,
        ReferenceError,
        SyntaxError,
        // Add polyfill functions if they exist
        ...(window as any)
      };

      // Check if code contains async/await or promises
      const isAsync = code.includes('async') || code.includes('await') || code.includes('Promise');
      
      let result;
      if (isAsync) {
        // Handle async code
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const func = new AsyncFunction(...Object.keys(safeGlobals), code);
        result = await func(...Object.values(safeGlobals));
      } else {
        // Handle synchronous code
        // eslint-disable-next-line no-new-func
        const func = new Function(...Object.keys(safeGlobals), code);
        result = func(...Object.values(safeGlobals));
      }

      // If there's a return value and no console output, show it
      if (result !== undefined && consoleOutput.length === 0) {
        const resultStr = typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result);
        consoleOutput.push(`Return: ${resultStr}`);
      }

      // If no output at all, show success message
      if (consoleOutput.length === 0) {
        consoleOutput.push('✅ Code executed successfully (no output)');
      }
      
      setOutput(consoleOutput);
      onRun?.(code);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      setOutput([`❌ Execution Error: ${errorMessage}`]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newCode = code.substring(0, start) + '  ' + code.substring(end);
        handleCodeChange(newCode);
        
        // Set cursor position after the inserted spaces
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);
      }
    }
  };

  const clearOutput = () => {
    setOutput([]);
    setError(null);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="code-editor-container" style={{ height }}>
      <div className="editor-header">
        <div className="editor-title">
          <span className="language-badge">{language.toUpperCase()}</span>
          <span className="editor-label">Code Editor</span>
        </div>
        <div className="editor-actions">
          <button 
            className="action-btn copy-btn" 
            onClick={copyCode}
            title="Copy Code"
          >
            📋
          </button>
          <button 
            className="action-btn clear-btn" 
            onClick={clearOutput}
            title="Clear Output"
          >
            🗑️
          </button>
          <button 
            className={`action-btn run-btn ${isRunning ? 'running' : ''}`}
            onClick={handleRun}
            disabled={isRunning}
            title="Run Code"
          >
            {isRunning ? '⏳' : '▶️'}
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="code-input-section">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            className="code-textarea"
            placeholder={`Enter your ${language} code here...`}
            spellCheck={false}
          />
        </div>

        <div className="output-section">
          <div className="output-header">
            <span className="output-label">Output</span>
            {output.length > 0 && (
              <span className="output-count">{output.length} line(s)</span>
            )}
          </div>
          <div className="output-content">
            {output.length === 0 ? (
              <div className="output-placeholder">
                Click "Run" to execute your code and see the output here
              </div>
            ) : (
              <div className="output-lines">
                {output.map((line, index) => (
                  <div 
                    key={index} 
                    className={`output-line ${line.startsWith('ERROR:') ? 'error' : line.startsWith('WARN:') ? 'warning' : ''}`}
                  >
                    <span className="line-number">{index + 1}</span>
                    <span className="line-content">{line}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
