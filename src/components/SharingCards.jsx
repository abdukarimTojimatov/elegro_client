import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import SharingCard from "./SharingCard";
import { GET_SHARINGS } from "../graphql/queries/sharing.query";
import sharingCategories from "../constants/sharingCategories"; // Import categories

const SharingCards = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default limit
  const [category, setCategory] = useState(""); // State for category filter
  const { data, loading } = useQuery(GET_SHARINGS, {
    variables: { page, limit, category }, // Include pagination and category in variables
  });

  const handleNextPage = () => {
    if (data?.getSharings?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (data?.getSharings?.hasPrevPage) {
      setPage((prev) => prev - 1);
    }
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
    const totalPages = data?.getSharings?.totalPages || 1;
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

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">Barcha taqsimotlar</p>
      <div className="flex justify-between mb-4">
        <select
          onChange={handleCategoryChange}
          value={category}
          className="border rounded p-2 text-black"
        >
          {sharingCategories?.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
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
        <p className="text-lg">
          Sahifa {page} of {data?.getSharings?.totalPages || 1}
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data?.getSharings?.docs.map((sharing) => (
            <SharingCard sharing={sharing} key={sharing._id} />
          ))}
      </div>
      {!loading && data?.getSharings?.length === 0 && (
        <p className="flex items-center justify-center text-4xl font-bold text-center w-full">
          Taqsimotlar mavjud emas
        </p>
      )}
      <div className="flex justify-center items-center w-full mt-4 mb-4">
        <button
          onClick={handlePrevPage}
          disabled={!data?.getSharings?.hasPrevPage}
          className="mx-2 hover:underline cursor-pointer"
        >
          Orqaga
        </button>
        <div className="flex items-center space-x-1 text-black">
          {renderPageNumbers()}
        </div>
        <button
          onClick={handleNextPage}
          disabled={!data?.getSharings?.hasNextPage}
          className="mx-2 hover:underline cursor-pointer"
        >
          Oldinga
        </button>
      </div>
    </div>
  );
};

export default SharingCards;
