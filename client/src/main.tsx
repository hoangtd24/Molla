import { ApolloProvider } from "@apollo/client";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { client } from "./api/apolloClient.ts";
import UserContextProvider from "./context/UserContext.tsx";
import SnackBar from "./components/SnackBar/SnackBar.tsx";
import SnackBarContextProvider from "./context/SnackBar.tsx";
import { LinearProgress } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <UserContextProvider>
          <SnackBarContextProvider>
            <Suspense fallback={<LinearProgress color="success" />}>
              <App />
            </Suspense>
            <SnackBar />
          </SnackBarContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);
