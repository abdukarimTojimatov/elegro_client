import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      username
      phoneNumber
    }
  }
`;

export const GET_USER_AND_EXPENCES = gql`
  query GetUserAndExpences($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      phoneNumber
      expences {
        _id
        description
        paymentType
        category
        amount
        date
      }
    }
  }
`;
