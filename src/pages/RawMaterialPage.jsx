import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_RAW_MATERIALS } from "../graphql/queries/rawMaterial.query";
import RawMaterialCard from "../components/RawMaterialCard"; // Import the card component

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching raw materials.</div>;

  return (
    <div>
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
