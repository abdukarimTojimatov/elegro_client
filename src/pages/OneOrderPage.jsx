import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_ORDER } from "../graphql/queries/order.query"; // Adjust the path as necessary
import { UPDATE_ORDER } from "../graphql/mutations/order.mutation"; // Adjust the path as necessary
import OrderFormSkeleton from "../skeletons/OrderFormSkeleton"; // Adjust the path as necessary
import toast from "react-hot-toast";

const OneOrderPage = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_ORDER, {
    variables: { id: id },
  });

  const [updateOrder, { loading: loadingUpdate }] = useMutation(UPDATE_ORDER, {
    refetchQueries: [{ query: GET_ORDER }], // Adjust as necessary
  });

  const [formData, setFormData] = useState({
    orderName: data?.order?.orderName || "",
    orderCustomerName: data?.order?.orderCustomerName || "",
    orderCustomerPhoneNumber: data?.order?.orderCustomerPhoneNumber || "",
    orderDescription: data?.order?.orderDescription || "",
    orderCategory: data?.order?.orderCategory || "",
    orderType: data?.order?.orderType || "",
    orderPaymentStatus: data?.order?.orderPaymentStatus || "unpaid",
    orderTotalAmount: data?.order?.orderTotalAmount || 0,
    orderExpensesAmount: data?.order?.orderExpensesAmount || 0,
    orderTotalPaid: data?.order?.orderTotalPaid || 0,
    orderTotalDebt: data?.order?.orderTotalDebt || 0,
    orderExpensesDescription: data?.order?.orderExpensesDescription || "",
    orderLocation: data?.order?.orderLocation || "",
    orderPayments: data?.order?.orderPayments || [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOrder({
        variables: {
          input: {
            ...formData,
            orderId: id,
          },
        },
      });
      toast.success("Order updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePaymentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPayments = [...formData.orderPayments];
    updatedPayments[index][name] = value;
    setFormData({ ...formData, orderPayments: updatedPayments });
  };

  const addPayment = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      orderPayments: [
        ...prevFormData.orderPayments,
        { paymentType: "", amount: 0, date: "" },
      ],
    }));
  };

  useEffect(() => {
    if (data) {
      setFormData({
        orderName: data?.order?.orderName,
        orderCustomerName: data?.order?.orderCustomerName,
        orderCustomerPhoneNumber: data?.order?.orderCustomerPhoneNumber,
        orderDescription: data?.order?.orderDescription,
        orderCategory: data?.order?.orderCategory,
        orderType: data?.order?.orderType,
        orderPaymentStatus: data?.order?.orderPaymentStatus,
        orderTotalAmount: data?.order?.orderTotalAmount,
        orderExpensesAmount: data?.order?.orderExpensesAmount,
        orderTotalPaid: data?.order?.orderTotalPaid,
        orderTotalDebt: data?.order?.orderTotalDebt,
        orderExpensesDescription: data?.order?.orderExpensesDescription,
        orderLocation: data?.order?.orderLocation,
        orderPayments: data?.order?.orderPayments || [],
      });
    }
  }, [data]);

  if (loading) return <OrderFormSkeleton />; // Adjust as necessary

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center gap-5 px-5 pb-5">
      <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
        Update this order
      </p>
      <form
        className="w-full max-w-4xl mx-auto flex flex-wrap gap-5 px-5"
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
            value={formData.orderName}
            onChange={handleInputChange}
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
            value={formData.orderCustomerName}
            onChange={handleInputChange}
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
            value={formData.orderCustomerPhoneNumber}
            onChange={handleInputChange}
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
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="orderDescription"
            name="orderDescription"
            type="text"
            required
            placeholder="Order Description"
            value={formData.orderDescription}
            onChange={handleInputChange}
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
            value={formData.orderCategory}
            onChange={handleInputChange}
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
            value={formData.orderType}
            onChange={handleInputChange}
          >
            <option value="">Select Type</option>
            <option value="market">Market</option>
            <option value="order">Order</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* PAYMENT STATUS */}
        <div className="flex-1 min-w-[250px]">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="orderPaymentStatus"
          >
            Payment Status
          </label>
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="orderPaymentStatus"
            name="orderPaymentStatus"
            required
            value={formData.orderPaymentStatus}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="unpaid">Unpaid</option>
            <option value="partiallyPaid">Partially Paid</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* EXPENSES DESCRIPTION */}
        <div className="flex-1 min-w-[250px]">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="orderExpensesDescription"
          >
            Expenses Description
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="orderExpensesDescription"
            name="orderExpensesDescription"
            type="text"
            placeholder="Expenses Description"
            value={formData.orderExpensesDescription}
            onChange={handleInputChange}
          />
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
            type="number"
            required
            placeholder="Total Amount"
            value={formData.orderTotalAmount}
            onChange={handleInputChange}
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
            type="number"
            placeholder="Expenses Amount"
            value={formData.orderExpensesAmount}
            onChange={handleInputChange}
          />
        </div>

        {/* TOTAL PAID */}
        <div className="flex-1 min-w-[250px]">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="orderTotalPaid"
          >
            Total Paid
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="orderTotalPaid"
            name="orderTotalPaid"
            type="number"
            placeholder="Total Paid"
            value={formData.orderTotalPaid}
            onChange={handleInputChange}
          />
        </div>

        {/* TOTAL DEBT */}
        <div className="flex-1 min-w-[250px]">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="orderTotalDebt"
          >
            Total Debt
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="orderTotalDebt"
            name="orderTotalDebt"
            type="number"
            placeholder="Total Debt"
            value={formData.orderTotalDebt}
            onChange={handleInputChange}
          />
        </div>

        {/* PAYMENT FIELDS */}
        {formData.orderPayments.map((payment, index) => (
          <div key={index} className="flex flex-wrap gap-5">
            <div className="flex-1 min-w-[250px]">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor={`paymentType-${index}`}
              >
                Payment Type
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id={`paymentType-${index}`}
                name="paymentType"
                value={payment.paymentType}
                onChange={(e) => handlePaymentChange(index, e)}
              >
                <option value="">Select Payment Type</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>

            <div className="flex-1 min-w-[250px]">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor={`amount-${index}`}
              >
                Amount
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id={`amount-${index}`}
                name="amount"
                type="number"
                value={payment.amount}
                onChange={(e) => handlePaymentChange(index, e)}
              />
            </div>

            <div className="flex-1 min-w-[250px]">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor={`date-${index}`}
              >
                Date
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id={`date-${index}`}
                name="date"
                type="date"
                value={payment.date}
                onChange={(e) => handlePaymentChange(index, e)}
              />
            </div>
          </div>
        ))}

        {/* ADD PAYMENT BUTTON */}
        <button
          type="button"
          onClick={addPayment}
          className="flex-1 min-w-[250px] text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600"
        >
          Add Payment
        </button>

        {/* SUBMIT BUTTON */}
        <button
          className="flex-1 min-w-[250px] text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600"
          type="submit"
          disabled={loadingUpdate}
        >
          {loadingUpdate ? "Updating..." : "Update Order"}
        </button>
      </form>
    </div>
  );
};

export default OneOrderPage;
