import { Food } from "@/data/foods";
import { SatietyBadge } from "./SatietyBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Info } from "lucide-react";

interface FoodCardProps {
  food: Food;
  index: number;
}

export function FoodCard({ food, index }: FoodCardProps) {
  return (
    <Card 
      className="overflow-hidden animate-fade-in border-0 shadow-sm hover:shadow-md transition-shadow duration-200"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-lg text-foreground leading-tight">
            {food.potravina}
          </h3>
          <SatietyBadge level={food.sytost} />
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 bg-secondary rounded-lg px-3 py-1.5">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="font-bold text-foreground">{food.kcal}</span>
            <span className="text-sm text-muted-foreground">kcal / 100g</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-secondary-foreground">Proč sytí: </span>
            {food.typSytosti || "—"}
          </p>
          
          {food.poznamka && (
            <p className="text-sm text-muted-foreground flex items-start gap-1.5">
              <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary/60" />
              <span className="italic">{food.poznamka}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
