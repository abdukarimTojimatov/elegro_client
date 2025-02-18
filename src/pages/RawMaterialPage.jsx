import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_RAW_MATERIALS } from "../graphql/queries/rawMaterial.query";
import RawMaterialCard from "../components/RawMaterialCard"; // Import the card component
import { Link } from "react-router-dom";

const RawMaterialsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { loading, error, data } = useQuery(GET_RAW_MATERIALS, {
    variables: { page, limit },
  });

  const handleNextPage = () => {
    if (data?.getRawMaterials?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (data?.getRawMaterials?.hasPrevPage) {
      setPage((prev) => prev - 1);
    }
  };

  const renderPagination = () => {
    const totalPages = data?.getOrders?.totalPages || 1;
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching raw materials.</div>;

  return (
    <div>
      <Link
        to="/rawMaterial/create"
        className="bg-blue-500 text-white font-semibold py-2 px-4 ml-4 rounded shadow hover:bg-blue-600 transition duration-300 mb-4"
      >
        Homashyolar yaratish
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data?.getRawMaterials?.docs.map((rawMaterial) => (
          <RawMaterialCard key={rawMaterial._id} rawMaterial={rawMaterial} />
        ))}
      </div>
      <div className="flex justify-center items-center w-full mt-4 mb-4">
        <button
          onClick={handlePrevPage}
          disabled={!data?.getRawMaterials?.hasPrevPage}
          className="mx-2 hover:underline cursor-pointer"
        >
          Previous
        </button>
        <div className="flex items-center space-x-1 text-black">
          {renderPagination()}
        </div>
        <button
          onClick={handleNextPage}
          disabled={!data?.getRawMaterials?.hasNextPage}
          className="mx-2 hover:underline cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RawMaterialsPage;
