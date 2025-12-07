# 📝 Prompt Engineering Templates

> Pre-built, production-tested prompts for common AI use cases. Copy, customize, and deploy.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://kartikeykumar.com/tools/prompt-templates/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev)

![Prompt Templates Screenshot](https://via.placeholder.com/800x400/1a1a2e/f97316?text=Prompt+Templates)

## ✨ Features

- **Curated Templates**: Battle-tested prompts for real-world use cases
- **Category Organization**: Browse by use case (Coding, Writing, Analysis, etc.)
- **One-Click Copy**: Instantly copy any template to clipboard
- **Variable Placeholders**: Templates with `{variable}` placeholders for customization
- **Best Practices**: Each template follows prompt engineering principles
- **Mobile Friendly**: Works great on all devices

## 🎯 Template Categories

### 💻 Coding
- Code Review Assistant
- Bug Fix Helper
- Code Documentation Generator
- Test Case Generator

### ✍️ Writing
- Technical Blog Post
- Email Composer
- Documentation Writer
- Content Summarizer

### 📊 Analysis
- Data Analysis Assistant
- Competitive Analysis
- Requirements Analyzer
- Root Cause Analysis

### 🎨 Creative
- Brainstorming Partner
- Product Naming
- Tagline Generator
- User Story Creator

### 🔧 DevOps
- Dockerfile Generator
- CI/CD Pipeline Helper
- Infrastructure as Code
- Monitoring Setup

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/kartikeykumar09/prompt-templates.git
cd prompt-templates

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

### Build for Production

```bash
npm run build
```

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Vanilla CSS (Orange accent) |
| Icons | Lucide React |

## 📁 Project Structure

```
src/
├── App.tsx              # Main gallery component
├── index.css            # Styling
├── main.tsx             # Entry point
└── data/
    └── templates.ts     # Template definitions
```

## 🤝 Contributing

We welcome community contributions! Adding new templates is easy.

### Adding New Templates

Edit `src/data/templates.ts`:

```typescript
{
  id: 'unique-id',
  title: 'Template Title',
  category: 'coding', // coding | writing | analysis | creative | devops
  description: 'Brief description of what this template does',
  prompt: `Your prompt template here.

Use {placeholders} for variables that users should fill in.

Be specific about:
1. The role/persona
2. The task
3. The output format
4. Any constraints`,
  variables: ['placeholder1', 'placeholder2'],
  tips: [
    'Tip for getting best results',
    'Common customization suggestion'
  ]
}
```

### Template Guidelines

1. **Be Specific**: Clear instructions yield better results
2. **Use Personas**: "You are a senior developer..." helps set context
3. **Define Output Format**: Specify JSON, markdown, bullet points, etc.
4. **Include Examples**: When helpful, show example inputs/outputs
5. **Add Constraints**: Token limits, style preferences, etc.
6. **Use Placeholders**: Mark variables with `{curly_braces}`

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-template`
3. Add your template(s) to `src/data/templates.ts`
4. Test locally with `npm run dev`
5. Run `npm run build` to verify
6. Commit: `git commit -m "Add [category] template: [name]"`
7. Push and open a Pull Request

## 📚 Prompt Engineering Best Practices

### Structure Your Prompts

```
[ROLE/PERSONA]
You are an expert in X with Y years of experience...

[CONTEXT]
Given the following {input_type}:
{user_input}

[TASK]
Please analyze/generate/review...

[OUTPUT FORMAT]
Provide your response as:
- Bullet points
- JSON structure
- Markdown table

[CONSTRAINTS]
- Keep response under N words
- Focus on X aspect
- Avoid Y
```

### Common Techniques

| Technique | Example |
|-----------|---------|
| Chain of Thought | "Think step by step..." |
| Few-Shot | Provide 2-3 examples |
| Role Playing | "Act as a senior engineer..." |
| Output Priming | "Response format: ```json" |

## 📄 License

MIT License - feel free to use these templates in your projects!

## 🙏 Acknowledgments

- Built by [Kartikey Kumar](https://kartikeykumar.com)
- Part of the [Free Developer Tools](https://kartikeykumar.com/tools) suite
- Inspired by the AI/LLM community

---

**[🔗 Live Demo](https://kartikeykumar.com/tools/prompt-templates/)** | **[🐛 Report Bug](https://github.com/kartikeykumar09/prompt-templates/issues)** | **[💡 Submit Template](https://github.com/kartikeykumar09/prompt-templates/pulls)**
