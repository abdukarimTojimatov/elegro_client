// src/components/Filters.jsx
import React from "react";

const Filters = ({
  categories,
  category,
  onCategoryChange,
  limit,
  onLimitChange,
}) => {
  return (
    <div className="flex justify-start mb-4">
      <select
        onChange={onCategoryChange}
        value={category}
        className="border rounded p-2 text-black"
      >
        <option value="">Barchasi</option>
        {categories?.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
      <select
        onChange={onLimitChange}
        value={limit}
        className="border rounded p-2 ml-4 text-black"
      >
        <option value={1}>1</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default Filters;
