import { Food, categoryEmojis } from "@/data/foods";
import { FoodCard } from "./FoodCard";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface CategorySectionProps {
  category: string;
  foods: Food[];
  id?: string;
}

export function CategorySection({ category, foods, id }: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (foods.length === 0) return null;

  const emoji = categoryEmojis[category] || "📦";

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-8" id={id}>
      <div className="sticky top-[72px] z-10 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 mb-4 border-b border-border/50">
        <CollapsibleTrigger className="w-full flex items-center justify-between hover:opacity-80 transition-opacity">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            {category}
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({foods.length})
            </span>
          </h2>
          <ChevronDown 
            className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`} 
          />
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent>
        <div className="grid gap-3">
          {foods.map((food, index) => (
            <FoodCard key={food.potravina} food={food} index={index} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
