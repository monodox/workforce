import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Cta() {
  return (
    <section className="w-full py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary -z-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/10 to-transparent -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-foreground/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-primary-foreground">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Join thousands of modern companies using Workforce to build, manage, and scale their teams effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-primary hover:bg-secondary/90 shadow-lg" asChild>
              <Link href="/auth/signup">
                Start your free trial
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors" asChild>
              <Link href="/auth/login">
                Talk to Sales
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
