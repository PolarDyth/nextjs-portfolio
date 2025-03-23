import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center animate-fade-in">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl sm:text-8xl font-bold text-primary">404</h1>
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Page Not Found
          </h2>
        </div>
        
        <p className="text-muted-foreground">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="relative py-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-sm text-muted-foreground">
              Let's get you back on track
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="group">
            <Link href="/">
              <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Projects
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Terminal-style SVG design - matches your other graphics */}
      <div className="mt-12 w-full max-w-md">
        <svg width="100%" height="100" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="400" height="100" rx="6" fill="#1F1F3A" />
          <text x="20" y="30" fontFamily="monospace" fontSize="14" fill="#F0C674">$</text>
          <text x="35" y="30" fontFamily="monospace" fontSize="14" fill="#FFFFFF"> find /path -name "page"</text>
          
          <text x="20" y="55" fontFamily="monospace" fontSize="14" fill="#E11D48">Error:</text>
          <text x="70" y="55" fontFamily="monospace" fontSize="14" fill="#FFFFFF"> Page not found in directory</text>
          
          <text x="20" y="80" fontFamily="monospace" fontSize="14" fill="#F0C674">$</text>
          <text x="35" y="80" fontFamily="monospace" fontSize="14" fill="#FFFFFF"> cd /home</text>
          
          <rect x="30" y="370" width="10" height="2" fill="#FFFFFF">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    </div>
  )
}