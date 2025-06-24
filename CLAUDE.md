# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (Next.js 12)
- `npm run build` - Create production build
- `npm run lint` - Run ESLint checks
- `npm run export` - Generate static export
- `npm run deploy` - Deploy to Vercel

## Architecture Overview

This is a Next.js 12 portfolio website using the pages router with a component-based architecture and file-based content management.

### Styling System
- **Stitches** (CSS-in-JS) for component styling with design tokens
- Global theme with dark color palette in `stitches.config.js`
- Custom fonts: Biotif (body), Neuzeit Grotesk (headings), Fira Code (code)
- Responsive breakpoints: bp1 (425px+), bp2 (760px+), bp3 (max 780px), bp4 (max 1024px)

### Content Management
- **Blog Articles**: Markdown files in `/articles/` with frontmatter metadata
- **Static Data**: JavaScript objects exported from `/data/` directory
- **Processing**: `lib/blog.js` handles markdown parsing and HTML conversion using remark
- **Routing**: Dynamic routes via `[slug].js` for blog posts

### Key Features
- **Command Palette**: KBar integration with animated Lottie icons
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Responsive Design**: Separate mobile navigation, animated cursor for desktop only
- **SEO**: Next SEO with JSON-LD structured data

### Component Architecture
```
components/
├── Core UI (Navbar, Footer, Toast, ButtonPrimary, etc.)
├── Blog (Post, FeaturedArticle, BlogDate)
├── Interactive (CommandBar, Modal, Dialog)
├── Specialized:
    ├── ui/ - Reusable UI components
    ├── work/ - Work experience components
    └── modal/ - Modal system
```

### App Structure
- `_app.js`: Global providers, command bar wrapper, animated cursor, mobile navbar
- `_document.js`: HTML document structure
- `pages/`: File-based routing with modal-based homepage sections
- `layouts/`: Base and Blogpost layouts

### TypeScript Configuration
- TypeScript configured but using JavaScript files (.js)
- Strict mode enabled with modern ES features
- JSX preserve mode for Next.js processing

## Development Notes

When working with content:
- Blog posts use gray-matter for frontmatter parsing
- Images stored in `/public/static/images/` with organized subdirectories
- Design tokens and component variants follow Stitches conventions
- Mobile-first responsive design approach

When adding components:
- Use Stitches styled components with theme tokens
- Follow existing animation patterns with Framer Motion
- Maintain dark theme consistency with existing color palette
- Test both desktop (with animated cursor) and mobile experiences