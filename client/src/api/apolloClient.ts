import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import axios from "axios";

const httpLink = createHttpLink({
  uri: `https://molla-shop-be.onrender.com/graphql`,
  credentials: "include",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  const token = localStorage.getItem("access_token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));
  return forward(operation);
});

const GetNewAccessToken = async () => {
  const res = await axios.get(
    `https://molla-shop-be.onrender.com/refresh_token`,
    {
      withCredentials: true,
    }
  );
  if (res.data && res.data.code === 403) {
    localStorage.removeItem("access_token");
    return "";
  }
  localStorage.setItem("access_token", res.data.accessToken);
  return res.data.accessToken;
};

export const logoutLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors && graphQLErrors[0].message === "jwt expired") {
    return new Observable((observer) => {
      (async () => {
        try {
          const newToken = await GetNewAccessToken();
          if (!newToken) {
            window.location.href = "/login";
            return;
          }
          // Modify the operation context with a new token
          const oldHeaders = operation.getContext().headers;

          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${newToken}`,
            },
          });

          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          };

          // Retry last failed request
          forward(operation).subscribe(subscriber);
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }
});

export const client = new ApolloClient({
  link: from([authMiddleware, logoutLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
    typePolicies: {
      Query: {
        fields: {
          getReviews: {
            keyArgs: ["productId"],
            merge(existing, incomming) {
              return {
                ...incomming,
                paginatedReviews: [
                  ...(existing?.paginatedReviews || []),
                  ...incomming.paginatedReviews,
                ],
              };
            },
          },
          orders: {
            keyArgs: ["productId"],
            merge(existing, incomming) {
              return {
                ...incomming,
                paginatedOrders: [
                  ...(existing?.paginatedOrders || []),
                  ...incomming.paginatedOrders,
                ],
              };
            },
          },
        },
      },
    },
  }),
});
