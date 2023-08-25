import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
  mutation createReview($reviewInput: ReviewInput!) {
    createReview(reviewInput: $reviewInput) {
      code
      success
      message
    }
  }
`;

export const REVIEW_EMOTION = gql`
  mutation reviewEmotion($reviewId: Float!, $action: String!) {
    reviewEmotion(reviewId: $reviewId, action: $action) {
      code
      success
      message
      review {
        id
        content
        rating
        createdAt
        user {
          username
        }
        like {
          id
        }
        dislike {
          id
        }
      }
    }
  }
`;
