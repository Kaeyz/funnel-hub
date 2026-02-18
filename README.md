# Project Name

A full-stack web application with **Vue 3 + Vite** frontend and a backend API, supporting dynamic forms, offline storage, and file uploads. The app has **two main sections**: an admin dashboard and a user-facing interface.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Features](#features)
* [Technologies](#technologies)
* [Folder Structure](#folder-structure)
* [Getting Started](#getting-started)
  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
* [Environment Variables](#environment-variables)
* [Deployment](#deployment)
* [Usage](#usage)
* [Login Credentials](#login-credentials)
* [License](#license)

---

## Project Overview

This project allows users to fill dynamic forms section by section, with offline saving via IndexedDB. It supports file uploads, and ensures that submitted data is never lost even when the network is unavailable.

The backend provides REST APIs to fetch forms, questions, and submit leads.

The app has **two main sections**:

1. **User Section** (`/`) – For users filling out forms.
2. **Admin Section** (`/admin`) – For admins to manage forms, view submissions, and analyze leads.

---

## Features

* Multi-section dynamic forms
* Offline storage with IndexedDB
* File uploads per question
* Automatic save when navigating sections
* Submit lead data to backend with retry support
* View submitted forms in read-only mode
* Admin dashboard for managing forms and viewing submissions
* Login system shared for admin and user

---

## Technologies

### Frontend

* Vue 3 + Vite
* TypeScript
* TailwindCSS + Shadcn Vue
* Axios for API calls
* IndexedDB (`idb`) for offline storage
* Vue Router for admin/user routing

### Backend

* Node.js + Nest.js
* MongoDB for storing forms and leads
* REST APIs for forms, questions, leads, and file uploads
* User authentication (simple username/password)
* Cloudinary storing files

---

## Folder Structure

```
/backend
 ├─ src/
 │   ├─ controllers/
 │   ├─ routes/
 │   ├─ models/
 │   └─ index.ts
 ├─ package.json
 └─ .env

/frontend
 ├─ src/
 │   ├─ components/
 │   ├─ composables/
 │   ├─ services/
 │   ├─ views/
 │   │   ├─ admin/
 │   │   └─ user/
 │   └─ main.ts
 ├─ public/
 ├─ package.json
 ├─ pnpm-lock.yaml
 └─ vite.config.ts
```

---

## Getting Started

### Backend Setup

1. Navigate to the backend folder:

```bash
cd server
```

2. Install dependencies:

```bash
pnpm install
```

3. Set environment variables:

```bash
touch .env
# Update .env with your DB connection string and API configs
```

4. Start the backend:

```bash
pnpm dev
```

The API should now be running at `http://localhost:3000` (or your configured port).

---

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd web
```

2. Install dependencies:

```bash
pnpm install
```

3. Set environment variables if needed:

```
VITE_API_BASE_URL=http://localhost:3000
```

4. Start development server:

```bash
pnpm dev
```


---

## BE Environment Variables

| Variable                | Description                          |
| -------------------     | ------------------------------------ |
| `MONGO_URI`             | Database connection string (backend) |
| `PORT`                  | Backend server port                  |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary name                      |
| `CLOUDINARY_API_KEY`    | Cloudinary api key.                  |
| `CLOUDINARY_API_SECRET` | Cloudinary secret.                   |

## FE Environment Variables

| Variable            | Description                          |
| ------------------- | ------------------------------------ |
| `VITE_API_BASE_URL` | Backend API URL for frontend calls   |

---

## Deployment

### Railway Deployment

* **Frontend:** Vite static site
* **Backend:** Node.js Web Service

**Backend**

* Ensure `pnpm install` installs dependencies, `pnpm start` runs the API.
* Set required environment variables in Railway.

---

## Usage

1. Visit the frontend URL.
2. **User Section:** Navigate to `/` to fill out forms.
3. **Admin Section:** Navigate to `/admin` to manage forms and view submissions.
4. Simple FE auth system mainly for identification and not authentication.
4. Users can fill each section — answers are automatically saved offline.
5. File-type questions allow file uploads.
6. Submit the form — data is sent to the backend and files are uploaded.
7. After submission, the form is view-only.

---

## Login Credentials

| Section | Username | Password |
| ------- | -------- | -------- |
| Admin   | admin    | admin123 |
| User    | user     | user123  |

> **Note:** The same username system is used for both sections.


# Infra Const

## Stage A – 5,000 leads/month

1. Focus: Low-cost, speed-to-market
2. Frontend: Vite static site deployed on Railway / Netlify / Vercel
3. Backend: NestJS on Railway basic plan on railway(Using railway because i already have an account.)
4. Database: MongoDB Atlas free tier
5. File Storage: Free cloudinary instance account because i do nt have a personal GCP or AWS account.
6. Monitoring: Minimal – console logs + simple error handling
7. Cost: ~$0–$10/month depending on hosting
8. Rate Limiting: Implemented to prevent abuse

## Stage B – 50,000 leads/month

1. Focus: Reliability, observability, stability
2. Frontend: Same, use custom domain and cloudflare cname management.
3. Backend: Scalable NestJS instance with auto-scaling
4. Database: MongoDB Atlas M10+ tier with replication
5. Monitoring: winston logger + DB or Sentry, Prometheus or Grafana
6. Backups: Daily automated MongoDB backups(comes with a paid instance)
7. Implement proper authentication with jwt tokens or sessions.
8. FE and BE Caching
9. Unit and E2E testing.

Cost: ~$50 $200/month depending on scaling requirements

AI - Chat GPT, to generate initial ui code template samples. All business logic, integration, and customization decisions were done manually. 