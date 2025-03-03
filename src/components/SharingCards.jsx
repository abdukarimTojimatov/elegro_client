import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import SharingCard from "./SharingCard";
import { GET_SHARINGS } from "../graphql/queries/sharing.query";
import sharingCategories from "../constants/sharingCategories";
import Pagination from "./Pagination";
import Filters from "./Filters";

const SharingCards = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState("");
  const { data, loading } = useQuery(GET_SHARINGS, {
    variables: { page, limit, category },
  });

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const hasNoSharings =
    !loading &&
    (!data?.getSharings?.docs || data?.getSharings?.docs.length === 0);

  return (
    <div className="w-full px-3 min-h-[40vh]">
      <>
        <p className="text-3xl font-bold text-center my-10">
          Barcha taqsimotlar
        </p>

        <Filters
          categories={sharingCategories}
          category={category}
          onCategoryChange={handleCategoryChange}
          limit={limit}
          onLimitChange={handleLimitChange}
        />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
          {!loading &&
            data?.getSharings?.docs.map((sharing) => (
              <SharingCard sharing={sharing} key={sharing._id} />
            ))}
        </div>

        {data?.getSharings?.docs && data?.getSharings?.docs.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={data?.getSharings?.totalPages || 1}
            hasPrevPage={data?.getSharings?.hasPrevPage}
            hasNextPage={data?.getSharings?.hasNextPage}
            onPageChange={setPage}
          />
        )}
      </>
    </div>
  );
};

export default SharingCards;
