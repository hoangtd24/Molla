import { gql } from "@apollo/client";

export const GET_ORDER = gql`
  query getOrder($orderId: Float!) {
    getOrder(orderId: $orderId) {
      id
      carts {
        id
        product {
          name
        }
        qty
        total
      }
      payment {
        name
        desc
      }
      total
      createdAt
    }
  }
`;

export const PAGINATED_ORDER = gql`
  query Orders($limit: Float!, $cursor: String) {
    orders(limit: $limit, cursor: $cursor) {
      totalCount
      cursor
      hasMore
      paginatedOrders {
        id
        createdAt
        carts {
          product {
            name
            newPrice
          }
        }
        total
      }
    }
  }
`;
