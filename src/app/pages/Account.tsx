import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Package, ChevronRight, User, MapPin, Bell } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "ORD-2026-54321",
    date: "18 jun 2026",
    items: "Ravioles de ricota, Ñoquis de papa",
    total: 8940,
    status: "Entregado",
  },
  {
    id: "ORD-2026-48120",
    date: "2 jun 2026",
    items: "Lasagna de carne, Pesto de albahaca",
    total: 12740,
    status: "Entregado",
  },
];

export function Account() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-lg">E</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">Hola, Emilio</h1>
            <p className="text-sm text-gray-500">emilio@email.com</p>
          </div>
        </div>

        {/* Pedidos recientes */}
        <div className="bg-white border border-gray-300 rounded-lg mb-4">
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
            <h2 className="font-semibold text-black">Pedidos recientes</h2>
            <Link to="/account/orders" className="text-sm text-gray-500 hover:text-black">
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Package className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-black">{order.id}</p>
                    <span className="text-xs text-gray-400">{order.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{order.items}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-black">
                    ${order.total.toLocaleString("es-AR")}
                  </p>
                  <span className="text-xs text-gray-400">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 border-t border-gray-100">
            <Link
              to="/account/orders"
              className="flex items-center justify-center gap-1 text-sm text-gray-600 hover:text-black transition-colors"
            >
              Ver historial completo <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="bg-white border border-gray-300 rounded-lg mb-4">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-black">Mi cuenta</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { icon: User, label: "Datos personales", desc: "Nombre, email, contraseña" },
              { icon: MapPin, label: "Mis direcciones", desc: "Domicilios guardados" },
              { icon: Bell, label: "Notificaciones", desc: "Preferencias de email y push" },
            ].map(({ icon: Icon, label, desc }) => (
              <button
                key={label}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Cerrar sesión */}
        <div className="text-center pt-2">
          <button className="text-sm text-gray-500 hover:text-black underline transition-colors">
            Cerrar sesión
          </button>
        </div>
      </div>

      <footer className="border-t border-gray-300 py-8 bg-white mt-8">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="flex justify-center gap-6 text-sm text-gray-500 mb-3">
            <Link to="/contact" className="hover:text-black">Contacto</Link>
            <Link to="/faq" className="hover:text-black">Preguntas frecuentes</Link>
            <Link to="/terms" className="hover:text-black">Términos</Link>
          </div>
          <p className="text-xs text-gray-400">© 2026 Orali · Pastas frescas artesanales</p>
        </div>
      </footer>
    </div>
  );
}
