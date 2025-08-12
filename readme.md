# Gangadhar S Portfolio

A modern, responsive portfolio website built with Next.js 12, featuring a sleek sidebar navigation, dark theme, and smooth animations. Live at [gangadhar.com](https://gangadhar.com)

## 🚀 Features

- **Modern Sidebar Navigation**: Collapsible Aceternity-style sidebar with smooth animations
- **Dark Theme**: Elegant dark color palette with consistent design system
- **Blog System**: Markdown-based blog with syntax highlighting and reading time
- **Interactive Elements**: Command palette (CMD+K), modal-based content sections
- **Responsive Design**: Optimized for all devices with separate mobile navigation
- **Performance**: Static generation, optimized images, and fast page loads
- **SEO Optimized**: Structured data, meta tags, and sitemap generation

## 🛠 Tech Stack

- **Framework**: Next.js 12 (Pages Router)
- **Styling**: Tailwind CSS + Stitches (legacy)
- **Animations**: Framer Motion
- **Icons**: Tabler Icons
- **Content**: Markdown with gray-matter
- **Command Palette**: KBar
- **Analytics**: Google Analytics
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

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
gangadhar.com/
├── pages/           # Next.js pages and API routes
├── components/      # React components
│   ├── ui/         # Reusable UI components
│   ├── work/       # Work experience components
│   ├── projects/   # Project showcase components
│   └── modal/      # Modal system
├── layouts/        # Page layouts
├── lib/            # Utility functions
├── data/           # Static data (projects, work, etc.)
├── articles/       # Blog posts in Markdown
├── public/         # Static assets
│   └── static/
│       ├── images/ # Images and screenshots
│       ├── icons/  # Lottie animation files
│       └── font/   # Custom fonts
└── styles/         # Global styles
```

## 🎨 Customization

### Content Updates

- **Blog Posts**: Add `.md` files to `/articles/` with frontmatter
- **Projects**: Update `/data/projects.js`
- **Work Experience**: Update `/data/work.js`
- **Social Links**: Edit links in `/components/SidebarNav.js`

### Styling

- **Colors**: Modify CSS variables in `/styles/globals.css`
- **Fonts**: Update font files in `/public/static/font/`
- **Animations**: Adjust Framer Motion configs in components

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run ESLint
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
- Website: [gangadhar.com](https://gangadhar.com)
- GitHub: [@gangadhar02](https://github.com/gangadhar02)
- LinkedIn: [gangadhar02](https://linkedin.com/in/gangadhar02)
- Twitter: [@gangadhar02](https://twitter.com/gangadhar02)

## 🙏 Acknowledgments

- Aceternity UI for sidebar component inspiration
- Next.js team for the amazing framework
- All open source contributors