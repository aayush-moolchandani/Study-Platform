import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const studySections = [
    {
      id: 'polyfills',
      title: 'JavaScript Polyfills',
      description: 'Practice implementing JavaScript methods from scratch. Build your understanding of core JavaScript functionality.',
      icon: '🔧',
      path: '/polyfills',
      color: '#667eea',
      features: ['Interactive examples', 'Real-time execution', '10+ polyfills', 'Search & filter'],
      difficulty: 'Beginner to Advanced'
    },
    {
      id: 'hooks',
      title: 'React Hooks Practice',
      description: 'Master React hooks by implementing them from scratch. Learn useState, useEffect, and more with boilerplate code.',
      icon: '🎣',
      path: '/hooks',
      color: '#f093fb',
      features: ['6 core hooks', 'Boilerplate code', 'Test cases', 'Difficulty levels'],
      difficulty: 'Intermediate to Advanced'
    },
    {
      id: 'machine-coding',
      title: 'Machine Coding Questions',
      description: 'Solve common interview coding problems. Practice system design, algorithms, and data structures.',
      icon: '💻',
      path: '/machine-coding',
      color: '#4facfe',
      features: ['Interview questions', 'Time limits', 'Hints & tips', 'Multiple categories'],
      difficulty: 'Easy to Hard'
    },
    {
      id: 'js-theory',
      title: 'JavaScript Theory',
      description: 'Master JavaScript fundamentals with detailed explanations, examples, and practice questions.',
      icon: '📚',
      path: '/js-theory',
      color: '#f5576c',
      features: ['Core concepts', 'Code examples', 'Practice questions', '6 key topics'],
      difficulty: 'Beginner to Advanced'
    },
    {
      id: 'compiler',
      title: 'Online Compiler',
      description: 'Write, run, and test your JavaScript code in real-time. Perfect for practicing and experimenting.',
      icon: '⚡',
      path: '/compiler',
      color: '#2c3e50',
      features: ['Real-time execution', 'Code templates', 'Syntax highlighting', 'Safe sandbox'],
      difficulty: 'All Levels'
    },
    {
      id: 'react-theory',
      title: 'React Theory',
      description: 'Understand React patterns, best practices, and advanced concepts with comprehensive examples.',
      icon: '⚛️',
      path: '/react-theory',
      color: '#00f2fe',
      features: ['React patterns', 'Best practices', 'Performance tips', '6 core topics'],
      difficulty: 'Beginner to Advanced'
    }
  ];

  const stats = [
    { number: '10+', label: 'Polyfills' },
    { number: '6', label: 'React Hooks' },
    { number: '6', label: 'Coding Questions' },
    { number: '12', label: 'Theory Topics' },
    { number: '1', label: 'Online Compiler' }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            🚀 JavaScript & React
            <span className="hero-subtitle">Study Platform</span>
          </h1>
          <p className="hero-description">
            Master JavaScript and React through hands-on practice. Build polyfills, 
            implement hooks, solve coding challenges, and understand theory with 
            interactive examples and comprehensive guides.
          </p>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sections-container">
        <div className="sections-header">
          <h2>Choose Your Learning Path</h2>
          <p>Select a section to start your learning journey</p>
        </div>

        <div className="sections-grid">
          {studySections.map((section) => (
            <Link
              key={section.id}
              to={section.path}
              className="section-card"
              style={{ '--card-color': section.color } as React.CSSProperties}
            >
              <div className="card-header">
                <div className="card-icon">{section.icon}</div>
                <div className="card-badge">{section.difficulty}</div>
              </div>
              
              <div className="card-content">
                <h3 className="card-title">{section.title}</h3>
                <p className="card-description">{section.description}</p>
                
                <div className="card-features">
                  {section.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="card-footer">
                <span className="card-cta">Start Learning →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="features-section">
        <div className="features-container">
          <h2>Why Choose This Platform?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Hands-on Practice</h3>
              <p>Learn by doing with interactive examples and real-time code execution.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📚</div>
              <h3>Comprehensive Content</h3>
              <p>From basics to advanced topics, covering all essential JavaScript and React concepts.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3>Self-Paced Learning</h3>
              <p>Study at your own pace with structured content and clear learning paths.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔧</div>
              <h3>Practical Skills</h3>
              <p>Build real-world skills with interview questions and industry-standard practices.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Learning?</h2>
          <p>Choose any section above to begin your JavaScript and React journey!</p>
          <div className="cta-buttons">
            <Link to="/polyfills" className="cta-button primary">
              Start with Polyfills
            </Link>
            <Link to="/js-theory" className="cta-button secondary">
              Learn JavaScript Theory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
