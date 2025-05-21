# Product Review & Rating Platform

## Prerequisites

- Node.js ≥ 18.18
- npm
- PostgreSQL (local) or a managed PostgreSQL instance

## Environment Variables

### Backend (backend/.env)

```
DATABASE_URL="postgresql://<user>:<password>@<host>:5432/<database>?schema=public"
```

### Frontend (frontend/.env)

```
VITE_API_URL=http://localhost:3000/api/v1
# Or for deployed backend:
# VITE_API_URL=https://wap-final-project-1.onrender.com/api/v1
```

## Backend Development Setup

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```
2. **Create and update `.env`:**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Frontend Development Setup

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```
2. **Create and update `.env`:**
   ```bash
   cp .env.example .env
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
