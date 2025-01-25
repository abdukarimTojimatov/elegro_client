import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphql/queries/order.query";
import { truncateText } from "../utils/formatDate";
import { FaLocationDot } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { DELETE_ORDER } from "../graphql/mutations/order.mutation";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";

const OrdersPage = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  console.log("date", data);
  const [deleteOrder] = useMutation(DELETE_ORDER);
  const handleDelete = async (orderId) => {
    try {
      await deleteOrder({
        variables: { orderId },
        refetchQueries: ["Orders"],
      });
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error(error.message);
    }
  };

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
        Buyurtmalar mavjud emas.
      </div>
    );
  }

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "tolandi":
        return "bg-gradient-to-r from-green-700 to-green-400";
      case "qismanTolandi":
        return "bg-gradient-to-r from-pink-800 to-pink-500";
      case "tolanmadi":
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
          )} rounded-lg shadow-md hover:shadow-lg transition-shadow p-4`}
        >
          <div className="mt-3 space-y-2">
            <div className="text-sm">
              <span className="font-semibold">Buyurtma raqami: </span>
              {order.orderAutoNumber}
              <div className="text-sm float-right space-x-2 flex items-center">
                <FaTrash
                  className={"cursor-pointer"}
                  onClick={() => handleDelete(order._id)}
                />
                <Link to={`/orders/${order._id}`}>
                  <HiPencilAlt className="cursor-pointer" size={20} />
                </Link>
              </div>
            </div>
            <div className="text-sm">
              <span className="font-semibold">Buyurtma nomi: </span>
              {truncateText(order.orderName, 30)}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Mijoz: </span>
              {truncateText(order.orderCustomerName, 15)}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Telefon raqam: </span>
              {order.orderCustomerPhoneNumber}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Kategoriya: </span>
              {order.orderCategory}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Buyurtma turi: </span>
              {order.orderType}
            </div>
            <div className="text-sm">
              <span className="font-semibold">To'lov holati: </span>
              {order.orderPaymentStatus}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Buyurtma holati: </span>
              {order.orderStatus}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Manzil: </span>
              {order.orderLocation}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-sm">
                <span className="font-semibold">Jami: </span>
                {order.orderTotalAmount} so'm
              </div>
              <div className="text-sm pl-8">
                <span className="font-semibold">To'landi: </span>
                {order.orderTotalPaid} so'm
              </div>
              <div className="text-sm">
                <span className="font-semibold">Xarajatlar: </span>
                {order?.orderExpensesAmount} so'm
              </div>
              <div className="text-sm pl-8">
                <span className="font-semibold">Qarz: </span>
                {order.orderTotalDebt} so'm
              </div>
            </div>
            <div className="text-sm mt-2">
              <span className="font-semibold">
                Buyurtma qabul qilingan vaqti:{" "}
              </span>
              {order?.date}
            </div>
            <div className="text-sm mt-2">
              <span className="font-semibold">Buyurtma yetkazish vaqti: </span>
              {order?.orderReadyDate}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
