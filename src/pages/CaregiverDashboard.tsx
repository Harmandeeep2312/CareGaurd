import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Activity, Shield, Pill, MapPin, AlertTriangle, Bell, User } from "lucide-react";
import { Button } from "../components/ui/button";
import HealthCard from "../components/HealthCard";
import ThemeToggle from "../components/ThemeToggle";

const alerts = [
  { type: "warning", msg: "Medication reminder: Afternoon dose not taken", time: "2 min ago" },
  { type: "info", msg: "Daily step goal reached — 3,245 steps", time: "1 hour ago" },
  { type: "success", msg: "Morning medication taken on time", time: "3 hours ago" },
];

const CaregiverDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Caregiver Dashboard</h1>
              <p className="text-sm text-muted-foreground">Monitoring: John D.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Patient Info */}
        <div className="bg-card rounded-2xl border p-5 flex items-center gap-4">
          <div className="bg-primary/10 rounded-full p-4">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">John Doe</h2>
            <p className="text-muted-foreground">Age 78 • Last active 5 min ago</p>
          </div>
          <div className="bg-secondary/10 text-secondary rounded-full px-3 py-1 text-sm font-semibold">Online</div>
        </div>

        {/* Health Status */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Live Health Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <HealthCard icon={Heart} label="Heart Rate" value="72" unit="bpm" status="normal" />
            <HealthCard icon={Activity} label="Steps Today" value="3,245" unit="steps" status="normal" />
            <HealthCard icon={Shield} label="Fall Risk" value="Low" status="good" />
            <HealthCard icon={Pill} label="Med. Adherence" value="67%" status="warning" />
          </div>
        </div>

        {/* Risk Gauges */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Risk Assessment</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <RiskGauge label="Fall Risk" level="Medium" color="care-amber" percent={50} />
            <RiskGauge label="Health Risk" level="Low" color="secondary" percent={25} />
            <RiskGauge label="Activity Level" level="Good" color="primary" percent={70} />
          </div>
        </div>

        {/* Alerts */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-4 flex items-start gap-3 ${
                  a.type === "warning" ? "bg-care-amber/5 border-care-amber/20" :
                  a.type === "success" ? "bg-secondary/5 border-secondary/20" :
                  "bg-primary/5 border-primary/20"
                }`}
              >
                <AlertTriangle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  a.type === "warning" ? "text-care-amber" :
                  a.type === "success" ? "text-secondary" : "text-primary"
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{a.msg}</p>
                  <p className="text-sm text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Location</h2>
          <div className="bg-card rounded-2xl border p-6 flex items-center gap-4">
            <div className="bg-primary/10 rounded-xl p-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">Home</p>
              <p className="text-muted-foreground">123 Elm Street • Last updated 2 min ago</p>
            </div>
          </div>
        </div>

        {/* Emergency Alert Panel */}
        <div className="bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <h2 className="text-xl font-bold text-foreground">Emergency Alert Panel</h2>
          </div>
          <p className="text-muted-foreground mb-4">No active emergencies. All systems normal.</p>
          <div className="flex items-center gap-2 text-sm text-secondary font-semibold">
            <Shield className="h-4 w-4" /> Monitoring active
          </div>
        </div>
      </main>
    </div>
  );
};

const RiskGauge = ({ label, level, color, percent }: { label: string; level: string; color: string; percent: number }) => (
  <div className="bg-card rounded-2xl border p-5">
    <p className="text-sm text-muted-foreground mb-2">{label}</p>
    <p className={`text-lg font-bold text-${color === "secondary" ? "secondary" : color === "primary" ? "primary" : "care-amber"} mb-3`}>{level}</p>
    <div className="w-full bg-accent rounded-full h-3">
      <div
        className={`h-3 rounded-full ${
          color === "secondary" ? "bg-secondary" : color === "primary" ? "bg-primary" : "bg-care-amber"
        }`}
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export default CaregiverDashboard;
