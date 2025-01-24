import { gql } from "@apollo/client";

export const GET_SHARINGS = gql`
  query GetSharings {
    sharings {
      _id
      userId
      sharingDescription
      sharingPaymentType
      sharingCategoryType
      sharingAmount
      sharingDate
    }
  }
`;

export const GET_SHARING = gql`
  query GetSharing($id: ID!) {
    sharing(sharingId: $id) {
      _id
      userId
      sharingDescription
      sharingPaymentType
      sharingCategoryType
      sharingAmount
      sharingDate
    }
  }
`;

export const GET_SHARINGS_STATISTICS = gql`
  query GetSharingsStatistics {
    categoryStatistics {
      category
      totalAmount
    }
  }
`;
