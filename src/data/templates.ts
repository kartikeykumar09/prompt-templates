export interface PromptTemplate {
    id: string;
    title: string;
    category: string;
    description: string;
    prompt: string;
    tips: string[];
    tags: string[];
}

export const promptTemplates: PromptTemplate[] = [
    // Code Generation
    {
        id: "code-review",
        title: "Code Review Assistant",
        category: "Code Generation",
        description: "Get comprehensive code reviews with actionable suggestions for improvement.",
        prompt: `You are an expert code reviewer. Analyze the following code for:

1. **Bugs & Edge Cases**: Identify potential bugs, edge cases, and runtime errors
2. **Performance**: Suggest optimizations for better performance
3. **Security**: Flag any security vulnerabilities
4. **Best Practices**: Check adherence to coding standards and patterns
5. **Readability**: Suggest improvements for maintainability

Code to review:
\`\`\`
{{CODE}}
\`\`\`

Provide your review in the following format:
- 🔴 Critical Issues (must fix)
- 🟡 Warnings (should fix)
- 🟢 Suggestions (nice to have)
- ⭐ What's done well`,
        tips: [
            "Replace {{CODE}} with your actual code",
            "Specify the programming language for better context",
            "Include surrounding context if reviewing a function"
        ],
        tags: ["development", "review", "debugging"]
    },
    {
        id: "api-endpoint",
        title: "REST API Generator",
        category: "Code Generation",
        description: "Generate complete REST API endpoint implementations with validation.",
        prompt: `Create a production-ready REST API endpoint with the following specifications:

**Endpoint Details:**
- Resource: {{RESOURCE_NAME}}
- Method: {{HTTP_METHOD}}
- Framework: {{FRAMEWORK}} (e.g., Express, FastAPI, NestJS)

**Requirements:**
1. Input validation with detailed error messages
2. Authentication middleware integration
3. Rate limiting considerations
4. Proper HTTP status codes
5. Comprehensive error handling
6. TypeScript/type hints if applicable

**Response Format:**
Include both the controller logic and route registration.
Add inline comments explaining key decisions.`,
        tips: [
            "Be specific about your framework version",
            "Mention any ORM you're using (Prisma, TypeORM, etc.)",
            "Specify if you need pagination support"
        ],
        tags: ["api", "backend", "nodejs"]
    },
    {
        id: "test-generator",
        title: "Unit Test Generator",
        category: "Code Generation",
        description: "Generate comprehensive unit tests for your functions and classes.",
        prompt: `Generate comprehensive unit tests for the following code:

\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\`

**Testing Requirements:**
1. Use {{TESTING_FRAMEWORK}} (e.g., Jest, Pytest, Vitest)
2. Include tests for:
   - Happy path scenarios
   - Edge cases (null, empty, boundary values)
   - Error handling paths
   - Async behavior (if applicable)
3. Use descriptive test names following "should... when..." pattern
4. Mock external dependencies appropriately
5. Aim for >90% code coverage

Output the complete test file with setup, teardown, and grouped test suites.`,
        tips: [
            "Include your existing imports and dependencies",
            "Specify any mocking requirements",
            "Mention integration vs unit test preference"
        ],
        tags: ["testing", "quality", "development"]
    },

    // Content & Writing
    {
        id: "blog-outline",
        title: "Technical Blog Outline",
        category: "Content & Writing",
        description: "Create structured outlines for technical blog posts and tutorials.",
        prompt: `Create a detailed outline for a technical blog post on:

**Topic:** {{TOPIC}}
**Target Audience:** {{AUDIENCE}} (e.g., beginners, senior developers, CTOs)
**Word Count Target:** {{WORD_COUNT}}

**Structure Requirements:**
1. Compelling headline options (3 variations)
2. Hook/Introduction that addresses reader pain points
3. Logical section breakdown with subheadings
4. Key points to cover in each section
5. Code examples to include (describe what they should demonstrate)
6. Conclusion with clear call-to-action
7. SEO keywords to naturally incorporate

**Tone:** Professional but approachable, with practical examples.`,
        tips: [
            "Be specific about your unique angle on the topic",
            "Mention competing articles you want to improve upon",
            "Include any personal experiences to weave in"
        ],
        tags: ["writing", "marketing", "seo"]
    },
    {
        id: "email-sequence",
        title: "Email Sequence Writer",
        category: "Content & Writing",
        description: "Create persuasive email sequences for marketing or sales.",
        prompt: `Write a {{NUMBER}}-email sequence for the following goal:

**Objective:** {{GOAL}} (e.g., onboarding, sales, re-engagement)
**Product/Service:** {{PRODUCT}}
**Target Audience:** {{AUDIENCE}}

**For each email, provide:**
1. Subject line (with emoji option)
2. Preview text
3. Full email body
4. Clear CTA
5. Optimal send timing relative to previous email

**Tone:** {{TONE}} (e.g., friendly, professional, urgent)

**Additional Requirements:**
- Include personalization tokens
- A/B test variations for key emails
- Compliance with email best practices`,
        tips: [
            "Provide sample customer testimonials to include",
            "Specify any brand voice guidelines",
            "Mention competitor offerings for differentiation"
        ],
        tags: ["marketing", "email", "copywriting"]
    },

    // Data & Analysis
    {
        id: "sql-optimizer",
        title: "SQL Query Optimizer",
        category: "Data & Analysis",
        description: "Optimize SQL queries for better performance and readability.",
        prompt: `Analyze and optimize this SQL query:

\`\`\`sql
{{QUERY}}
\`\`\`

**Database:** {{DATABASE_TYPE}} (PostgreSQL, MySQL, etc.)
**Table Sizes:** {{TABLE_SIZES}} (approximate row counts)

**Provide:**
1. Identified performance bottlenecks
2. Optimized query with explanations
3. Recommended indexes to create
4. EXPLAIN ANALYZE interpretation tips
5. Alternative query approaches if applicable
6. Caching strategies if relevant

Format your response with the optimized query first, followed by detailed explanations.`,
        tips: [
            "Include CREATE TABLE statements if complex joins",
            "Mention any existing indexes",
            "Specify read vs write heavy workload"
        ],
        tags: ["database", "performance", "sql"]
    },
    {
        id: "data-schema",
        title: "Database Schema Designer",
        category: "Data & Analysis",
        description: "Design normalized database schemas from requirements.",
        prompt: `Design a database schema for the following system:

**System Description:** {{DESCRIPTION}}
**Database Type:** {{DATABASE}} (PostgreSQL, MongoDB, etc.)

**Requirements to consider:**
- Entities and relationships
- Normalization level (specify if denormalization needed for performance)
- Indexes for common query patterns
- Soft delete vs hard delete
- Audit trails if needed
- Multi-tenancy requirements

**Output Format:**
1. Entity-Relationship description
2. Complete DDL statements
3. Sample queries for common operations
4. Migration strategy if upgrading existing schema`,
        tips: [
            "List your most common queries",
            "Specify any compliance requirements (GDPR, etc.)",
            "Mention expected data volumes"
        ],
        tags: ["database", "architecture", "design"]
    },

    // AI & Prompts
    {
        id: "system-prompt",
        title: "AI System Prompt Creator",
        category: "AI & Prompts",
        description: "Create effective system prompts for AI assistants and chatbots.",
        prompt: `Create a system prompt for an AI assistant with these characteristics:

**Role:** {{ROLE}} (e.g., customer support agent, coding assistant)
**Personality:** {{PERSONALITY}} (e.g., friendly, professional, concise)
**Domain:** {{DOMAIN}} (e.g., e-commerce, healthcare, fintech)

**The system prompt should:**
1. Define the AI's persona and expertise clearly
2. Establish boundaries (what it won't do)
3. Specify response format and length guidelines
4. Include example interactions
5. Handle edge cases (offensive requests, out-of-scope questions)
6. Maintain consistency across conversations

**Safety Requirements:**
- PII handling guidelines
- Escalation triggers
- Disclaimer requirements`,
        tips: [
            "Include brand voice examples",
            "Specify multi-language requirements",
            "Mention integration context (website, app, etc.)"
        ],
        tags: ["ai", "chatbot", "prompt-engineering"]
    },
    {
        id: "rag-query",
        title: "RAG Query Template",
        category: "AI & Prompts",
        description: "Structure queries for Retrieval-Augmented Generation systems.",
        prompt: `You are a knowledgeable assistant with access to a document database. 
Use the provided context to answer questions accurately.

**Context from documents:**
---
{{RETRIEVED_CONTEXT}}
---

**User Question:** {{QUESTION}}

**Instructions:**
1. Base your answer ONLY on the provided context
2. If the context doesn't contain enough information, say so clearly
3. Cite specific sections when making claims
4. If multiple documents conflict, acknowledge the discrepancy
5. Format your response for readability

**Response Format:**
- Direct answer first
- Supporting details with citations
- Confidence level (High/Medium/Low)
- Suggested follow-up questions`,
        tips: [
            "Tune chunk size for your context window",
            "Include metadata in retrieved context",
            "Add conversation history for multi-turn"
        ],
        tags: ["rag", "ai", "search"]
    },

    // DevOps & Infrastructure
    {
        id: "docker-compose",
        title: "Docker Compose Generator",
        category: "DevOps",
        description: "Generate production-ready Docker Compose configurations.",
        prompt: `Generate a Docker Compose configuration for the following stack:

**Services needed:**
{{SERVICES_LIST}}

**Requirements:**
1. Use specific version tags (no :latest)
2. Include health checks for all services
3. Set up proper networking between services
4. Configure volume mounts for persistence
5. Environment variable management via .env
6. Resource limits (memory, CPU)
7. Restart policies
8. Logging configuration

**Environment:** {{ENVIRONMENT}} (development/production)

Also provide:
- .env.example file
- Basic docker-compose override for local dev
- Key commands for common operations`,
        tips: [
            "List specific versions you need",
            "Mention any specific port requirements",
            "Specify secrets management approach"
        ],
        tags: ["docker", "devops", "infrastructure"]
    },
    {
        id: "github-actions",
        title: "GitHub Actions CI/CD",
        category: "DevOps",
        description: "Create complete CI/CD pipelines with GitHub Actions.",
        prompt: `Create a GitHub Actions workflow for:

**Project Type:** {{PROJECT_TYPE}} (e.g., Node.js API, React app, Python package)
**Deployment Target:** {{DEPLOYMENT}} (e.g., AWS, Vercel, GCP)

**Pipeline Stages:**
1. Code checkout and caching
2. Linting and type checking
3. Unit tests with coverage
4. Integration tests
5. Security scanning (dependencies, secrets)
6. Build optimization
7. Deployment (with environment-specific configs)
8. Post-deployment verification

**Additional Features:**
- Branch-based deployment (dev/staging/prod)
- Slack/Discord notifications
- Rollback capability
- Matrix testing (multiple Node/Python versions)

Output complete YAML with detailed comments.`,
        tips: [
            "Specify any secrets you'll need to configure",
            "Mention containerization requirements",
            "Include any approval gate requirements"
        ],
        tags: ["cicd", "github", "automation"]
    },

    // Product & Business
    {
        id: "prd-generator",
        title: "Product Requirements Doc",
        category: "Product & Business",
        description: "Create comprehensive PRDs for new features or products.",
        prompt: `Create a Product Requirements Document (PRD) for:

**Feature/Product:** {{PRODUCT_NAME}}
**Problem Statement:** {{PROBLEM}}

**Document Structure:**
1. **Executive Summary** - One paragraph overview
2. **Problem Statement** - User pain points with data
3. **Goals & Success Metrics** - SMART objectives
4. **User Stories** - As a [user], I want [goal], so that [benefit]
5. **Functional Requirements** - Detailed specifications
6. **Non-Functional Requirements** - Performance, security, scalability
7. **User Flow** - Step-by-step journey
8. **Edge Cases & Error States**
9. **Dependencies & Risks**
10. **Timeline & Milestones**
11. **Open Questions**

**Target Users:** {{USERS}}
**Key Stakeholders:** {{STAKEHOLDERS}}`,
        tips: [
            "Include competitive analysis points",
            "Mention any technical constraints",
            "Specify MVP vs full feature scope"
        ],
        tags: ["product", "documentation", "planning"]
    },
    {
        id: "technical-spec",
        title: "Technical Specification",
        category: "Product & Business",
        description: "Generate detailed technical specifications for engineering teams.",
        prompt: `Write a Technical Specification for implementing:

**Feature:** {{FEATURE_NAME}}
**From PRD:** {{PRD_SUMMARY}}

**Specification Sections:**
1. **Overview** - Technical summary
2. **Architecture** - System design with diagrams (describe in text)
3. **API Design** - Endpoints, request/response schemas
4. **Data Model** - Database changes, migrations
5. **Dependencies** - External services, libraries
6. **Security Considerations**
7. **Performance Requirements** - SLAs, benchmarks
8. **Testing Strategy** - Unit, integration, e2e
9. **Rollout Plan** - Feature flags, gradual rollout
10. **Monitoring & Alerting** - Metrics to track
11. **Rollback Plan**
12. **Estimated Effort** - Story points or days

**Tech Stack:** {{TECH_STACK}}`,
        tips: [
            "Reference existing system architecture",
            "Include sequence diagrams for complex flows",
            "Mention any POC or spike work needed"
        ],
        tags: ["engineering", "architecture", "planning"]
    }
];

export const categories = [...new Set(promptTemplates.map(t => t.category))];
