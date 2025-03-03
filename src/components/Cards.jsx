import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_EXPENSES } from "../graphql/queries/expense.query";
import expenseCategories from "../constants/expenceCategories";
import Pagination from "./Pagination";
import Filters from "./Filters";

const Cards = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState("");
  const { data, loading } = useQuery(GET_EXPENSES, {
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

  const hasNoExpenses =
    !loading &&
    (!data?.getExpenses?.docs || data?.getExpenses?.docs.length === 0);

  return (
    <div className="w-full px-3 min-h-[40vh]">
      {hasNoExpenses ? (
        <p className="flex items-center justify-center text-4xl font-bold text-center w-full min-h-[200px]">
          Harajatlar mavjud emas
        </p>
      ) : (
        <>
          <p className="text-3xl font-bold text-center my-10">
            Barcha harajatlar
          </p>

          <Filters
            categories={expenseCategories}
            category={category}
            onCategoryChange={handleCategoryChange}
            limit={limit}
            onLimitChange={handleLimitChange}
          />

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
            {!loading &&
              data?.getExpenses?.docs.map((expense) => (
                <Card expense={expense} key={expense._id} />
              ))}
          </div>

          {data?.getExpenses?.docs && data?.getExpenses?.docs.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={data?.getExpenses?.totalPages || 1}
              hasPrevPage={data?.getExpenses?.hasPrevPage}
              hasNextPage={data?.getExpenses?.hasNextPage}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Cards;
