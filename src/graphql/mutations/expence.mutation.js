import { gql } from "@apollo/client";

export const CREATE_EXPENCE = gql`
  mutation CreateExpence($input: CreateExpenceInput!) {
    createExpence(input: $input) {
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

export const UPDATE_EXPENCE = gql`
  mutation UpdateExpence($input: UpdateExpenceInput!) {
    updateExpence(input: $input) {
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

export const DELETE_EXPENCE = gql`
  mutation DeleteExpence($expenceId: ID!) {
    deleteExpence(expencesId: $expenceId) {
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
