import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query Orders {
    orders {
      _id
      userId
      orderAutoNumber
      orderName
      orderCustomerName
      orderCustomerPhoneNumber
      orderDescription
      orderCategory
      orderType
      orderPaymentStatus
      orderTotalAmount
      orderExpensesAmount
      orderTotalPaid
      orderTotalDebt
      orderExpensesDescription
      orderLocation
      date
      orderPayments {
        paymentType
        amount
        date
      }
    }
  }
`;

export const GET_ORDER = gql`
  query Order($id: id!) {
    order(id: $id) {
      _id
      userId
      orderAutoNumber
      orderName
      orderCustomerName
      orderCustomerPhoneNumber
      orderDescription
      orderCategory
      orderType
      orderPaymentStatus
      orderTotalAmount
      orderExpensesAmount
      orderTotalPaid
      orderTotalDebt
      orderExpensesDescription
      orderLocation
      orderPayments {
        paymentType
        amount
        date
      }
      date
    }
  }
`;

export const GET_ORDER_STATISTICS = gql`
  query GetOrderStatistics {
    orderStatistics {
      orderCategory
      orderTotalAmount
    }
  }
`;
