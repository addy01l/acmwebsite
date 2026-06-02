# Product Requirements Document (PRD)

## Project: ACM Shivalik Student Chapter Website
**Organization**: ACM Student Chapter, Shivalik College of Engineering, Dehradun  
**Version**: 1.0.0  
**Date**: June 2026  
**Status**: Ready for Refinement & Deployment  

---

## 1. Executive Summary & Project Goal
The primary objective of this project is to develop a premium, state-of-the-art web portal for the **ACM Shivalik Student Chapter** at the **Shivalik College of Engineering (SCE), Dehradun**. 

The chapter requires a unified online presence to:
*   Foster academic and technical collaboration among engineering students.
*   Manage and showcase technical workshops, hackathons, guest lectures, and coding contests.
*   Streamline membership applications, onboarding, and student domain assignments.
*   Share research publications and resources guided by academic mentors.
*   Provide an admin dashboard for administrators to monitor applications, update lists, export registries, and view student feedback.

---

## 2. Target Audience & Personas
1.  **Student Developers & Candidates**: Engineering students seeking to join the chapter, apply for specialized committees, register for upcoming hackathons, and download coding resources.
2.  **Faculty Coordinators & Advisor (e.g., Dr. Sandeep Kumar)**: Academic leads overseeing chapter progress, approving technical workshops, vetting team listings, and mentoring research publication targets.
3.  **Executive Board & Committee Leads**: Student leads responsible for organizing events, managing registrations, processing member data, and responding to feedback inquiries.
4.  **External Industry Sponsors & Visitors**: Companies evaluating college technical capabilities for sponsorships, placement collaborations, or speaker engagements.

---

## 3. Scope & Core Feature Specifications

### 3.1. Interactive Loading Splash Screen
*   **Purpose**: Establish a premium first impression when the page loads.
*   **Features**:
    *   Centered ACM Shivalik/SCE branding layout.
    *   Animated fade-in of the ACM branding logo.
    *   Pulsing blue neon glow animation.
    *   Slide-in reveal of "ACM SHIVALIK - Shivalik College of Engineering".
    *   Particle burst WebGL transition flowing seamlessly into the main homepage.

### 3.2. Public Client Portal (Next.js 15 App Router)
*   **Homepage (`/`)**:
    *   **Hero Unit**: Dynamic title header, quick mission highlights, and dual call-to-actions ("Join ACM" / "Explore Events"). Includes a custom 3D rotating mascot wireframe.
    *   **Statistics Panel**: Live-increment counters for active members (500+), events organized (40+), and research papers (15+).
    *   **Vision & Framework Cards**: Glassmorphic panels detailing chapter values and structural programs.
    *   **Featured Countdown**: High-priority real-time countdown clock tracking the closest upcoming calendar event.
    *   **Testimonials Grid**: Slide carousel showing testimonials from current students and successful alumni.
    *   **Sponsors Banner**: Grayscale-to-color interactive board listing collaborators (ACM India, Microsoft LSC, GitHub Education, Shivalik College).
*   **About Page (`/about`)**:
    *   Interactive chronological timeline of chapter milestones.
    *   Details on the global ACM values, computer science initiatives, and regional impact.
*   **Team Directory (`/team`)**:
    *   Classified groupings of the board: Faculty Coordinator, Executive Board, and Technical, Design, Management, and Research committees.
    *   Hover-triggered profiles with LinkedIn, GitHub, and email contact links.
*   **Events & Gallery Panel (`/events`)**:
    *   Dual categories filter dividing events into "Upcoming" (for registrations) and "Past" (for records).
    *   Integrated photo-gallery lightbox illustrating past workshops and hackathons.
*   **Domains Portal (`/domains`)**:
    *   Overview of the 9 official technical domains (Tech, CP, Design, Management, Research, Community, Seminars, Conferences, Startups).
    *   Details on domain descriptions, core skill requirements, and student team leads.
*   **Membership Registration Application (`/membership`)**:
    *   Multi-step application form collecting basic info, enrollment details, branch, domain choices, and skills.
    *   Drag-and-drop resume uploader restricting files to PDF format (<5MB).
    *   Framer Motion success splash with a canvas confetti explosion on submission.
*   **Contact & Feedback Form (`/contact`)**:
    *   Secure feedback form (Name, Email, Subject, Message).
    *   Visual map layout embedding a responsive Google Maps locator for the SCE Dehradun campus.

### 3.3. Secure Administrator Dashboard (`/admin/*`)
*   **Authentication (`/admin/login`)**:
    *   Cyber-themed security portal requiring an administrator email and password.
    *   Uses secure JWT authorization with persistent local session storage.
*   **Dashboard Console (`/admin/dashboard`)**:
    *   **Analytics Overview Tab**: Key performance widgets displaying registered members, application totals, active events, and contact inbox counts.
    *   **Applications Review Tab**: Review applicant details, download PDF resumes, and trigger status updates ("Pending", "Approved", "Rejected").
    *   **Member Directory Tab**: View approved chapter members, filter by branch/year, and revoke membership if necessary.
    *   **Events CRUD Manager**: Inline creator, editor, and delete controls for modifying titles, categories, dates, venues, banners, and registration links.
    *   **Team CRUD Directory**: Manage faculty and student profiles, order weighting (to define display rank), and contact links.
    *   **Inbox Messages Tab**: Read user inquiries from the contact form with dynamic status flags ("Read" / "Unread").
    *   **Data Export Service**: Trigger styled Microsoft Excel spreadsheet compilation of applicant lists.

---

## 4. UI/UX & Design Guidelines
To deliver a high-quality product, the application layout must adhere to these design requirements:
*   **Aesthetic Theme**: Premium dark theme using an absolute black background (`#050505`) and ACM blue accents (`#007BFF` / `#0085ca`).
*   **Layout Effects**: Modern glassmorphic panels (`backdrop-blur-md` with subtle white border transparencies `rgba(255, 255, 255, 0.05)`).
*   **Interactive Elements**:
    *   Custom WebGL floating particle shader active in the background.
    *   Damped cursor glow tracker trailing mouse movements.
    *   Animated 3D rotating dual-Icosahedron wireframe mascot representing the chapter's technology core.
    *   Pulsing float WhatsApp widget with helpful hover support for quick student inquiries.
*   **Typography**: Sleek, clean system sans-serif hierarchy (Inter / Apple System) for ultimate readability.
*   **Responsiveness**: Flawless layout adaptions for smartphones, tablets, laptops, and ultra-wide monitors.

---

## 5. Success Metrics
*   **Load Performance**: Splash screen load in under 1.5 seconds under standard network speeds.
*   **Registration Rate**: Smooth multi-step membership form filling completed in under 90 seconds.
*   **Security integrity**: Prevention of unauthenticated access to the admin portal or application data.
*   **Data Export Speed**: Generation and download of the membership Excel sheets in under 3 seconds.
