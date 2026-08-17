# 🧪 Master Chemistry with Ajay Choudhary — Official Website & Admin CMS

A modern, responsive, and student-focused personal teaching website and secure content management platform for **Ajay Choudhary**, an experienced **Senior Chemistry Educator with 8+ years of teaching experience** across 3 coaching centers, specialized in **Organic Chemistry, Inorganic Chemistry, and Practical Laboratory Chemistry**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpankaj2816%2Fajay-choudhary-chemistry)

---

## 🚀 Live Demo & Repository
* **GitHub Repository**: [https://github.com/pankaj2816/ajay-choudhary-chemistry](https://github.com/pankaj2816/ajay-choudhary-chemistry)
* **Local Web Server**: [http://localhost:3000](http://localhost:3000)
* **Admin Login Portal**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🔐 Admin Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@ajaychemistry.com` | `ajay123456` |

---

## 🌟 Key Features

### 1. Student Learning Platform
* **Interactive Home Page**: Hero section, animated experience stats, 3 coaching centers summary, live notice board carousel, featured study materials, and recent question papers with paired verified solutions.
* **Faculty Team & Mentors Portfolio**: Dedicated space for collaborative teaching faculty photos, designations, specializations, and coaching centers.
* **Interactive Concept Explorer**: Visualizer for Markovnikov's rule, Aldol condensation, Crystal Field Splitting ($\Delta_o$), and Brown Ring Salt Analysis.
* **Question Papers Library (`/question-papers`)**: Filterable repository with in-browser PDF preview and direct jump to verified solutions.
* **Verified Solutions (`/solutions`)**: Step-by-step mechanisms, crystal field splitting energy calculations, and official answer keys.
* **Study Materials Resource Center (`/study-materials`)**: Downloadable handwritten notes, formula cheat-sheets, reaction roadmaps, and practical manuals.
* **Universal Search (`/search` or `Ctrl+K`)**: Instant search across all notes, papers, solutions, and updates.
* **Notice Board (`/updates`)**: Categorized notices (Tests, Assignments, Notices, Schedules) with attachments.
* **Contact & Admissions (`/contact`)**: Direct inquiry form, 3 coaching center schedules, FAQs, and WhatsApp quick connect.

### 2. Secure Admin Management System (`/admin`)
* **Live Announcement Banner Toggle**: Change top website alert text or toggle it on/off with one click.
* **Notices Manager (`/admin/updates`)**: Publish, edit, draft, pin to top, and attach documents.
* **Question Papers Manager (`/admin/question-papers`)**: Upload test papers with metadata and PDF files.
* **Solutions Manager (`/admin/solutions`)**: Link solutions to existing question papers, write markdown step-by-step mechanisms, and build answer key tables.
* **Study Materials Manager (`/admin/study-materials`)**: Upload notes and toggle featured badges.
* **Taxonomy Manager (`/admin/categories`)**: Manage subjects, class streams, and chapter lists.
* **Faculty Portfolio Manager (`/admin/team`)**: Add/edit faculty team members, photos, and roles.
* **Inquiry Inbox (`/admin/messages`)**: Read, reply, and manage student messages.
* **Settings (`/admin/settings`)**: Profile metrics, phone, email, and 3 coaching center address details.

---

## 🛠️ Technology Stack
* **Framework**: Next.js 15+ (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS & Custom Glassmorphic Science Theme
* **Icons**: Lucide React
* **Data Storage**: Atomic file-backed JSON database engine (`lib/db.ts`) with pre-seeded chemistry data.

---

## 💻 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/pankaj2816/ajay-choudhary-chemistry.git

# Navigate into the project
cd ajay-choudhary-chemistry

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser:
# http://localhost:3000
```

---

## ☁️ Deployment Instructions

### Deploy to Vercel (1-Click)
1. Click the **Deploy with Vercel** button above or import the repository in [Vercel Dashboard](https://vercel.com/new).
2. Framework Preset will automatically detect **Next.js**.
3. Click **Deploy** to generate a live `*.vercel.app` URL for the client.
