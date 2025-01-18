import React from "react";
import OrderForm from "../components/OrderForm";
import OrdersCards from "../components/OrdersCards";

const OrdersPage = () => {
  return (
    <div>
      <OrderForm />
      <OrdersCards />
    </div>
  );
};

export default OrdersPage;
