# DevPanel

## Stack
- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Next.js Route Handlers
- JOSE / JWT
- In-memory data source

## Prerequisites
- Node.js
- npm

## Getting Started

1. Clone the repository

2. Install dependencies:
   npm install

3. Create `.env.local` based on `.env.example`

4. Run:
   npm run dev

5. Open:
   http://localhost:3000

## Demo credentials

Email: admin@devpanel.com
Password: DevPanel123!

## Technical decisions

- Next.js full-stack was selected to minimize setup and context switching during the two-hour timebox.
- Authentication is handled through backend Route Handlers using signed JWTs.
- The authentication cookie is HttpOnly and validated server-side before rendering the dashboard.
- User search is performed through the backend with a client-side debounce.
- User data is kept in memory to prioritize the required P0 functionality within the assessment timebox.

## Known limitations

- User data is reset when the server restarts.
- No persistent database was implemented.
- Advanced filtering was intentionally omitted to prioritize P0 functionality.