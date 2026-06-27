import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2, Check, ChevronRight, ShoppingBag } from "lucide-react";

const MINIMUM_PACKS = 4;

export function Cart() {
  const { items, getSubtotal, getTotalPacks, updateQuantity, removeItem } = useCart();

  const subtotal = getSubtotal();
  const totalPacks = getTotalPacks();
  const minimumMet = totalPacks >= MINIMUM_PACKS;
  const remaining = Math.max(MINIMUM_PACKS - totalPacks, 0);
  const progressPct = Math.min((totalPacks / MINIMUM_PACKS) * 100, 100);

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-24 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-200 mx-auto mb-5" />
          <h1 className="text-2xl font-bold text-black mb-3">Tu carrito está vacío</h1>
          <p className="text-gray-500 text-sm mb-8">
            Agregá productos desde el catálogo para comenzar tu pedido.
          </p>
          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link to="/catalog">Ir al catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-black">Mi carrito</h1>
          <Link
            to="/catalog"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            ← Seguir eligiendo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* ── Columna izquierda: productos ── */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {items.map((item) => {
                const packPrice = item.price * item.unitsPerPack;
                return (
                  <div key={item.id} className="flex items-start gap-4 p-5">
                    {/* Imagen placeholder */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide">Img</span>
                      </div>
                    </Link>

                    {/* Nombre y precio unitario */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="font-medium text-black hover:underline text-sm leading-snug"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">
                        ${packPrice.toLocaleString("es-AR")} / pack · {item.unitsPerPack}{" "}
                        {item.unitsPerPack === 1 ? "unidad" : "unidades"} por pack
                      </p>

                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          aria-label="Quitar pack"
                          className="h-8 w-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-semibold text-black w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Agregar pack"
                          className="h-8 w-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-xs text-gray-500 ml-1">
                          pack{item.quantity === 1 ? "" : "s"}
                        </span>
                      </div>
                    </div>

                    {/* Precio total del item + eliminar */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <p className="font-semibold text-black text-sm">
                        ${(packPrice * item.quantity).toLocaleString("es-AR")}
                      </p>
                      <button
                        aria-label="Eliminar producto"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Columna derecha: resumen sticky ── */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold text-black mb-4">Resumen del pedido</h2>

              {/* Líneas de items */}
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate mr-2">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="text-gray-800 flex-shrink-0">
                      ${(item.price * item.unitsPerPack * item.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="mb-4" />

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-black font-medium">
                    ${subtotal.toLocaleString("es-AR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Envío</span>
                  <span className="text-gray-400">A calcular</span>
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="flex justify-between font-bold text-black mb-5">
                <span>Total</span>
                <span>${subtotal.toLocaleString("es-AR")}</span>
              </div>

              {/* Progress mínimo */}
              <div
                className={`rounded-lg p-3.5 mb-4 ${
                  minimumMet ? "bg-gray-50 border border-gray-200" : "bg-gray-50 border border-gray-200"
                }`}
              >
                {minimumMet ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-sm font-medium text-black">Mínimo alcanzado</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-medium text-black">
                        Pedido mínimo: 4 packs
                      </p>
                      <p className="text-xs text-gray-500">
                        {totalPacks}/{MINIMUM_PACKS}
                      </p>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-800 rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">
                      Te falta{remaining === 1 ? "" : "n"} {remaining} pack{remaining === 1 ? "" : "s"}
                    </p>
                  </>
                )}
              </div>

              {/* CTA principal */}
              <Button
                asChild={minimumMet}
                disabled={!minimumMet}
                className={`w-full h-11 mb-2 ${
                  minimumMet
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {minimumMet ? (
                  <Link to="/checkout">
                    Continuar compra <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                ) : (
                  <span>Continuar compra</span>
                )}
              </Button>

              {/* CTA secundario */}
              <Button
                asChild
                variant="outline"
                className="w-full border-gray-300 text-gray-600 hover:text-black h-9 text-sm"
              >
                <Link to="/catalog">Seguir eligiendo productos</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
