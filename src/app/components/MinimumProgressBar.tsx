import { Link } from "react-router";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const MINIMUM_PACKS = 4;

export function MinimumProgressBar() {
  const { getTotalPacks } = useCart();
  const totalPacks = getTotalPacks();
  const progress = Math.min((totalPacks / MINIMUM_PACKS) * 100, 100);
  const remaining = Math.max(MINIMUM_PACKS - totalPacks, 0);
  const done = remaining === 0;

  if (totalPacks === 0) return null;

  const cartBtnClass = "flex items-center justify-center w-8 h-8 rounded-lg border-1 transition-colors " +
    (done ? "border-gray-400 bg-gray-100 hover:bg-gray-200" : "border-gray-300 bg-gray-50 hover:bg-gray-100");
  const cartIconClass = "h-4 w-4 " + (done ? "text-black" : "text-gray-500");

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white rounded-xl border shadow-md px-4 py-2.5 flex items-center gap-3 whitespace-nowrap">
        <span className="text-gray-600">
          {totalPacks} de {MINIMUM_PACKS} packs
        </span>
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black rounded-full transition-all duration-300"
            style={{ width: progress + "%" }}
          />
        </div>
        {done ? (
          <span className="text-black flex items-center gap-1">
            <Check className="h-4 w-4" />
            <span className="hidden sm:inline">Minimo cumplido</span>
            <span className="sm:hidden">Listo</span>
          </span>
        ) : (
          <span className="text-gray-600">
            Te falta {remaining} pack{remaining !== 1 ? "s" : ""}
          </span>
        )}
        <Link to="/cart" aria-label="Ir al carrito" className={cartBtnClass}>
          <ShoppingCart className={cartIconClass} />
        </Link>
      </div>
    </div>
  );
}
