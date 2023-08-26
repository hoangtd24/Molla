import { gql } from "@apollo/client";

export const CREATE_CART = gql`
  mutation CreateCart($cartInput: CartInput!) {
    createCart(cartInput: $cartInput) {
      code
      success
      message
      cart {
        product {
          id
          name
          price
          images
        }
        user {
          id
          username
        }
        qty
      }
    }
  }
`;

export const DELETE_CART = gql`
  mutation DeleteCart($cartId: Float!) {
    delCart(cartId: $cartId) {
      code
      success
      message
    }
  }
`;
