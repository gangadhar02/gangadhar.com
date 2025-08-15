import React, { useState, useEffect } from "react";
import { useHasMounted } from "./ClientOnly";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconHome,
  IconUser,
  IconBlockquote,
  IconBriefcase,
  IconFlask,
  IconCamera,
  IconAt,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandInstagram,
  IconCircleLetterGFilled,
  IconFileCv
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export function SidebarNav({ children }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const mounted = useHasMounted();

  const links = [
    {
      label: "Home",
      href: "/",
      icon: IconHome,
    },
    {
      label: "About",
      href: "/about",
      icon: IconUser,
    },
    {
      label: "Work",
      href: "/work",
      icon: IconBriefcase,
    },
    {
      label: "Projects",
      href: "/projects",
      icon: IconFlask,
    },
    {
      label: "Articles",
      href: "/articles",
      icon: IconBlockquote,
    },
    {
      label: "Clicks",
      href: "/clicks",
      icon: IconCamera,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: IconAt,
    },
  ];

  const socialLinks = [
    {
      label: "Resume",
      href: "https://drive.google.com/file/d/1_l6dV5NvkmSNBJ8Bmk8CLrTOlRHstcUK/view",
      icon: IconFileCv,
    },
    {
      label: "Twitter",
      href: "https://twitter.com/gangadhar02",
      icon: IconBrandTwitter,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/gangadhar02",
      icon: IconBrandLinkedin,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/gangadhar__s/",
      icon: IconBrandInstagram,
    },
    {
      label: "GitHub",
      href: "https://github.com/gangadhar02",
      icon: IconBrandGithub,
    },
  ];

  return (
    <div className={cn(
      "flex flex-col md:flex-row bg-neutral-100 dark:bg-neutral-900",
      "w-full flex-1 mx-auto overflow-hidden",
      "h-screen"
    )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="gap-10">
          <div className="flex flex-col overflow-y-auto">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>
            <div className="mt-8 flex flex-col gap-1">
              {links.map((link, idx) => {
                const Icon = link.icon;
                const isActive = mounted && router.pathname === link.href;
                return (
                  <Link key={idx} href={link.href} passHref>
                    <a className="no-underline">
                      <SidebarLink 
                        link={{
                          ...link,
                          icon: (
                            <Icon 
                              className={cn(
                                "h-5 w-5 flex-shrink-0 [&>path]:fill-none [&>path]:stroke-current stroke-[1.5]",
                                isActive ? "text-black dark:text-white" : "text-neutral-700 dark:text-neutral-200"
                              )}
                            />
                          )
                        }}
                      />
                    </a>
                  </Link>
                );
              })}
            </div>
            
            {/* Social Links Section */}
            <div className="flex flex-col gap-1 mt-4">
              <div className="border-t border-neutral-300 dark:border-neutral-600 pt-3">
                <div 
                  className="px-2 mb-2 opacity-100 visible"
                >
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Connect
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  {socialLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline"
                      >
                        <SidebarLink 
                          link={{
                            ...link,
                            icon: (
                              <Icon 
                                className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 [&>path]:fill-none [&>path]:stroke-current stroke-[1.5]"
                              />
                            )
                          }}
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            
          </div>
        </SidebarBody>
      </Sidebar>
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col bg-white dark:bg-black">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link href="/" passHref>
      <a className="flex items-center justify-center relative z-20 no-underline">
        <IconCircleLetterGFilled className="h-8 w-8 text-black dark:text-white flex-shrink-0" />
      </a>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link href="/" passHref>
      <a className="flex items-center justify-center relative z-20 no-underline">
        <IconCircleLetterGFilled className="h-8 w-8 text-black dark:text-white flex-shrink-0" />
      </a>
    </Link>
  );
};