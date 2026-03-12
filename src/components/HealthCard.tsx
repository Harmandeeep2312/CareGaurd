import { Heart, Activity, Shield, type LucideIcon } from "lucide-react";

interface HealthCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  status: "normal" | "good" | "warning" | "danger";
}

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  normal: { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
  good: { bg: "bg-secondary/10", text: "text-secondary", dot: "bg-secondary" },
  warning: { bg: "bg-care-amber/10", text: "text-care-amber", dot: "bg-care-amber" },
  danger: { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
};

const HealthCard = ({ icon: Icon, label, value, unit, status }: HealthCardProps) => {
  const s = statusStyles[status];

  return (
    <div className={`rounded-2xl p-5 border ${s.bg} transition-shadow hover:shadow-md`}>
      <div className="flex items-center justify-between mb-3">
        <Icon className={`h-7 w-7 ${s.text}`} />
        <div className={`h-3 w-3 rounded-full ${s.dot}`} />
      </div>
      <p className="text-2xl font-bold text-foreground">
        {value}
        {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

export default HealthCard;
