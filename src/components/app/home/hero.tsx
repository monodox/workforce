import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-48 relative overflow-hidden flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/2 -right-24 w-72 h-72 bg-secondary/20 rounded-full blur-3xl opacity-50" />
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary font-medium backdrop-blur-sm">
            Welcome to the future of work
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Empower Your Workforce Seamlessly
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Streamline operations, manage talent, and scale your business with our all-in-one workforce management platform. Built for modern teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto group shadow-lg" asChild>
              <Link href="/auth/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto backdrop-blur-sm bg-background/50" asChild>
              <Link href="/auth/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
