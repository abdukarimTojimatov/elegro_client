import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../graphql/mutations/order.mutation"; // Adjust the path as necessary
import toast from "react-hot-toast";

const OrderForm = () => {
  const [orderData, setOrderData] = useState({
    orderName: "",
    orderCustomerName: "",
    orderCustomerPhoneNumber: "",
    orderDescription: "",
    orderCategory: "",
    orderType: "",
    orderPaymentStatus: "unpaid", // Default payment status
    orderTotalAmount: 0,
    orderExpensesAmount: 0,
    orderTotalPaid: 0,
    orderTotalDebt: 0,
    orderExpensesDescription: "",
    orderLocation: "",
    orderPayments: [],
  });

  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    refetchQueries: ["GetOrders"], // Adjust as necessary
    onCompleted: () => {
      toast.success("Order created successfully");
      setOrderData({
        orderName: "",
        orderCustomerName: "",
        orderCustomerPhoneNumber: "",
        orderDescription: "",
        orderCategory: "",
        orderType: "",
        orderPaymentStatus: "unpaid",
        orderTotalAmount: 0,
        orderExpensesAmount: 0,
        orderTotalPaid: 0,
        orderTotalDebt: 0,
        orderExpensesDescription: "",
        orderLocation: "",
        orderPayments: [], // Reset to default payment object
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const numericFields = ["orderTotalAmount", "orderExpensesAmount"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder({ variables: { input: orderData } });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <form
      className="max-w-4xl mx-auto flex flex-wrap items-center gap-5 px-10 pb-5"
      onSubmit={handleSubmit}
    >
      {/* ORDER NAME */}
      <div className="flex-1 min-w-[250px]">
        <label
          className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
          htmlFor="orderName"
        >
          Order Name
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="orderName"
          name="orderName"
          type="text"
          required
          placeholder="Order Name"
          value={orderData.orderName}
          onChange={handleChange}
        />
      </div>

      {/* CUSTOMER NAME */}
      <div className="flex-1 min-w-[250px]">
        <label
          className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
          htmlFor="orderCustomerName"
        >
          Customer Name
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="orderCustomerName"
          name="orderCustomerName"
          type="text"
          required
          placeholder="Customer Name"
          value={orderData.orderCustomerName}
          onChange={handleChange}
        />
      </div>

      {/* CUSTOMER PHONE NUMBER */}
      <div className="flex-1 min-w-[250px]">
        <label
          className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
          htmlFor="orderCustomerPhoneNumber"
        >
          Customer Phone Number
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="orderCustomerPhoneNumber"
          name="orderCustomerPhoneNumber"
          type="text"
          placeholder="Customer Phone Number"
          value={orderData.orderCustomerPhoneNumber || "+998"} // Set default value
          onChange={handleChange}
          onFocus={(e) => {
            if (e.target.value === "") {
              e.target.value = "+998"; // Auto-fill on focus if empty
            }
          }}
          onBlur={(e) => {
            if (e.target.value === "+998") {
              e.target.value = "+998"; // Keep it as +998 if nothing else is entered
            }
          }}
        />
      </div>

      {/* LOCATION */}
      <div className="flex-1 min-w-[250px]">
        <label
          className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
          htmlFor="orderLocation"
        >
          Location
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="orderLocation"
          name="orderLocation"
          type="text"
          required
          placeholder="Location"
          value={orderData.orderLocation}
          onChange={handleChange}
        />
      </div>

      {/* CATEGORY */}
      <div className="flex-1 min-w-[250px]">
        <label
          className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
          htmlFor="orderCategory"
        >
          Order Category
        </label>
        <select
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="orderCategory"
          name="orderCategory"
          required
          value={orderData.orderCategory}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="bedroom">Bedroom</option>
          <option value="sofa">Sofa</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* TYPE */}
      <div className="flex-1 min-w-[250px]">
        <label
          className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
          htmlFor="orderType"
        >
          Order Type
        </label>
        <select
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="orderType"
          name="orderType"
          required
          value={orderData.orderType}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="market">Market</option>
          <option value="order">Order</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* TOTAL AMOUNT */}
      <div className="flex-1 min-w-[250px]">
        <label
          className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
          htmlFor="orderTotalAmount"
        >
          Total Amount
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="orderTotalAmount"
          name="orderTotalAmount"
          type="number" // Change type to number for numeric input
          required
          placeholder="Total Amount"
          value={orderData.orderTotalAmount}
          onChange={handleChange}
        />
      </div>

      {/* EXPENSES AMOUNT */}
      <div className="flex-1 min-w-[250px]">
        <label
          className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
          htmlFor="orderExpensesAmount"
        >
          Expenses Amount
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="orderExpensesAmount"
          name="orderExpensesAmount"
          type="number" // Change type to number for numeric input
          required
          placeholder="Expenses Amount"
          value={orderData.orderExpensesAmount}
          onChange={handleChange}
        />
      </div>

      {/* DESCRIPTION */}
      <div className="flex-1 min-w-[250px]">
        <label
          className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
          htmlFor="orderDescription"
        >
          Order Description
        </label>
        <textarea
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="orderDescription"
          name="orderDescription"
          required
          placeholder="Order Description"
          value={orderData.orderDescription}
          onChange={handleChange}
          rows={10} // Initial number of rows
          style={{ maxHeight: "200px", overflowY: "auto" }} // Set max height and enable vertical scrolling
        />
      </div>

      {/* EXPENSES DESCRIPTION */}
      <div className="flex-1 min-w-[250px]">
        <label
          className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
          htmlFor="orderExpensesDescription"
        >
          Expenses Description
        </label>
        <textarea
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none overflow-auto"
          id="orderExpensesDescription"
          name="orderExpensesDescription"
          required
          placeholder="Expenses Description"
          value={orderData.orderExpensesDescription}
          onChange={handleChange}
          rows={10} // Initial number of rows
          style={{ maxHeight: "200px", overflowY: "auto" }} // Set max height and enable vertical scrolling
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : "Create Order"}
      </button>
    </form>
  );
};

export default OrderForm;
