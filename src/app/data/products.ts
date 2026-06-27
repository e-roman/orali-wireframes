export interface Product {
  id: string;
  name: string;
  category:
    | "ravioles"
    | "sorrentinos-capeletti"
    | "noquis"
    | "fideos"
    | "tapas-empanadas"
    | "tapas-copetin"
    | "tapas-pascualinas"
    | "tortillas"
    | "empanadas-rellenas"
    | "especiales";
  pricePerUnit: number;
  unitsPerPack: number;
  description: string;
  dietary: ("sin-tacc" | "vegano" | "vegetariano" | "integral" | "sin-sal")[];
}

export const products: Product[] = [
  // ── Ravioles ─────────────────────────────────────────────────
  // Sin TACC: Ravioles Sin TACC
  // Vegano: espinaca(v), calabaza, remolacha y tofu, texturizado de soja
  // Vegetariano: ricota, espinaca, cuatro quesos, Sin TACC
  {
    id: "rav-01",
    name: "Ravioles de pollo",
    category: "ravioles",
    pricePerUnit: 1400,
    unitsPerPack: 3,
    description: "Ravioles rellenos de pollo desmenuzado con especias y verduras.",
    dietary: [],
  },
  {
    id: "rav-02",
    name: "Ravioles de ricota",
    category: "ravioles",
    pricePerUnit: 1350,
    unitsPerPack: 3,
    description: "Ravioles rellenos de ricota fresca. Clásico artesanal.",
    dietary: ["vegetariano"],
  },
  {
    id: "rav-03",
    name: "Ravioles de espinaca",
    category: "ravioles",
    pricePerUnit: 1350,
    unitsPerPack: 3,
    description: "Ravioles de masa verde con relleno de espinaca y ricota.",
    dietary: ["vegetariano"],
  },
  {
    id: "rav-04",
    name: "Ravioles de carne y espinaca",
    category: "ravioles",
    pricePerUnit: 1450,
    unitsPerPack: 3,
    description: "Ravioles rellenos de carne vacuna magra con espinaca salteada.",
    dietary: [],
  },
  {
    id: "rav-05",
    name: "Ravioles de cuatro quesos",
    category: "ravioles",
    pricePerUnit: 1500,
    unitsPerPack: 3,
    description: "Ravioles con relleno cremoso de cuatro quesos seleccionados.",
    dietary: ["vegetariano"],
  },
  {
    id: "rav-10",
    name: "Ravioles Sin TACC",
    category: "ravioles",
    pricePerUnit: 1600,
    unitsPerPack: 3,
    description: "Ravioles aptos para celíacos, elaborados con harina certificada.",
    dietary: ["sin-tacc", "vegetariano"],
  },
  {
    id: "rav-06",
    name: "Ravioles de espinaca (vegano)",
    category: "ravioles",
    pricePerUnit: 1400,
    unitsPerPack: 3,
    description: "Ravioles 100% veganos rellenos de espinaca salteada y tofu.",
    dietary: ["vegano"],
  },
  {
    id: "rav-07",
    name: "Ravioles de calabaza (vegano)",
    category: "ravioles",
    pricePerUnit: 1400,
    unitsPerPack: 3,
    description: "Ravioles veganos rellenos de calabaza asada con nuez moscada.",
    dietary: ["vegano"],
  },
  {
    id: "rav-08",
    name: "Ravioles de remolacha y tofu (vegano)",
    category: "ravioles",
    pricePerUnit: 1450,
    unitsPerPack: 3,
    description: "Masa rosada de remolacha con relleno de tofu ahumado y hierbas.",
    dietary: ["vegano"],
  },
  {
    id: "rav-09",
    name: "Ravioles de texturizado de soja (vegano)",
    category: "ravioles",
    pricePerUnit: 1400,
    unitsPerPack: 3,
    description: "Ravioles veganos con relleno de soja texturizada estilo boloñés.",
    dietary: ["vegano"],
  },

  // ── Sorrentinos y Capeletti ───────────────────────────────────
  // Vegetariano: los tres sorrentinos; Capeletti tiene carne → sin tag
  {
    id: "sor-01",
    name: "Sorrentinos cuatro quesos",
    category: "sorrentinos-capeletti",
    pricePerUnit: 1550,
    unitsPerPack: 3,
    description: "Sorrentinos grandes rellenos de cuatro quesos cremosos.",
    dietary: ["vegetariano"],
  },
  {
    id: "sor-02",
    name: "Sorrentinos ricota y espinaca",
    category: "sorrentinos-capeletti",
    pricePerUnit: 1500,
    unitsPerPack: 3,
    description: "Sorrentinos con relleno clásico de ricota y espinaca salteada.",
    dietary: ["vegetariano"],
  },
  {
    id: "sor-03",
    name: "Sorrentinos calabaza y muzzarella",
    category: "sorrentinos-capeletti",
    pricePerUnit: 1500,
    unitsPerPack: 3,
    description: "Sorrentinos rellenos de calabaza asada y muzzarella fundida.",
    dietary: ["vegetariano"],
  },
  {
    id: "sor-04",
    name: "Capeletti carne y espinaca",
    category: "sorrentinos-capeletti",
    pricePerUnit: 1480,
    unitsPerPack: 3,
    description: "Capeletti rellenos de carne vacuna magra y espinaca. Receta tradicional.",
    dietary: [],
  },

  // ── Ñoquis ────────────────────────────────────────────────────
  // Sin TACC: papa Sin TACC, espinaca Sin TACC
  // Sémola no lleva tag (es el "default" de la subcategoría)
  {
    id: "noq-01",
    name: "Ñoquis de sémola",
    category: "noquis",
    pricePerUnit: 1100,
    unitsPerPack: 3,
    description: "Ñoquis clásicos de sémola, tiernos y artesanales.",
    dietary: [],
  },
  {
    id: "noq-02",
    name: "Ñoquis de papa Sin TACC",
    category: "noquis",
    pricePerUnit: 1250,
    unitsPerPack: 3,
    description: "Ñoquis de papa artesanales aptos para celíacos.",
    dietary: ["sin-tacc"],
  },
  {
    id: "noq-03",
    name: "Ñoquis de espinaca Sin TACC",
    category: "noquis",
    pricePerUnit: 1300,
    unitsPerPack: 3,
    description: "Ñoquis verdes de espinaca y papa, aptos para celíacos.",
    dietary: ["sin-tacc"],
  },

  // ── Fideos ────────────────────────────────────────────────────
  // Integral: fettuccine integral
  // Clásico no lleva tag
  {
    id: "fid-01",
    name: "Fettuccine clásico",
    category: "fideos",
    pricePerUnit: 900,
    unitsPerPack: 3,
    description: "Fettuccine de pasta fresca elaborado diariamente. Corte ancho y uniforme.",
    dietary: [],
  },
  {
    id: "fid-02",
    name: "Fettuccine integral",
    category: "fideos",
    pricePerUnit: 950,
    unitsPerPack: 3,
    description: "Fettuccine elaborado con harina integral de trigo. Más fibra y nutrientes.",
    dietary: ["integral"],
  },

  // ── Tapas para empanadas ──────────────────────────────────────
  // Sin TACC: Sin Gluten  |  Sin Sal: Sin Sal  |  Integral: integral
  // Resto sin tag
  {
    id: "tap-01",
    name: "Tapas criolla L",
    category: "tapas-empanadas",
    pricePerUnit: 220,
    unitsPerPack: 12,
    description: "Tapas de masa criolla tamaño L para empanadas al horno o fritas.",
    dietary: [],
  },
  {
    id: "tap-02",
    name: "Tapas criolla XL",
    category: "tapas-empanadas",
    pricePerUnit: 230,
    unitsPerPack: 12,
    description: "Tapas de masa criolla tamaño XL para empanadas abundantes.",
    dietary: [],
  },
  {
    id: "tap-03",
    name: "Tapas hojaldre L",
    category: "tapas-empanadas",
    pricePerUnit: 280,
    unitsPerPack: 12,
    description: "Tapas de masa hojaldrada tamaño L. Crocantes al horno.",
    dietary: [],
  },
  {
    id: "tap-04",
    name: "Tapas hojaldre XL",
    category: "tapas-empanadas",
    pricePerUnit: 290,
    unitsPerPack: 12,
    description: "Tapas de hojaldre tamaño XL para empanadas grandes.",
    dietary: [],
  },
  {
    id: "tap-05",
    name: "Tapas para freír",
    category: "tapas-empanadas",
    pricePerUnit: 210,
    unitsPerPack: 12,
    description: "Tapas especialmente formuladas para freír. Crocantes y doradas.",
    dietary: [],
  },
  {
    id: "tap-06",
    name: "Tapas Sin Gluten",
    category: "tapas-empanadas",
    pricePerUnit: 380,
    unitsPerPack: 12,
    description: "Tapas aptas para celíacos. Elaboradas con harina sin TACC certificada.",
    dietary: ["sin-tacc"],
  },
  {
    id: "tap-07",
    name: "Tapas Sin Sal",
    category: "tapas-empanadas",
    pricePerUnit: 240,
    unitsPerPack: 12,
    description: "Tapas sin sal agregada, ideales para dietas hiposódicas.",
    dietary: ["sin-sal"],
  },
  {
    id: "tap-08",
    name: "Tapas integral",
    category: "tapas-empanadas",
    pricePerUnit: 260,
    unitsPerPack: 12,
    description: "Tapas de harina integral, más nutritivas y con mayor fibra.",
    dietary: ["integral"],
  },
  {
    id: "tap-09",
    name: "Tapas premium",
    category: "tapas-empanadas",
    pricePerUnit: 320,
    unitsPerPack: 12,
    description: "Tapas de masa premium con manteca seleccionada. Sabor diferencial.",
    dietary: [],
  },
  {
    id: "tap-10",
    name: "Tapas Alta Cocina",
    category: "tapas-empanadas",
    pricePerUnit: 360,
    unitsPerPack: 12,
    description: "Tapas gourmet para presentaciones sofisticadas. Masa delicada y fina.",
    dietary: [],
  },

  // ── Tapas para copetín y pastelitos ──────────────────────────
  // Sin filtros dietarios específicos
  {
    id: "cop-01",
    name: "Tapas para copetín",
    category: "tapas-copetin",
    pricePerUnit: 190,
    unitsPerPack: 12,
    description: "Tapas pequeñas para copetín, ideales como bocados de entrada.",
    dietary: [],
  },
  {
    id: "cop-02",
    name: "Tapas para pastelitos",
    category: "tapas-copetin",
    pricePerUnit: 200,
    unitsPerPack: 12,
    description: "Tapas cuadradas para pastelitos fritos. Masa esponjosa y dorada.",
    dietary: [],
  },

  // ── Tapas para pascualinas ────────────────────────────────────
  // Sin TACC: Sin TACC  |  Sin Sal: Sin Sal  |  Resto sin tag
  {
    id: "pas-01",
    name: "Tapas para pascualinas",
    category: "tapas-pascualinas",
    pricePerUnit: 350,
    unitsPerPack: 6,
    description: "Tapas redondas para pascualina. Masa hojaldrada artesanal.",
    dietary: [],
  },
  {
    id: "pas-02",
    name: "Tapas para pascualinas Sin TACC",
    category: "tapas-pascualinas",
    pricePerUnit: 480,
    unitsPerPack: 6,
    description: "Tapas para pascualina aptas para celíacos. Sin gluten certificado.",
    dietary: ["sin-tacc"],
  },
  {
    id: "pas-03",
    name: "Tapas para pascualinas Sin Sal",
    category: "tapas-pascualinas",
    pricePerUnit: 360,
    unitsPerPack: 6,
    description: "Tapas para pascualina sin sal agregada para dietas hiposódicas.",
    dietary: ["sin-sal"],
  },
  {
    id: "pas-04",
    name: "Tapas para pascualinas individual mix semillas",
    category: "tapas-pascualinas",
    pricePerUnit: 420,
    unitsPerPack: 4,
    description: "Tapas individuales con mix de semillas. Nutritivas y sabrosas.",
    dietary: [],
  },
  {
    id: "pas-05",
    name: "Tapas para Pascualinas Premium",
    category: "tapas-pascualinas",
    pricePerUnit: 500,
    unitsPerPack: 6,
    description: "Tapas de pascualina premium con manteca de primera calidad.",
    dietary: [],
  },
  {
    id: "pas-06",
    name: "Tapas para Pascualina individual hojaldre",
    category: "tapas-pascualinas",
    pricePerUnit: 460,
    unitsPerPack: 4,
    description: "Tapas individuales de hojaldre para pascualinas personales.",
    dietary: [],
  },

  // ── Tortillas ─────────────────────────────────────────────────
  // Integral: integrales, sarraceno y zanahoria, trigo y avena, trigo y arvejas
  // Sin Sal: Sin Sal
  // Resto sin tag
  {
    id: "tor-01",
    name: "Tortillas clásicas",
    category: "tortillas",
    pricePerUnit: 380,
    unitsPerPack: 4,
    description: "Tortillas de trigo clásicas, versátiles y esponjosas.",
    dietary: [],
  },
  {
    id: "tor-02",
    name: "Tortillas integrales",
    category: "tortillas",
    pricePerUnit: 400,
    unitsPerPack: 4,
    description: "Tortillas de harina integral con más fibra y valor nutricional.",
    dietary: ["integral"],
  },
  {
    id: "tor-03",
    name: "Tortillas de espinaca",
    category: "tortillas",
    pricePerUnit: 400,
    unitsPerPack: 4,
    description: "Tortillas verdes elaboradas con espinaca natural. Nutritivas y coloridas.",
    dietary: [],
  },
  {
    id: "tor-04",
    name: "Tortillas sabor cheddar",
    category: "tortillas",
    pricePerUnit: 420,
    unitsPerPack: 4,
    description: "Tortillas con sabor a cheddar, perfectas para burritos y wraps.",
    dietary: [],
  },
  {
    id: "tor-05",
    name: "Tortillas sabor pizza",
    category: "tortillas",
    pricePerUnit: 420,
    unitsPerPack: 4,
    description: "Tortillas con tomate, orégano y queso. Ideales para pizzetas rápidas.",
    dietary: [],
  },
  {
    id: "tor-06",
    name: "Tortillas Sin Sal",
    category: "tortillas",
    pricePerUnit: 390,
    unitsPerPack: 4,
    description: "Tortillas sin sal agregada para dietas hiposódicas.",
    dietary: ["sin-sal"],
  },
  {
    id: "tor-07",
    name: "Tortillas trigo sarraceno y zanahoria",
    category: "tortillas",
    pricePerUnit: 450,
    unitsPerPack: 4,
    description: "Tortillas con trigo sarraceno y zanahoria natural.",
    dietary: ["integral"],
  },
  {
    id: "tor-08",
    name: "Tortillas trigo y avena",
    category: "tortillas",
    pricePerUnit: 430,
    unitsPerPack: 4,
    description: "Tortillas con avena, más suaves y nutritivas.",
    dietary: ["integral"],
  },
  {
    id: "tor-09",
    name: "Tortillas trigo y arvejas",
    category: "tortillas",
    pricePerUnit: 430,
    unitsPerPack: 4,
    description: "Tortillas enriquecidas con harina de arvejas. Alta proteína vegetal.",
    dietary: ["integral"],
  },

  // ── Empanadas rellenas ────────────────────────────────────────
  // Vegano: lentejas, calabaza, vegetales, soja, humita(v), berenjena, soja picante, texturizados
  // Vegetariano: humita, espinaca+parmesano, cabutia y muzzarella
  // Resto sin tag (tienen carne o pollo)
  {
    id: "emp-01",
    name: "Empanadas de carne ahumada",
    category: "empanadas-rellenas",
    pricePerUnit: 700,
    unitsPerPack: 6,
    description: "Empanadas rellenas de carne vacuna ahumada cortada a cuchillo.",
    dietary: [],
  },
  {
    id: "emp-02",
    name: "Empanadas de pollo",
    category: "empanadas-rellenas",
    pricePerUnit: 680,
    unitsPerPack: 6,
    description: "Empanadas de pollo desmenuzado con cebolla, pimiento y especias.",
    dietary: [],
  },
  {
    id: "emp-03",
    name: "Empanadas de humita",
    category: "empanadas-rellenas",
    pricePerUnit: 650,
    unitsPerPack: 6,
    description: "Empanadas de choclo cremoso con albahaca. Receta tradicional norteña.",
    dietary: ["vegetariano"],
  },
  {
    id: "emp-04",
    name: "Empanadas de espinaca, parmesano y bechamel",
    category: "empanadas-rellenas",
    pricePerUnit: 670,
    unitsPerPack: 6,
    description: "Empanadas cremosas de espinaca con salsa bechamel y parmesano.",
    dietary: ["vegetariano"],
  },
  {
    id: "emp-05",
    name: "Empanadas de cabutia y muzzarella",
    category: "empanadas-rellenas",
    pricePerUnit: 670,
    unitsPerPack: 6,
    description: "Empanadas de zapallo cabutia asado con muzzarella fundida.",
    dietary: ["vegetariano"],
  },
  {
    id: "emp-06",
    name: "Empanadas de lentejas (vegano)",
    category: "empanadas-rellenas",
    pricePerUnit: 640,
    unitsPerPack: 6,
    description: "Empanadas veganas de lentejas con verduras y especias.",
    dietary: ["vegano"],
  },
  {
    id: "emp-07",
    name: "Empanadas de calabaza (vegano)",
    category: "empanadas-rellenas",
    pricePerUnit: 640,
    unitsPerPack: 6,
    description: "Empanadas veganas de calabaza asada con semillas y hierbas.",
    dietary: ["vegano"],
  },
  {
    id: "emp-08",
    name: "Empanadas de vegetales (vegano)",
    category: "empanadas-rellenas",
    pricePerUnit: 630,
    unitsPerPack: 6,
    description: "Empanadas veganas de verduras de estación salteadas.",
    dietary: ["vegano"],
  },
  {
    id: "emp-09",
    name: "Empanadas de soja (vegano)",
    category: "empanadas-rellenas",
    pricePerUnit: 640,
    unitsPerPack: 6,
    description: "Empanadas veganas de soja texturizada estilo carne.",
    dietary: ["vegano"],
  },
  {
    id: "emp-10",
    name: "Empanadas de humita (vegano)",
    category: "empanadas-rellenas",
    pricePerUnit: 640,
    unitsPerPack: 6,
    description: "Empanadas veganas de choclo cremoso sin lácteos.",
    dietary: ["vegano"],
  },
  {
    id: "emp-11",
    name: "Empanadas de berenjena (vegano)",
    category: "empanadas-rellenas",
    pricePerUnit: 630,
    unitsPerPack: 6,
    description: "Empanadas veganas de berenjena asada con tomate y albahaca.",
    dietary: ["vegano"],
  },
  {
    id: "emp-12",
    name: "Empanadas de soja picante (vegano)",
    category: "empanadas-rellenas",
    pricePerUnit: 650,
    unitsPerPack: 6,
    description: "Empanadas veganas de soja texturizada con toque picante.",
    dietary: ["vegano"],
  },
  {
    id: "tex-01",
    name: "Texturizado de soja carne",
    category: "empanadas-rellenas",
    pricePerUnit: 1300,
    unitsPerPack: 2,
    description: "Texturizado de soja sabor carne, ideal como sustituto vegano.",
    dietary: ["vegano"],
  },
  {
    id: "tex-02",
    name: "Texturizado de soja pollo",
    category: "empanadas-rellenas",
    pricePerUnit: 1300,
    unitsPerPack: 2,
    description: "Texturizado de soja sabor pollo, versátil y alto en proteínas.",
    dietary: ["vegano"],
  },

  // ── Especiales ────────────────────────────────────────────────
  // Sin filtros dietarios — productos misceláneos
  {
    id: "esp-01",
    name: "Miel cremosa",
    category: "especiales",
    pricePerUnit: 2800,
    unitsPerPack: 1,
    description: "Miel cremosa artesanal de producción local. 500g.",
    dietary: [],
  },
  {
    id: "esp-02",
    name: "Miel líquida",
    category: "especiales",
    pricePerUnit: 2600,
    unitsPerPack: 1,
    description: "Miel pura líquida de colmena local. 500g.",
    dietary: [],
  },
  {
    id: "esp-03",
    name: "Pionono",
    category: "especiales",
    pricePerUnit: 1800,
    unitsPerPack: 1,
    description: "Pionono fresco artesanal listo para rellenar. 40cm.",
    dietary: [],
  },
  {
    id: "esp-04",
    name: "Levadura prensada",
    category: "especiales",
    pricePerUnit: 400,
    unitsPerPack: 1,
    description: "Levadura prensada fresca para panadería y repostería. 100g.",
    dietary: [],
  },
];

// Top-level categories for Home page grid
export const categories = [
  { id: "pastas", name: "Pastas", icon: "🍝" },
  { id: "tapas", name: "Tapas", icon: "🫓" },
  { id: "empanadas-rellenas", name: "Empanadas rellenas", icon: "🥟" },
  { id: "especiales", name: "Especiales", icon: "✨" },
];
