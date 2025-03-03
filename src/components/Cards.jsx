import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_EXPENSES } from "../graphql/queries/expense.query";
import expenceCategories from "../constants/expenceCategories"; // Import categories
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const Cards = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default limit
  const [category, setCategory] = useState(""); // State for category filter
  const { data, loading } = useQuery(GET_EXPENSES, {
    variables: { page, limit, category }, // Include category in variables
  });

  const handleNextPage = () => {
    if (data?.getExpenses?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (data?.getExpenses?.hasPrevPage) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1); // Reset to first page when limit changes
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value); // Update category filter
    setPage(1); // Reset to first page when category changes
  };

  const renderPageNumbers = () => {
    const totalPages = data?.getExpenses?.totalPages || 1;
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
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

  // Check if there are no expenses
  const hasNoExpenses =
    !loading &&
    (!data?.getExpenses?.docs || data?.getExpenses?.docs.length === 0);

  return (
    <div className="w-full px-3 min-h-[40vh]">
      {/* Only show filters and pagination if there are expenses */}
      {!hasNoExpenses && (
        <>
          <p className="text-3xl font-bold text-center my-10">
            Barcha harajatlar
          </p>
          <div className="flex justify-between mb-4">
            <select
              onChange={handleCategoryChange}
              value={category}
              className="border rounded p-2 text-black p-4"
            >
              {expenceCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <select
              onChange={handleLimitChange}
              value={limit}
              className="border rounded text-black"
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
            </select>
            {/* <p className="text-lg">{page}-sahifa</p> */}
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
            {!loading &&
              data?.getExpenses?.docs.map((expense) => (
                <Card expense={expense} key={expense._id} />
              ))}
          </div>
          <div className="flex justify-center items-center w-full mt-4 mb-4">
            <button
              onClick={handlePrevPage}
              disabled={!data?.getExpenses?.hasPrevPage}
              className="mx-2 hover:underline cursor-pointer"
            >
              <GrFormPrevious />
            </button>
            <div className="flex items-center space-x-1 text-black">
              {renderPageNumbers()}
            </div>
            <button
              onClick={handleNextPage}
              disabled={!data?.getExpenses?.hasNextPage}
              className="mx-2 hover:underline cursor-pointer"
            >
              <MdNavigateNext />
            </button>
          </div>
        </>
      )}

      {/* Show "no expenses" message when there are no expenses */}
      {hasNoExpenses && (
        <div className="flex items-center justify-center h-[40vh]">
          <p className="text-4xl font-bold text-center">
            Harajatlar mavjud emas
          </p>
        </div>
      )}

      {/* Show loading indicator */}
      {loading && (
        <div className="flex justify-center items-center h-[40vh]">
          <div className="w-10 h-10 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Cards;
