# replit.md

## Overview

JAW Drop Productions is a video production and content creation business website built as a full-stack web application. The site serves as a portfolio and contact platform for a video production service that specializes in promotional videos, social media content, print design, and drone photography/videography for small businesses. The application features a modern single-page design with smooth animations, a contact form for lead generation, and a professional showcase of services and portfolio work.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for consistent theming and responsive design
- **UI Components**: Comprehensive component library using Radix UI primitives with shadcn/ui styling patterns
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Animations**: Framer Motion for smooth scroll animations and interactive elements

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API with JSON responses and proper HTTP status codes
- **Error Handling**: Centralized error handling middleware with request logging
- **Development**: Hot module replacement via Vite integration for seamless development experience

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM with type-safe schema definitions
- **Development Storage**: In-memory storage implementation for development and testing
- **Database Provider**: Neon Database for serverless PostgreSQL hosting
- **Migrations**: Drizzle Kit for database schema migrations and management

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Express session configuration present but not actively used
- **Future Considerations**: Architecture supports adding authentication with PostgreSQL session store

### Component Architecture
- **Design System**: Custom design tokens with JAW Drop Productions brand colors (metallic grays, blues, and golds)
- **Layout**: Single-page application with section-based navigation and smooth scrolling
- **Responsive Design**: Mobile-first approach with breakpoint-specific optimizations
- **Reusable Components**: Comprehensive UI component library with consistent styling and behavior patterns

## External Dependencies

### Third-Party Services
- **Database Hosting**: Neon Database (@neondatabase/serverless) for managed PostgreSQL
- **Development Platform**: Replit-specific configurations and error handling overlays

### Key NPM Packages
- **UI Framework**: React ecosystem with TypeScript support
- **Database**: Drizzle ORM with Zod for schema validation and type generation
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Components**: Extensive Radix UI component collection for accessible, unstyled primitives
- **State Management**: TanStack Query for server state and data fetching
- **Animations**: Framer Motion for declarative animations and scroll-triggered effects
- **Forms**: React Hook Form with resolver integration for Zod validation schemas
- **Icons**: Lucide React for consistent iconography
- **Development**: ESBuild for production bundling and TSX for development server

### Build and Development Tools
- **Bundling**: Vite for development server and production builds
- **TypeScript**: Full TypeScript configuration with path mapping and strict mode
- **Linting**: ESLint configuration implied through TypeScript compiler options
- **Database Tooling**: Drizzle Kit for schema management and PostgreSQL dialect support

### Asset Management
- **Static Assets**: Background images and media files stored in attached_assets directory
- **Image Handling**: Direct imports and URL handling for optimized loading

### Environmental Configuration
- **Database**: DATABASE_URL environment variable for PostgreSQL connection
- **Development**: NODE_ENV-based configuration for development vs production modes
- **Deployment**: Production build process with static file serving and API routing