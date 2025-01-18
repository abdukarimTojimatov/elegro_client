import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphql/queries/order.query";

const OrdersCards = () => {
  const { loading, data } = useQuery(GET_ORDERS);
  console.log("data", data);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data?.orders?.length) {
    return (
      <div className="text-center text-gray-500 p-4">
        No orders found. Create your first order above.
      </div>
    );
  }

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-500";
      case "partially_paid":
        return "bg-yellow-500";
      case "unpaid":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.orders.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
        >
          <div className="flex items-center justify-between pb-2 border-b">
            <h3 className="text-sm font-medium">
              #{order.orderAutoNumber} - {order.orderName}
            </h3>
            <span
              className={`${getPaymentStatusColor(
                order.orderPaymentStatus
              )} text-white text-xs px-2 py-1 rounded-full`}
            >
              {order.orderPaymentStatus}
            </span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="text-sm">
              <span className="font-semibold">Customer: </span>
              {order.orderCustomerName}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Phone: </span>
              {order.orderCustomerPhoneNumber}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Category: </span>
              {order.orderCategory}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Location: </span>
              {order.orderLocation}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-sm">
                <span className="font-semibold">Total: </span>$
                {order.orderTotalAmount}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Paid: </span>$
                {order.orderTotalPaid}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Expenses: </span>$
                {order.orderExpensesAmount}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Debt: </span>$
                {order.orderTotalDebt}
              </div>
            </div>
            <div className="text-sm mt-2">
              <span className="font-semibold">Date: </span>
              {new Date(order.date).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersCards;
