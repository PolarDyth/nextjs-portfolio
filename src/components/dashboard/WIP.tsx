import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Construction, ArrowRight, Clock } from 'lucide-react'

export default function WorkInProgress() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 w-full text-center animate-fade-in">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <div className="flex justify-center">
            <Construction className="h-20 w-20 text-primary animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Work In Progress
          </h1>
        </div>
        
        <p className="text-muted-foreground">
          This section is currently under construction. We&#39;re working hard to build something amazing for you!
        </p>
        
        <div className="relative py-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-sm text-muted-foreground">
              Coming soon
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="group">
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/projects" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Projects
            </Link>
          </Button>
        </div>
        
        <div className="mt-4 pt-6 border-t border-border/40">
          <p className="text-sm text-muted-foreground">
            Check back later, or{" "}
            <Button asChild variant="link" className="h-auto p-0 font-medium">
              <Link href="/dashboard/messages" className="group inline-flex items-center">
                Send Feedback
                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </p>
        </div>
      </div>
      
      {/* Terminal-style SVG design - for work in progress */}
      <div className="mt-12 w-full max-w-md">
        <svg width="100%" height="120" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="400" height="120" rx="6" fill="#1F1F3A" />
          <text x="20" y="30" fontFamily="monospace" fontSize="14" fill="#F0C674">$</text>
          <text x="35" y="30" fontFamily="monospace" fontSize="14" fill="#FFFFFF"> git checkout -b feature/settings</text>
          
          <text x="20" y="55" fontFamily="monospace" fontSize="14" fill="#A4E400">Switched to a new branch &#39;feature/settings&#39;</text>
          
          <text x="20" y="80" fontFamily="monospace" fontSize="14" fill="#F0C674">$</text>
          <text x="35" y="80" fontFamily="monospace" fontSize="14" fill="#FFFFFF"> npm run build:settings</text>
          
          <text x="20" y="105" fontFamily="monospace" fontSize="14" fill="#3B82F6">Building [======{'>'}                 ] 30%</text>
          
          <rect x="218" y="104" width="10" height="2" fill="#3B82F6">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
      
      <div className="mt-8 flex items-center text-muted-foreground">
        <Clock className="h-4 w-4 mr-2" />
        <span className="text-sm">Expected completion: Soon™</span>
      </div>
    </div>
  )
}