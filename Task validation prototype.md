# Task validation prototype
**Prototipo:** https://orali-wireframes.vercel.app/

---

## Tarea 1 — Descubrimiento y búsqueda
**Instrucción:** "Entrás al sitio por primera vez. Encontrá tapas para empanadas y agregá 1 pack al carrito."

**URL de éxito:** `https://orali-wireframes.vercel.app/catalog?category=tapas-empanadas`

**Qué valida:** navegación, buscador/categorías, primer contacto con el modelo de packs.

---

## Tarea 2 — Completar el mínimo
**Instrucción:** "Agregá suficientes packs para completar el mínimo de pedido."

**URL de éxito:** Free explore (el éxito es visual — barra completa + botón activo — no hay URL que lo refleje)

**⚠️ Aprendizaje:** La instrucción anterior pedía "iniciá el checkout" lo que generó confusión — los usuarios completaban el mínimo, entraban al checkout y daban la tarea por finalizada antes de que Maze registrara el éxito (que requería click en "Iniciar sesión"). Dato contaminado.

**Qué valida:** si el usuario entiende el concepto de mínimo de packs, si la barra de progreso comunica bien.

---

## Tarea 3 — Revisar el carrito
**Instrucción:** "Agregá 2 productos distintos al carrito y luego cambiá la cantidad de uno de ellos."

**URL de éxito:** Free explore (no hay URL que refleje el cambio de cantidad)

**Qué valida:** usabilidad del drawer, stepper, claridad del resumen.

---

## Tarea 4 — Checkout completo
**Instrucción:** "Completá el proceso de compra hasta la confirmación del pedido."

**URL de éxito:** `https://orali-wireframes.vercel.app/order-confirmation`

**Qué valida:** flujo de 3 pasos (cuenta → envío → pago), formulario mobile, claridad de las opciones de pago.

---

## Tarea 5 — Filtros en mobile
**Instrucción:** "Filtrá los productos para ver solo los Sin TACC."

**URL de éxito:** `https://orali-wireframes.vercel.app/catalog` (Free explore — el filtro no cambia la URL)

**Qué valida:** descubrimiento del botón Filtros, usabilidad del sheet.

---

## Notas para configurar en Maze
- Marcá como éxito que el usuario llegue a la pantalla correcta en cada tarea.
- Activá grabación de clicks en todas las tareas.
- Con 5 usuarios ya se ven patrones claros.
