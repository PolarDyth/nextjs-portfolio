import { contactInfo } from "@/constants/contact-info";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 py-6 sm:py-8 mt-8 sm:mt-10 border-t border-border">
      {/* Desktop Footer */}
      <div className="hidden md:flex md:justify-between md:items-center">
        <div className="font-bold text-xl animate-slide-down">
          <Link href="/" className="flex gap-2">
            <span className="text-primary">WILLIAMS</span>
            <span>PORTFOLIO</span>
          </Link>
        </div>
        <div className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} William Alexander. All rights reserved.
        </div>
        <div className="flex gap-5 items-center">
          <Link href={contactInfo.github} target="_blank" rel="noopener noreferrer">
            <SiGithub className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
          </Link>
          <Link href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
          </Link>
          <Link href={`mailto:${contactInfo.email}`}>
            <Mail className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
          </Link>
        </div>
      </div>
      
      {/* Mobile Footer */}
      <div className="md:hidden flex flex-col items-center space-y-4">
        <div className="font-bold text-lg animate-slide-down">
          <Link href="/" className="flex gap-2 justify-center">
            <span className="text-primary">WILLIAMS</span>
            <span>PORTFOLIO</span>
          </Link>
        </div>
        <div className="flex gap-6 items-center py-3">
          <Link href={contactInfo.github} target="_blank" rel="noopener noreferrer">
            <SiGithub className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
          </Link>
          <Link href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
          </Link>
          <Link href={`mailto:${contactInfo.email}`}>
            <Mail className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
          </Link>
        </div>
        <div className="text-muted-foreground text-xs text-center">
          © {new Date().getFullYear()} William Alexander. All rights reserved.
        </div>
      </div>
    </footer>
  )
}