import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import PolyfillDashboard from './components/PolyfillDashboard';
import HooksPage from './pages/HooksPage';
import MachineCodingPage from './pages/MachineCodingPage';
import JSTheoryPage from './pages/JSTheoryPage';
import ReactTheoryPage from './pages/ReactTheoryPage';
import CompilerPage from './pages/CompilerPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/polyfills" element={<PolyfillDashboard />} />
          <Route path="/hooks" element={<HooksPage />} />
          <Route path="/machine-coding" element={<MachineCodingPage />} />
          <Route path="/js-theory" element={<JSTheoryPage />} />
          <Route path="/react-theory" element={<ReactTheoryPage />} />
          <Route path="/compiler" element={<CompilerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
