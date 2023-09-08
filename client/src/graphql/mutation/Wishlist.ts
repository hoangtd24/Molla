import { gql } from "@apollo/client";

export const CREATE_WISHLIST = gql`
  mutation createWishlist($productId: Float!) {
    createWishlist(productId: $productId) {
      code
      success
      message
      wishlist {
        product {
          name
          price
          images
        }
      }
    }
  }
`;

export const REMOVE_WISHLIST = gql`
  mutation removeWishlist($wishlistId: Float!) {
    removeWishlist(wishlistId: $wishlistId) {
      code
      success
      message
    }
  }
`;

export const REMOVE_WISHLIST_BY_PRODUCT_ID = gql`
  mutation removeWishlistByProductId($productId: Float!) {
    removeWishlistByProductId(productId: $productId) {
      code
      success
      message
    }
  }
`;
