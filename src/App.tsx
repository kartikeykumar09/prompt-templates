import { useState, useMemo } from 'react';
import './index.css';
import { promptTemplates, categories } from './data/templates';
import type { PromptTemplate } from './data/templates';

// Category to CSS class mapping
const categoryClass: Record<string, string> = {
  'Code Generation': 'code',
  'Content & Writing': 'content',
  'Data & Analysis': 'data',
  'AI & Prompts': 'ai',
  'DevOps': 'devops',
  'Product & Business': 'product',
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
          <p>
            Production-tested prompts. Copy, customize, deploy.
          </p>
        </header>

        {/* Search and Filters */}
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
            {filteredTemplates.map(template => (
              <div key={template.id} className="template-card">
                <div className="card-header">
                  <h3 className="card-title">{template.title}</h3>
                  <span className={`card-category ${categoryClass[template.category] || ''}`}>
                    {template.category.split(' ')[0]}
                  </span>
                </div>
                
                <p className="card-description">{template.description}</p>
                
                <div className="prompt-preview">
                  {template.prompt.substring(0, 150)}...
                </div>
                
                <div className="card-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => copyToClipboard(template.prompt)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Copy
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    View
                  </button>
                </div>
              </div>
            ))}
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
            Built by <a href="https://kartikeykumar.com" target="_blank" rel="noopener noreferrer">Kartikey Kumar</a> · 
            More tools at <a href="https://kartikeykumar.com/tools" target="_blank" rel="noopener noreferrer">kartikeykumar.com/tools</a>
          </p>
        </footer>
      </div>

      {/* Modal */}
      {selectedTemplate && (
        <div className="modal-overlay" onClick={() => setSelectedTemplate(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedTemplate.title}</h2>
              <button className="modal-close" onClick={() => setSelectedTemplate(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              <p>{selectedTemplate.description}</p>
              
              <div className="prompt-full">
                {selectedTemplate.prompt}
              </div>
              
              <div className="tips-section">
                <h4>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            
            <div className="modal-footer">
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={() => {
                  copyToClipboard(selectedTemplate.prompt);
                  setSelectedTemplate(null);
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy & Close
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedTemplate(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
