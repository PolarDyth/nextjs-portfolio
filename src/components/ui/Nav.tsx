"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLocations = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isMounted) return null;

  return (
    <nav className="animate-fade-in my-10 px-4 md:px-6">
      {/* Desktop and Mobile Header */}
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl md:text-2xl animate-slide-down">
          <Link href="/" className="flex gap-2 md:gap-4">
            <span className="text-primary">WILLIAMS</span>
            <span>PORTFOLIO</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center animate-slide-down" style={{ animationDelay: '200ms' }}>
          {navLocations.map((location, index) => (
            <Link
              href={location.href}
              key={index}
              className="font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all"
            >
              {location.name}
            </Link>
          ))}
        </div>

        {/* Desktop Contact Button */}
        <div className="hidden md:block animate-slide-down" style={{ animationDelay: '400ms' }}>
          <Button
            asChild
            className="font-semibold hover:animate-pulse"
          >
            <Link href="/contact">
              Contact Me
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden animate-slide-down z-50">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 pt-24 px-6 flex flex-col animate-fade-in">
          <div className="flex flex-col gap-8 text-center">
            {navLocations.map((location, index) => (
              <Link
                href={location.href}
                key={index}
                className="text-xl font-medium relative hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {location.name}
              </Link>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button
              asChild
              size="lg"
              className="font-semibold w-full max-w-xs"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/contact">
                Contact Me
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}