import { useNavigate } from "react-router-dom";
import { Shield, Heart, Bell, Activity, Phone, Users, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import ThemeToggle from "../components/ThemeToggle";
import heroImg from "../assets/hero-elderly.png";


const features = [
  { icon: Shield, title: "Fall Detection", desc: "Instant alerts when a fall is detected", color: "text-blue-500" },
  { icon: Phone, title: "Emergency SOS", desc: "One-tap emergency alert to caregivers", color: "text-red-500" },
  { icon: Bell, title: "Medication Reminders", desc: "Never miss a dose with smart reminders", color: "text-green-500" },
  { icon: Activity, title: "Health Monitoring", desc: "Track vitals and daily activity", color: "text-blue-500" },
  { icon: Users, title: "Caregiver Dashboard", desc: "Family can monitor in real-time", color: "text-blue-500" },
  { icon: Heart, title: "Wellness Tracking", desc: "Sleep, steps, and heart rate tracking", color: "text-red-500" },
  { icon: Zap, title: "AI Simulations", desc: "View trained ML models in action", color: "text-yellow-500" },
];

const LandingPage = () => {

  const navigate = useNavigate();

  const handleNavigation = (page: string) => {


    navigate(page);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16">

          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">CareGuard</span>
          </div>

          <div className="hidden md:flex items-center gap-6">

            <button onClick={() => handleNavigation("/elderly")} className="text-muted-foreground hover:text-foreground font-medium">
              Elderly Dashboard
            </button>

            <button onClick={() => handleNavigation("/caregiver")} className="text-muted-foreground hover:text-foreground font-medium">
              Caregiver
            </button>

            <button onClick={() => handleNavigation("/children")} className="text-muted-foreground hover:text-foreground font-medium">
              Children Monitor
            </button>

            <button onClick={() => handleNavigation("/careinsight")} className="text-muted-foreground hover:text-foreground font-medium">
              Care Insights
            </button>

            <button onClick={() => handleNavigation("/medication")} className="text-muted-foreground hover:text-foreground font-medium">
              Medication
            </button>

            <button onClick={() => navigate("/simulation")} className="text-muted-foreground hover:text-foreground font-medium">
              🤖 Simulations
            </button>

          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Button size="lg" onClick={() => handleNavigation("/elderly")}>
              Start Monitoring
            </Button>

          </div>

        </div>
      </nav>

      {/* HERO */}
      <section className="container min-h-[80vh] flex items-center py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div className="space-y-6">

            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold">
              <Heart className="h-4 w-4" />
              Smart Elderly Care
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Keeping Your Loved Ones{" "}
              <span className="text-primary">Safe</span> &{" "}
              <span className="text-green-500">Healthy</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Real-time health monitoring, fall detection, medication reminders,
              and instant emergency alerts — all in one simple app.
            </p>

            <div className="flex flex-wrap gap-4">

              <Button size="lg" onClick={() => handleNavigation("/elderly")}>
                <Shield className="h-5 w-5 mr-2" />
                Start Monitoring
              </Button>

              <Button variant="outline" size="lg" onClick={() => handleNavigation("/caregiver")}>
                <Users className="h-5 w-5 mr-2" />
                Caregiver View
              </Button>

            </div>

          </div>

          <div className="flex justify-center">
            <img
              src={heroImg}
              alt="Elderly person with health monitoring smartwatch"
              className="w-full max-w-lg drop-shadow-xl"
            />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-card py-20">
        <div className="container">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg mt-3">
              Simple, reliable care technology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-background rounded-2xl p-6 border shadow-sm hover:shadow-md transition"
              >
                <f.icon className={`h-10 w-10 ${f.color} mb-4`} />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 text-center">
        <div className="bg-primary rounded-3xl p-10 md:p-16 text-primary-foreground">

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>

          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Set up CareGuard in minutes. No complex devices needed —
            just install the app and start protecting your loved ones.
          </p>

          <Button variant="outline" size="lg" onClick={() => handleNavigation("/elderly")} className="border-white text-primary">
            Start Free Monitoring
          </Button>

        </div>
      </section>

      {/* FOOTER */}
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