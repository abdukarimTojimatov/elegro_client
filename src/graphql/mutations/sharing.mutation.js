import { gql } from "@apollo/client";

export const CREATE_SHARING = gql`
  mutation CreateSharing($input: CreateSharingInput!) {
    createSharing(input: $input) {
      _id
      sharingDescription
      sharingPaymentType
      sharingCategoryType
      sharingAmount
      sharingDate
    }
  }
`;

export const UPDATE_SHARING = gql`
  mutation UpdateSharing($input: UpdateSharingInput!) {
    updateSharing(input: $input) {
      _id
      sharingDescription
      sharingPaymentType
      sharingCategoryType
      sharingAmount
      sharingDate
    }
  }
`;

export const DELETE_SHARING = gql`
  mutation DeleteSharing($sharingId: ID!) {
    deleteSharing(sharingId: $sharingId) {
      _id
      sharingDescription
      sharingPaymentType
      sharingCategoryType
      sharingAmount
      sharingDate
    }
  }
`;
