import { gql } from "@apollo/client";

export const GET_REVIEWS = gql`
  query getReview($limit: Float!, $cursor: String, $productId: Float!) {
    getReviews(limit: $limit, cursor: $cursor, productId: $productId) {
      totalCount
      cursor
      hasMore
      paginatedReviews {
        id
        content
        rating
        createdAt
        user {
          username
        }
      }
    }
  }
`;
