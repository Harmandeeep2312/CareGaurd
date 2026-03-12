import { Link } from "react-router-dom";
import { Shield, Heart, Bell, Activity, Phone, Users, Baby } from "lucide-react";
import { Button } from "../components/ui/button";
import ThemeToggle from "../components/ThemeToggle";
import heroImg from "../assets/hero-elderly.png";

const features = [
  { icon: Shield, title: "Fall Detection", desc: "Instant alerts when a fall is detected", color: "text-primary" },
  { icon: Phone, title: "Emergency SOS", desc: "One-tap emergency alert to caregivers", color: "text-destructive" },
  { icon: Bell, title: "Medication Reminders", desc: "Never miss a dose with smart reminders", color: "text-care-green" },
  { icon: Activity, title: "Health Monitoring", desc: "Track vitals and daily activity", color: "text-care-blue" },
  { icon: Users, title: "Caregiver Dashboard", desc: "Family can monitor in real-time", color: "text-primary" },
  { icon: Heart, title: "Wellness Tracking", desc: "Sleep, steps, and heart rate tracking", color: "text-destructive" },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">CareGuard</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/elderly" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Elderly Dashboard</Link>
            <Link to="/caregiver" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Caregiver</Link>
            <Link to="/children" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Children Monitor</Link>
            <Link to="/careinsight" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Care Insights</Link>
            <Link to="/medication" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Medication</Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/elderly">
              <Button variant="default" size="lg">Start Monitoring</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold">
              <Heart className="h-4 w-4" /> Smart Elderly Care
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Keeping Your Loved Ones{" "}
              <span className="text-primary">Safe</span> &{" "}
              <span className="text-secondary">Healthy</span>
            </h1>
            <p className="text-elderly text-muted-foreground max-w-lg">
              Real-time health monitoring, fall detection, medication reminders, and instant emergency alerts — all in one simple app.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/elderly">
                <Button variant="elderly" size="xl">
                  <Shield className="h-6 w-6" /> Start Monitoring
                </Button>
              </Link>
              <Link to="/caregiver">
                <Button variant="outline" size="xl">
                  <Users className="h-6 w-6" /> Caregiver View
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img src={heroImg} alt="Elderly person with health monitoring smartwatch" className="w-full max-w-md drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything You Need</h2>
            <p className="text-muted-foreground text-elderly mt-3">Simple, reliable care technology</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-background rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <f.icon className={`h-10 w-10 ${f.color} mb-4`} />
                <h3 className="text-xl font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 text-center">
        <div className="bg-primary rounded-3xl p-10 md:p-16 text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Set up CareGuard in minutes. No complex devices needed — just install the app and start protecting your loved ones.
          </p>
          <Link to="/elderly">
            <Button variant="outline" size="xl" className="border-2 border-primary-foreground text-foreground hover:bg-primary-foreground hover:text-primary">
              Start Free Monitoring
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">CareGuard</span>
          </div>
          <p>© 2026 CareGuard. Smart Elderly Care System.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
