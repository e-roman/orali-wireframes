import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useCart } from "../context/CartContext";
import { Separator } from "../components/ui/separator";
import { Check, ChevronRight, CreditCard, Building2, Smartphone, Pencil } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = "cuenta" | "envio" | "pago";
type MetodoEntrega = "envio" | "retiro";
type MetodoPago = "tarjeta" | "transferencia" | "mercadopago";

const STEPS: { key: Step; label: string }[] = [
  { key: "cuenta", label: "Cuenta" },
  { key: "envio", label: "Envío" },
  { key: "pago", label: "Pago" },
];

const FRANJAS = [
  "Lunes 10:00–14:00",
  "Lunes 14:00–18:00",
  "Martes 10:00–14:00",
  "Martes 14:00–18:00",
  "Miércoles 10:00–14:00",
  "Miércoles 14:00–18:00",
  "Jueves 10:00–14:00",
  "Jueves 14:00–18:00",
];

const SUCURSALES = [
  { id: "palermo", nombre: "Palermo", dir: "Thames 1234, CABA", horario: "Lun–Vie 9–18 · Sáb 9–13" },
  { id: "belgrano", nombre: "Belgrano", dir: "Av. Cabildo 2567, CABA", horario: "Lun–Vie 9–18 · Sáb 9–13" },
  { id: "san-isidro", nombre: "San Isidro", dir: "Av. del Libertador 890", horario: "Lun–Vie 9–17 · Sáb 9–12" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCart();

  // — Paso actual —
  const [step, setStep] = useState<Step>("cuenta");

  // — Cuenta —
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // — Envío —
  const [metodoEntrega, setMetodoEntrega] = useState<MetodoEntrega>("envio");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [piso, setPiso] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [cp, setCp] = useState("");
  const [telefono, setTelefono] = useState("");
  const [instrucciones, setInstrucciones] = useState("");
  const [franja, setFranja] = useState("");
  const [sucursal, setSucursal] = useState("");

  // — Pago —
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("tarjeta");
  const [cardNumber, setCardNumber] = useState("");
  const [cardTitular, setCardTitular] = useState("");
  const [cardVenc, setCardVenc] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [orderId] = useState(() => String(Math.floor(Math.random() * 90000) + 10000));

  // — Cálculos —
  const subtotal = getSubtotal();
  const shippingCost = metodoEntrega === "retiro" ? 0 : 1500;
  const currentStepIndex = STEPS.findIndex((s) => s.key === step);

  // Redirect si carrito vacío
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Tu carrito está vacío</h1>
          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link to="/catalog">Ver catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleAuth = (e?: React.FormEvent) => {
    e?.preventDefault();
    setStep("envio");
  };

  const handleEnvioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("pago");
  };

  const handleConfirmar = (e?: React.FormEvent) => {
    e?.preventDefault();
    const orderItems = items.map((i) => ({ ...i }));
    clearCart();
    navigate(`/order-confirmation/${orderId}`, {
      state: { items: orderItems, subtotal, shipping: shippingCost, metodoEntrega },
    });
  };

  // ─── Sub-componentes ──────────────────────────────────────────────────────

  // Resumen de la compra (columna derecha, siempre visible)
  function OrderSummary() {
    const isEnvioKnown = step === "pago";
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-black mb-4">Resumen de la compra</h3>

        {/* Productos */}
        <div className="space-y-2 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600 truncate mr-2">
                {item.quantity}× {item.name}
              </span>
              <span className="text-gray-800 flex-shrink-0">
                ${(item.price * item.unitsPerPack * item.quantity).toLocaleString("es-AR")}
              </span>
            </div>
          ))}
        </div>

        <Separator className="mb-3" />

        <div className="space-y-1.5 text-sm mb-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-black">${subtotal.toLocaleString("es-AR")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Envío</span>
            <span className="text-gray-400">
              {isEnvioKnown
                ? metodoEntrega === "retiro"
                  ? "Gratis (retiro)"
                  : `$${shippingCost.toLocaleString("es-AR")}`
                : "A calcular"}
            </span>
          </div>
        </div>

        <Separator className="mb-3" />

        <div className="flex justify-between font-bold text-black">
          <span>Total</span>
          <span>
            ${(subtotal + (isEnvioKnown ? shippingCost : 0)).toLocaleString("es-AR")}
          </span>
        </div>
      </div>
    );
  }

  // Resumen acumulativo de pasos completados (debajo del summary)
  function StepSummaries() {
    const selectedSucursal = SUCURSALES.find((s) => s.id === sucursal);
    return (
      <div className="space-y-3">
        {/* Cuenta completada */}
        {currentStepIndex > 0 && email && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Cuenta</p>
              <button
                onClick={() => setStep("cuenta")}
                className="text-gray-400 hover:text-black transition-colors"
                aria-label="Editar cuenta"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-sm text-black">{email}</p>
          </div>
        )}

        {/* Envío completado */}
        {currentStepIndex > 1 && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Entrega</p>
              <button
                onClick={() => setStep("envio")}
                className="text-gray-400 hover:text-black transition-colors"
                aria-label="Editar envío"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
            {metodoEntrega === "envio" ? (
              <div className="text-sm text-black space-y-0.5">
                <p>{nombre} {apellido}</p>
                <p className="text-gray-600">{direccion}{piso ? `, ${piso}` : ""}</p>
                <p className="text-gray-600">{localidad}{cp ? ` (${cp})` : ""}</p>
                {franja && <p className="text-gray-500 text-xs mt-1">{franja}</p>}
              </div>
            ) : selectedSucursal ? (
              <div className="text-sm text-black space-y-0.5">
                <p>Retiro en {selectedSucursal.nombre}</p>
                <p className="text-gray-600 text-xs">{selectedSucursal.dir}</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Stepper ── */}
        <div className="flex items-center mb-8 max-w-sm">
          {STEPS.map((s, i) => {
            const isDone = i < currentStepIndex;
            const isCurrent = i === currentStepIndex;
            return (
              <div key={s.key} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-colors ${
                      isDone
                        ? "bg-gray-300 text-gray-600"
                        : isCurrent
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isCurrent ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && <div className="flex-1 h-px bg-gray-300 mx-2" />}
              </div>
            );
          })}
        </div>

        {/* ── Grid de dos columnas ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* ── Columna izquierda: formulario del paso actual ── */}
          <div>

            {/* ── PASO 1: CUENTA ── */}
            {step === "cuenta" && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 shadow-sm">
                {/* Link volver al carrito */}
                <Link
                  to="/cart"
                  className="text-sm text-gray-500 hover:text-black flex items-center gap-1 mb-6 transition-colors w-fit"
                >
                  ← Volver al carrito
                </Link>

                <h2 className="text-xl font-bold text-black mb-1">Ingresá a tu cuenta</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Tu historial de pedidos quedará guardado para tu próxima compra.
                </p>

                {/* Social auth */}
                <div className="space-y-3 mb-6">
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50 h-11"
                    onClick={() => handleAuth()}
                  >
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continuar con Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50 h-11"
                    onClick={() => handleAuth()}
                  >
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    Continuar con Apple
                  </Button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 text-gray-400">o ingresá con email</span>
                  </div>
                </div>

                {/* Toggle crear/iniciar */}
                <div className="flex border border-gray-200 rounded-lg p-1 mb-5">
                  <button
                    className={`flex-1 py-2 text-sm rounded-md transition-colors ${
                      authMode === "register" ? "bg-black text-white font-medium" : "text-gray-500 hover:text-black"
                    }`}
                    onClick={() => setAuthMode("register")}
                  >
                    Crear cuenta
                  </button>
                  <button
                    className={`flex-1 py-2 text-sm rounded-md transition-colors ${
                      authMode === "login" ? "bg-black text-white font-medium" : "text-gray-500 hover:text-black"
                    }`}
                    onClick={() => setAuthMode("login")}
                  >
                    Iniciar sesión
                  </button>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
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
                    <Label className="text-sm text-gray-700">Contraseña</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-gray-300 mt-1"
                    />
                  </div>
                  {authMode === "login" && (
                    <div className="text-right">
                      <button type="button" className="text-xs text-gray-500 hover:text-black underline">
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                  )}
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 h-11">
                    {authMode === "register" ? "Crear cuenta y continuar" : "Iniciar sesión y continuar"}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </form>
              </div>
            )}

            {/* ── PASO 2: ENVÍO ── */}
            {step === "envio" && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 shadow-sm">
                <button
                  className="text-sm text-gray-500 hover:text-black mb-6 flex items-center gap-1 transition-colors"
                  onClick={() => setStep("cuenta")}
                >
                  ← Volver
                </button>

                <h2 className="text-xl font-bold text-black mb-6">¿Cómo recibís tu pedido?</h2>

                <form onSubmit={handleEnvioSubmit} className="space-y-6">
                  {/* Método de entrega */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "envio" as MetodoEntrega, label: "Envío a domicilio", desc: "Recibís en tu casa" },
                      { key: "retiro" as MetodoEntrega, label: "Retiro en sucursal", desc: "Sin costo de envío" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setMetodoEntrega(opt.key)}
                        className={`p-4 border rounded-xl text-left transition-colors ${
                          metodoEntrega === opt.key
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <p className="text-sm font-medium text-black">{opt.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>

                  {metodoEntrega === "envio" ? (
                    <>
                      {/* Nombre y apellido */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-700">Nombre</Label>
                          <Input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="border-gray-300 mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-700">Apellido</Label>
                          <Input placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required className="border-gray-300 mt-1" />
                        </div>
                      </div>

                      {/* Dirección */}
                      <div>
                        <Label className="text-sm text-gray-700">Dirección</Label>
                        <Input placeholder="Calle y número" value={direccion} onChange={(e) => setDireccion(e.target.value)} required className="border-gray-300 mt-1" />
                      </div>

                      {/* Piso y CP */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-700">
                            Piso / Depto <span className="text-gray-400 font-normal">(opcional)</span>
                          </Label>
                          <Input placeholder="ej: 3B" value={piso} onChange={(e) => setPiso(e.target.value)} className="border-gray-300 mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-700">Código postal</Label>
                          <Input placeholder="ej: 1425" value={cp} onChange={(e) => setCp(e.target.value)} required className="border-gray-300 mt-1" maxLength={8} />
                        </div>
                      </div>

                      {/* Localidad y Tel */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-700">Localidad</Label>
                          <Input placeholder="ej: Palermo" value={localidad} onChange={(e) => setLocalidad(e.target.value)} required className="border-gray-300 mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-700">Teléfono</Label>
                          <Input type="tel" placeholder="11 4567-8901" value={telefono} onChange={(e) => setTelefono(e.target.value)} required className="border-gray-300 mt-1" />
                        </div>
                      </div>

                      {/* Instrucciones */}
                      <div>
                        <Label className="text-sm text-gray-700">
                          Instrucciones <span className="text-gray-400 font-normal">(opcional)</span>
                        </Label>
                        <Input placeholder="ej: Timbre roto, llamar al cel" value={instrucciones} onChange={(e) => setInstrucciones(e.target.value)} className="border-gray-300 mt-1" />
                      </div>

                      {/* Franja horaria */}
                      <div>
                        <Label className="text-sm font-medium text-black mb-3 block">
                          Elegí una franja horaria de entrega
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {FRANJAS.map((f) => (
                            <button
                              key={f}
                              type="button"
                              onClick={() => setFranja(f)}
                              className={`p-3 border rounded-lg text-sm text-left transition-colors ${
                                franja === f
                                  ? "border-black bg-gray-50 font-medium text-black"
                                  : "border-gray-200 text-gray-600 hover:border-gray-400"
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Selector de sucursal */
                    <div>
                      <Label className="text-sm font-medium text-black mb-3 block">
                        Elegí una sucursal
                      </Label>
                      <div className="space-y-2">
                        {SUCURSALES.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSucursal(s.id)}
                            className={`w-full p-4 border rounded-xl text-left transition-colors ${
                              sucursal === s.id ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            <p className="text-sm font-medium text-black">{s.nombre}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{s.dir}</p>
                            <p className="text-xs text-gray-400">{s.horario}</p>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        El retiro es sin costo. Te avisamos por email cuando el pedido esté listo.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800 h-11"
                    disabled={metodoEntrega === "envio" ? !franja : !sucursal}
                  >
                    Continuar al pago <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </form>
              </div>
            )}

            {/* ── PASO 3: PAGO ── */}
            {step === "pago" && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 shadow-sm">
                <button
                  className="text-sm text-gray-500 hover:text-black mb-6 flex items-center gap-1 transition-colors"
                  onClick={() => setStep("envio")}
                >
                  ← Volver
                </button>

                <h2 className="text-xl font-bold text-black mb-6">¿Cómo querés pagar?</h2>

                {/* Selector de método */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[
                    { key: "tarjeta" as MetodoPago, label: "Tarjeta", Icon: CreditCard },
                    { key: "transferencia" as MetodoPago, label: "Transferencia", Icon: Building2 },
                    { key: "mercadopago" as MetodoPago, label: "Mercado Pago", Icon: Smartphone },
                  ].map(({ key, label, Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setMetodoPago(key)}
                      className={`p-3 border rounded-xl text-center transition-colors ${
                        metodoPago === key ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon className={`h-5 w-5 mx-auto mb-1 ${metodoPago === key ? "text-black" : "text-gray-400"}`} />
                      <p className={`text-xs font-medium ${metodoPago === key ? "text-black" : "text-gray-500"}`}>
                        {label}
                      </p>
                    </button>
                  ))}
                </div>

                {/* ── Tarjeta ── */}
                {metodoPago === "tarjeta" && (
                  <form onSubmit={handleConfirmar} className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-700">Número de tarjeta</Label>
                      <Input placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required className="border-gray-300 mt-1 font-mono" maxLength={19} />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Nombre del titular</Label>
                      <Input placeholder="Como aparece en la tarjeta" value={cardTitular} onChange={(e) => setCardTitular(e.target.value)} required className="border-gray-300 mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-700">Vencimiento</Label>
                        <Input placeholder="MM / AA" value={cardVenc} onChange={(e) => setCardVenc(e.target.value)} required className="border-gray-300 mt-1" maxLength={7} />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-700">CVV</Label>
                        <Input placeholder="•••" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} required className="border-gray-300 mt-1" maxLength={4} type="password" />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm font-semibold text-black">
                      <span>Total a pagar</span>
                      <span>${(subtotal + shippingCost).toLocaleString("es-AR")}</span>
                    </div>
                    <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 h-11">
                      Confirmar pago · ${(subtotal + shippingCost).toLocaleString("es-AR")}
                    </Button>
                  </form>
                )}

                {/* ── Transferencia ── */}
                {metodoPago === "transferencia" && (
                  <div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-5">
                      <p className="text-sm font-medium text-black mb-3">Datos para la transferencia</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Alias</span>
                          <span className="font-mono font-medium text-black">ORALI.PASTAS</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">CBU</span>
                          <span className="font-mono text-black text-xs">0000003100014257689001</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Titular</span>
                          <span className="text-black">Orali S.A.</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-black">
                          <span>Monto a transferir</span>
                          <span>${(subtotal + shippingCost).toLocaleString("es-AR")}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-5">
                      Una vez transferido, envianos el comprobante por WhatsApp o email. Tu pedido se confirma al acreditar.
                    </p>
                    <Button className="w-full bg-black text-white hover:bg-gray-800 h-11" onClick={() => handleConfirmar()}>
                      Ya transferí, confirmar pedido
                    </Button>
                  </div>
                )}

                {/* ── Mercado Pago ── */}
                {metodoPago === "mercadopago" && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-[#009EE3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">MP</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Serás redirigido a Mercado Pago para completar el pago de forma segura.
                    </p>
                    <p className="text-2xl font-bold text-black mb-6">
                      ${(subtotal + shippingCost).toLocaleString("es-AR")}
                    </p>
                    <Button
                      className="w-full bg-[#009EE3] hover:bg-[#0088C7] text-white h-11"
                      onClick={() => handleConfirmar()}
                    >
                      Pagar con Mercado Pago
                    </Button>
                    <p className="text-xs text-gray-400 mt-3">
                      Tarjetas, cuotas sin interés y saldo MP
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Columna derecha: resumen sticky ── */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <OrderSummary />
            <StepSummaries />
          </div>

        </div>
      </div>
    </div>
  );
}
