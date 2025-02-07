import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_RAW_MATERIAL } from "../graphql/mutations/rawMaterial.mutation"; // Import the delete mutation
import toast from "react-hot-toast";

const RawMaterialCard = ({ rawMaterial }) => {
  const [deleteRawMaterial, { loading }] = useMutation(DELETE_RAW_MATERIAL);

  const handleDelete = async () => {
    try {
      await deleteRawMaterial({
        variables: { id: rawMaterial._id },
        refetchQueries: ["GetRawMaterials"], // Adjust according to your queries
      });
      toast.success("Raw material deleted successfully");
    } catch (error) {
      console.error("Error deleting raw material:", error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className={"rounded-md p-4 bg-gradient-to-br from-green-700 to-green-400"}
    >
      <h3 className="text-lg font-bold text-white">
        {rawMaterial.rawMaterialName}
      </h3>
      <p className="text-white">
        Description: {rawMaterial.rawMaterialDescription}
      </p>
      <p className="text-white">Quantity: {rawMaterial.rawMaterialQuantity}</p>
      <p className="text-white">
        Price: {rawMaterial.rawMaterialPrice.toLocaleString("uz-UZ")} so'm
      </p>
      <div className="flex justify-between items-center mt-4">
        <Link to={`/rawMaterial/${rawMaterial._id}`}>
          <button className="text-white hover:text-indigo-300">Edit</button>
        </Link>
        {!loading ? (
          <button
            onClick={handleDelete}
            className="text-white hover:text-red-500"
          >
            <FaTrash /> Delete
          </button>
        ) : (
          <div className="w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
};

export default RawMaterialCard;
