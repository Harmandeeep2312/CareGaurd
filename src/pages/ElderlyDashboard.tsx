import { Link } from "react-router-dom";
import { Phone, Pill, Heart, Mic, Activity, Shield, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import HealthCard from "../components/HealthCard";
import ActivityFeed from "../components/ActivityFeed";
import ThemeToggle from "../components/ThemeToggle";

const ElderlyDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Good Morning! 👋</h1>
              <p className="text-sm text-muted-foreground">How are you feeling today?</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/emergency">
              <Button variant="destructive" size="lg" className="rounded-full gap-2">
                <Phone className="h-5 w-5" /> SOS
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Emergency SOS */}
        <Link to="/emergency" className="block">
          <div className="bg-destructive/10 border-2 border-destructive/30 rounded-2xl p-6 flex items-center gap-4 hover:bg-destructive/15 transition-colors">
            <div className="bg-destructive rounded-full p-4">
              <Phone className="h-8 w-8 text-destructive-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Emergency SOS</h2>
              <p className="text-muted-foreground">Tap here for immediate help</p>
            </div>
          </div>
        </Link>

        {/* Health Summary Cards */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Daily Health Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <HealthCard icon={Heart} label="Heart Rate" value="72" unit="bpm" status="normal" />
            <HealthCard icon={Activity} label="Steps" value="3,245" unit="steps" status="normal" />
            <HealthCard icon={Shield} label="Fall Risk" value="Low" status="good" />
            <HealthCard icon={Pill} label="Medications" value="2/3" unit="taken" status="warning" />
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/medication">
              <Button variant="elderlySecondary" size="xl" className="w-full flex-col h-auto py-6 gap-3">
                <Pill className="h-10 w-10" />
                <span>Medications</span>
              </Button>
            </Link>
            <Button variant="elderly" size="xl" className="w-full flex-col h-auto py-6 gap-3">
              <Mic className="h-10 w-10" />
              <span>Voice Assistant</span>
            </Button>
          </div>
        </div>

        {/* Activity Feed */}
        <ActivityFeed />
      </main>
    </div>
  );
};

export default ElderlyDashboard;
