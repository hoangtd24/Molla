import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

type Props = {
  children: JSX.Element;
};

interface Route {
  path: string;
  component: () => JSX.Element;
  layout: ({ children }: Props) => JSX.Element;
}

export const publicRoutes: Route[] = [
  { path: "/login", component: Login, layout: DefaultLayout },
  { path: "/register", component: Register, layout: DefaultLayout },
  { path: "/", component: Home, layout: DefaultLayout },
];
