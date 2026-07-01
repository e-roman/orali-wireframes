import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { MinimumProgressBar } from "../components/MinimumProgressBar";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { Minus, Plus, ShoppingCart, Truck, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const categoryLabels: Record<string, string> = {
  pastas: "Pastas",
  tapas: "Tapas",
  empanadas: "Empanadas",
  especiales: "Especiales",
};

const dietaryLabels: Record<string, string> = {
  "sin-tacc": "Sin TACC",
  vegano: "Vegano",
  integral: "Integral",
  "sin-sal": "Sin Sal",
  vegetariano: "Vegetariano",
  premium: "Premium",
};

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, getTotalPacks } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [postalCode, setPostalCode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<null | "checking" | "ok" | "no">(null);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <p className="text-gray-600">Producto no encontrado</p>
          <Button asChild className="mt-4 bg-black text-white hover:bg-gray-800">
            <Link to="/catalog">Ver catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  const packPrice = product.pricePerUnit * product.unitsPerPack;
  const totalPrice = packPrice * quantity;
  const categoryLabel = categoryLabels[product.category] ?? product.category;

  const recommendations = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.pricePerUnit,
      unitsPerPack: product.unitsPerPack,
      quantity,
    });

    const newTotal = getTotalPacks() + quantity;
    const remaining = Math.max(4 - newTotal, 0);

    if (remaining === 0) {
      toast.success(
        `${quantity} pack${quantity === 1 ? "" : "s"} agregado${quantity === 1 ? "" : "s"} · Mínimo cumplido`,
        { description: product.name }
      );
    } else {
      toast.success(
        `${quantity} pack${quantity === 1 ? "" : "s"} agregado${quantity === 1 ? "" : "s"} · ${remaining} pack${remaining === 1 ? "" : "s"} para el mínimo`,
        { description: product.name }
      );
    }
  };

  const handleVerifyPostal = () => {
    if (!postalCode.trim()) return;
    setDeliveryStatus("checking");
    setTimeout(() => setDeliveryStatus("ok"), 900);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-black transition-colors">
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            to={`/catalog?category=${product.category}`}
            className="hover:text-black transition-colors"
          >
            {categoryLabel}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-black font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen placeholder */}
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-sm text-gray-400 uppercase tracking-wide">Imagen</span>
          </div>

          {/* Información */}
          <div>
            {/* Badges dietarios */}
            {product.dietary.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {product.dietary.map((d) => (
                  <Badge key={d} variant="outline" className="border-gray-300 text-gray-600 text-xs">
                    {dietaryLabels[d] ?? d}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {/* Bloque de precio */}
            <div className="border border-gray-200 rounded-lg p-5 mb-6">
              <p className="text-3xl font-bold text-black">
                ${packPrice.toLocaleString("es-AR")}
                <span className="text-base font-normal text-gray-500 ml-2">el pack</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ${product.pricePerUnit.toLocaleString("es-AR")} por unidad &middot; Pack de{" "}
                {product.unitsPerPack} {product.unitsPerPack === 1 ? "unidad" : "unidades"}
              </p>
            </div>

            {/* Selector de cantidad */}
            <div className="mb-6">
              <p className="text-sm font-medium text-black mb-3">
                ¿Cuántos packs querés?
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-5 py-3 font-semibold text-black text-lg">
                    {quantity}
                  </span>
                  <button
                    className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                    onClick={() => setQuantity(Math.min(20, quantity + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  = {quantity * product.unitsPerPack} unidades &middot; $
                  {totalPrice.toLocaleString("es-AR")}
                </span>
              </div>
            </div>

            {/* CTA principal */}
            <Button
              size="lg"
              className="w-full bg-black text-white hover:bg-gray-800 mb-4 h-12"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Agregar {quantity} pack{quantity === 1 ? "" : "s"} — $
              {totalPrice.toLocaleString("es-AR")}
            </Button>

            {/* Verificación de zona */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-medium text-black">Verificá si llegamos a tu zona</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ingresá tu CP"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  maxLength={8}
                />
                <Button
                  variant="outline"
                  className="border-gray-800 bg-gray-900 text-white hover:bg-gray-700 text-sm px-4"
                  onClick={handleVerifyPostal}
                >
                  Verificar
                </Button>
              </div>
              {deliveryStatus === "checking" && (
                <p className="text-xs text-gray-500 mt-2">Verificando cobertura...</p>
              )}
              {deliveryStatus === "ok" && (
                <p className="text-xs text-black mt-2 font-medium">
                  Entregamos en tu zona
                </p>
              )}
              {deliveryStatus === "no" && (
                <p className="text-xs text-gray-600 mt-2">
                  Por ahora no llegamos a tu zona
                </p>
              )}
            </div>
          </div>
        </div>

        {/* También te puede gustar */}
        {recommendations.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-black mb-6">También te puede gustar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommendations.map((rec) => (
                <ProductCard key={rec.id} product={rec} />
              ))}
            </div>
          </section>
        )}
      </div>

      <MinimumProgressBar />
    </div>
  );
}
