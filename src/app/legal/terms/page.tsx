export default function TermsPage() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: May 2026</p>
      
      <div className="space-y-6 text-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using Workforce, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on Workforce's website for personal, non-commercial transitory viewing only.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
          <p>The materials on Workforce's website are provided on an 'as is' basis. Workforce makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>
      </div>
    </div>
  );
}
