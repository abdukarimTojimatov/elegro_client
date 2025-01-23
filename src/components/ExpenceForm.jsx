import React from "react";

import { useMutation } from "@apollo/client";
import { CREATE_EXPENCE } from "../graphql/mutations/expence.mutation";
import toast from "react-hot-toast";

const ExpenceForm = () => {
  const [createExpence, { loading }] = useMutation(CREATE_EXPENCE, {
    refetchQueries: ["GetExpencess", "GetExpencesStatistics"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const expenceData = {
      description: formData.get("description"),
      paymentType: formData.get("paymentType"),
      category: formData.get("category"),
      amount: parseFloat(formData.get("amount")),
      date: formData.get("date"),
    };

    try {
      await createExpence({ variables: { input: expenceData } });
      form.reset();
      toast.success("Expence created successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      className="w-full max-w-lg flex flex-col gap-5 px-3"
      onSubmit={handleSubmit}
    >
      {/* EXPENCES */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="description"
          >
            Xarajat haqida
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
            name="description"
            type="text"
            required
            placeholder="Rent, Groceries, Salary, etc."
          />
        </div>
      </div>
      {/* PAYMENT TYPE */}
      <div className="flex flex-wrap gap-3">
        <div className="w-full flex-1 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="paymentType"
          >
            To'lov turi
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="paymentType"
              name="paymentType"
            >
              <option value={"plastik"}>plastik</option>
              <option value={"naqd"}>naqd</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="w-full flex-1 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="category"
          >
            Kategoriya
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="category"
              name="category"
            >
              <option value={"Laminad"}>Laminad</option>
              <option value={"Mashina xarajatlari"}>Mashina xarajatlari</option>
              <option value={"Soliq"}>Soliq</option>
              <option value={"Elektr"}>Elektr</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* LOCATION */}
      <div className="flex flex-wrap gap-3">
        {/* DATE */}
        {/* AMOUNT */}
        <div className="w-full flex-1 mb-6 md:mb-0">
          <label
            className="block uppercase text-white text-xs font-bold mb-2"
            htmlFor="amount"
          >
            Miqdori (so'm)
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="amount"
            name="amount"
            type="number"
            placeholder="150"
          />
        </div>
        <div className="w-full flex-1">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="date"
          >
            Sana
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white"
            placeholder="Select date"
          />
        </div>
      </div>
      {/* SUBMIT BUTTON */}
      <button
        className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600
						disabled:opacity-70 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : "Xarajat qo'shish"}
      </button>
    </form>
  );
};

export default ExpenceForm;
