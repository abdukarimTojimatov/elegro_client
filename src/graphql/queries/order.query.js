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
      orderReadyDate
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
  query Order($orderId: ID!) {
    order(orderId: $orderId) {
      _id
      userId
      orderAutoNumber
      orderName
      orderCustomerName
      orderCustomerPhoneNumber
      orderDescription
      orderCategory
      orderType
      orderReadyDate
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
