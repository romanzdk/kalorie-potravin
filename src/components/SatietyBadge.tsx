import { cn } from "@/lib/utils";

interface SatietyBadgeProps {
  level: string;
  className?: string;
}

export function SatietyBadge({ level, className }: SatietyBadgeProps) {
  const getSatietyClass = (level: string) => {
    switch (level) {
      case "Velmi vysoká":
        return "satiety-very-high";
      case "Vysoká":
        return "satiety-high";
      case "Střední":
        return "satiety-medium";
      case "Nízká":
        return "satiety-low";
      case "Velmi nízká":
        return "satiety-very-low";
      default:
        return "satiety-medium";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold",
        getSatietyClass(level),
        className
      )}
    >
      {level}
    </span>
  );
}
