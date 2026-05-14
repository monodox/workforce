export function Faqs() {
  const faqs = [
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial on all our plans. No credit card required to start.",
    },
    {
      question: "Can I switch plans later?",
      answer: "Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Prorated charges will apply.",
    },
    {
      question: "Do you offer enterprise support?",
      answer: "Yes, our Enterprise plan includes 24/7 priority support, a dedicated account manager, and custom onboarding.",
    },
    {
      question: "Is my data secure?",
      answer: "We use industry-standard AES-256 encryption for all data at rest and in transit. We are also GDPR and CCPA compliant.",
    },
  ];

  return (
    <section className="w-full py-20 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, our support team is ready to help.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="group border rounded-lg bg-card text-card-foreground shadow-sm [&_summary::-webkit-details-marker]:hidden transition-all duration-200"
            >
              <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold hover:text-primary transition-colors">
                <span className="text-lg">{faq.question}</span>
                <span className="relative ml-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
