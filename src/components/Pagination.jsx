// src/components/Pagination.jsx
import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const Pagination = ({
  currentPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
  onPageChange,
}) => {
  const handlePrevPage = () => {
    if (hasPrevPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center w-full mt-4 mb-4">
      <button
        onClick={handlePrevPage}
        disabled={!hasPrevPage}
        className="mx-2 hover:underline cursor-pointer"
      >
        <GrFormPrevious />
      </button>
      <div className="flex items-center space-x-1 text-black">
        {renderPageNumbers()}
      </div>
      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className="mx-2 hover:underline cursor-pointer"
      >
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default Pagination;
