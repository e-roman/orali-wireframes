import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { Cart } from "./pages/Cart";
import { ProductDetail } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { Account } from "./pages/Account";
import { AccountOrders } from "./pages/AccountOrders";
import { FAQ } from "./pages/FAQ";
import { Contact } from "./pages/Contact";
import { Sucursales } from "./pages/Sucursales";
import { Terms } from "./pages/Terms";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/catalog",
    Component: Catalog,
  },
  {
    path: "/product/:id",
    Component: ProductDetail,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/checkout",
    Component: Checkout,
  },
  {
    path: "/order-confirmation/:orderId",
    Component: OrderConfirmation,
  },
  {
    path: "/account",
    Component: Account,
  },
  {
    path: "/account/orders",
    Component: AccountOrders,
  },
  {
    path: "/faq",
    Component: FAQ,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/sucursales",
    Component: Sucursales,
  },
  {
    path: "/terms",
    Component: Terms,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
