import { useState } from "react";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2, Check, AlertCircle, ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const MINIMUM_PACKS = 4;
const FREE_SHIPPING_THRESHOLD = 5000;
const paymentMethods = ["Visa", "Mastercard", "Amex", "Cabal", "Mercado Pago", "Transferencia"];

export function Cart() {
  const { items, getSubtotal, getTotalPacks, updateQuantity, removeItem } = useCart();
  const [discountCode, setDiscountCode] = useState("");

  const subtotal = getSubtotal();
  const totalPacks = getTotalPacks();
  const totalUnits = items.reduce((sum, item) => sum + item.quantity * item.unitsPerPack, 0);
  const minimumMet = totalPacks >= MINIMUM_PACKS;
  const remaining = Math.max(MINIMUM_PACKS - totalPacks, 0);
  const progressPct = Math.min((totalPacks / MINIMUM_PACKS) * 100, 100);
  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) return;
    toast.error("Código de descuento no válido");
  };

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
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-2xl font-bold text-black">Tu carrito</h1>
          <Badge variant="outline" className="rounded-full border-gray-300 text-gray-600 px-3 py-1">
            {totalPacks} pack{totalPacks === 1 ? "" : "s"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

          {/* ── Columna izquierda: productos ── */}
          <div>
            {minimumMet ? (
              <div className="border border-gray-300 rounded-xl p-4 mb-4 bg-gray-50 flex items-center gap-2.5">
                <div className="h-5 w-5 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-sm font-medium text-black">
                  Mínimo alcanzado · {totalPacks} de {MINIMUM_PACKS} packs · {totalUnits} unidades
                </p>
              </div>
            ) : (
              <div className="border border-gray-300 rounded-xl p-4 mb-4 bg-gray-50">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <p className="text-sm font-medium text-black">
                      {remaining === 1 ? "Falta" : "Faltan"} {remaining} pack{remaining === 1 ? "" : "s"} para el pedido mínimo
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-black">{Math.round(progressPct)}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {totalPacks} de {MINIMUM_PACKS} packs &middot; {totalUnits} unidades
                </p>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="divide-y divide-gray-100">
                {items.map((item) => {
                  const packPrice = item.price * item.unitsPerPack;
                  return (
                    <div key={item.id} className="flex gap-4 p-5">
                      {/* Imagen placeholder */}
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-[10px] text-gray-400 uppercase tracking-wide">Img</span>
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${item.id}`}
                            className="font-medium text-black hover:underline text-sm leading-snug"
                          >
                            {item.name}
                          </Link>
                          <button
                            aria-label="Eliminar producto"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-300 hover:text-gray-600 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.unitsPerPack} unidades por pack &middot; {item.quantity} pack
                          {item.quantity === 1 ? "" : "s"} &middot; ${item.price.toLocaleString("es-AR")} c/u
                        </p>

                        {/* Controles de cantidad + precio */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
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
                          </div>
                          <p className="font-semibold text-black text-sm">
                            ${(packPrice * item.quantity).toLocaleString("es-AR")}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link
              to="/catalog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors mt-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Continuar comprando
            </Link>
          </div>

          {/* ── Columna derecha: resumen sticky ── */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="font-semibold text-black mb-4">Resumen del pedido</h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal ({totalPacks} pack{totalPacks === 1 ? "" : "s"})
                  </span>
                  <span className="text-black font-medium">
                    ${subtotal.toLocaleString("es-AR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Envío (CABA)</span>
                  <span className="text-black font-medium">
                    {shippingFree ? "Gratis" : "A calcular"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-black mb-5">
                <span>Total</span>
                <span>${subtotal.toLocaleString("es-AR")}</span>
              </div>

              {/* CTA principal */}
              <Button
                asChild={minimumMet}
                disabled={!minimumMet}
                className={`w-full h-11 ${
                  minimumMet
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {minimumMet ? (
                  <Link to="/checkout">Continuar al checkout</Link>
                ) : (
                  <span>Continuar al checkout</span>
                )}
              </Button>
              {!minimumMet && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  {remaining === 1 ? "Falta" : "Faltan"} {remaining} pack{remaining === 1 ? "" : "s"} para poder finalizar la compra
                </p>
              )}

              {/* Código de descuento */}
              <div className="border-t border-gray-200 mt-6 pt-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Código de descuento
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ORALI10"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                  <Button
                    variant="outline"
                    className="border-gray-800 bg-gray-900 text-white hover:bg-gray-700 text-sm px-4"
                    onClick={handleApplyDiscount}
                  >
                    Aplicar
                  </Button>
                </div>
              </div>

              {/* Medios de pago */}
              <div className="border-t border-gray-200 mt-6 pt-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Medios de pago
                </p>
                <div className="flex flex-wrap gap-2">
                  {paymentMethods.map((method) => (
                    <span
                      key={method}
                      className="border border-gray-300 rounded-md px-2.5 py-1 text-xs text-gray-600"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
