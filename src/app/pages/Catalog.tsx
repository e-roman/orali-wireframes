import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { ChevronRight, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { MinimumProgressBar } from "../components/MinimumProgressBar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import { products } from "../data/products";

type CategoryKey =
  | "all" | "pastas" | "ravioles" | "sorrentinos-capeletti" | "noquis" | "fideos"
  | "tapas" | "tapas-empanadas" | "tapas-copetin" | "tapas-pascualinas"
  | "tortillas" | "empanadas-rellenas" | "especiales";

type DietaryFilter = "vegano" | "vegetariano" | "sin-tacc" | "integral" | "sin-sal";
type SortKey = "relevance" | "price-asc" | "price-desc" | "name-asc";

const categoryTitles: Record<CategoryKey, string> = {
  all: "Todos los productos",
  pastas: "Pastas",
  ravioles: "Ravioles",
  "sorrentinos-capeletti": "Sorrentinos y Capeletti",
  noquis: "Noquis",
  fideos: "Fideos",
  tapas: "Tapas",
  "tapas-empanadas": "Tapas para empanadas",
  "tapas-copetin": "Tapas para copetin y pastelitos",
  "tapas-pascualinas": "Tapas para pascualinas",
  tortillas: "Tortillas",
  "empanadas-rellenas": "Empanadas rellenas",
  especiales: "Especiales",
};

const categoryGroups: Partial<Record<CategoryKey, string[]>> = {
  pastas: ["ravioles", "sorrentinos-capeletti", "noquis", "fideos"],
  tapas: ["tapas-empanadas", "tapas-copetin", "tapas-pascualinas", "tortillas"],
};

const categoryAliases: Record<string, string[]> = {
  ravioles: ["ravioles", "pasta", "pastas"],
  "sorrentinos-capeletti": ["sorrentinos", "capeletti", "pasta", "pastas"],
  noquis: ["noquis", "gnocchi", "pasta", "pastas"],
  fideos: ["fideos", "fettuccine", "tallarines", "pasta", "pastas"],
  "tapas-empanadas": ["tapas", "empanadas", "tapa empanada"],
  "tapas-copetin": ["tapas", "copetin", "copetines", "pastelitos"],
  "tapas-pascualinas": ["tapas", "pascualinas", "pascualina"],
  tortillas: ["tortillas", "tortilla"],
  "empanadas-rellenas": ["empanadas", "rellenas", "empanada"],
  especiales: ["especiales", "especial"],
};

const parentCategory: Partial<Record<CategoryKey, CategoryKey>> = {
  ravioles: "pastas",
  "sorrentinos-capeletti": "pastas",
  noquis: "pastas",
  fideos: "pastas",
  "tapas-empanadas": "tapas",
  "tapas-copetin": "tapas",
  "tapas-pascualinas": "tapas",
  tortillas: "tapas",
};

const dietaryChips: { key: DietaryFilter; label: string }[] = [
  { key: "sin-tacc", label: "Sin TACC" },
  { key: "vegano", label: "Vegano" },
  { key: "vegetariano", label: "Vegetariano" },
  { key: "integral", label: "Integral" },
  { key: "sin-sal", label: "Sin sal" },
];

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Mas vendidos" },
  { key: "price-asc", label: "Menor precio" },
  { key: "price-desc", label: "Mayor precio" },
  { key: "name-asc", label: "A-Z" },
];

function matchesCategory(productCategory: string, categoryParam: CategoryKey): boolean {
  if (categoryParam === "all") return true;
  if (productCategory === categoryParam) return true;
  const group = categoryGroups[categoryParam];
  return group !== undefined && group.includes(productCategory);
}

export function Catalog() {
  const [searchParams] = useSearchParams();
  const categoryParam = (searchParams.get("category") as CategoryKey) || "all";
  const searchFromUrl = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  const [dietaryFilters, setDietaryFilters] = useState<DietaryFilter[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("relevance");
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [sortSheetOpen, setSortSheetOpen] = useState(false);

  useEffect(() => {
    if (searchFromUrl) setSearchTerm(searchFromUrl);
  }, [searchFromUrl]);

  const productsInCategory = useMemo(
    () => products.filter((p) => matchesCategory(p.category, categoryParam)),
    [categoryParam]
  );

  const availableFilters = useMemo<Set<DietaryFilter>>(() => {
    const tags = new Set<DietaryFilter>();
    productsInCategory.forEach((p) =>
      p.dietary.forEach((d) => tags.add(d as DietaryFilter))
    );
    return tags;
  }, [productsInCategory]);

  useEffect(() => {
    setDietaryFilters((prev) => prev.filter((f) => availableFilters.has(f)));
  }, [categoryParam]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return productsInCategory.filter((product) => {
      const matchesSearch =
        q === "" ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        (categoryAliases[product.category] ?? []).some((alias) =>
          alias.toLowerCase().includes(q)
        );
      const matchesDietary =
        dietaryFilters.length === 0 ||
        dietaryFilters.every((f) => product.dietary.includes(f as any));
      return matchesSearch && matchesDietary;
    });
  }, [productsInCategory, searchTerm, dietaryFilters]);

  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    if (sortKey === "price-asc") return arr.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
    if (sortKey === "price-desc") return arr.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
    if (sortKey === "name-asc") return arr.sort((a, b) => a.name.localeCompare(b.name, "es"));
    return arr;
  }, [filteredProducts, sortKey]);

  const toggleDietary = (filter: DietaryFilter) => {
    setDietaryFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const pageTitle = categoryTitles[categoryParam] ?? "Todos los productos";
  const visibleChips = dietaryChips.filter(({ key }) => availableFilters.has(key));
  const allActive = dietaryFilters.length === 0;
  const parent = parentCategory[categoryParam];
  const currentSort = sortOptions.find((o) => o.key === sortKey);

  return (
    <div className="min-h-screen bg-white pb-24">
      <Navbar onSearchChange={setSearchTerm} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumbs */}
        {categoryParam !== "all" && (
          <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-3">
            <Link to="/catalog" className="hover:text-black transition-colors">Catalogo</Link>
            {parent && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link to={"/catalog?category=" + parent} className="hover:text-black transition-colors">
                  {categoryTitles[parent]}
                </Link>
              </>
            )}
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-black font-medium">{pageTitle}</span>
          </nav>
        )}

        <h1 className="text-3xl font-bold text-black mb-6">{pageTitle}</h1>

        {/* Filtros — Desktop */}
        <div className="hidden md:flex mb-8 flex-wrap items-center gap-2">
          <button
            onClick={() => setDietaryFilters([])}
            className={"px-4 py-1.5 rounded-full text-sm border transition-colors " +
              (allActive
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-500 hover:text-black")}
          >
            Todos
          </button>
          {visibleChips.map(({ key, label }) => {
            const active = dietaryFilters.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleDietary(key)}
                className={"px-4 py-1.5 rounded-full text-sm border transition-colors " +
                  (active
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-500 hover:text-black")}
              >
                {label}
              </button>
            );
          })}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-500 whitespace-nowrap">Ordenar por</span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="text-sm border border-gray-300 rounded-lg pl-3 pr-8 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtros — Mobile: 2 botones */}
        <div className="md:hidden mb-6 flex gap-2">
          <button
            onClick={() => setFilterSheetOpen(true)}
            className={"flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border text-sm font-medium transition-colors " +
              (dietaryFilters.length > 0
                ? "border-gray-800 bg-gray-800 text-white"
                : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50")}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {dietaryFilters.length > 0 && (
              <span className="bg-white text-gray-800 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {dietaryFilters.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setSortSheetOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowUpDown className="h-4 w-4" />
            {currentSort ? currentSort.label : "Ordenar"}
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm">
              No se encontraron productos con los filtros seleccionados
            </p>
          </div>
        )}
      </div>

      <MinimumProgressBar />

      {/* Sheet Filtros — Mobile */}
      <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl pb-8">
          <SheetHeader className="mb-5">
            <SheetTitle className="text-left text-base font-semibold">Filtros</SheetTitle>
          </SheetHeader>
          <div className="px-4 flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setDietaryFilters([])}
              className={"px-4 py-2 rounded-full text-sm border transition-colors " +
                (allActive
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-600 border-gray-300")}
            >
              Todos
            </button>
            {visibleChips.map(({ key, label }) => {
              const active = dietaryFilters.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleDietary(key)}
                  className={"px-4 py-2 rounded-full text-sm border transition-colors " +
                    (active
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-white text-gray-600 border-gray-300")}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="px-4">
            <Button
              className="w-full bg-black text-white hover:bg-gray-800 h-11"
              onClick={() => setFilterSheetOpen(false)}
            >
              Ver {sortedProducts.length} resultado{sortedProducts.length !== 1 ? "s" : ""}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sheet Ordenar — Mobile */}
      <Sheet open={sortSheetOpen} onOpenChange={setSortSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl pb-8">
          <SheetHeader className="mb-5">
            <SheetTitle className="text-left text-base font-semibold">Ordenar por</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-1">
            {sortOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => { setSortKey(option.key); setSortSheetOpen(false); }}
                className={"w-full text-left px-4 py-3 rounded-lg text-sm transition-colors " +
                  (sortKey === option.key
                    ? "bg-gray-100 font-semibold text-black"
                    : "text-gray-700 hover:bg-gray-50")}
              >
                {option.label}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
