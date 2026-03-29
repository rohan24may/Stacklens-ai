<div align="center">

# 🚀 StackLens AI

### 🧠 Understand any codebase in minutes with AI

AI-powered SaaS that analyzes GitHub repositories and generates structured explanations of entire codebases.

<br>

<div align="center">
<img src="./madara.gif" width="500"/>
</div>

<img src="https://readme-typing-svg.herokuapp.com?size=22&duration=3000&color=00C2FF&center=true&vCenter=true&width=600&lines=Analyze+Repos+Instantly;Understand+Architecture+Fast;AI+for+Developers;Codebase+Clarity+in+Seconds" />

<br><br>

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge\&logo=supabase\&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Codebase%20Analysis-blue?style=for-the-badge)

</div>

---

# 🌌 Overview

**StackLens AI** is a modern **Dev + AI SaaS platform** built to help developers understand unfamiliar codebases instantly.

Instead of reading thousands of lines of code manually, StackLens:

✨ Analyzes repositories
✨ Extracts structure
✨ Explains architecture
✨ Highlights key logic

> ⚡ Built with a **production-grade SaaS architecture using Next.js App Router**

---

# 🎯 Core Idea

> Paste a GitHub repo → AI analyzes → You understand everything

---

## 💡 Who is it for?

* 👨‍💻 Developers onboarding to new teams
* 🎓 Students learning from open source
* 💼 Freelancers auditing client code
* 🌍 Contributors exploring large repos

---

## ❌ What this is NOT

* Not a website builder
* Not a code generator

---

## ✅ What this IS

> 🧠 **AI-powered codebase understanding platform**

---

# ⚙️ Current MVP Features

## 🔐 Authentication (Clerk)

* Google OAuth
* GitHub OAuth
* Email + Password

---

## 🛡️ Protected SaaS Routes

```bash
(public)
  sign-in
  sign-up

(protected)
  dashboard
  analyze
  project/[id]
```

👉 Only authenticated users can access features

---

## 🔍 Repository Analysis Flow

1. Paste GitHub repo URL
2. Project created in DB
3. Status → `processing`
4. Redirect to project page
5. AI analysis pipeline runs

---

## 📂 Project Pages

Each project includes:

* 📛 Repo name
* 🔗 Repo URL
* 📊 Status
* 🔒 Ownership protection

---

# 🧠 System Architecture

```text
User Login
   ↓
Dashboard
   ↓
Submit Repo
   ↓
Server Action
   ↓
Database Save
   ↓
Project Page
   ↓
AI Processing (Next Step)
```

---

# 🛠️ Tech Stack

## 🎨 Frontend

* Next.js 16
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Lucide Icons

---

## 🧩 Backend

* Supabase (Postgres)
* Server Actions

---

## 🔐 Auth

* Clerk
* OAuth + Session handling

---

## 🔌 Integrations (Upcoming)

* GitHub REST API
* AI Models (Gemini / OpenAI)

---

# 🗄️ Database Schema

## 👤 Users

```sql
id
email
created_at
```

---

## 📁 Projects

```sql
id
user_id
repo_url
repo_name
visibility
status
created_at
```

---

## 🤖 Analyses

```sql
id
project_id
ai_output_json
created_at
```

---

# 🔒 Multi-Tenant Security

Every query uses:

```sql
project_id + user_id
```

👉 Ensures strict data isolation between users

---

# 🤖 AI Analysis (Upcoming)

StackLens will generate:

* 🧠 Project overview
* ⚙️ Tech stack detection
* 🏗️ Architecture breakdown
* 📂 Key files
* 🔄 Data flow
* 📘 Dev onboarding guide
* ⚠️ Risks & improvements

---

# 🎨 UI Philosophy

* 🌙 Dark-first design
* 🧼 Minimal interface
* ⚡ Smooth transitions
* 👨‍💻 Developer-focused UX

---

# 🚧 Development Status

## ✅ Completed

* Authentication system
* Route protection
* Database schema
* Project creation pipeline
* Project detail pages

---

## 🔄 In Progress

* GitHub repo parsing
* AI analysis engine
* Analysis UI

---

# 🚀 Future Roadmap

* 📊 Architecture diagrams
* 📈 Code complexity analysis
* 📘 AI onboarding guides
* 📄 Exportable reports (PDF)
* 🔗 GitHub App integration
* 👥 Team collaboration
* 🌐 Chrome extension

---

# 👨‍💻 Author

StackLens AI is a **flagship full-stack + AI portfolio project**
focused on building a **production-grade SaaS system**.

---

<div align="center">

### ⭐ If you like this project, consider starring it!

</div>
