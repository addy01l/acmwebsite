# ACM Student Chapter Website - ACM Shivalik

A premium, production-ready portal for **ACM Shivalik Student Chapter, Shivalik College of Engineering, Dehradun**. Features a dark glassmorphic Apple-inspired UI, smooth Framer Motion animations, interactive canvas background, student registration workflows, and a full admin control dashboard.

---

## Project Structure

```
acmwebsite/
├── backend/               # Node.js + Express + Prisma Server
│   ├── prisma/            # DB Schemas & Migrations
│   │   └── schema.prisma  # PostgreSQL Schema Definition
│   ├── src/
│   │   ├── config/        # Database Clients
│   │   ├── controllers/   # Route Business Logic
│   │   ├── middleware/    # Auth & File Upload Interceptors
│   │   ├── routes/        # Router Endpoints
│   │   ├── seed.ts        # Admin, Domain, & Event Database Seeder
│   │   └── index.ts       # Express Application Entry
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/              # Next.js 15 App Router
│   ├── src/
│   │   ├── app/           # Pages & Routes
│   │   ├── components/    # Layout, Canvas, & Floating Widgets
│   │   └── utils/         # API Clients
│   ├── package.json
│   └── tailwind.config.ts
│
├── docker-compose.yml     # Local Postgres container (Optional)
└── package.json           # Monorepo Scripts Controller
```

---

## Local Development Setup

### 1. Database Setup (PostgreSQL)

If you have Docker installed, spin up Postgres using:
```bash
docker-compose up -d
```
*Alternatively, you can use any remote database provider like Supabase, Neon, or RDS and paste the connection URL in `.env`.*

### 2. Backend Configurations

Navigate to `backend/` and copy the configuration settings:
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
DATABASE_URL="postgresql://acm_admin:acm_secure_password123@localhost:5432/acm_shivalik?schema=public"
JWT_SECRET="acm_shivalik_super_secret_jwt_key_2026_unbreakable"
FRONTEND_URL="http://localhost:3000"
UPLOAD_DIR="uploads"
WHATSAPP_NUMBER="91XXXXXXXXXX"
```

Install packages, apply migrations, and seed mock data:
```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run prisma:seed
```
*This seeds a default admin account: **`admin@acmshivalik.org`** with password **`adminpassword123`**.*

### 3. Frontend Configurations

Create a `.env` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXT_PUBLIC_WHATSAPP_NUMBER="91XXXXXXXXXX"
```

Install packages:
```bash
cd ../frontend
npm install
```

---

## Running the Servers

Use the root-level scripts to control both backend and frontend servers from the workspace root:

### Start Backend Dev Server
```bash
npm run dev:backend
```
Server boots on `http://localhost:5000`

### Start Frontend Dev Server
```bash
npm run dev:frontend
```
Client boots on `http://localhost:3000`

---

## Deployment Guide

### Frontend (Next.js)
1. Recommend deploying on **Vercel** or **Netlify**.
2. Link the repository, select `frontend` as the root folder.
3. Configure the environment variables:
   - `NEXT_PUBLIC_API_URL` (points to your deployed backend URL)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (your WhatsApp redirect contact number)

### Backend (Express + Prisma)
1. Deploy on **Render**, **Railway**, or **Heroku**.
2. Configure environment variables in dashboard (JWT secrets, Database URLs, port mapping).
3. Add a build command: `npm install && npm run build && npx prisma generate`
4. Add a start command: `node dist/index.js`
5. Note: Set up **AWS S3** or **Cloudinary** integration if serverless uploads are ephemeral.
