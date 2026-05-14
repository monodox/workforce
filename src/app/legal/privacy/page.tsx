export default function PrivacyPage() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: May 2026</p>
      
      <div className="space-y-6 text-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p>We collect information to provide better services to all our users. We collect information in the following ways:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Information you give us. For example, many of our services require you to sign up for an account.</li>
            <li>Information we get from your use of our services.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Information We Collect</h2>
          <p>We use the information we collect from all of our services to provide, maintain, protect and improve them, to develop new ones, and to protect our users.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Share</h2>
          <p>We do not share personal information with companies, organizations and individuals outside of Workforce unless one of the following circumstances applies:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>With your consent</li>
            <li>For legal reasons</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
