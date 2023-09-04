import { gql } from "@apollo/client";

export const GET_PAYMENTS = gql`
  query getPayments {
    getPayments {
      id
      name
      desc
    }
  }
`;
