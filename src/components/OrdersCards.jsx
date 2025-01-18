import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphql/queries/order.query";
import { truncateText } from "../utils/formatDate";
import { FaLocationDot } from "react-icons/fa6";

const OrdersCards = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  console.log("data", data);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching orders:", error);
    return <div>Error fetching orders. Please try again later.</div>;
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
        return "bg-gradient-to-r from-green-700 to-green-500";
      case "partiallypaid":
        return "bg-gradient-to-r from-pink-800 to-pink-600";
      case "unpaid":
        return "bg-gradient-to-r from-blue-700 to-blue-500";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.orders.map((order) => (
        <div
          key={order._id}
          className={`${getPaymentStatusColor(
            order.orderPaymentStatus
          )} bg-black rounded-lg shadow-md hover:shadow-lg transition-shadow p-4`}
        >
          <div className="mt-3 space-y-2">
            <div className="text-sm">
              <span className="font-semibold">orderAutoNumber: </span>
              {order.orderAutoNumber}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Customer: </span>
              {truncateText(order.orderName, 30)}
            </div>
            <div className="text-sm">
              <span className="font-semibold">OrderName: </span>
              {truncateText(order.orderCustomerName, 15)}
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
              <span className="font-semibold">OrderType: </span>
              {order.orderType}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Location: </span>
              {order.orderLocation}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-sm">
                <span className="font-semibold">Total: </span>
                {order.orderTotalAmount}
              </div>
              <div className="text-sm pl-8">
                <span className="font-semibold">Paid: </span>
                {order.orderTotalPaid}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Expenses: </span>
                {order?.orderExpensesAmount}
              </div>
              <div className="text-sm pl-8">
                <span className="font-semibold">Debt: </span>
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
