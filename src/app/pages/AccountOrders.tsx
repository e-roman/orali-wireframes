import { useState } from "react";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Badge } from "../components/ui/badge";
import { ChevronLeft, Package } from "lucide-react";

type OrderStatus = "Entregado" | "En camino" | "En preparación" | "Cancelado";

interface MockOrder {
  id: string;
  date: string;
  items: string[];
  total: number;
  packs: number;
  status: OrderStatus;
  metodo: string;
}

const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ORD-2026-54321",
    date: "18 jun 2026",
    items: ["Ravioles de ricota ×2", "Ñoquis de papa ×1", "Pesto de albahaca ×1"],
    total: 8940,
    packs: 4,
    status: "Entregado",
    metodo: "Envío a domicilio",
  },
  {
    id: "ORD-2026-48120",
    date: "2 jun 2026",
    items: ["Lasagna de carne ×1", "Pesto de albahaca ×2", "Ravioles veganos de calabaza ×1"],
    total: 12740,
    packs: 4,
    status: "Entregado",
    metodo: "Retiro en Palermo",
  },
  {
    id: "ORD-2026-31905",
    date: "15 may 2026",
    items: ["Sorrentinos de jamón y queso ×2", "Salsa cuatro quesos ×2"],
    total: 9980,
    packs: 4,
    status: "Entregado",
    metodo: "Envío a domicilio",
  },
  {
    id: "ORD-2026-22410",
    date: "28 abr 2026",
    items: ["Empanadas de carne ×2", "Empanadas de verdura ×2"],
    total: 4800,
    packs: 4,
    status: "Entregado",
    metodo: "Envío a domicilio",
  },
];

const statusColors: Record<OrderStatus, string> = {
  "Entregado": "bg-gray-100 text-gray-600",
  "En camino": "bg-gray-200 text-gray-700",
  "En preparación": "bg-gray-100 text-gray-600",
  "Cancelado": "bg-gray-100 text-gray-500",
};

export function AccountOrders() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/account"
            className="text-sm text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Mi cuenta
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-2xl font-bold text-black">Mis pedidos</h1>
        </div>

        {MOCK_ORDERS.length === 0 ? (
          <div className="bg-white border border-gray-300 rounded-lg p-12 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Todavía no tenés pedidos</p>
            <Link to="/catalog" className="text-sm font-medium text-black underline">
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-300 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                >
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Package className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-black">{order.id}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.date} · {order.packs} packs · {order.metodo}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-black">
                      ${order.total.toLocaleString("es-AR")}
                    </p>
                  </div>
                </button>

                {expandedId === order.id && (
                  <div className="border-t border-gray-100 px-6 py-4">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      Productos
                    </p>
                    <ul className="space-y-1 mb-4">
                      {order.items.map((item) => (
                        <li key={item} className="text-sm text-gray-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/catalog"
                      className="text-sm font-medium text-black underline hover:no-underline"
                    >
                      Volver a pedir
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="border-t border-gray-300 py-8 bg-white mt-8">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="flex justify-center gap-6 text-sm text-gray-500 mb-3">
            <Link to="/contact" className="hover:text-black">Contacto</Link>
            <Link to="/faq" className="hover:text-black">Preguntas frecuentes</Link>
          </div>
          <p className="text-xs text-gray-400">© 2026 Orali · Pastas frescas artesanales</p>
        </div>
      </footer>
    </div>
  );
}
