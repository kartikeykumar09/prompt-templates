import { useState, useMemo } from 'react';
import './index.css';
import { promptTemplates, categories } from './data/templates';
import type { PromptTemplate } from './data/templates';

// Category styling
const categoryClass: Record<string, string> = {
  'Code Generation': 'code',
  'Content & Writing': 'content',
  'Data & Analysis': 'data',
  'AI & Prompts': 'ai',
  'DevOps': 'devops',
  'Product & Business': 'product',
};

// Category icons
const CategoryIcon = ({ category }: { category: string }) => {
  const iconClass = categoryClass[category] || 'code';
  
  const icons = {
    code: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    content: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/>
        <circle cx="11" cy="11" r="2"/>
      </svg>
    ),
    data: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    ai: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
        <circle cx="8" cy="14" r="1"/>
        <circle cx="16" cy="14" r="1"/>
      </svg>
    ),
    devops: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    product: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  };

  return (
    <div className={`card-icon ${iconClass}`}>
      {icons[iconClass as keyof typeof icons] || icons.code}
    </div>
  );
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    return promptTemplates.filter(template => {
      const matchesSearch = searchQuery === '' || 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === null || template.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast('Copied to clipboard!');
      setTimeout(() => setToast(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span>Free Resource</span>
          </div>
          <h1>Prompt Engineering Templates</h1>
          <p>Production-tested prompts. Copy, customize, deploy.</p>
        </header>

        {/* Controls */}
        <div className="controls">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="category-filters">
            <button
              className={`category-btn ${activeCategory === null ? 'active' : ''}`}
              onClick={() => setActiveCategory(null)}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="stats-bar">
          <span>Showing <strong>{filteredTemplates.length}</strong> of {promptTemplates.length} templates</span>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="templates-grid">
            {filteredTemplates.map(template => {
              const catClass = categoryClass[template.category] || 'code';
              return (
                <div key={template.id} className="template-card">
                  <div className={`card-accent ${catClass}`}></div>
                  <div className="card-content">
                    <div className="card-header">
                      <CategoryIcon category={template.category} />
                      <div className="card-title-section">
                        <h3 className="card-title">{template.title}</h3>
                        <span className="card-category-tag">{template.category}</span>
                      </div>
                    </div>
                    
                    <p className="card-description">{template.description}</p>
                    
                    {/* Editor-style Preview */}
                    <div 
                      className="editor-preview clickable"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="editor-titlebar">
                        <div className="editor-dots">
                          <span className="editor-dot red"></span>
                          <span className="editor-dot yellow"></span>
                          <span className="editor-dot green"></span>
                        </div>
                        <span className="editor-filename">prompt.txt</span>
                      </div>
                      <div className="editor-content">
                        <div className="editor-lines">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                        </div>
                        <div className="editor-code">
                          {template.prompt.substring(0, 150)}...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <p>No templates found. Try a different search.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>
            Built by <a href="https://kartikeykumar.in" target="_blank" rel="noopener noreferrer">Kartikey Kumar</a> · 
            More tools at <a href="https://kartikeykumar.in/tools" target="_blank" rel="noopener noreferrer">kartikeykumar.in/tools</a>
          </p>
          <a href="https://github.com/kartikeykumar09/prompt-templates" target="_blank" rel="noopener noreferrer" className="github-footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            <img src="https://unpkg.com/simple-icons@v13/icons/github.svg" width="16" height="16" style={{ filter: 'invert(0.5)', opacity: 0.7 }} alt="GitHub" />
            View Source Code
          </a>
        </footer>
      </div>

      {/* Side Panel (Drawer) */}
      {selectedTemplate && (
        <>
          <div className="side-panel-overlay" onClick={() => setSelectedTemplate(null)} />
          <div className="side-panel">
            <div className="panel-header">
              <div className="panel-title">
                <h2>{selectedTemplate.title}</h2>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span className={`card-category-tag`} style={{ color: 'var(--primary)' }}>
                    {selectedTemplate.category}
                  </span>
                </div>
              </div>
              <button className="panel-close" onClick={() => setSelectedTemplate(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div className="panel-content">
              <div className="panel-section">
                <p className="panel-description">{selectedTemplate.description}</p>
                
                {/* Editor-style Full View */}
                <div className="editor-full">
                  <div className="editor-titlebar">
                    <div className="editor-left">
                      <div className="editor-dots">
                        <span className="editor-dot red"></span>
                        <span className="editor-dot yellow"></span>
                        <span className="editor-dot green"></span>
                      </div>
                      <span className="editor-filename">{selectedTemplate.id}.txt</span>
                    </div>
                    <button 
                      className="editor-copy-btn"
                      onClick={() => copyToClipboard(selectedTemplate.prompt)}
                      title="Copy to clipboard"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="editor-code-full">
                    {selectedTemplate.prompt}
                  </div>
                </div>
              </div>
              
              <div className="tips-section">
                <h4>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4M12 8h.01"/>
                  </svg>
                  Usage Tips
                </h4>
                <ul>
                  {selectedTemplate.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {toast && (
        <div className="toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
          {toast}
        </div>
      )}
      
      <footer className="footer">
        <p>
          Built by <a href="https://kartikeykumar.in" target="_blank" rel="noopener noreferrer">Kartikey Kumar</a> · 
          More tools at <a href="https://kartikeykumar.in/tools" target="_blank" rel="noopener noreferrer">kartikeykumar.in/tools</a>
        </p>
        <a href="https://github.com/kartikeykumar09/prompt-templates" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          View Source Code
        </a>
      </footer>
    </div>
  );
}

export default App;
