import { Link } from "react-router";
import { Navbar } from "../components/Navbar";

const SECTIONS = [
  {
    title: "1. Objeto",
    body: "Los presentes Términos y Condiciones regulan el uso del sitio web de Orali (en adelante, 'el Sitio') y la compra de productos a través del mismo. Al acceder al Sitio y realizar una compra, el usuario acepta estos términos en su totalidad.",
  },
  {
    title: "2. Productos y precios",
    body: "Todos los productos ofrecidos son elaborados artesanalmente. Los precios se expresan en pesos argentinos (ARS) e incluyen IVA. Orali se reserva el derecho de modificar los precios sin previo aviso. Los precios vigentes son los que aparecen en el momento de confirmar el pedido.",
  },
  {
    title: "3. Pedido mínimo",
    body: "El pedido mínimo es de 4 packs (12 unidades) de cualquier combinación de productos disponibles en el catálogo. Pedidos que no alcancen el mínimo no podrán ser procesados.",
  },
  {
    title: "4. Envíos y entregas",
    body: "El servicio de envío a domicilio opera de lunes a jueves en franjas horarias de 4 horas. El costo de envío varía según la zona de entrega y se informa al momento del checkout. El retiro en sucursal es sin cargo. Los plazos de entrega son estimativos y pueden variar por razones operativas o de fuerza mayor.",
  },
  {
    title: "5. Formas de pago",
    body: "Se aceptan tarjetas de crédito y débito, transferencia bancaria (CBU/alias) y Mercado Pago. En caso de pago por transferencia, el pedido se procesará una vez acreditado el importe en la cuenta de Orali.",
  },
  {
    title: "6. Cancelaciones y devoluciones",
    body: "El usuario puede cancelar su pedido hasta 24 horas antes de la fecha de entrega pactada. Las devoluciones proceden únicamente ante productos en mal estado o que no correspondan al pedido realizado, debiendo notificarse dentro de las 2 horas de la recepción.",
  },
  {
    title: "7. Datos personales",
    body: "Los datos personales recopilados son utilizados exclusivamente para el procesamiento de pedidos y comunicaciones relacionadas. Orali no comparte datos con terceros con fines comerciales. El usuario puede solicitar la baja de sus datos en cualquier momento contactando a hola@orali.com.ar.",
  },
  {
    title: "8. Modificaciones",
    body: "Orali se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entran en vigencia desde su publicación en el Sitio. El uso continuado del Sitio implica la aceptación de los términos modificados.",
  },
];

export function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-black transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Términos y condiciones</span>
        </nav>

        <h1 className="text-3xl font-bold text-black mb-2">Términos y condiciones</h1>
        <p className="text-sm text-gray-500 mb-10">Última actualización: junio 2026</p>

        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-semibold text-black mb-2">{s.title}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">¿Tenés dudas sobre estos términos?</p>
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
