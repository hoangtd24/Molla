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
