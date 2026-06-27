import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { products, categories } from "../data/products";

export function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-100 border-b border-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Pastas frescas artesanales
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Elaboradas diariamente con ingredientes de primera calidad
            </p>
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
              <Link to="/catalog">Ver catálogo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Banner mínimo */}
      <div className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-sm text-center">
            Pedido mínimo: 4 packs (12 unidades) de cualquier combinación
          </p>
        </div>
      </div>

      {/* Categorías */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black mb-8">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link key={category.id} to={`/catalog?category=${category.id}`} className="group">
                <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-medium text-black">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-black mb-8">Productos destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-300 py-8 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-medium text-black mb-4">Orali</p>
          <div className="flex justify-center gap-6 text-sm text-gray-600 mb-4">
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
