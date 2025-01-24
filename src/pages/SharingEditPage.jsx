import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GET_SHARING,
  GET_SHARINGS_STATISTICS,
} from "../graphql/queries/sharing.query";
import { UPDATE_SHARING } from "../graphql/mutations/sharing.mutation";
import toast from "react-hot-toast";
import ExpenceFormSkeleton from "../skeletons/ExpenceFormSkeleton";

const SharingEditPage = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_SHARING, {
    variables: { id: id },
  });

  const [updateSharing, { loading: loadingUpdate }] =
    useMutation(UPDATE_SHARING);

  const [formData, setFormData] = useState({
    description: data?.sharing?.description || "",
    paymentType: data?.sharing?.paymentType || "",
    category: data?.sharing?.category || "",
    amount: data?.sharing?.amount || "",
    date: data?.sharing?.date || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    try {
      await updateSharing({
        variables: {
          input: {
            ...formData,
            amount,
            ExpenceId: id,
          },
        },
        refetchQueries: [{ query: GET_SHARINGS_STATISTICS }],
      });
      toast.success("Sharing updated successfully");
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

  useEffect(() => {
    if (data) {
      setFormData({
        description: data?.sharing?.description,
        paymentType: data?.sharing?.paymentType,
        category: data?.sharing?.category,
        amount: data?.sharing?.amount,
        date: data?.sharing?.date,
      });
    }
  }, [data]);

  if (loading) return <ExpenceFormSkeleton />;

  return (
    <div className="h-screen max-w-4xl mx-auto flex flex-col items-center">
      <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
        Ulushlarni o'zgartirish
      </p>
      <form
        className="w-full max-w-lg flex flex-col md:flex-col sm:flex-col  gap-5 px-3 "
        onSubmit={handleSubmit}
      >
        {/* SHARINGS */}
        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="description"
            >
              Xarajat izoh
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              name="description"
              type="text"
              placeholder="Rent, Groceries, Salary, etc."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
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
                onChange={handleInputChange}
                defaultValue={formData.paymentType}
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
        </div>
        {/* PAYMENT TYPE */}
        <div className="flex-1 mb-6 md:mb-0">
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
              onChange={handleInputChange}
              defaultValue={formData.category}
            >
              <option value="Laminad">Laminad</option>
              <option value="Mashina xarajatlari">Mashina xarajatlari</option>
              <option value="Soliq">Soliq</option>
              <option value="Elektr">Elektr</option>
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
        <div className="flex flex-wrap gap-3">
          {/* CATEGORY */}

          {/* LOCATION */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* AMOUNT */}
            <div className="flex-1 mb-6 md:mb-0">
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
                value={formData.amount}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* DATE */}
          <div className="flex-1">
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
              placeholder="Sanani tanlang"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <button
          className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600"
          type="submit"
          disabled={loadingUpdate}
        >
          {loadingUpdate ? "Updating..." : "Update Expences"}
        </button>
      </form>
    </div>
  );
};
export default SharingEditPage;
