import { gql } from "@apollo/client";

export const GET_WISHLISTS = gql`
  query getWishlists {
    getWishlists {
      id
      product {
        id
        name
        price
        newPrice
        images
      }
    }
  }
`;
