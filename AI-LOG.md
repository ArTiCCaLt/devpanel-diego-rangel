## Prompt 1 — Architecture and prioritization

### Prompt

I have a 2-hour technical assessment to build DevPanel with login,
persistent session, protected dashboard, user table and debounced search.

The stack is free and AI use is mandatory.

I have already lost approximately 45 minutes.

Help me prioritize the P0 requirements and propose the simplest
architecture I can reasonably explain and defend.

### AI response

ChatGPT proposed a Next.js full-stack architecture using TypeScript, Next.js Route Handlers, JWT authentication and an in-memory data source.

It also recommended prioritizing all P0 functionality before P1/P2.

### What I did

I accepted the Next.js architecture because it reduced setup overhead and is a stack I already know.

I reviewed and adapted the proposed structure instead of blindly copying it.

## AI output I modified

One of the initial suggestions implemented the protected dashboard as a
server component that read the authentication cookie directly.

The implementation worked during development, but the production build
failed because Next.js 16.4 with Cache Components attempted to prerender
the authenticated route.

The build reported:

"Next.js encountered uncached or runtime data during prerendering."

I reviewed the framework error rather than treating the AI-generated
implementation as final. I changed the dashboard to explicitly allow a
blocking route because authentication depends on request-specific cookie
data.

This was validated again with:

npm run build

## Prompt 2 — Debugging production build

### Prompt

The application works during development, but `npm run build` fails while
prerendering `/dashboard` because the route accesses authentication data.

### AI response

ChatGPT explained that the authenticated route depends on request-specific
cookie data and should not be treated as a statically prerendered page.

### What I did

I reviewed the error produced by Next.js, applied the route-specific fix,
and reran both TypeScript validation and the production build before
accepting the change.

## AI contribution estimate

Approximately 60–70% of the initial implementation was AI-assisted, particularly scaffolding, API handlers and UI structure.

My work focused on architecture decisions, prioritization, integrating and reviewing the generated code, debugging environment and production-build issues, validating behavior, and deciding what not to implement within the
timebox.

## What AI did well

AI was especially effective at accelerating the initial project structure
and generating a coherent first implementation of authentication, API
routes and the dashboard.

## What AI did poorly

The initial solution did not account for the prerendering behavior of
Next.js 16.4 with Cache Components. The application appeared correct in
development but failed the production build. This reinforced the need to
validate AI-generated code rather than accepting it based only on local
development behavior.