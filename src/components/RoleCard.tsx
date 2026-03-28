import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface RoleCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
  colorClass: string;
  selected: boolean;
  onClick: () => void;
}

const RoleCard = ({ icon: Icon, label, description, colorClass, selected, onClick }: RoleCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer",
        "hover:scale-105 hover:shadow-lg",
        selected
          ? `${colorClass} border-current shadow-xl scale-105`
          : "border-border bg-card hover:border-muted-foreground/30"
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300",
          selected ? "bg-card/20" : "bg-secondary"
        )}
      >
        <Icon className={cn("h-8 w-8 transition-colors", selected ? "text-card" : colorClass)} />
      </div>
      <span className={cn("font-display text-lg font-bold transition-colors", selected ? "text-card" : "text-foreground")}>
        {label}
      </span>
      <span className={cn("text-sm text-center transition-colors", selected ? "text-card/80" : "text-muted-foreground")}>
        {description}
      </span>
    </button>
  );
};

export default RoleCard;
