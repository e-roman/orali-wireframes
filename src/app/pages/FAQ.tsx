import { useState } from "react";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "¿Cuál es el pedido mínimo?",
    a: "El pedido mínimo es de 4 packs (12 unidades) de cualquier combinación de productos. Podés mezclar libremente pastas, salsas y empanadas.",
  },
  {
    q: "¿Cómo funciona el envío?",
    a: "Realizamos envíos de lunes a jueves en franjas horarias de 4 horas. Al hacer el pedido podés elegir la franja que mejor te queda. El costo de envío se calcula según tu zona en el checkout.",
  },
  {
    q: "¿Puedo retirar en una sucursal?",
    a: "Sí, tenemos sucursales en Palermo, Belgrano y San Isidro. El retiro es sin costo. Tu pedido estará listo el día siguiente hábil y te avisamos por email cuando puedas pasar.",
  },
  {
    q: "¿Los productos son frescos o congelados?",
    a: "Todos nuestros productos se elaboran artesanalmente sin conservantes ni aditivos. Las pastas y empanadas se entregan frescas. Las salsas son artesanales y se conservan hasta 5 días en la heladera.",
  },
  {
    q: "¿Tienen opciones para celíacos?",
    a: 'Sí, contamos con una línea Sin TACC elaborada con premezcla certificada en un área separada. Buscá el filtro "Sin TACC" en el catálogo.',
  },
  {
    q: "¿Tienen opciones veganas?",
    a: 'Tenemos varias opciones veganas: ravioles de calabaza, ñoquis de papa, fideos integrales, empanadas de verdura y salsa pesto. Filtrá por "Vegano" en el catálogo.',
  },
  {
    q: "¿Cómo pago mi pedido?",
    a: "Aceptamos tarjetas de crédito y débito, transferencia bancaria (CBU/alias) y Mercado Pago con todas sus opciones de pago.",
  },
  {
    q: "¿Puedo cancelar o modificar mi pedido?",
    a: "Podés cancelar o modificar tu pedido hasta 24 horas antes de la fecha de entrega contactándonos por email o WhatsApp.",
  },
  {
    q: "¿Puedo guardar mi dirección para el próximo pedido?",
    a: "Sí, al crear una cuenta tus direcciones quedan guardadas. En el próximo pedido podés seleccionarla directamente sin volver a ingresarla.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-black transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Preguntas frecuentes</span>
        </nav>

        <h1 className="text-3xl font-bold text-black mb-2">Preguntas frecuentes</h1>
        <p className="text-gray-600 mb-10">Encontrá las respuestas a las dudas más comunes.</p>

        <div className="divide-y divide-gray-200">
          {FAQS.map((faq, i) => (
            <div key={i} className="py-4">
              <button
                className="flex items-center justify-between w-full text-left gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-black text-sm leading-snug">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform flex-shrink-0 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-lg p-6 mt-10 text-center">
          <p className="text-sm text-gray-600 mb-1">¿No encontraste lo que buscabas?</p>
          <Link to="/contact" className="text-sm font-medium text-black underline">
            Contactanos
          </Link>
        </div>
      </div>

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
