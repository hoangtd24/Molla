import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateOutlet from "./routes/PrivateOutlet";
import Verify from "./routes/Verify";
import ForgetPassword from "./pages/forget-password/ForgetPassword";
import DetailProduct from "./pages/detai-product/DetailProduct";
import { useLayoutEffect } from "react";
import { useAuth } from "./context/UserContext";
import Cart from "./pages/cart/Cart";
import Shop from "./pages/shop/Shop";
import Checkout from "./pages/checkout/Checkout";
import Receive from "./pages/checkout/Receive";
function App() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { isAuthenticated } = useAuth();

  const element = useRoutes(
    isAuthenticated
      ? [
          {
            path: "",
            element: <PrivateOutlet />,
            children: [
              {
                path: "/",
                element: (
                  <DefaultLayout>
                    <Home />
                  </DefaultLayout>
                ),
              },
              {
                path: "/detail-product/:id",
                element: (
                  <DefaultLayout>
                    <DetailProduct />
                  </DefaultLayout>
                ),
              },
              {
                path: "/cart",
                element: (
                  <DefaultLayout>
                    <Cart />
                  </DefaultLayout>
                ),
              },
              {
                path: "/shop/:name",
                element: (
                  <DefaultLayout>
                    <Shop />
                  </DefaultLayout>
                ),
              },
              {
                path: "/checkout",
                element: (
                  <DefaultLayout>
                    <Checkout />
                  </DefaultLayout>
                ),
              },
              {
                path: "/checkout/receive/:id",
                element: (
                  <DefaultLayout>
                    <Receive />
                  </DefaultLayout>
                ),
              },
            ],
          },
          {
            path: "",
            element: <Verify />,
            children: [
              {
                path: "/login",
                element: (
                  <DefaultLayout>
                    <Login />
                  </DefaultLayout>
                ),
              },
              {
                path: "/register",
                element: (
                  <DefaultLayout>
                    <Register />
                  </DefaultLayout>
                ),
              },
              {
                path: "/forget-password",
                element: (
                  <DefaultLayout>
                    <ForgetPassword />
                  </DefaultLayout>
                ),
              },
            ],
          },
        ]
      : [
          {
            path: "/login",
            element: (
              <DefaultLayout>
                <Login />
              </DefaultLayout>
            ),
          },
          {
            path: "/register",
            element: (
              <DefaultLayout>
                <Register />
              </DefaultLayout>
            ),
          },
          {
            path: "/forget-password",
            element: (
              <DefaultLayout>
                <ForgetPassword />
              </DefaultLayout>
            ),
          },
          {
            path: "/",
            element: (
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            ),
          },
          {
            path: "/detail-product/:id",
            element: (
              <DefaultLayout>
                <DetailProduct />
              </DefaultLayout>
            ),
          },
          {
            path: "/shop/:name",
            element: (
              <DefaultLayout>
                <Shop />
              </DefaultLayout>
            ),
          },
        ]
  );

  return element;
}

export default App;
