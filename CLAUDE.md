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
- **Navbar**: Modern floating navbar with glassmorphism effect
  - Fixed position at top with blur backdrop when scrolled
  - Responsive design with hamburger menu for mobile
  - Desktop: Centered navigation links, right-aligned action buttons
  - Mobile: Full-screen overlay menu with smooth animations
  - Theme toggle button with tooltip showing current mode
  - Contact button with "Say Hello" tooltip including ghost icon
  - External resume link opens in new tab

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
├── Navbar.js - Main navigation component with theme toggle
├── ui/ - Tailwind-based UI components (buttons, shimmer effects)
├── magicui/ - Magic UI components
├── work/ - Work experience with expandable cards
├── projects/ - Project cards with modals
├── modal/ - Modal system for content display
└── Legacy Stitches components being migrated
```

### Layout System
- **Base Layout**: Standard pages with top navbar navigation
- **Blogpost Layout**: Special layout for blog articles with hero images
- **Homepage**: 
  - Hero section with animated name and title
  - Project showcase grid with 3-column layout (responsive)
  - Footer with social links and copyright
  - No sidebar - uses top navigation bar instead

### Important Implementation Details
- Icons require `[&>path]:fill-none [&>path]:stroke-current` classes to render as outlines
- Hydration issues resolved with mounted state checks in animated components
- Footer positioning uses `min-h-screen` flex container for proper placement
- Navbar uses IconCircleLetterGFilled as logo from `@tabler/icons-react`
- Tooltips appear on hover for theme toggle and contact buttons
- Mobile menu uses Menu/X icons from `lucide-react` with rotation animations

## Development Notes

When working with styling:
- Prefer Tailwind CSS classes for new components
- Use `cn()` utility from `lib/utils` for conditional classes
- Maintain consistent dark theme using CSS variables
- Test hydration with server/client rendering differences

When working with navigation:
- All navigation changes should update both desktop navbar and mobile menu
- Navbar becomes glassmorphic with backdrop blur when scrolled
- Mobile menu is full-screen overlay with smooth slide-in animation
- External links (like Resume) open in new tabs with proper security attributes
- Tooltips use group hover pattern with opacity transitions