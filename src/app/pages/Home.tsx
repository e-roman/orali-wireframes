import { Link } from "react-router";
import { Truck, ShieldCheck, Clock, Leaf } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";

const trustSignals = [
  {
    icon: Truck,
    title: "Envío a CABA y GBA",
    description: "Martes y viernes. Gratis en CABA desde $5.000",
  },
  {
    icon: ShieldCheck,
    title: "Pago seguro",
    description: "Tarjeta, MercadoPago o transferencia",
  },
  {
    icon: Clock,
    title: "Elaboradas el día",
    description: "Sin conservantes ni aditivos artificiales",
  },
  {
    icon: Leaf,
    title: "+50 años de tradición",
    description: "Empresa familiar argentina desde 1973",
  },
];

export function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero — 2 columnas */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Empresa familiar · +50 años de tradición
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-5">
                Pastas frescas,<br />de la fábrica<br />a tu mesa
              </h1>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                Elaboradas artesanalmente cada día. Sin conservantes, con los
                mejores ingredientes. Envíos a CABA y GBA los martes y viernes.
              </p>
              <div className="flex flex-wrap items-center gap-7">
                <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
                  <Link to="/catalog">Ver todos los productos</Link>
                </Button>
                <Link
                  to="/faq"
                  className="text-sm text-gray-600 hover:text-black underline underline-offset-2 transition-colors"
                >
                  ¿Cómo comprar?
                </Link>
              </div>
            </div>

            {/* Imagen placeholder */}
            <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#f3f4f6" />
                <line x1="0" y1="0" x2="400" y2="300" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="400" y1="0" x2="0" y2="300" stroke="#e5e7eb" strokeWidth="1" />
                <text x="200" y="155" textAnchor="middle" fill="#9ca3af" fontSize="13" fontFamily="sans-serif">
                  Foto hero del producto
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Cómo funciona? — Variante A */}
      <section className="bg-gray-50 border-b border-gray-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Variante A
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-500 text-base mb-10 max-w-xl">
            Hacemos las pastas cada mañana. Vos elegís los sabores y nosotros te los llevamos a casa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Elegí tus pastas",
                desc: "Explorá el catálogo y sumá al carrito los sabores que quieras. Sin límite por tipo de producto.",
              },
              {
                step: "2",
                title: "Completá el mínimo",
                desc: "Necesitás 4 packs en total, combinando lo que quieras. La barra de progreso te guía en todo momento.",
              },
              {
                step: "3",
                title: "Te lo llevamos a casa",
                desc: "Entregamos martes y viernes en CABA y GBA. Coordinás el día al hacer el pedido.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-3">
                <span className="text-3xl font-bold text-black">{step}</span>
                <p className="text-base font-semibold text-black">{title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Cómo funciona? — Variante B */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Variante B
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-500 text-base mb-10 max-w-xl">
            Tres pasos, sin complicaciones.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
            {[
              {
                step: "01",
                title: "Elegí lo que querés",
                desc: "Navegá por tipo de producto o filtros dietarios. Precio por pack visible en cada card.",
              },
              {
                step: "02",
                title: "Armá tu pedido",
                desc: "Mínimo 4 packs, combinando lo que quieras. Sin mínimo por sabor ni por categoría.",
              },
              {
                step: "03",
                title: "Recibís en tu casa",
                desc: "Martes y viernes. Gratis en CABA desde $5.000. Productos frescos del día de la entrega.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-3 p-8 bg-white">
                <span className="text-xs font-mono font-semibold text-gray-400 tracking-widest">{step}</span>
                <p className="text-base font-semibold text-black leading-snug">{title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Los más pedidos */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-black">Los más pedidos</h2>
            <Link
              to="/catalog"
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-t border-gray-200 py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustSignals.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-black" />
                </div>
                <p className="text-sm font-medium text-black">{title}</p>
                <p className="text-xs text-gray-500 leading-snug">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Marca */}
            <div>
              <p className="font-bold text-black text-lg mb-2">Orali</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Empresa familiar con más de 50 años de experiencia. Pastas frescas,
                tapas y empanadas artesanales, de la fábrica directo a tu domicilio.
              </p>
            </div>

            {/* Productos */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Productos
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  { label: "Pastas Frescas", href: "/catalog?category=pastas" },
                  { label: "Tapas para Empanadas", href: "/catalog?category=tapas-empanadas" },
                  { label: "Empanadas Rellenas", href: "/catalog?category=empanadas-rellenas" },
                  { label: "Especiales", href: "/catalog?category=especiales" },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link to={href} className="hover:text-black transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Información */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Información
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  { label: "¿Cómo comprar?", href: "/faq" },
                  { label: "Zonas de entrega", href: "/faq" },
                  { label: "Preguntas frecuentes", href: "/faq" },
                  { label: "Contacto", href: "/contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link to={href} className="hover:text-black transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">© 2026 Orali SPA SRL · Todos los derechos reservados</p>
            <p className="text-xs text-gray-400">Sitio seguro · Pago con Mercado Pago</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
