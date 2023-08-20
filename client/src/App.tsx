import { useRoutes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateOutlet from "./routes/PrivateOutlet";
import Verify from "./routes/Verify";
import ForgetPassword from "./pages/forget-password/ForgetPassword";
import DetailProduct from "./pages/detai-product/DetailProduct";
function App() {
  const element = useRoutes([
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
        {
          path: "/detail-product/:id",
          element: (
            <DefaultLayout>
              <DetailProduct />
            </DefaultLayout>
          ),
        },
      ],
    },
  ]);

  return element;
}

export default App;
