import Link from 'next/link'
import { cn } from '../lib/utils'
import { useTheme } from '../contexts/ThemeContext'

export default function Footer() {
  const { theme, toggleTheme } = useTheme()
  const links = [
    {
      title: 'Email',
      url: '/contact',
      icon: 'ri-mail-line',
    },
    {
      title: 'Twitter',
      url: 'https://x.com/gangadhar__s',
      icon: 'ri-twitter-line',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/gangadhar02',
      icon: 'ri-github-line',
    },
    {
      title: 'linkedin',
      url: 'https://www.linkedin.com/in/gangadhar02',
      icon: 'ri-linkedin-line',
    },
    {
      title: 'Medium',
      url: 'https://medium.com/@gangadhar02',
      icon: 'ri-medium-line',
    },
    {
      title: 'Credits',
      url: '/credits',
      icon: 'ri-award-line',
    },
  ]

  const renderAnchor = (link, index) => {
    if (link.url.startsWith('http')) {
      return (
        <a 
          key={index}
          href={link.url} 
          target="_blank"
          className={cn(
            "text-secondary flex items-center text-[15px] border-0 ml-5 no-underline lowercase",
            "transition-colors duration-200 ease-in-out first:ml-0",
            "hover:text-primary focus:text-primary",
            "group"
          )}
        >
          <span className="hidden bp2:inline">{link.title}</span>
          <i className={cn(
            "text-primary ml-[5px] text-2xl transition-opacity duration-200",
            "bp2:opacity-0 bp2:text-base bp2:group-hover:opacity-100",
            link.icon
          )} />
        </a>
      )
    }

    return (
      <Link key={index} href={link.url} passHref>
        <a className={cn(
          "text-secondary flex items-center text-[15px] border-0 ml-5 no-underline lowercase",
          "transition-colors duration-200 ease-in-out first:ml-0",
          "hover:text-primary focus:text-primary",
          "group"
        )}>
          <span className="hidden bp2:inline">{link.title}</span>
          <i className={cn(
            "text-primary ml-[5px] text-2xl transition-opacity duration-200",
            "bp2:opacity-0 bp2:text-base bp2:group-hover:opacity-100",
            link.icon
          )} />
        </a>
      </Link>
    )
  }

  return (
    <footer className="bg-background flex items-center justify-center py-5">
      <button
        onClick={toggleTheme}
        className={cn(
          "text-secondary flex items-center text-[15px] border-0 bg-none cursor-pointer",
          "px-2 py-1 rounded-lg no-underline lowercase transition-all duration-200 ease-in-out",
          "hover:text-primary hover:bg-hover",
          "focus:text-primary focus:bg-hover",
          "group"
        )}
      >
        <span className="hidden bp2:inline">{theme === 'dark' ? 'light' : 'dark'}</span>
        <i className={cn(
          "text-primary ml-[5px] text-2xl transition-opacity duration-200",
          "bp2:opacity-0 bp2:text-base bp2:group-hover:opacity-100",
          theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'
        )} />
      </button>
      {links.map(renderAnchor)}
    </footer>
  )
}