# Sytost na Dosah

Vytvoř moderní, "mobile-first" webovou aplikaci, která slouží jako "Průvodce energetickou hodnotou a sytostí potravin". Design musí být čistý, minimalistický a 100% responzivní, s hlavním důrazem na perfektní čitelnost na mobilním telefonu.

### Hlavní požadavky na UI:
1. **Jazyk:** Celé rozhraní aplikace (tlačítka, nadpisy, placeholder texty) musí být v **češtině**.
2. **Rozložení:** Použij rozložení typu "Karty" (Card layout) pro seznam potravin. Nepoužívej široké tabulky, které se na mobilu špatně čtou.
3. **Vizuální styl:** Hodně bílého místa (whitespace), velké čitelné písmo.
4. **Barevné kódování:** Použij barvy pro indikaci "Úrovně sytosti" (např. Zelená pro "Vysoká/Velmi vysoká", Žlutá pro "Střední", Červená/Oranžová pro "Nízká").

### Funkcionalita:
1. **Vyhledávání (Sticky Header):**
   - Umísti velké vyhledávací pole fixně na horní část obrazovky (sticky), aby bylo vždy po ruce.
   - **KRITICKY DŮLEŽITÉ:** Vyhledávání musí být **necitlivé na diakritiku (háčky/čárky) a velikost písmen**.
   - Logika: Když uživatel napíše "rajce", musí to najít "Rajče". Když napíše "kure", najde to "Kuřecí".

2. **Seznam potravin:**
   - Seskup potraviny podle jejich kategorie (např. Zelenina, Ovoce, Maso...).
   - Každá karta potraviny musí obsahovat:
     - **Název:** Tučně a velkým písmem.
     - **Kcal:** Výrazně zobrazeno (např. "52 kcal / 100g").
     - **Štítek sytosti:** Barevný odznak s textem (např. "Vysoká").
     - **Důvod sytosti:** Menším písmem pod tím (např. "Vláknina + Objem").

Data jsou přiložena v souboru `data.csv`.

Ujisti se, že aplikace vypadá profesionálně, kód je bez chyb a vše funguje plynule.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kalorie-potravin.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/93a85364-9cc6-45f0-bd73-9ec3c6b72981).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
