import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_EXPENCE } from "../graphql/mutations/expence.mutation";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

const Card = ({ expence, authUser }) => {
  let { category, amount, date, paymentType, description } = expence;
  const cardClass = categoryColorMap[category];
  const [deleteExpence, { loading }] = useMutation(DELETE_EXPENCE, {
    refetchQueries: ["GetExpences", "GetExpencesStatistics"],
  });

  // Capitalize the first letter of the description
  description = description[0]?.toUpperCase() + description.slice(1);
  category = category[0]?.toUpperCase() + category.slice(1);
  paymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);

  const handleDelete = async () => {
    try {
      console.log("expence", expence._id);
      await deleteExpence({
        variables: { expenceId: expence._id },
      });
      toast.success("Expences deleted successfully");
    } catch (error) {
      console.error("Error deleting expences:", error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className={"rounded-md p-4 bg-gradient-to-br from-green-700 to-green-400"}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{category}</h2>
          <div className="flex items-center gap-2">
            {!loading && (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            )}
            {loading && (
              <div className="w-6 h-6 border-t-2 border-b-2  rounded-full animate-spin"></div>
            )}
            <Link to={`/expences/${expence._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Xarajat haqida: {description}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          To'lov turi: {paymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Miqdori: {amount.toLocaleString("uz-UZ")} so'm
        </p>

        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">{date}</p>
          <img
            src={authUser?.profilePicture}
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
