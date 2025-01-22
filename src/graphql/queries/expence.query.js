import { gql } from "@apollo/client";

export const GET_EXPENCES = gql`
  query GetExpences {
    expences {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const GET_EXPENCE = gql`
  query GetExpence($id: ID!) {
    expence(expenceId: $id) {
      _id
      description
      paymentType
      category
      amount
      location
      date
      user {
        name
        username
        profilePicture
      }
    }
  }
`;

export const GET_EXPENCES_STATISTICS = gql`
  query GetExpencesStatistics {
    categoryStatistics {
      category
      totalAmount
    }
  }
`;
