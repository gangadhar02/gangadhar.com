# Gangadhar S Portfolio

A modern, responsive portfolio website built with Next.js 12, featuring a floating navbar navigation, dark theme, and smooth animations. Live at [bengaluruboy.in](https://bengaluruboy.in)

## 🚀 Features

- **Modern Floating Navbar**: Glassmorphism navigation with backdrop blur when scrolled
- **Responsive Navigation**: Desktop navbar with mobile hamburger menu overlay
- **Dark Theme**: Elegant dark color palette with theme toggle and tooltips
- **Project Showcase**: Grid-based project display with interactive modals
- **Blog System**: Markdown-based blog with syntax highlighting and reading time
- **Interactive Elements**: Command palette (CMD+K), project modals with blur backdrop
- **Homepage Redesign**: Comprehensive layout with work experience, projects, and writing sections
- **Performance**: Static generation, optimized images, and fast page loads
- **SEO Optimized**: Structured data, meta tags, and JSON-LD schema

## 🛠 Tech Stack

- **Framework**: Next.js 12 (Pages Router)
- **Styling**: Tailwind CSS + Stitches (migrating from Stitches to Tailwind)
- **Animations**: Framer Motion
- **Icons**: Tabler Icons, Lucide React
- **UI Components**: Radix UI (for modals and dialogs)
- **Content**: Markdown with gray-matter
- **Command Palette**: KBar with Lottie animations
- **Fonts**: Custom fonts (Biotif, Neuzeit Grotesk, Fira Code)
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/gangadhar02/gangadhar.com.git

# Navigate to the project
cd gangadhar.com

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) to view it in your browser (port may vary if 3000 is occupied).

## 📁 Project Structure

```
gangadhar.com/
├── pages/              # Next.js pages and API routes
├── components/         # React components
│   ├── ui/            # Tailwind-based UI components
│   ├── magicui/       # Magic UI components
│   ├── work/          # Work experience with expandable cards
│   ├── projects/      # Project showcase components
│   ├── modal/         # Modal system
│   ├── motion/        # Framer Motion animation components
│   ├── Navbar.js      # Main navigation component
│   ├── ProjectGrid.js # Reusable project grid component
│   ├── ProjectModal.js # Project detail modal
│   └── ComprehensiveHomepage.js # Main homepage component
├── layouts/           # Page layouts (Base, Blogpost)
├── lib/               # Utility functions
├── data/              # Static data (projects, work, etc.)
├── articles/          # Blog posts in Markdown
├── public/            # Static assets
│   └── static/
│       ├── images/    # Images and screenshots
│       ├── icons/     # Lottie animation files
│       └── font/      # Custom fonts
└── styles/            # Global styles with CSS variables
```

## 🎨 Key Components

### Navigation System
- **Navbar.js**: Modern floating navbar with glassmorphism effect
  - Fixed position with blur backdrop when scrolled
  - Responsive design with hamburger menu for mobile
  - Theme toggle with tooltip showing current mode
  - Contact button with "Say Hello" tooltip

### Homepage Architecture
- **ComprehensiveHomepage.js**: Main homepage layout
  - Hero section with photo and introduction
  - Work experience with collapsible previous roles
  - "What I Do" section
  - Latest writing showcase
  - Latest projects grid (limited to 2 rows)

### Project System
- **ProjectGrid.js**: Reusable component for project display
- **ProjectModal.js**: Radix UI-based modal for project details
- Consistent across homepage and dedicated projects page

## 🎨 Customization

### Content Updates

- **Blog Posts**: Add `.md` files to `/articles/` with frontmatter
- **Projects**: Update `/data/projects.js`
- **Work Experience**: Update `/data/work.js`
- **Navigation**: Edit navbar links in `/components/Navbar.js`

### Styling

- **Colors**: Modify CSS variables in `/styles/globals.css`
- **Fonts**: Update font files in `/public/static/font/`
- **Animations**: Adjust Framer Motion configs in components
- **Icons**: Use Tabler Icons with `[&>path]:fill-none [&>path]:stroke-current` classes for outlines

### Development Notes

- Prefer Tailwind CSS classes for new components
- Use `cn()` utility from `lib/utils` for conditional classes
- Maintain consistent dark theme using CSS variables
- Test hydration with server/client rendering differences

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run ESLint checks
npm run export   # Generate static export
npm run deploy   # Deploy to Vercel
```

## 🚢 Deployment

The site is configured for automatic deployment on Vercel:

1. Push changes to the main branch
2. Vercel automatically builds and deploys
3. Preview deployments created for pull requests

## 📄 License

MIT License - feel free to use this code for your own portfolio!

## 👤 Author

**Gangadhar S**
- Website: [bengaluruboy.in](https://bengaluruboy.in)
- GitHub: [@gangadhar02](https://github.com/gangadhar02)
- LinkedIn: [gangadhar02](https://linkedin.com/in/gangadhar02)
- Twitter: [@gangadhar__s](https://x.com/gangadhar__s)

## 🙏 Acknowledgments

- Aceternity UI for component inspiration
- Magic UI for enhanced components
- Radix UI for accessible components
- Next.js team for the amazing framework
- Tailwind CSS for utility-first styling
- All open source contributors

## 🔄 Recent Updates

- Migrated from sidebar navigation to floating navbar
- Implemented comprehensive homepage redesign
- Added project modal system with Radix UI
- Created reusable ProjectGrid component
- Updated domain from gangadhar.com to bengaluruboy.in
- Enhanced responsive design with mobile-first approach