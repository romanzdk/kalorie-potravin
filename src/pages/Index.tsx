import { useState, useMemo, useRef, useEffect } from "react";
import { foods, categories, categoryEmojis } from "@/data/foods";
import { searchMatch } from "@/lib/search";
import { SearchHeader } from "@/components/SearchHeader";
import { CategorySection } from "@/components/CategorySection";
import { Utensils, Search, Flame, Mail, Database, Heart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [closedCategories, setClosedCategories] = useState<Set<string>>(() => new Set());
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--sticky-h", `${el.offsetHeight}px`);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const setCategoryOpen = (category: string, open: boolean) => {
    setClosedCategories((prev) => {
      const next = new Set(prev);
      if (open) next.delete(category);
      else next.add(category);
      return next;
    });
  };

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

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(`category-${category}`);
    if (element) {
      setCategoryOpen(category, true);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter categories that have results
  const visibleCategories = categories.filter(cat => groupedFoods[cat]?.length > 0);

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

      <div ref={stickyRef} className="sticky top-0 z-20">
      <SearchHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultCount={filteredFoods.length}
      />

      {/* Category Navigation */}
      {hasResults && (
        <div className="bg-background/95 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-lg md:max-w-3xl lg:max-w-6xl mx-auto px-4 py-2">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide md:flex-wrap md:justify-center md:overflow-visible">
              {visibleCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => scrollToCategory(category)}
                  className="flex items-center gap-1 min-h-11 px-3 py-1.5 text-xs font-medium bg-muted/50 hover:bg-muted rounded-full whitespace-nowrap transition-colors"
                >
                  <span>{categoryEmojis[category]}</span>
                  <span className="text-muted-foreground">{category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Food List */}
      <main className="max-w-lg md:max-w-3xl lg:max-w-6xl mx-auto px-4 py-6">
        {hasResults ? (
          categories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              foods={groupedFoods[category]}
              id={`category-${category}`}
              isOpen={!closedCategories.has(category)}
              onOpenChange={(open) => setCategoryOpen(category, open)}
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

        <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* Legend - Sytost */}
        <div className="p-4 bg-card rounded-xl border border-border/50">
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
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-satiety-very-low"></span>
              <span className="text-muted-foreground">Velmi nízká</span>
            </div>
          </div>
        </div>

        {/* Legend - Kalorie */}
        <div className="p-4 bg-card rounded-xl border border-border/50">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Flame className="h-4 w-4 text-muted-foreground" />
            Legenda kalorií
          </h3>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-satiety-high"></span>
              <span className="text-muted-foreground">0–100</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-satiety-medium"></span>
              <span className="text-muted-foreground">101–300</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-satiety-low"></span>
              <span className="text-muted-foreground">301+</span>
            </div>
          </div>
        </div>
        </div>

        {/* FAQ Footer */}
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq" className="border-border/50">
              <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground py-3">
                Často kladené otázky
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Heart className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Proč jsem appku vytvořil</p>
                      <p className="text-muted-foreground">Pro rodiče, aby pro ně bylo jednodušší jíst zdravěji</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Zdroj dat</p>
                      <p className="text-muted-foreground">Vygenerováno AI (Gemini 3, 12/2025), hodnoty jsou orientační</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Kontakt na vývojáře</p>
                      <a 
                        href="mailto:romanzdk@gmail.com" 
                        className="text-primary hover:underline"
                      >
                        romanzdk@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Footer */}
        <footer className="mt-4 pb-8 space-y-2 text-center text-xs text-muted-foreground">
          <p>
            Hodnoty na 100 g jsou orientační. Data vygenerovala AI (Gemini 3, 12/2025)
            a nebyla ověřena v oficiální databázi potravin. Nenahrazují radu lékaře ani dietologa.
          </p>
          <p>
            Web provozuje Roman Žydyk,{" "}
            <a href="mailto:romanzdk@gmail.com" className="text-primary underline">romanzdk@gmail.com</a>.
            {" "}Jen kvůli měření návštěvnosti používáme službu{" "}
            <a href="https://www.goatcounter.com/help/privacy" className="text-primary underline">GoatCounter</a>
            {" "}jako zpracovatele, bez cookies.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
