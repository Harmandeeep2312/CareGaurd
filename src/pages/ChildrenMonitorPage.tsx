import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Heart, Activity, Shield, Pill, MapPin, AlertTriangle,
  Bell, User, Phone, MessageCircle, Clock, Thermometer, Eye
} from "lucide-react";
import { Button } from "../components/ui/button";
import HealthCard from "../components/HealthCard";
import ThemeToggle from "../components/ThemeToggle";

const parents = [
  { id: 1, name: "Dad – John", age: 78, status: "Online", lastActive: "2 min ago", heartRate: "72", steps: "3,245", fallRisk: "Low", medAdherence: "67%" },
  { id: 2, name: "Mom – Mary", age: 74, status: "Online", lastActive: "10 min ago", heartRate: "68", steps: "2,100", fallRisk: "Low", medAdherence: "100%" },
];

const recentAlerts = [
  { parent: "Dad", msg: "Afternoon medication not taken yet", time: "5 min ago", type: "warning" },
  { parent: "Mom", msg: "Completed morning walk — 2,100 steps", time: "1 hour ago", type: "info" },
  { parent: "Dad", msg: "Blood pressure reading: 130/85", time: "2 hours ago", type: "info" },
  { parent: "Mom", msg: "All medications taken on time", time: "3 hours ago", type: "success" },
];

const ChildrenMonitorPage = () => {
  const [selectedParent, setSelectedParent] = useState<number | null>(null);

  const selected = parents.find(p => p.id === selectedParent);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Children Monitor</h1>
              <p className="text-sm text-muted-foreground">Keep your parents safe</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Parent Selector */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Your Parents</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {parents.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedParent(p.id === selectedParent ? null : p.id)}
                className={`w-full text-left rounded-2xl border p-5 flex items-center gap-4 transition-all ${
                  selectedParent === p.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "bg-card hover:border-primary/30"
                }`}
              >
                <div className="bg-primary/10 rounded-full p-3">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-foreground">{p.name}</p>
                  <p className="text-sm text-muted-foreground">Age {p.age} • {p.lastActive}</p>
                </div>
                <div className="bg-secondary/10 text-secondary rounded-full px-3 py-1 text-xs font-semibold">{p.status}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Parent Detail */}
        {selected && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">{selected.name} — Health Status</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <HealthCard icon={Heart} label="Heart Rate" value={selected.heartRate} unit="bpm" status="normal" />
                <HealthCard icon={Activity} label="Steps Today" value={selected.steps} unit="steps" status="normal" />
                <HealthCard icon={Shield} label="Fall Risk" value={selected.fallRisk} status="good" />
                <HealthCard icon={Pill} label="Med. Adherence" value={selected.medAdherence} status={selected.medAdherence === "100%" ? "good" : "warning"} />
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="elderly" size="xl" className="flex-col h-auto py-5 gap-2 text-sm">
                  <Phone className="h-7 w-7" />
                  Call
                </Button>
                <Button variant="elderlySecondary" size="xl" className="flex-col h-auto py-5 gap-2 text-sm">
                  <MessageCircle className="h-7 w-7" />
                  Message
                </Button>
                <Link to="/emergency" className="contents">
                  <Button variant="destructive" size="xl" className="flex-col h-auto py-5 gap-2 text-sm">
                    <AlertTriangle className="h-7 w-7" />
                    SOS
                  </Button>
                </Link>
              </div>
            </div>

            {/* Location */}
            <div className="bg-card rounded-2xl border p-5 flex items-center gap-4">
              <div className="bg-primary/10 rounded-xl p-4">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">Current Location: Home</p>
                <p className="text-muted-foreground">123 Elm Street • Updated {selected.lastActive}</p>
              </div>
            </div>

            {/* Daily Schedule */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Today's Schedule</h2>
              <div className="bg-card rounded-2xl border divide-y">
                {[
                  { time: "8:00 AM", task: "Morning Medication", done: true },
                  { time: "9:00 AM", task: "Morning Walk", done: true },
                  { time: "12:00 PM", task: "Lunch", done: true },
                  { time: "1:00 PM", task: "Afternoon Medication", done: false },
                  { time: "6:00 PM", task: "Dinner", done: false },
                  { time: "8:00 PM", task: "Evening Medication", done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.done ? "bg-secondary" : "bg-accent"
                    }`}>
                      {item.done ? (
                        <Eye className="h-4 w-4 text-secondary-foreground" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.task}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recent Alerts */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            {recentAlerts.map((a, i) => (
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
                  <p className="font-medium text-foreground"><span className="text-primary">{a.parent}</span> — {a.msg}</p>
                  <p className="text-sm text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChildrenMonitorPage;
