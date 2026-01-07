import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SuccessPage from "../pages/SuccessPage";
import ProtectedRoute from "./ProtectedRoute";

export const routesConfig = [
  { path: "/", element: ProductsPage },
  { path: "/product/:id", element: ProductDetailsPage },
  {
    path: "/cart",
    element: () => (
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: LoginPage },
  { path: "/register", element: RegisterPage },
  { path: "/success", element: SuccessPage },
];
