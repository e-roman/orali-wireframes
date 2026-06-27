import { Link } from "react-router";
import { Product } from "../data/products";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, updateQuantity, items, getTotalPacks } = useCart();
  const cartItem = items.find((i) => i.id === product.id);
  const packPrice = product.pricePerUnit * product.unitsPerPack;

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
      toast.success(`${product.name} agregado · Mínimo cumplido`);
    } else {
      toast.success(
        `${product.name} agregado · ${remaining} pack${remaining === 1 ? "" : "s"} para el mínimo`
      );
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity - 1);
    }
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
    <Link to={`/product/${product.id}`} className="block group">
      <div className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
        {/* Imagen placeholder */}
        <div className="aspect-square bg-gray-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Imagen</span>
          </div>
          {product.dietary.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.dietary.includes("sin-tacc") && (
                <Badge variant="secondary" className="bg-white text-black text-xs border border-gray-200">
                  Sin TACC
                </Badge>
              )}
              {product.dietary.includes("vegano") && (
                <Badge variant="secondary" className="bg-white text-black text-xs border border-gray-200">
                  Vegano
                </Badge>
              )}
              {product.dietary.includes("vegetariano") && !product.dietary.includes("vegano") && (
                <Badge variant="secondary" className="bg-white text-black text-xs border border-gray-200">
                  Vegetariano
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="font-medium text-black mb-1 text-sm leading-snug">{product.name}</h3>
          <div className="mb-3">
            <p className="text-base font-semibold text-black">
              ${packPrice.toLocaleString("es-AR")}
              <span className="text-xs font-normal text-gray-500 ml-1">el pack</span>
            </p>
            <p className="text-xs text-gray-500">
              ${product.pricePerUnit.toLocaleString("es-AR")} / unidad · Pack x{product.unitsPerPack}
            </p>
          </div>

          {cartItem ? (
            <div
              className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden"
              onClick={(e) => e.preventDefault()}
            >
              <button
                className="px-3 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors font-medium text-lg leading-none"
                onClick={handleDecrement}
                aria-label="Quitar pack"
              >
                −
              </button>
              <span className="font-semibold text-black text-sm">{cartItem.quantity}</span>
              <button
                className="px-3 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors font-medium text-lg leading-none"
                onClick={handleIncrement}
                aria-label="Agregar pack"
              >
                +
              </button>
            </div>
          ) : (
            <Button
              className="w-full bg-black text-white hover:bg-gray-800 text-sm"
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
