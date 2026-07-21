import { Link } from "react-router";
import { Product, dietaryLabels, formatWeight } from "../data/products";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

// Un solo badge visible por card, en orden de prioridad
const badgePriority: (keyof typeof dietaryLabels)[] = [
  "premium",
  "congelado",
  "sin-tacc",
  "vegano",
  "vegetariano",
  "integral",
  "sin-sal",
];

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, updateQuantity, items, getTotalPacks } = useCart();
  const cartItem = items.find((i) => i.id === product.id);
  const packPrice = product.pricePerUnit * product.unitsPerPack;
  const badgeTag = badgePriority.find((tag) => product.dietary.includes(tag));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.pricePerUnit,
      unitsPerPack: product.unitsPerPack,
    });
    const newTotal = getTotalPacks() + 1;
    const remaining = Math.max(4 - newTotal, 0);
    if (remaining === 0) {
      toast.success(product.name + " agregado · Mínimo cumplido");
    } else {
      toast.success(product.name + " agregado · " + remaining + " pack" + (remaining === 1 ? "" : "s") + " para el mínimo");
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem) updateQuantity(product.id, cartItem.quantity - 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.pricePerUnit,
      unitsPerPack: product.unitsPerPack,
    });
  };

  return (
    <Link to={"/product/" + product.id} className="block group h-full">
      <div className="h-full flex flex-col border border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
        {/* Imagen placeholder */}
        <div className="aspect-square bg-gray-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Imagen</span>
          </div>
          {badgeTag && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-white text-black text-xs border border-gray-200">
                {dietaryLabels[badgeTag]}
              </Badge>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-3 flex flex-col flex-1">
          <h3 className="font-normal text-black mb-1 text-base leading-snug line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {formatWeight(product.weightGrams)}
            {product.pieceCount ? ` · ${product.pieceCount} unidades` : ""} · pack x{product.unitsPerPack}
          </p>
          <div className="mb-3 mt-auto">
            <p className="text-xl font-medium text-black leading-tight">
              ${packPrice.toLocaleString("es-AR")}
              <span className="text-xs font-normal text-gray-500 ml-1">el pack</span>
            </p>
            <p className="text-sm text-gray-500 truncate mt-0.5">
              ${product.pricePerUnit.toLocaleString("es-AR")} por unidad
            </p>
          </div>

          {cartItem ? (
            <div
              className="h-10 flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden"
              onClick={(e) => e.preventDefault()}
            >
              <button
                className="px-3 h-full text-gray-700 hover:bg-gray-100 transition-colors font-medium text-lg leading-none"
                onClick={handleDecrement}
                aria-label="Quitar pack"
              >
                &minus;
              </button>
              <span className="font-semibold text-black text-sm">{cartItem.quantity}</span>
              <button
                className="px-3 h-full text-gray-700 hover:bg-gray-100 transition-colors font-medium text-lg leading-none"
                onClick={handleIncrement}
                aria-label="Agregar pack"
              >
                +
              </button>
            </div>
          ) : (
            <Button
              className="w-full h-10 bg-black text-white hover:bg-gray-800 text-sm"
              onClick={handleAddToCart}
            >
              Agregar
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}
