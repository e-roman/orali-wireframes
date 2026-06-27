# Auditoría de Wireframes — Tienda Orali
**Fecha:** Junio 2026 | **Estado:** Pre-validación con usuarios

---

## Resumen ejecutivo

El proyecto tiene una base sólida: las 5 pantallas principales del flujo de compra están implementadas y funcionan. Sin embargo, el **flujo de checkout está incompleto** (faltan los pasos de envío y pago), hay **páginas referenciadas en el footer que no existen**, la **categoría "Tapas" está mal nombrada** para el contexto del producto, y falta la sección de **Mi cuenta** que es crítica para usuarios que vuelven a comprar.

---

## ✅ Lo que está bien

| Pantalla | Estado |
|---|---|
| Home — Hero, categorías, destacados | Listo |
| Catálogo — filtros dietarios, búsqueda, grid | Listo |
| Detalle de producto — precio x pack, selector, zona de entrega | Listo |
| Checkout paso 1 — carrito con edición + progress mínimo | Listo |
| Checkout paso 2 — auth (Google, Apple, email/registro) | Listo |
| Confirmación de pedido — resumen + NPS | Listo |
| Navbar — categorías con dropdown, búsqueda, carrito | Listo |
| Progress bar de mínimo de compra (barra flotante) | Listo |
| Cart context con estado global | Listo |
| Toast feedback al agregar al carrito | Listo |

---

## 🔴 Crítico — Bloquea la validación

### 1. Checkout incompleto — faltan pasos de envío y pago

El flujo actual salta de "Cuenta" directo a la confirmación sin recopilar dirección ni método de pago. Para la validación esto es lo más importante porque son los pasos donde los usuarios tienen más fricción.

**Pasos que faltan:**

**Paso 3 — Dirección de entrega**
- Campo dirección (calle + número)
- Ciudad / barrio
- Código postal
- Referencia / instrucciones (opcional)
- Opción "usar dirección guardada" (si el usuario ya tiene cuenta)

**Paso 4 — Método y franja horaria**
- Selector de método: Envío a domicilio / Retiro en sucursal
- Si envío: selector de franja horaria (ej: Lunes 14-18, Martes 10-14, etc.)
- Si retiro: selector de sucursal con dirección y horario

**Paso 5 — Método de pago**
- Tarjeta de crédito/débito (campos: número, nombre, vencimiento, CVV)
- Transferencia bancaria (muestra CBU/alias y monto a transferir)
- Mercado Pago (redirige)
- El checkout debería mostrar el resumen del pedido en todo momento (columna lateral en desktop)

**Ajuste al stepper:** El indicador de pasos actual muestra solo "Carrito → Cuenta". Debe actualizarse a: **Carrito → Cuenta → Envío → Pago**.

---

### 2. Confirmación de pedido usa datos mock, no los del carrito real

`OrderConfirmation.tsx` línea 27-31: los items mostrados en el resumen están hardcodeados (`mockItems`). Esto ocurre porque `clearCart()` se llama antes de navegar. Para la validación, el usuario va a ver productos distintos a los que eligió.

**Fix:** Guardar el snapshot del carrito en el estado de la navegación (`state`) antes de hacer `clearCart()`, o capturarlo en el paso previo y pasarlo como parámetro.

---

## 🟡 Importante — Afecta flujos secundarios clave

### 3. Páginas del footer que no existen

Todos los links del footer apuntan a `#`. Para la validación con usuarios, estos links van a ser clickeados y van a confundir si no llevan a ningún lado.

| Link | Ruta sugerida | Prioridad |
|---|---|---|
| Preguntas Frecuentes | `/faq` | Alta — muy probable que lo busquen |
| Contacto | `/contact` | Alta |
| Sucursales | `/sucursales` | Media |
| Términos y condiciones | `/terms` | Baja |

Para los wireframes alcanza con una página placeholder que muestre el título y "Contenido próximamente", pero que sea navegable.

---

### 4. "Mi cuenta" no existe

El ícono de usuario en la navbar no hace nada. Un usuario que ya compró y quiere ver sus pedidos no tiene a dónde ir. Para la validación es importante porque varios escenarios de prueba van a involucrar "volver a comprar".

**Páginas a agregar:**

- `/account` — Vista general: datos del usuario, accesos rápidos
- `/account/orders` — Historial de pedidos (lista con estado: En preparación / En camino / Entregado)
- `/account/orders/:id` — Detalle de un pedido pasado (productos, precio total, dirección, estado de envío)

---

### 5. Categoría "Tapas" mal nombrada

En el contexto argentino, "tapas" significa las tapas de empanada (masa). Los productos que están en esa categoría son **salsas** (bolognesa, cuatro quesos, pesto). Esto va a generar confusión en usuarios.

**Fix:** Renombrar la categoría `tapas` → `salsas` en `products.ts`, `routes.tsx` y el Navbar. Actualizar el ícono (actualmente 🥫, que está bien para salsas).

---

### 6. No hay navegación mobile

La navbar colapsa en móvil pero no hay menú hamburguesa. El ícono de búsqueda no aparece en mobile. Dado que Orali probablemente tenga muchos usuarios mobile (compra de comida), esto es importante para la validación.

**Fix mínimo para wireframe:**
- Agregar botón hamburguesa en mobile que abra un Sheet/Drawer con los links de categorías
- Mostrar barra de búsqueda en mobile (colapsable o en la segunda fila de la navbar)

---

## 🟢 Mejoras menores — No bloquean pero suman calidad

### 7. No hay página 404

Cualquier URL incorrecta rompe la app sin feedback. Agregar una ruta `*` con página de error simple.

### 8. "¿Olvidaste tu contraseña?" falta en login

En `Checkout.tsx` el formulario de login no tiene link de recuperación de contraseña. Para usuarios en el modo "Iniciar sesión" esto es esperable.

### 9. Búsqueda funcional solo en catálogo

El input de búsqueda en la Navbar llama `onSearchChange` que solo existe en el catálogo. En Home o ProductDetail, buscar algo no tiene efecto visible. Para la validación, un usuario podría intentar buscar desde la Home sin resultado.

**Fix:** Hacer que al escribir en el input de búsqueda desde fuera del catálogo, navegue automáticamente a `/catalog?search=término`.

### 10. Sin límite máximo en selector de cantidad (ProductDetail)

Un usuario puede seleccionar 999 packs sin restricción. Para el wireframe conviene tener un límite razonable (ej: 20) o al menos validación de número positivo.

### 11. Imagen de producto es siempre placeholder

Todos los productos muestran solo el texto "Imagen" en gris. Para la validación con usuarios reales, tener al menos 2-3 imágenes de ejemplo (aunque sean ilustrativas) va a mejorar mucho la credibilidad del prototipo y la calidad del feedback.

---

## 📋 Checklist priorizado para wireframes finales

### Antes de validar — Obligatorio
- [ ] Agregar paso 3 de Checkout: Dirección de entrega
- [ ] Agregar paso 4 de Checkout: Método/franja horaria
- [ ] Agregar paso 5 de Checkout: Método de pago
- [ ] Actualizar stepper a 4 pasos (Carrito → Cuenta → Envío → Pago)
- [ ] Pasar datos reales del carrito a la confirmación
- [ ] Renombrar categoría "Tapas" → "Salsas"
- [ ] Agregar hamburger menu para mobile

### Antes de validar — Recomendado
- [ ] Agregar páginas placeholder para FAQ, Contacto, Sucursales, Términos
- [ ] Activar el ícono de Mi cuenta → `/account` (aunque sea placeholder)
- [ ] Agregar `/account/orders` con historial básico
- [ ] Hacer que la búsqueda desde la Home navegue al catálogo

### Puede esperar a la siguiente iteración
- [ ] Página 404
- [ ] "¿Olvidaste tu contraseña?"
- [ ] Imágenes de producto (al menos 2-3 reales)
- [ ] Límite máximo en selector de cantidad
- [ ] Detalle de pedido pasado con tracking

---

## Flujo completo esperado para validación

```
Home
  └─> Catálogo (con filtros)
        └─> Detalle de producto
              └─> [Agregar al carrito]
                    └─> Checkout: Carrito      (Paso 1)
                          └─> Checkout: Cuenta  (Paso 2) ← login/registro
                                └─> Checkout: Envío     (Paso 3) ← FALTA
                                      └─> Checkout: Pago (Paso 4) ← FALTA
                                            └─> Confirmación
                                                  └─> [Seguir comprando] → Catálogo
                                                  └─> [Mi cuenta] → /account/orders
```
