import React, { useState } from "react";
import OrderForm from "../components/OrderForm";
import OrdersCards from "../components/OrdersCards";

const OrdersPage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Function to handle the accordion toggle
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  // This function can be called after creating the order to close the accordion
  const closeAccordion = () => {
    setIsAccordionOpen(false);
  };

  return (
    <div>
      <div className="accordion">
        <div onClick={toggleAccordion} className="cursor-pointer p-4 border ">
          <h2>{isAccordionOpen ? "Close Creating Order" : "Create Order"}</h2>
        </div>
        {isAccordionOpen && (
          <div className="accordion-content p-4">
            <OrderForm onCreateOrder={closeAccordion} />
          </div>
        )}
      </div>
      <OrdersCards />
    </div>
  );
};

export default OrdersPage;
