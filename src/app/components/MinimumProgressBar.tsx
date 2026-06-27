import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { Progress } from "./ui/progress";

const MINIMUM_PACKS = 4;

export function MinimumProgressBar() {
  const { getTotalPacks } = useCart();
  const totalPacks = getTotalPacks();
  const progress = Math.min((totalPacks / MINIMUM_PACKS) * 100, 100);
  const remaining = Math.max(MINIMUM_PACKS - totalPacks, 0);

  if (totalPacks === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 shadow-lg z-50">
      <div className="mx-auto max-w-7xl flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5 text-sm">
            <span className="text-gray-700">
              {totalPacks} de {MINIMUM_PACKS} packs
              {remaining > 0 && ` · Te falta${remaining === 1 ? "" : "n"} ${remaining} pack${remaining === 1 ? "" : "s"}`}
              {remaining === 0 && " · ✓ Mínimo cumplido"}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
        <Link
          to="/cart"
          className="flex-shrink-0 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Ver carrito
        </Link>
      </div>
    </div>
  );
}
