// src/components/OrderCard.js
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

const OrderCard = React.memo(({ order, onDelete }) => {
  const getPaymentStatusColor = (status) => {
    const statusColors = {
      tolandi: "bg-green-500",
      qismanTolandi: "bg-orange-500",
      tolanmadi: "bg-red-500",
    };
    return statusColors[status] || "bg-gray-500";
  };

  return (
    <div
      className={`
      ${getPaymentStatusColor(order.orderPaymentStatus)} 
      text-white rounded-lg shadow-md p-4 transition-all hover:scale-105
    `}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">#{order.orderAutoNumber}</span>
        <div className="flex space-x-2">
          <FaTrash
            onClick={() => onDelete(order._id)}
            className="cursor-pointer hover:text-red-200"
          />
          <Link to={`/orders/edit/${order._id}`}>
            <FaEdit className="cursor-pointer hover:text-blue-200" />
          </Link>
        </div>
      </div>
      <div className="space-y-1">
        <p>Name: {truncateText(order.orderName, 30)}</p>
        <p>Customer: {order.orderCustomerName}</p>
        <p>Total Amount: {order.orderTotalAmount} so'm</p>
        <p>Status: {order.orderStatus}</p>
        <p>Date: {formatDate(order.date)}</p>
      </div>
    </div>
  );
});

OrderCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    orderAutoNumber: PropTypes.string.isRequired,
    orderName: PropTypes.string.isRequired,
    orderCustomerName: PropTypes.string.isRequired,
    orderTotalAmount: PropTypes.number.isRequired,
    orderStatus: PropTypes.string.isRequired,
    orderPaymentStatus: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OrderCard;
