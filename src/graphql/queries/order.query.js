import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query GetOrders {
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
      orderPayments
      date
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($id: id!) {
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
      orderPayments
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
