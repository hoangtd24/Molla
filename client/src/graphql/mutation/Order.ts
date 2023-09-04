import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder($orderInput: OrderInput!) {
    createOrder(orderInput: $orderInput) {
      code
      success
      order {
        id
        username
        email
        phone
        address
        carts {
          product {
            name
          }
          qty
        }
        total
        payment {
          id
        }
      }
    }
  }
`;
