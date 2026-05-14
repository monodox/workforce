import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, BarChart3, ShieldCheck, Zap, Globe } from "lucide-react";

const features = [
  {
    title: "Team Management",
    description: "Easily organize your team into departments, roles, and projects with a few clicks.",
    icon: Users,
  },
  {
    title: "Smart Scheduling",
    description: "AI-powered scheduling to ensure optimal coverage without team burnout.",
    icon: Calendar,
  },
  {
    title: "Advanced Analytics",
    description: "Get real-time insights into productivity, attendance, and operational costs.",
    icon: BarChart3,
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with global data privacy regulations.",
    icon: ShieldCheck,
  },
  {
    title: "Lightning Fast",
    description: "Built on modern architecture ensuring sub-second response times globally.",
    icon: Zap,
  },
  {
    title: "Global Reach",
    description: "Support for multiple currencies, languages, and timezones out of the box.",
    icon: Globe,
  },
];

export function Features() {
  return (
    <section className="w-full py-20 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to scale
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform provides a comprehensive suite of tools designed to help you manage your workforce efficiently and effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
