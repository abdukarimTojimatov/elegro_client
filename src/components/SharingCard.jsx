import React from "react";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_SHARING } from "../graphql/mutations/sharing.mutation";

const categoryColorMap = {
  Rozimuhammad: "from-green-700 to-green-400",
  Elmurod: "from-pink-800 to-pink-600",
  Egamberdi: "from-blue-700 to-blue-400",
};

const SharingCard = ({ sharing }) => {
  let {
    sharingCategoryType,
    sharingAmount,
    sharingDate,
    sharingPaymentType,
    sharingDescription,
    userId,
  } = sharing;
  console.log("userId", userId);
  const cardClass = categoryColorMap[sharingCategoryType];
  const [deleteSharing, { loading }] = useMutation(DELETE_SHARING);

  // Capitalize the first letter of the description
  sharingDescription =
    sharingDescription[0]?.toUpperCase() + sharingDescription.slice(1);
  sharingCategoryType =
    sharingCategoryType[0]?.toUpperCase() + sharingCategoryType.slice(1);
  sharingPaymentType =
    sharingPaymentType[0]?.toUpperCase() + sharingPaymentType.slice(1);

  const handleDelete = async () => {
    try {
      await deleteSharing({
        variables: { sharingId: sharing._id },
        refetchQueries: ["GetSharings", "CategoryStatisticsSharing"],
      });
      toast.success("Sharings deleted successfully");
    } catch (error) {
      console.error("Error deleting sharings:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {sharingCategoryType}
          </h2>
          <div className="flex items-center gap-2">
            {!loading && (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            )}
            {loading && (
              <div className="w-6 h-6 border-t-2 border-b-2  rounded-full animate-spin"></div>
            )}
            <Link to={`/sharings/${sharing._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Ulush haqida: {sharingDescription}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          To'lov turi: {sharingPaymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Miqdori: {sharingAmount.toLocaleString("uz-UZ")} so'm
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-black font-bold">{sharingDate}</span>
          <span className="text-xs text-black font-bold">
            {userId?.username}
          </span>
        </div>
      </div>
    </div>
  );
};
export default SharingCard;
