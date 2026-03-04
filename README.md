<div align="center">

# StackLens AI

### Understand any codebase in minutes with AI

AI-powered SaaS that analyzes GitHub repositories and generates structured explanations of entire codebases.

<br>

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge\&logo=supabase\&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Codebase%20Analysis-blue?style=for-the-badge)

</div>

---

# Overview

StackLens AI is a **Dev + AI SaaS platform** designed to help developers quickly understand unfamiliar codebases.

Instead of manually reading thousands of lines of code, StackLens analyzes repositories and produces structured insights about the architecture, tech stack, and internal logic of a project.

It is built as a **production-style SaaS architecture using Next.js App Router and server-first design.**

---

# Core Idea

Paste a GitHub repository → StackLens AI processes the repository → AI generates a structured explanation of the entire codebase.

StackLens helps:

• Developers onboarding to new teams
• Students learning from open source
• Freelancers auditing client projects
• Contributors exploring large repositories

This is **NOT a website builder**.
This is **NOT a code generator**.

This is an **AI-powered codebase understanding platform.**

---

# Current MVP Features

### Authentication

Secure authentication powered by **Clerk**

• Google OAuth
• GitHub OAuth
• Email + Password login

---

### Protected SaaS Routes

Protected routes using **Next.js App Router layouts**

```
(public)
  sign-in
  sign-up

(protected)
  dashboard
  analyze
  project/[id]
```

Only authenticated users can access application features.

---

### Repository Analysis Flow

Users can submit a repository URL for analysis.

Flow:

1. User pastes GitHub repository URL
2. Server Action creates project entry
3. Project status is set to `processing`
4. User is redirected to project page
5. Analysis pipeline will run asynchronously

---

### Project Pages

Each project page displays:

• Repository name
• Repository URL
• Analysis status
• Secure ownership validation

Users cannot access repositories belonging to other users.

---

# System Architecture

The platform follows a **server-first architecture using Next.js App Router**.

Flow:

User logs in
→ Dashboard access
→ Submit repository URL
→ Server Action creates project
→ Project stored in database
→ Redirect to project page
→ (Upcoming) AI analysis pipeline processes repository

---

# Tech Stack

### Frontend

Next.js 16
TypeScript
Tailwind CSS
shadcn/ui
Framer Motion
Lucide Icons

---

### Backend

Supabase (Postgres database)

Server Actions handle secure backend logic.

---

### Authentication

Clerk

Handles:

• OAuth
• session management
• secure authentication

---

### Integrations (Upcoming)

GitHub REST API
AI Model (Gemini / OpenAI)

---

# Database Schema

### Users

```
id
email
created_at
```

---

### Projects

```
id
user_id
repo_url
repo_name
visibility
status
created_at
```

---

### Analyses

```
id
project_id
ai_output_json
created_at
```

---

# Multi-Tenant Security

Projects are always queried using:

```
project_id + user_id
```

This ensures users **cannot access repositories created by other users.**

---

# AI Analysis (Upcoming)

StackLens will generate structured JSON including:

• Project overview
• Tech stack detection
• Folder structure explanation
• Important files
• Data flow description
• Developer onboarding guide
• Architecture risks

---

# UI Philosophy

StackLens AI follows a **developer-focused SaaS design**.

Dark theme first
Minimal interface
Smooth UI transitions
Clean developer aesthetic

---

# Development Status

Current progress:

Authentication system
Route protection
Database schema
Project creation pipeline
Project detail pages

Currently building:

GitHub repository parsing
AI analysis engine
Analysis visualization UI

---

# Future Roadmap

Repository architecture diagrams
Code complexity analysis
AI onboarding guides
Exportable reports (PDF)
GitHub App integration
Team collaboration
Chrome extension

---

# Author

StackLens AI is being built as a **flagship full-stack + AI portfolio project focused on production-grade SaaS architecture.**

</div>
