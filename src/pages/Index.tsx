import { useState, useMemo } from "react";
import { foods, categories } from "@/data/foods";
import { searchMatch } from "@/lib/search";
import { SearchHeader } from "@/components/SearchHeader";
import { CategorySection } from "@/components/CategorySection";
import { Utensils, Search } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => 
      searchMatch(food.potravina, searchQuery) ||
      searchMatch(food.kategorie, searchQuery)
    );
  }, [searchQuery]);

  const groupedFoods = useMemo(() => {
    const groups: Record<string, typeof foods> = {};
    
    categories.forEach((category) => {
      groups[category] = filteredFoods.filter((food) => food.kategorie === category);
    });
    
    return groups;
  }, [filteredFoods]);

  const hasResults = filteredFoods.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background pt-8 pb-6">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Utensils className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Průvodce sytostí potravin
          </h1>
          <p className="text-muted-foreground text-sm">
            Zjistěte, které potraviny vás zasytí nejvíce
          </p>
        </div>
      </div>

      {/* Search */}
      <SearchHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultCount={filteredFoods.length}
      />

      {/* Food List */}
      <main className="max-w-lg mx-auto px-4 py-6">
        {hasResults ? (
          categories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              foods={groupedFoods[category]}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Žádné výsledky
            </h3>
            <p className="text-muted-foreground text-sm">
              Zkuste jiný hledaný výraz
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 p-4 bg-card rounded-xl border border-border/50">
          <h3 className="font-semibold text-foreground mb-3">Legenda sytosti</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-satiety-very-high"></span>
              <span className="text-muted-foreground">Velmi vysoká</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-satiety-high"></span>
              <span className="text-muted-foreground">Vysoká</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-satiety-medium"></span>
              <span className="text-muted-foreground">Střední</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-satiety-low"></span>
              <span className="text-muted-foreground">Nízká</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pb-8 text-center text-xs text-muted-foreground">
          <p>Hodnoty jsou orientační na 100g/ml potraviny</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
