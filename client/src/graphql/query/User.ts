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
        phone
        address
      }
    }
  }
`;
