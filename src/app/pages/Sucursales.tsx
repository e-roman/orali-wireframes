import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { MapPin, Clock } from "lucide-react";

const SUCURSALES = [
  {
    id: "palermo",
    nombre: "Palermo",
    direccion: "Thames 1234, CABA",
    barrio: "Palermo Soho",
    horario: [
      { dias: "Lunes a Viernes", hrs: "9:00 – 18:00" },
      { dias: "Sábados", hrs: "9:00 – 13:00" },
      { dias: "Domingos", hrs: "Cerrado" },
    ],
    telefono: "(011) 4833-1122",
    nota: "Estacionamiento en la esquina de Thames y Gorriti.",
  },
  {
    id: "belgrano",
    nombre: "Belgrano",
    direccion: "Av. Cabildo 2567, CABA",
    barrio: "Belgrano C",
    horario: [
      { dias: "Lunes a Viernes", hrs: "9:00 – 18:00" },
      { dias: "Sábados", hrs: "9:00 – 13:00" },
      { dias: "Domingos", hrs: "Cerrado" },
    ],
    telefono: "(011) 4784-9900",
    nota: "A 2 cuadras del subte D, estación Juramento.",
  },
  {
    id: "san-isidro",
    nombre: "San Isidro",
    direccion: "Av. del Libertador 890, San Isidro",
    barrio: "San Isidro",
    horario: [
      { dias: "Lunes a Viernes", hrs: "9:00 – 17:00" },
      { dias: "Sábados", hrs: "9:00 – 12:00" },
      { dias: "Domingos", hrs: "Cerrado" },
    ],
    telefono: "(011) 4743-5500",
    nota: "Amplio estacionamiento sin cargo.",
  },
];

export function Sucursales() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-black transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Sucursales</span>
        </nav>

        <h1 className="text-3xl font-bold text-black mb-2">Sucursales</h1>
        <p className="text-gray-600 mb-10">
          Retirá tu pedido sin costo en cualquiera de nuestros locales.
        </p>

        <div className="space-y-6">
          {SUCURSALES.map((s) => (
            <div key={s.id} className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="px-6 py-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-black">{s.nombre}</h2>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600">
                      <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                      <span>{s.direccion}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex-shrink-0">
                    {s.barrio}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                        Horario
                      </p>
                    </div>
                    <div className="space-y-1">
                      {s.horario.map((h) => (
                        <div key={h.dias} className="flex justify-between text-sm">
                          <span className="text-gray-600">{h.dias}</span>
                          <span
                            className={`font-medium ${
                              h.hrs === "Cerrado" ? "text-gray-400" : "text-black"
                            }`}
                          >
                            {h.hrs}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
                      Teléfono
                    </p>
                    <p className="text-sm text-black">{s.telefono}</p>
                    {s.nota && (
                      <p className="text-xs text-gray-500 mt-3 leading-relaxed">{s.nota}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
                <p className="text-xs text-gray-500">
                  Retiro sin costo · Tu pedido estará listo el día siguiente hábil
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-gray-300 py-8 bg-gray-50 mt-8">
        <div className="mx-auto max-w-3xl px-4 text-center">
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
