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

export const GET_USER_AND_EXPENSES = gql`
  query GetUserAndExpenses($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      phoneNumber
      expenses {
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
