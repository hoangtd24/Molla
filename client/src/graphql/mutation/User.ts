import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      code
      success
      message
      user {
        id
        email
        username
      }
      accessToken
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      code
      success
      message
      user {
        email
        username
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Logout {
    logout {
      code
      success
      message
    }
  }
`;
