export default function CookiesPage() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">Cookie Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: May 2026</p>
      
      <div className="space-y-6 text-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
          <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
          <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">The Cookies We Set</h2>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.</li>
            <li><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
