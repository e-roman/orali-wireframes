import { Link } from "react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useCart } from "../context/CartContext";

const MINIMUM_PACKS = 4;

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

function ProductImagePlaceholder() {
  return (
    <div className="w-16 h-16 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
      <svg viewBox="0 0 64 64" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" fill="#f3f4f6" />
        <line x1="0" y1="0" x2="64" y2="64" stroke="#d1d5db" strokeWidth="1" />
        <line x1="64" y1="0" x2="0" y2="64" stroke="#d1d5db" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, updateQuantity, getTotalPacks, getSubtotal } = useCart();
  const totalPacks = getTotalPacks();
  const totalUnitsAll = items.reduce((acc, i) => acc + i.quantity * i.unitsPerPack, 0);
  const progress = Math.min((totalPacks / MINIMUM_PACKS) * 100, 100);
  const remaining = Math.max(MINIMUM_PACKS - totalPacks, 0);
  const subtotal = getSubtotal();
  const minimumMet = totalPacks >= MINIMUM_PACKS;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-[100%] sm:w-[460px] flex flex-col p-0">

        <SheetHeader className="px-5 py-4 border-b border-gray-200">
          <SheetTitle className="text-left text-lg font-semibold text-black">
            Mi carrito
          </SheetTitle>
        </SheetHeader>

        {items.length > 0 && (
          <div className="rounded-md p-3.5 mb-4 bg-gray-50 border border-gray-200 mx-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-black">
                {remaining > 0
                  ? "Faltan " + remaining + " pack" + (remaining !== 1 ? "s" : "") + " para el pedido minimo"
                  : "Pedido minimo alcanzado"}
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-300"
                style={{ width: progress + "%" }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-1.5">
              {totalPacks} de {MINIMUM_PACKS} packs · {totalUnitsAll} unidades
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
              <ShoppingBag className="h-12 w-12 text-gray-200 mb-4" />
              <p className="text-base text-gray-400 mb-4">Tu carrito esta vacio</p>
              <button
                onClick={onClose}
                className="text-base text-black font-medium underline underline-offset-2"
              >
                Seguir eligiendo
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {items.map((item) => {
                const packPrice = item.price * item.unitsPerPack;
                const totalUnits = item.quantity * item.unitsPerPack;
                return (
                  <div key={item.id} className="flex gap-3 px-5 py-4">
                    <ProductImagePlaceholder />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-base font-medium text-black leading-snug">{item.name}</p>
                        <button
                          className="text-gray-300 hover:text-gray-600 transition-colors shrink-0 mt-0.5"
                          onClick={() => updateQuantity(item.id, 0)}
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-400 mt-0.5">
                        {totalUnits} unidades de {item.unitsPerPack}ml
                      </p>
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Quitar pack"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 text-base font-semibold text-black min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Agregar pack"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-base font-semibold text-black">
                          ${(packPrice * item.quantity).toLocaleString("es-AR")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 pt-4 pb-5 space-y-3">
            <div className="flex justify-between text-base">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-black">${subtotal.toLocaleString("es-AR")}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-gray-500">Envio</span>
              <span className="text-gray-400 text-sm self-center">Se calcula al finalizar</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-black">Total estimado</span>
              <span className="text-lg font-semibold text-black">
                ${subtotal.toLocaleString("es-AR")}
              </span>
            </div>

            {minimumMet ? (
              <Button
                asChild
                className="w-full bg-black text-white hover:bg-gray-800 h-12 mt-1 text-base"
                onClick={onClose}
              >
                <Link to="/checkout">Finalizar compra</Link>
              </Button>
            ) : (
              <Button disabled className="w-full h-12 mt-1 cursor-not-allowed opacity-50 text-base">
                Finalizar compra
              </Button>
            )}

            <p className={"text-sm text-center font-medium " + (minimumMet ? "text-black" : "text-gray-500")}>
              {minimumMet
                ? "El pedido esta listo para finalizar"
                : "Faltan " + remaining + " pack" + (remaining !== 1 ? "s" : "") + " para poder finalizar la compra"}
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
