# Implementation Plan - ACM Shivalik Student Chapter Website

We will build a high-performance, visually stunning website for **ACM Shivalik Chapter, Shivalik College of Engineering, Dehradun**. The project will be organized as a monorepo consisting of a **Next.js 15 (App Router) + TypeScript** frontend and an **Express.js (TypeScript)** backend with **PostgreSQL + Prisma ORM**.

---

## User Review Required

> [!IMPORTANT]
> **Database Access**: This system requires a running PostgreSQL instance. We will configure Prisma to connect to the database via a `DATABASE_URL` environment variable. You will need to provide this connection string or set up a local PostgreSQL instance. We will include Docker Compose configuration to make local setup trivial.
> 
> **Resume Storage**: The membership form requires a resume upload. By default, the backend will save uploaded resumes locally to a `/uploads/resumes` directory on the server. If this is deployed on a serverless platform (like Vercel/Render free tier), these files will be ephemeral. For production, we recommend integrating an S3-compatible cloud storage or Cloudinary, but we will implement the local upload system first as requested.
> 
> **Contact Map**: We will use a standard responsive Google Maps iframe embed pointing to Shivalik College of Engineering, Dehradun. 
> 
> **WhatsApp Floating Button**: The WhatsApp floating button will redirect to `https://wa.me/91XXXXXXXXXX` (we'll make the number configurable via environment variables in the frontend).

---

## Proposed Changes

We will organize the repository as follows:
```
acmwebsite/
├── frontend/             # Next.js 15 Client
├── backend/              # Node.js + Express Server
├── docker-compose.yml    # Optional local postgres setup
└── README.md             # Project-wide documentation
```

---

### Database Schema (Prisma)

We will define the schema in `backend/prisma/schema.prisma` with the following tables:
- **`User`**: Admin users for managing dashboard.
- **`Member`**: Official list of chapter members.
- **`Event`**: ACM events (Workshops, hackathons, seminars, etc.).
- **`EventGallery`**: Images related to events.
- **`Domain`**: 9 ACM Domains with details.
- **`TeamMember`**: Team board details.
- **`ContactMessage`**: Message inquiries from contact page.
- **`MembershipApplication`**: Registration submissions (including resume paths).
- **`NewsletterSubscriber`**: Newsletter sign-up table.

---

### Backend Components (`/backend`)

The backend will be written in Node.js + TypeScript using Express.js.

#### [NEW] [schema.prisma](file:///c:/Users/jhaad/acmwebsite/backend/prisma/schema.prisma)
- Prisma definition for all 9 tables.
- Automated migrations setup.

#### [NEW] [package.json](file:///c:/Users/jhaad/acmwebsite/backend/package.json) & [tsconfig.json](file:///c:/Users/jhaad/acmwebsite/backend/tsconfig.json)
- Setup dependencies: `express`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs`, `multer`, `exceljs` (for Excel export), `@prisma/client`, `zod` (for validation).
- Dev dependencies: `ts-node-dev`, `typescript`, `@types/*`.

#### [NEW] [src/index.ts](file:///c:/Users/jhaad/acmwebsite/backend/src/index.ts)
- Main entry point configuring Express, CORS, JSON parsers, public uploads serving, and router registration.

#### [NEW] [src/middleware/auth.ts](file:///c:/Users/jhaad/acmwebsite/backend/src/middleware/auth.ts)
- JWT token verification and administrator role guard.

#### [NEW] [src/routes/](file:///c:/Users/jhaad/acmwebsite/backend/src/routes/)
- `/api/auth`: Login, registration (first-time seed or admin invitation).
- `/api/events`: CRUD operations (Admin-guarded writes, public reads).
- `/api/team`: CRUD operations for team members.
- `/api/applications`: Submit membership form, view list (Admin only), export to Excel (Admin only).
- `/api/contact`: Send message, view messages (Admin only).
- `/api/newsletter`: Subscribe, view list (Admin only).

---

### Frontend Components (`/frontend`)

The client will use Next.js 15 App Router with Tailwind CSS, Framer Motion, and custom glassmorphism styling.

#### [NEW] [tailwind.config.ts](file:///c:/Users/jhaad/acmwebsite/frontend/tailwind.config.ts) & [globals.css](file:///c:/Users/jhaad/acmwebsite/frontend/src/app/globals.css)
- Defining the primary palette: Deep dark background (`#050505`), glassmorphic panels, and neon blue accents (`#007BFF`).
- Custom keyframe animations for glows, pulses, and text reveals.

#### [NEW] [src/components/](file:///c:/Users/jhaad/acmwebsite/frontend/src/components/)
- **`LoadingScreen`**: Multi-stage animated splash screen (ACM logo fade-in -> blue glow pulse -> text slide-in -> particle burst transition).
- **`ParticleBackground`**: HTML5 Canvas-based background displaying moving neon nodes with glowing connections.
- **`CursorGlow`**: Follows mouse movements with a smooth cyan/blue radial gradient shadow (hidden on touch devices).
- **`Navbar`**: Glassmorphic sticky header with scroll-depth indicators.
- **`WhatsAppButton`**: Pulsing float widget with custom tooltip.
- **`EventCountdown`**: Countdown timer for the next upcoming event.

#### [NEW] [src/app/(public)/](file:///c:/Users/jhaad/acmwebsite/frontend/src/app/(public)/)
- **`page.tsx` (Home)**: Hero section, dynamic statistics counter, Mission/Vision, featured events slider, testimonials carousel, and sponsors grid.
- **`about/page.tsx`**: Story of ACM Shivalik, global timeline, mission and goal statements.
- **`team/page.tsx`**: Cards for Faculty Coordinator, Executive Board, Technical, Design, Management, and Research teams with magnetic hover and social links.
- **`events/page.tsx`**: Tabs for upcoming/past events, category filters, and an image slider gallery.
- **`domains/page.tsx`**: Glow-effect interactive grid cards for the 9 ACM domains.
- **`membership/page.tsx`**: Styled multi-step registration form with resume file validation and success animations.
- **`contact/page.tsx`**: Interactive contact form, social handles, direct emails, and Google Maps embed.

#### [NEW] [src/app/(auth)/admin/login/page.tsx](file:///c:/Users/jhaad/acmwebsite/frontend/src/app/(auth)/admin/login/page.tsx)
- Premium, cyber-themed admin login panel with JWT session management.

#### [NEW] [src/app/admin/dashboard/](file:///c:/Users/jhaad/acmwebsite/frontend/src/app/admin/dashboard/)
- Core dashboard summarizing key stats (Total members, applications, events, messages).
- **Events Management**: Form to add/edit/delete events with date picker.
- **Team Management**: Form to add/edit/delete members.
- **Applications View**: Grid listing all candidates, including download links for resumes and Excel export triggers.
- **Messages Inbox**: View and mark contact messages.

#### [NEW] [src/app/robots.txt](file:///c:/Users/jhaad/acmwebsite/frontend/src/app/robots.txt) & [sitemap.ts](file:///c:/Users/jhaad/acmwebsite/frontend/src/app/sitemap.ts)
- Next.js-generated dynamic search index settings.

---

## Verification Plan

### Automated Verification
- We will configure ESLint and TypeScript compilation to run successfully:
  - Frontend: `npm run build`
  - Backend: `npx tsc --noEmit`
- We will seed administrative users and mock data to ensure the database schema can be read and written properly using a dedicated seed script.

### Manual Verification
- **Aesthetic check**: Verify the loading transition, responsive grid layouts, custom cursors, canvas particles, and glowing cards across various screen widths.
- **Form submission**: Test the Membership form with file uploads, verify storage in the database, and verify the Admin application explorer can display and export candidate lists to Excel.
- **Authentication loop**: Ensure non-admins are redirected away from the dashboard and auth sessions persist.
