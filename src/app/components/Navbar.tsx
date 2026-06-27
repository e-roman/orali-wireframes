import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, User, ChevronDown, Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useCart } from "../context/CartContext";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

// Sub-item: if href is absent, renders as a non-clickable section header
interface SubItem {
  label: string;
  href?: string;
  indent?: boolean; // visually indent under a section header
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  sub: SubItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "pastas",
    label: "Pastas",
    href: "/catalog?category=pastas",
    sub: [
      { label: "Ravioles", href: "/catalog?category=ravioles" },
      { label: "Sorrentinos y Capeletti", href: "/catalog?category=sorrentinos-capeletti" },
      { label: "Ñoquis", href: "/catalog?category=noquis" },
      { label: "Fideos", href: "/catalog?category=fideos" },
    ],
  },
  {
    id: "tapas",
    label: "Tapas",
    href: "/catalog?category=tapas",
    sub: [
      { label: "Para empanadas", href: "/catalog?category=tapas-empanadas" },
      { label: "Para copetín y pastelitos", href: "/catalog?category=tapas-copetin" },
      { label: "Para pascualinas", href: "/catalog?category=tapas-pascualinas" },
      { label: "Tortillas", href: "/catalog?category=tortillas" },
    ],
  },
  {
    id: "empanadas",
    label: "Empanadas rellenas",
    href: "/catalog?category=empanadas-rellenas",
    sub: [],
  },
  {
    id: "especiales",
    label: "Especiales",
    href: "/catalog?category=especiales",
    sub: [],
  },
];

// Mobile drawer: flat list of all sub-categories for quick access
const mobileCatalogTree = [
  {
    group: "Pastas",
    href: "/catalog?category=pastas",
    items: [
      { label: "Ravioles", href: "/catalog?category=ravioles" },
      { label: "Sorrentinos y Capeletti", href: "/catalog?category=sorrentinos-capeletti" },
      { label: "Ñoquis", href: "/catalog?category=noquis" },
      { label: "Fideos", href: "/catalog?category=fideos" },
    ],
  },
  {
    group: "Tapas",
    href: "/catalog?category=tapas",
    items: [
      { label: "Para empanadas", href: "/catalog?category=tapas-empanadas" },
      { label: "Para copetín y pastelitos", href: "/catalog?category=tapas-copetin" },
      { label: "Para pascualinas", href: "/catalog?category=tapas-pascualinas" },
      { label: "Tortillas", href: "/catalog?category=tortillas" },
    ],
  },
  {
    group: "Empanadas rellenas",
    href: "/catalog?category=empanadas-rellenas",
    items: [],
  },
  {
    group: "Especiales",
    href: "/catalog?category=especiales",
    items: [],
  },
];

interface NavbarProps {
  onSearchChange?: (value: string) => void;
}

export function Navbar({ onSearchChange }: NavbarProps) {
  const { getTotalPacks } = useCart();
  const totalPacks = getTotalPacks();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (location.pathname === "/catalog") {
      onSearchChange?.(value);
    } else if (value.length > 0) {
      navigate(`/catalog?search=${encodeURIComponent(value)}`);
    }
  };

  return (
    <nav className="border-b border-gray-300 bg-white sticky top-0 z-40" ref={navRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-6">
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-700 hover:text-black transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl font-semibold text-black flex-shrink-0 mr-2">
            Orali
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5 flex-shrink-0">
            {menuItems.map((item) => (
              <div key={item.id} className="relative">
                {item.sub.length > 0 ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      onClick={() =>
                        setOpenMenu(openMenu === item.id ? null : item.id)
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${
                          openMenu === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openMenu === item.id && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[220px] py-1.5 z-50">
                        {item.sub.map((sub, idx) =>
                          !sub.href ? (
                            // Section header (non-clickable)
                            <p
                              key={`header-${idx}`}
                              className="px-4 pt-2 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
                            >
                              {sub.label}
                            </p>
                          ) : (
                            // Clickable link
                            <Link
                              key={sub.href}
                              to={sub.href}
                              className={`block py-1.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors ${
                                sub.indent ? "px-7" : "px-4"
                              }`}
                              onClick={() => setOpenMenu(null)}
                            >
                              {sub.label}
                            </Link>
                          )
                        )}

                        {/* "Ver todos" al final */}
                        <div className="border-t border-gray-100 my-1" />
                        <Link
                          to={item.href}
                          className="block px-4 py-1.5 text-xs text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
                          onClick={() => setOpenMenu(null)}
                        >
                          Ver todos
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-3 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="pl-9 bg-gray-50 border-gray-300 h-9 text-sm"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4 ml-auto">
            <Link
              to="/account"
              className="text-gray-500 hover:text-black transition-colors hidden md:block"
              aria-label="Mi cuenta"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link to="/cart" className="relative text-gray-700 hover:text-black transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalPacks > 0 && (
                <span className="absolute -right-2 -top-2 h-4 w-4 flex items-center justify-center text-[10px] font-semibold bg-black text-white rounded-full">
                  {totalPacks}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search row */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="pl-9 bg-gray-50 border-gray-300 h-9 text-sm w-full"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="px-5 py-4 border-b border-gray-200">
            <SheetTitle className="text-left text-lg font-semibold text-black">Orali</SheetTitle>
          </SheetHeader>

          <div className="py-3 overflow-y-auto">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
            >
              Inicio
            </Link>

            <div className="border-t border-gray-100 mt-2 pt-2">
              <p className="px-5 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Catálogo
              </p>
              {mobileCatalogTree.map((group) => (
                <div key={group.group}>
                  <Link
                    to={group.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-black transition-colors"
                  >
                    {group.group}
                  </Link>
                  {group.items.length > 0 && (
                    <div className="pl-4 ml-5 border-l border-gray-100 mb-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 px-3 text-sm text-gray-500 hover:text-black transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-3 pt-3 px-5 space-y-1">
              <Link
                to="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-2.5 text-sm text-gray-700 hover:text-black transition-colors"
              >
                <User className="h-4 w-4" />
                Mi cuenta
              </Link>
            </div>

            <div className="px-5 pt-4">
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between w-full bg-black text-white text-sm font-medium px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <span>Carrito</span>
                {totalPacks > 0 && (
                  <span className="bg-white text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalPacks}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
