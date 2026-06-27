import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { MinimumProgressBar } from "../components/MinimumProgressBar";
import { products } from "../data/products";

type CategoryKey =
  | "all"
  | "pastas"
  | "ravioles"
  | "sorrentinos-capeletti"
  | "noquis"
  | "fideos"
  | "tapas"
  | "tapas-empanadas"
  | "tapas-copetin"
  | "tapas-pascualinas"
  | "tortillas"
  | "empanadas-rellenas"
  | "especiales";

type DietaryFilter = "vegano" | "vegetariano" | "sin-tacc" | "integral" | "sin-sal";

const categoryTitles: Record<CategoryKey, string> = {
  all: "Todos los productos",
  pastas: "Pastas",
  ravioles: "Ravioles",
  "sorrentinos-capeletti": "Sorrentinos y Capeletti",
  noquis: "Ñoquis",
  fideos: "Fideos",
  tapas: "Tapas",
  "tapas-empanadas": "Tapas para empanadas",
  "tapas-copetin": "Tapas para copetín y pastelitos",
  "tapas-pascualinas": "Tapas para pascualinas",
  tortillas: "Tortillas",
  "empanadas-rellenas": "Empanadas rellenas",
  especiales: "Especiales",
};

const categoryGroups: Partial<Record<CategoryKey, string[]>> = {
  pastas: ["ravioles", "sorrentinos-capeletti", "noquis", "fideos"],
  tapas: ["tapas-empanadas", "tapas-copetin", "tapas-pascualinas", "tortillas"],
};

const dietaryChips: { key: DietaryFilter; label: string }[] = [
  { key: "sin-tacc", label: "Sin TACC" },
  { key: "vegano", label: "Vegano" },
  { key: "vegetariano", label: "Vegetariano" },
  { key: "integral", label: "Integral" },
  { key: "sin-sal", label: "Sin sal" },
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
    return productsInCategory.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDietary =
        dietaryFilters.length === 0 ||
        dietaryFilters.every((f) => product.dietary.includes(f as any));
      return matchesSearch && matchesDietary;
    });
  }, [productsInCategory, searchTerm, dietaryFilters]);

  const toggleDietary = (filter: DietaryFilter) => {
    setDietaryFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const pageTitle = categoryTitles[categoryParam] ?? "Todos los productos";
  const visibleChips = dietaryChips.filter(({ key }) => availableFilters.has(key));
  const allActive = dietaryFilters.length === 0;

  return (
    <div className="min-h-screen bg-white pb-24">
      <Navbar onSearchChange={setSearchTerm} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-black mb-6">{pageTitle}</h1>

        {/* Filtros: Todos + dietarios disponibles */}
        <div className="mb-8 flex flex-wrap gap-2">
          {/* Chip "Todos" — siempre visible, activo cuando no hay filtros */}
          <button
            onClick={() => setDietaryFilters([])}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              allActive
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-500 hover:text-black"
            }`}
          >
            Todos
          </button>

          {/* Chips dietarios — solo los que aplican a esta categoría */}
          {visibleChips.map(({ key, label }) => {
            const active = dietaryFilters.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleDietary(key)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  active
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-500 hover:text-black"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm">
              No se encontraron productos con los filtros seleccionados
            </p>
          </div>
        )}
      </div>

      <MinimumProgressBar />
    </div>
  );
}
