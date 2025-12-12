import { Food, categoryEmojis } from "@/data/foods";
import { FoodCard } from "./FoodCard";

interface CategorySectionProps {
  category: string;
  foods: Food[];
}

export function CategorySection({ category, foods }: CategorySectionProps) {
  if (foods.length === 0) return null;

  const emoji = categoryEmojis[category] || "📦";

  return (
    <section className="mb-8">
      <div className="sticky top-[72px] z-10 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 mb-4 border-b border-border/50">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          {category}
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({foods.length})
          </span>
        </h2>
      </div>
      
      <div className="grid gap-3">
        {foods.map((food, index) => (
          <FoodCard key={food.potravina} food={food} index={index} />
        ))}
      </div>
    </section>
  );
}
