import { Route, Routes } from "react-router-dom";
import "./App.css";
import { publicRoutes } from "./routes";
function App() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        const Page = route.component;
        const Layout = route.layout;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
