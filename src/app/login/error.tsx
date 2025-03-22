'use client';
 
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-screen flex-col items-center justify-center animate-fade-in p-4">
      <div className="text-center max-w-md space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="pt-4">
          <Button 
            onClick={() => reset()}
            className="group"
          >
            <RefreshCcw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
            Try again
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-8">
          Error details: {error.message || error.digest}
        </p>
      </div>
    </main>
  );
}