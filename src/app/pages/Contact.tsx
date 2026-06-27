import { useState } from "react";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Mail, Phone, MessageCircle } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-black transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Contacto</span>
        </nav>

        <h1 className="text-3xl font-bold text-black mb-2">Contacto</h1>
        <p className="text-gray-600 mb-10">
          Estamos para ayudarte. Respondemos en menos de 24 horas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Canales */}
          <div>
            <h2 className="font-semibold text-black mb-4">Canales de atención</h2>
            <div className="space-y-4">
              {[
                {
                  Icon: MessageCircle,
                  label: "WhatsApp",
                  value: "+54 11 2345-6789",
                  desc: "Lun–Vie 9–18 · Sáb 9–13",
                },
                {
                  Icon: Mail,
                  label: "Email",
                  value: "hola@orali.com.ar",
                  desc: "Respondemos en 24 hs",
                },
                {
                  Icon: Phone,
                  label: "Teléfono",
                  value: "0800-345-0000",
                  desc: "Lun–Vie 9–18",
                },
              ].map(({ Icon, label, value, desc }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">{label}</p>
                    <p className="text-sm text-gray-700">{value}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm font-medium text-black mb-1">¿Problema con un pedido?</p>
              <p className="text-xs text-gray-600">
                Indicá el número de pedido (#ORD-2026-XXXXX) en tu mensaje para que podamos ayudarte
                más rápido.
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div>
            {sent ? (
              <div className="border border-gray-300 rounded-lg p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-black mb-2">¡Mensaje enviado!</h3>
                <p className="text-sm text-gray-600">
                  Te respondemos en menos de 24 horas hábiles.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border border-gray-300 rounded-lg p-6 space-y-4"
              >
                <h2 className="font-semibold text-black">Envianos un mensaje</h2>
                <div>
                  <Label className="text-sm text-gray-700">Nombre</Label>
                  <Input
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="border-gray-300 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700">Email</Label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-gray-300 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700">Mensaje</Label>
                  <textarea
                    placeholder="¿En qué podemos ayudarte?"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                    rows={4}
                    className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 h-11">
                  Enviar mensaje
                </Button>
              </form>
            )}
          </div>
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
