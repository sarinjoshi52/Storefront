import { createBrowserRouter } from "react-router-dom";
import {
  CheckoutPage,
  HomePage,
  LoginPage,
  NotFound,
  ProductPage,
  SignUpPage,
  StoreLayout,
} from "./LazyImports";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  {
    path: "/",
    element: <StoreLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "products/:productId",
        element: <ProductPage />,
      },
      {
        path: "checkout/:productId?",
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
