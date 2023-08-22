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
