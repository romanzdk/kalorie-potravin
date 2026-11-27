import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

export function SearchHeader({ searchQuery, onSearchChange, resultCount }: SearchHeaderProps) {
  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            aria-label="Hledat potraviny"
            placeholder="Hledat potraviny... (např. rajče, kure)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 h-12 text-base bg-secondary border-0 focus-visible:ring-2 focus-visible:ring-primary/30"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              aria-label="Vymazat hledání"
              onClick={() => onSearchChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Nalezeno <span className="font-semibold text-foreground">{resultCount}</span> potravin
          </p>
        )}
      </div>
    </header>
  );
}
