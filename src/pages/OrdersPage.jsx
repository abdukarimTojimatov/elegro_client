import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ORDERS } from "../graphql/queries/order.query";
import { DELETE_ORDER } from "../graphql/mutations/order.mutation";
import { truncateText } from "../utils/formatDate";
import { FaLocationDot } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const OrdersPage = () => {
  const [page, setPage] = useState(1); // State for current page
  const [limit, setLimit] = useState(10); // State for items per page
  const [filters, setFilters] = useState({
    orderCategory: "",
    orderStatus: "",
    orderType: "",
    orderPaymentStatus: "",
  });

  const { loading, error, data } = useQuery(GET_ORDERS, {
    variables: { page, limit, ...filters }, // Pass pagination and filters to query
  });

  const [deleteOrder] = useMutation(DELETE_ORDER);

  const handleDelete = async (id) => {
    try {
      await deleteOrder({
        variables: { id },
        refetchQueries: ["GetOrders"],
      });
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error(error.message);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleNextPage = () => {
    if (data?.getOrders?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (data?.getOrders?.hasPrevPage) {
      setPage((prev) => prev - 1);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1); // Reset to first page when limit changes
  };

  const renderPagination = () => {
    const totalPages = data?.getOrders?.totalPages || 1;
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`mx-1 px-3 py-1 rounded ${
            page === i ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
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

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "tolandi":
        return "bg-gradient-to-r from-green-700 to-green-400";
      case "qismantolandi":
        return "bg-gradient-to-r from-pink-800 to-pink-500";
      case "tolanmadi":
        return "bg-gradient-to-r from-blue-700 to-blue-500";
      default:
        return "";
    }
  };

  return (
    <div>
      {data?.getOrders?.docs?.length === 0 ? (
        <Link
          to="/orders/create"
          className="bg-blue-500 text-white font-semibold py-2 px-4 ml-4 rounded shadow hover:bg-blue-600 transition duration-300 mb-4"
        >
          Buyurtma yaratish
        </Link>
      ) : (
        <div>
          <Link
            to="/orders/create"
            className="bg-blue-500 text-white font-semibold py-2 px-4 ml-4 rounded shadow hover:bg-blue-600 transition duration-300 mb-4"
          >
            Buyurtma yaratish
          </Link>
          <div className="filter-container shadow-md text-black p-4 flex flex-wrap gap-4">
            <select
              name="orderCategory"
              onChange={handleFilterChange}
              value={filters.orderCategory} // Bind value to state
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded"
            >
              <option value="">All Categories</option>
              <option value="oshxona">Oshxona</option>
              <option value="yotoqxona">Yotoqxona</option>
              <option value="yumshoq mebel">Yumshoq Mebel</option>
              <option value="boshqa">Boshqa</option>
            </select>
            <select
              name="orderStatus"
              onChange={handleFilterChange}
              value={filters.orderStatus} // Bind value to state
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded"
            >
              <option value="">All Statuses</option>
              <option value="qabul qilingan">Qabul Qilingan</option>
              <option value="tayyorlanayabdi">Tayyorlanayabdi</option>
              <option value="tayyor">Tayyor</option>
              <option value="ornatildi">Ornatildi</option>
            </select>
            <select
              name="orderType"
              onChange={handleFilterChange}
              value={filters.orderType} // Bind value to state
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded"
            >
              <option value="">All Types</option>
              <option value="bozor">Bozor</option>
              <option value="buyurtma">Buyurtma</option>
              <option value="boshqa">Boshqa</option>
            </select>
            <select
              name="orderPaymentStatus"
              onChange={handleFilterChange}
              value={filters.orderPaymentStatus} // Bind value to state
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded"
            >
              <option value="">All Payment Statuses</option>
              <option value="tolanmadi">Tolanmadi</option>
              <option value="qismanTolandi">Qisman Tolandi</option>
              <option value="tolandi">Tolandi</option>
            </select>
            <select
              onChange={handleLimitChange}
              value={limit}
              className="border rounded p-2 text-black"
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data.getOrders.docs.map((order) => (
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
                      Buyurtma qabul qilingan vaqti:
                    </span>
                    {order?.date}
                  </div>
                  <div className="text-sm mt-2">
                    <span className="font-semibold">
                      Buyurtma yetkazish vaqti:
                    </span>
                    {order?.orderReadyDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center w-full mt-4 mb-4">
            <button
              onClick={handlePrevPage}
              disabled={!data?.getOrders?.hasPrevPage}
              className="mx-2 hover:underline cursor-pointer"
            >
              Orqaga
            </button>
            <div className="flex items-center space-x-1 text-black">
              {renderPagination()}
            </div>
            <button
              onClick={handleNextPage}
              disabled={!data?.getOrders?.hasNextPage}
              className="mx-2 hover:underline cursor-pointer"
            >
              Oldinga
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
