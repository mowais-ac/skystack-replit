# SkyStack Corporate Website

## Overview

This is a corporate website for SkyStack.sa, a Saudi-based technology and software development company. The project is a full-stack TypeScript application featuring a React frontend with a premium enterprise design, and an Express backend with PostgreSQL database. The website supports multi-language functionality (English and Arabic with RTL support) and showcases services, business models, pricing, and contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled using Vite
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives with custom styling)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: Custom context-based i18n system supporting English and Arabic (RTL)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **API Structure**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response validation
- **Development Server**: Vite dev server middleware integrated with Express for HMR support

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities, data, i18n
├── server/           # Express backend
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared between client and server
│   ├── schema.ts     # Drizzle database schema
│   └── routes.ts     # API route definitions with Zod schemas
```

### Key Design Patterns
- **Shared Schema**: Database schemas defined in `shared/schema.ts` are used by both frontend (for form validation) and backend (for database operations)
- **Type-Safe API Contracts**: API routes are defined with Zod schemas in `shared/routes.ts`, ensuring type safety across the stack
- **Component-Driven UI**: shadcn/ui components provide consistent, accessible UI primitives
- **Server-Side Rendering Ready**: Architecture supports future SSR implementation if needed

### Build System
- Development: `npm run dev` runs Vite dev server with Express backend
- Production: `npm run build` uses esbuild for server bundling and Vite for client bundling
- Database: `npm run db:push` pushes schema changes using Drizzle Kit

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with schema defined in `shared/schema.ts`
- **connect-pg-simple**: PostgreSQL session store (available for future session management)

### UI/Frontend Libraries
- **Radix UI**: Headless UI primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **React Icons**: Additional icons (used for social media icons)

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation (used for both forms and API contracts)
- **drizzle-zod**: Generates Zod schemas from Drizzle table definitions

### Fonts
- Google Fonts: Inter, Playfair Display, Space Grotesk (loaded via index.html)

### Development Tools
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server-side bundling for production
- **TypeScript**: Type checking across the entire codebase