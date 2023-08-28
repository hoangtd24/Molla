import { gql } from "@apollo/client";

export const GET_CARTS = gql`
  query getCarts {
    getCarts {
      code
      success
      message
      carts {
        id
        product {
          id
          name
          newPrice
          images
        }
        qty
        total
      }
      total
    }
  }
`;
