import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import { useLayoutEffect, lazy } from "react";
import { useAuth } from "./context/UserContext";
import DefaultLayout from "./layouts/DefaultLayout";
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const PrivateOutlet = lazy(() => import("./routes/PrivateOutlet"));
const Verify = lazy(() => import("./routes/Verify"));
const ForgetPassword = lazy(
  () => import("./pages/forget-password/ForgetPassword")
);
const DetailProduct = lazy(() => import("./pages/detai-product/DetailProduct"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Shop = lazy(() => import("./pages/shop/Shop"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const Receive = lazy(() => import("./pages/checkout/Receive"));
const Search = lazy(() => import("./pages/search/Search"));
const ResetPassword = lazy(
  () => import("./pages/reset-password/ResetPassword")
);
const Wishlist = lazy(() => import("./pages/wishlist/Wishlist"));
const Order = lazy(() => import("./pages/order/Order"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));

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
                path: "/search",
                element: (
                  <DefaultLayout>
                    <Search />
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
                path: "/myorders",
                element: (
                  <DefaultLayout>
                    <Order />
                  </DefaultLayout>
                ),
              },
              {
                path: "/wishlist",
                element: (
                  <DefaultLayout>
                    <Wishlist />
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
              {
                path: "/*",
                element: (
                  <DefaultLayout>
                    <NotFound />
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
                path: "/*",
                element: (
                  <DefaultLayout>
                    <NotFound />
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
            path: "/change-password",
            element: (
              <DefaultLayout>
                <ResetPassword />
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
          {
            path: "/search",
            element: (
              <DefaultLayout>
                <Search />
              </DefaultLayout>
            ),
          },
          {
            path: "/*",
            element: (
              <DefaultLayout>
                <NotFound />
              </DefaultLayout>
            ),
          },
        ]
  );

  return element;
}

export default App;
