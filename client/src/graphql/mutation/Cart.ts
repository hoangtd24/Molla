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

export const UPDATE_CART = gql`
  mutation updateCart($productId: Float!, $quantity: Float!) {
    updateCart(productId: $productId, quantity: $quantity) {
      code
      success
      message
      cart {
        id
        product {
          id
          name
          newPrice
          images
        }
        total
      }
    }
  }
`;

export const CLEAR_CART = gql`
  mutation deleteCarts($delCartsInput: delCartsInput!) {
    deleteCarts(delCartsInput: $delCartsInput) {
      code
      success
      message
    }
  }
`;
