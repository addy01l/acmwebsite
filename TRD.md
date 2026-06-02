# Technical Requirements Document (TRD)

## Project: ACM Shivalik Student Chapter Website
**Organization**: ACM Student Chapter, Shivalik College of Engineering, Dehradun  
**Version**: 1.0.0  
**Date**: June 2026  
**Status**: Ready for Refinement & Deployment  

---

## 1. System Architecture
The application runs as a decoupled monorepo consisting of a server-rendered SPA frontend and an Express REST API backend:

```mermaid
graph TD
    Client[Next.js 15 App Client] <-->|HTTPS / REST APIs + JWT| Server[Express.js Node Backend]
    Server <-->|Prisma Client| DB[(PostgreSQL Database)]
    Client <-->|WebGL / Canvas Shader| ParticleBg[ParticleBackground GLSL]
    Client <-->|WebGL / Canvas 3D| Mascot3D[Three.js Mascot Canvas]
```

### Stack Components
*   **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion (for animations), Three.js (for WebGL 3D rendering), and `canvas-confetti` (for submission alerts).
*   **Backend**: Node.js + Express.js, TypeScript, Prisma ORM (for schema migrations and query execution), `bcryptjs` (for authentication hashes), JWT (for admin sessions), `multer` (for multi-part file uploads), and `exceljs` (for spreadsheet compile pipelines).
*   **Database**: PostgreSQL.

---

## 2. Database & Data Models (Prisma PostgreSQL)
The database structure is configured in [schema.prisma](file:///c:/Users/jhaad/acmwebsite/backend/prisma/schema.prisma) with mappings mapping models to lowercase plural database tables:

*   **`User` (Table: `users`)**:
    *   `id`: UUID string (Primary Key)
    *   `email`: unique String (Admin login)
    *   `password`: String (Bcrypt encrypted hash)
    *   `name`: String
    *   `role`: String (Default: "admin")
*   **`Member` (Table: `members`)**:
    *   `id`: UUID string (Primary Key)
    *   `name`: String
    *   `email`: unique String
    *   `phone`: String
    *   `branch`: String
    *   `year`: Integer
    *   `enrollmentNo`: unique String
*   **`Event` (Table: `events`)**:
    *   `id`: UUID string (Primary Key)
    *   `title`: String
    *   `description`: String (Markdown supported text)
    *   `category`: String (Hackathons, Workshops, Seminars, etc.)
    *   `date`: DateTime (ISO 8601 string)
    *   `venue`: String
    *   `banner`: String (Image URL reference path)
    *   `regLink`: optional String
    *   `isUpcoming`: Boolean (Default: true)
*   **`EventGallery` (Table: `event_gallery`)**:
    *   `id`: UUID string (Primary Key)
    *   `imageUrl`: String
    *   `eventId`: UUID string (Foreign Key -> Event, Cascade on delete)
*   **`Domain` (Table: `domains`)**:
    *   `id`: UUID string (Primary Key)
    *   `name`: unique String
    *   `description`: String
    *   `skills`: String Array (Scalar array supported natively by PostgreSQL)
    *   `teamLeads`: String
    *   `icon`: String (Lucide-react reference index)
*   **`TeamMember` (Table: `team_members`)**:
    *   `id`: UUID string (Primary Key)
    *   `name`: String
    *   `position`: String
    *   `department`: String
    *   `category`: String (Faculty, Board, Tech, Design, Management, Research)
    *   `photo`: String
    *   `linkedin`: optional String
    *   `github`: optional String
    *   `email`: optional String
    *   `order`: Integer (Default: 0 for display sort order weight)
*   **`ContactMessage` (Table: `contact_messages`)**:
    *   `id`: UUID string (Primary Key)
    *   `name`: String
    *   `email`: String
    *   `subject`: String
    *   `message`: String
    *   `isRead`: Boolean (Default: false)
*   **`MembershipApplication` (Table: `membership_applications`)**:
    *   `id`: UUID string (Primary Key)
    *   `name`: String
    *   `email`: unique String
    *   `phone`: String
    *   `branch`: String
    *   `year`: Integer
    *   `enrollmentNo`: unique String
    *   `skills`: String
    *   `resumeUrl`: String (Local system upload path or cloud reference)
    *   `status`: String (Default: "pending" | approved, rejected)
*   **`NewsletterSubscriber` (Table: `newsletter_subscribers`)**:
    *   `id`: UUID string (Primary Key)
    *   `email`: unique String

---

## 3. WebGL & Animation Subsystems

### 3.1. Floating Particle Shader
Defined in [ParticleBackground.tsx](file:///c:/Users/jhaad/acmwebsite/frontend/src/components/ParticleBackground.tsx):
*   Renders an interactive WebGL canvas backdrop locked to `fixed inset-0` behind main layouts.
*   Utilizes raw vertex and fragment shaders processing GLSL code.
*   Uses a pseudo-random hash generator logic rendering 40 separate floating node points.
*   Calculates real-time mouse coordinate position updates relative to viewport dimensions, producing a localized glow follow highlight.

### 3.2. 3D Rotating Mascot
Defined in [ThreeMascot.tsx](file:///c:/Users/jhaad/acmwebsite/frontend/src/components/ThreeMascot.tsx):
*   Builds a WebGL scene containing an inner Icosahedron geometry mesh (`radius: 1.5, detail: 2`) configured with highly shiny wireframe materials.
*   Surrounded by a larger, faint outer Icosahedron shield mesh (`radius: 2.2, detail: 1`) rotating on a secondary axis.
*   Includes point and ambient lighting modules, rendering transparent canvas viewports blending with the page gradient.

---

## 4. API Endpoints Specification

### 4.1. Authentication Router (`/api/auth`)
*   `POST /login`: Log in admin user.
    *   **Payload**: `{ "email": "admin@acmshivalik.org", "password": "adminpassword123" }`
    *   **Response**: `{ "token": "<JWT_STRING>", "user": { "id": "...", "name": "...", "email": "..." } }`
*   `GET /profile`: Return current admin context.
    *   **Headers**: `Authorization: Bearer <JWT_STRING>`
    *   **Response**: `{ "id": "...", "name": "...", "email": "...", "role": "admin" }`

### 4.2. Events CRUD Router (`/api/events`)
*   `GET /`: Retrieve all events. Optional query param: `?isUpcoming=true` or `?isUpcoming=false`.
    *   **Response**: `Array<Event>` (including `gallery` relationship array)
*   `POST /` (Admin Only): Create event.
    *   **Headers**: `Authorization: Bearer <JWT_STRING>`
    *   **Payload**: `{ "title": "...", "description": "...", "category": "...", "date": "ISO_DATE", "venue": "...", "banner": "URL", "regLink": "URL", "isUpcoming": true }`
*   `PUT /:id` (Admin Only): Update event details.
    *   **Headers**: `Authorization: Bearer <JWT_STRING>`
*   `DELETE /:id` (Admin Only): Delete event record.
    *   **Headers**: `Authorization: Bearer <JWT_STRING>`

### 4.3. Team Profiles Router (`/api/team`)
*   `GET /`: Retrieve sorted team list.
    *   **Response**: `Array<TeamMember>` ordered by `order` value ascending.
*   `POST /` (Admin Only): Add team member.
*   `PUT /:id` (Admin Only): Edit profile settings.
*   `DELETE /:id` (Admin Only): Remove team member.

### 4.4. Membership Management Router (`/api/applications`)
*   `POST /submit`: Public applicant endpoint.
    *   **Payload**: `multipart/form-data` containing applicant fields and `resume` file field.
    *   **Upload Handling**: Validates format (PDF) and size (<5MB). Saves to `uploads/` directory on disk.
*   `GET /` (Admin Only): Fetch membership applications.
    *   **Headers**: `Authorization: Bearer <JWT_STRING>`
*   `PUT /:id/status` (Admin Only): Update application status.
    *   **Payload**: `{ "status": "approved" | "rejected" }`
*   `GET /export` (Admin Only): Generate formatted Excel of all applications.
    *   **Headers**: `Authorization: Bearer <JWT_STRING>`
    *   **Response**: Binary Excel file attachment (`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`).

### 4.5. Feedback Inquiry Router (`/api/contact`)
*   `POST /message`: Submit contact message form.
    *   **Payload**: `{ "name": "...", "email": "...", "subject": "...", "message": "..." }`
*   `GET /messages` (Admin Only): List contact message inbox.
*   `PUT /messages/:id/read` (Admin Only): Mark message as read.
*   `POST /newsletter/subscribe`: Public newsletter subscription.

---

## 5. Security & Configuration Metrics

### 5.1. Authentication & Security
*   **Password Hashing**: `bcryptjs` performs a 10-salt-round hashing pass on admin entry inputs before saving to PostgreSQL.
*   **Route Guards**: The Express backend uses custom middlewares:
    *   [auth.ts](file:///c:/Users/jhaad/acmwebsite/backend/src/middleware/auth.ts): Extracts, verifies, and decodes the JWT bearer token.
    *   `adminGuard`: Validates if `user.role === 'admin'`.
*   **CORS Configuration**: Restricts origin requests strictly to the configured `FRONTEND_URL` environment variables.

### 5.2. Next.js App Router Root Lock
To ensure that Turbopack correctly builds Tailwind v4 and PostCSS assets inside the nested monorepo structure, [next.config.ts](file:///c:/Users/jhaad/acmwebsite/frontend/next.config.ts) is configured to force the Turbopack root directory local scope:
```typescript
turbopack: {
  root: path.resolve(__dirname),
}
```

---

## 6. Server Environment Configuration (.env files)

### Backend environment variables (`backend/.env`):
```ini
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/acmdb?schema=public"
JWT_SECRET="acm_shivalik_secret_key_2026_nexus"
FRONTEND_URL="http://localhost:3000"
UPLOAD_DIR="uploads"
```

### Frontend environment variables (`frontend/.env`):
```ini
NEXT_PUBLIC_API_URL="http://localhost:5000"
```
