import { useState } from "react";
import { useParams, useLocation, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { Separator } from "../components/ui/separator";
import { products } from "../data/products";
import { Check } from "lucide-react";
import { CartItem } from "../context/CartContext";

interface OrderState {
  items?: CartItem[];
  subtotal?: number;
  shipping?: number;
  metodoEntrega?: "envio" | "retiro";
}

// Fallback mock if arriving directly without cart state
const MOCK_ITEMS = [
  { id: "m1", name: "Ravioles de ricota", quantity: 2, price: 850, unitsPerPack: 3 },
  { id: "m2", name: "Ñoquis de papa", quantity: 1, price: 780, unitsPerPack: 3 },
  { id: "m3", name: "Pesto de albahaca", quantity: 2, price: 980, unitsPerPack: 2 },
];

export function OrderConfirmation() {
  const { orderId } = useParams();
  const location = useLocation();
  const state = (location.state as OrderState) || {};
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [npsSubmitted, setNpsSubmitted] = useState(false);

  const orderRef = `ORD-2026-${orderId}`;

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 3);
  const dateString = estimatedDate.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const orderItems: CartItem[] = state.items && state.items.length > 0 ? state.items : MOCK_ITEMS;
  const shipping = state.shipping ?? 1500;
  const subtotal =
    state.subtotal ??
    orderItems.reduce((sum, i) => sum + i.price * i.unitsPerPack * i.quantity, 0);
  const total = subtotal + shipping;

  const recommendations = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header confirmación */}
        <div className="text-center mb-10">
          <div className="h-14 w-14 bg-black rounded-xl flex items-center justify-center mx-auto mb-5">
            <Check className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">¡Tu pedido está confirmado!</h1>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-black">#{orderRef}</span>
            {" — "}
            {dateString.charAt(0).toUpperCase() + dateString.slice(1)}
          </p>
          {state.metodoEntrega === "retiro" && (
            <p className="text-sm text-gray-500 mt-1">
              Te avisamos por email cuando tu pedido esté listo para retirar.
            </p>
          )}
        </div>

        {/* Resumen del pedido */}
        <div className="border border-gray-300 rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-black">Resumen del pedido</h2>
          </div>
          <div className="px-6 py-5 space-y-3">
            {orderItems.map((item, i) => (
              <div key={item.id ?? i} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium text-black">
                  ${(item.price * item.unitsPerPack * item.quantity).toLocaleString("es-AR")}
                </span>
              </div>
            ))}
          </div>
          <Separator />
          <div className="px-6 py-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString("es-AR")}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Envío</span>
              <span>
                {shipping === 0 ? "Gratis (retiro en sucursal)" : `$${shipping.toLocaleString("es-AR")}`}
              </span>
            </div>
          </div>
          <Separator />
          <div className="px-6 py-4 flex justify-between font-semibold text-black">
            <span>Total</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>
        </div>

        {/* NPS */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <p className="text-sm font-medium text-black mb-4">
            Del 1 al 10, ¿qué tan probable es que recomiendes Orali?
          </p>

          {!npsSubmitted ? (
            <>
              <div className="flex gap-1.5 mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNpsScore(n)}
                    className={`flex-1 h-10 border rounded text-sm font-medium transition-colors ${
                      npsScore === n
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-4">
                <span>Poco probable</span>
                <span>Muy probable</span>
              </div>
              <Button
                onClick={() => npsScore !== null && setNpsSubmitted(true)}
                disabled={npsScore === null}
                className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
              >
                Enviar
              </Button>
            </>
          ) : (
            <p className="text-sm text-gray-600 text-center py-2">¡Gracias por tu respuesta!</p>
          )}
        </div>

        {/* Productos recomendados */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-black mb-4">Te puede interesar</h2>
          <div className="grid grid-cols-3 gap-4">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <div className="flex gap-3">
          <Button asChild variant="outline" className="flex-1 border-gray-300 h-12">
            <Link to="/account/orders">Ver mis pedidos</Link>
          </Button>
          <Button asChild className="flex-1 bg-black text-white hover:bg-gray-800 h-12">
            <Link to="/catalog">Seguir comprando</Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-300 py-8 bg-gray-50 mt-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="font-medium text-black mb-3">Orali</p>
          <div className="flex justify-center gap-6 text-sm text-gray-500 mb-3">
            <Link to="/contact" className="hover:text-black">Contacto</Link>
            <Link to="/sucursales" className="hover:text-black">Sucursales</Link>
            <Link to="/terms" className="hover:text-black">Términos</Link>
            <Link to="/faq" className="hover:text-black">Preguntas Frecuentes</Link>
          </div>
          <p className="text-xs text-gray-400">© 2026 Orali · Pastas frescas artesanales</p>
        </div>
      </footer>
    </div>
  );
}
