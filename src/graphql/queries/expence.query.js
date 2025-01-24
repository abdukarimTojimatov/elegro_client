import { gql } from "@apollo/client";

export const GET_EXPENCES = gql`
  query GetExpences {
    expences {
      _id
      description
      paymentType
      category
      amount
      date
    }
  }
`;

export const GET_EXPENCE = gql`
  query GetExpence($expenceId: ID!) {
    expence(expenceId: $expenceId) {
      _id
      description
      paymentType
      category
      amount
      date
    }
  }
`;

export const GET_EXPENCES_STATISTICS = gql`
  query GetExpencesStatistics {
    categoryStatisticsExpense {
      category
      totalAmount
    }
  }
`;
