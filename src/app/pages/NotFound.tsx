import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-5xl font-bold text-gray-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-black mb-3">Página no encontrada</h1>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          La dirección que buscás no existe o fue movida.
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link to="/">Ir al inicio</Link>
          </Button>
          <Button asChild variant="outline" className="border-gray-300">
            <Link to="/catalog">Ver catálogo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
