import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      code
      success
      message
      user {
        username
        email
        cart {
          id
          product {
            name
            newPrice
            images
          }
          qty
        }
      }
    }
  }
`;
