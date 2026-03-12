import { Activity, Pill, Utensils, Moon, Footprints } from "lucide-react";

const activities = [
  { time: "9:00 AM", label: "Morning Walk", icon: Footprints, color: "text-primary" },
  { time: "10:30 AM", label: "Took Medication", icon: Pill, color: "text-secondary" },
  { time: "12:00 PM", label: "Blood Pressure Check", icon: Activity, color: "text-care-amber" },
  { time: "1:00 PM", label: "Lunch", icon: Utensils, color: "text-primary" },
  { time: "3:00 PM", label: "Afternoon Nap", icon: Moon, color: "text-muted-foreground" },
];

const ActivityFeed = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">Today's Activity</h2>
      <div className="bg-card rounded-2xl border p-4 space-y-0">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
            <div className="flex-shrink-0 bg-accent rounded-xl p-3">
              <a.icon className={`h-5 w-5 ${a.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">{a.label}</p>
              <p className="text-sm text-muted-foreground">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
