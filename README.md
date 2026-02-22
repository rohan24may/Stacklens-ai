# StackLens AI

**Understand any codebase in minutes with AI.**

StackLens AI is a production-focused Dev + AI SaaS platform that analyzes GitHub repositories and generates structured, AI-powered explanations of entire codebases.

It helps developers, students, freelancers, and open-source contributors quickly understand unfamiliar projects without manually reading thousands of lines of code.

---

## 🚀 Core Idea

Paste a GitHub repository → StackLens AI analyzes the project → AI returns a structured explanation including architecture, tech stack, data flow, and onboarding steps.

This is NOT a website builder.  
This is NOT a code generator.  
This is an AI-powered codebase understanding platform.

---

## 🎯 MVP Features

- 🔐 Authentication (Supabase Auth)
- 📊 User Dashboard
- 🔍 Repository Analysis (Public + Private GitHub repos)
- 🤖 AI-generated structured breakdown of codebases
- 🧠 JSON-based architecture explanation
- 🌙 Modern SaaS UI (Next.js + Tailwind + shadcn)

---

## 🧰 Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Backend
- Supabase (Postgres + Auth)

### AI
- Gemini / OpenAI API (structured JSON output)

### Integrations
- GitHub REST API
- GitHub OAuth (planned)

---

## 🧠 AI Output Includes

- Project overview
- Tech stack identification
- Folder structure explanation
- Important files
- Data flow explanation
- Onboarding steps for developers
- Potential risks & architecture notes

---

## 🏗 Architecture

User logs in →  
Inputs GitHub repo →  
Server fetches repo metadata →  
AI analyzes codebase →  
Structured JSON stored in DB →  
Dashboard renders clean breakdown.

---

## 🎨 UI Philosophy

- Modern SaaS feel
- Dark theme first
- Clean developer aesthetic
- Smooth animations
- Minimal but premium

---

## 🚀 Future Roadmap

- Repo health score
- Code complexity analysis
- Visual architecture diagrams
- Export to PDF
- GitHub App integration
- Team collaboration
- Chrome extension

---

## 🛠 Status

Currently in MVP development phase.

---

## 👨‍💻 Author

Built as a flagship full-stack + AI portfolio project.