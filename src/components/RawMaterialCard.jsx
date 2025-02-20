import React from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { DELETE_RAW_MATERIAL } from "../graphql/mutations/rawMaterial.mutation"; // Import the delete mutation
import toast from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
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
      <div className="flex space-x-2 justify-end">
        <FaTrash
          onClick={() => handleDelete(rawMaterial._id)}
          className="cursor-pointer hover:text-red-200"
        />
        <Link to={`/rawMaterial/${rawMaterial._id}`}>
          <FaEdit className="cursor-pointer hover:text-blue-200" />
        </Link>
      </div>
      <p className="text-white">
        {rawMaterial.rawMaterialCategory} nomi: {rawMaterial.rawMaterialName}
      </p>
      <p className="text-white">Izoh: {rawMaterial.rawMaterialDescription}</p>
      <p className="text-white">
        Jami miqdori:
        <span className="ml-2">{rawMaterial.rawMaterialQuantity}</span>
        {rawMaterial.unitOfMeasurement}
      </p>
      <p className="text-white">
        1 {rawMaterial.unitOfMeasurement} narxi:
        <span className="ml-2">
          {rawMaterial.rawMaterialPrice.toLocaleString("uz-UZ")} so'm
        </span>
      </p>
      <p className="text-white">
        Jami narxi:{" "}
        {rawMaterial?.rawMaterialTotalPrice?.toLocaleString("uz-UZ")}
        so'm
      </p>
      <p className="text-white">
        Jami to'landi:
        {rawMaterial.totalPaid.toLocaleString("uz-UZ")} so'm
      </p>
      <p className="text-white">
        Jami qarz:
        {rawMaterial.totalDebt.toLocaleString("uz-UZ")} so'm
      </p>
      <p className="text-white">
        Taminotchi:
        {rawMaterial.customerName}
      </p>
      <p className="text-white">
        Taminotchi raqami:
        {rawMaterial.phoneNumber}
      </p>
      <p className="text-white">
        To'lov holati:
        {rawMaterial.paymentStatus === false ? "qarz mavjud" : "to'langan"}
      </p>
    </div>
  );
};

export default RawMaterialCard;
