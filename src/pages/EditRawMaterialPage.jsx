import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_RAW_MATERIAL } from "../graphql/queries/rawMaterial.query";
import { UPDATE_RAW_MATERIAL } from "../graphql/mutations/rawMaterial.mutation";
// Import necessary components

const EditRawMaterialPage = ({ id }) => {
  const { loading, data } = useQuery(GET_RAW_MATERIAL, { variables: { id } });
  const [updateRawMaterial] = useMutation(UPDATE_RAW_MATERIAL);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData(data.getRawMaterial);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form fields for editing raw material */}
    </form>
  );
};

export default EditRawMaterialPage;
