# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (Next.js 12)
- `npm run build` - Create production build
- `npm run lint` - Run ESLint checks
- `npm run export` - Generate static export
- `npm run deploy` - Deploy to Vercel

## Architecture Overview

This is a Next.js 12 portfolio website using the pages router with a hybrid styling approach (migrating from Stitches to Tailwind CSS).

### Styling System
- **Tailwind CSS** for new components and utility classes
- **Stitches** (legacy) still present in some components but being phased out
- Custom fonts: Biotif (body), Neuzeit Grotesk (headings), Fira Code (code)
- Responsive breakpoints: bp1 (425px+), bp2 (760px+), bp3 (max 780px), bp4 (max 1024px)
- Dark theme with CSS variables in `styles/globals.css`

### Navigation System
- **SidebarNav**: Aceternity-style sidebar navigation (replaces traditional navbar)
  - Collapsible sidebar (60px collapsed, 165px expanded)
  - Icons from `@tabler/icons-react` with outline style (`[&>path]:fill-none [&>path]:stroke-current`)
  - Social links in "Connect" section at bottom

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
- **Preloader**: Initial loading animation with particles effect

### Component Architecture
```
components/
├── ui/ - Tailwind-based UI components (sidebar, shimmer-button)
├── magicui/ - Magic UI components
├── work/ - Work experience with expandable cards
├── projects/ - Project cards with modals
├── modal/ - Modal system for content display
└── Legacy Stitches components being migrated
```

### Layout System
- **Base Layout**: Standard pages with sidebar navigation
- **Blogpost Layout**: Special layout for blog articles with hero images
- **Homepage**: Modal-based sections (About, Now, Someday)

### Important Implementation Details
- Icons require `[&>path]:fill-none [&>path]:stroke-current` classes to render as outlines
- Hydration issues resolved with mounted state checks in animated components
- Footer positioning uses `min-h-screen` flex container for proper placement
- Sidebar G logo uses consistent alignment with navigation icons

## Development Notes

When working with styling:
- Prefer Tailwind CSS classes for new components
- Use `cn()` utility from `lib/utils` for conditional classes
- Maintain consistent dark theme using CSS variables
- Test hydration with server/client rendering differences

When working with navigation:
- All navigation changes should update both desktop sidebar and mobile views
- Active route highlighting uses `router.pathname` comparison
- Social links open in new tabs with proper security attributes