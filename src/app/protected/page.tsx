import { Button } from "@/components/ui/button";
import { ShieldAlert, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-fade-in">
      <div className="max-w-md text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <ShieldAlert className="w-8 h-8 text-red-500 dark:text-red-400" />
        </div>
        
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Unauthorized Access
        </h1>
        
        <p className="text-muted-foreground">
          You need to be logged in to access this protected area. Please log in with appropriate credentials to continue.
        </p>
        
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="group">
            <Link href="/login">
              <Lock className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              Login
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}