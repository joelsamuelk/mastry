# Mastry Architecture Baseline

## Audit Summary

The working tree does not contain an active application scaffold. Only the finalized Stitch design assets are present, plus a deleted default Next.js starter in git history.

The design system is the strongest source of truth:

- Quiet monochrome foundation with a single electric-indigo accent
- Tonal layering instead of visible borders
- Large editorial headlines, soft ambient shadows, and oversized radii
- Mobile-first product OS with desktop sidebars and denser control surfaces
- Distinct surfaces for mentee, mentor, and admin experiences

## Screens Implied By The Design Set

### Marketing / Public

- Premium landing page with dual pathways: discover mentors and become a mentor
- Featured mentor rail and trust/credibility framing
- FAQ and final CTA sections

### Mentee Product

- Dashboard / Growth home
- Mentor discovery feed
- Mentor profile
- Booking flow
- Sessions activity
- AI guidance
- Roadmap / milestone detail
- Growth resources
- Profile and settings

### Mentor Product

- Mentor onboarding / service offering
- Mentor dashboard / command center
- Live session workspace

### Admin

- Operational overview with mentor approvals and health metrics

## Route Map

### Marketing

- `/`
- `/become-a-mentor`

### Auth

- `/login`
- `/signup`
- `/onboarding`
- `/auth/callback`

### Mentee App

- `/dashboard`
- `/mentors`
- `/mentors/[slug]`
- `/sessions`
- `/guidance`
- `/resources`
- `/profile`

### Mentor App

- `/mentor/dashboard`
- `/mentor/setup`
- `/mentor/profile`
- `/mentor/availability`
- `/mentor/bookings`
- `/mentor/earnings`

### Admin

- `/admin`
- `/admin/mentors`

## Component Map

- Brand mark and wordmark
- Marketing header and mobile sheet menu
- Auth shell
- App shell with desktop sidebar, top bar, and mobile bottom nav
- Buttons, inputs, chips, section headers, surface cards
- Mentor cards in compact and detailed variants
- Insight documents with left accent bar
- Progress widgets and stat cards
- Availability/booking selectors
- Empty states and CTA panels

## Initial Data Model

- `profiles`: shared identity and role metadata
- `focus_areas`: reusable taxonomy for expertise, goals, and industries
- `mentor_profiles`: mentor-specific public and operational data
- `mentor_focus_areas`: join table for expertise tagging
- `goals`: user goals captured during onboarding
- `growth_plans`: AI or mentor-generated structured plans
- `growth_milestones`: ordered milestones per plan
- `session_types`: sellable mentor offerings
- `mentor_availability_slots`: bookable availability inventory
- `bookings`: session reservations and lifecycle state
- `payments`: Stripe transaction mapping
- `ai_guidance_runs`: structured guidance generations
- `mentor_reviews`: approval and moderation records

## Delivery Sequence

1. Rebuild the Next.js foundation and shared design system.
2. Ship the landing page and shared app shell with representative screens.
3. Wire auth/onboarding and persist the shell to Supabase.
4. Implement mentor discovery, profile, and booking as the first end-to-end transactional slice.
5. Expand mentor dashboard, AI guidance persistence, and admin moderation.
