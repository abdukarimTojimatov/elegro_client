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
import { DELETE_EXPENSE } from "../graphql/mutations/expense.mutation";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

const Card = ({ expense, authUser }) => {
  let { category, amount, date, paymentType, description, userId } = expense;
  const cardClass = categoryColorMap[category];
  const [deleteExpense, { loading }] = useMutation(DELETE_EXPENSE);

  // Capitalize the first letter of the description
  description = description[0]?.toUpperCase() + description.slice(1);
  category = category[0]?.toUpperCase() + category.slice(1);
  paymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);

  const handleDelete = async () => {
    try {
      console.log("Expense ID:", expense._id);
      await deleteExpense({
        variables: { id: expense._id },
        refetchQueries: ["GetExpenses", "GetExpensesStatistics"],
      });
      toast.success("Expenses deleted successfully");
    } catch (error) {
      console.error("Error deleting expenses:", error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className={"rounded-md p-4 bg-gradient-to-br from-green-700 to-green-400"}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white bold">{category}</h2>
          <div className="flex items-center gap-2">
            {!loading && (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            )}
            {loading && (
              <div className="w-6 h-6 border-t-2 border-b-2  rounded-full animate-spin"></div>
            )}
            <Link to={`/expenses/${expense._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Xarajat haqida:
          <span className="font-bold text-white-400">{description}</span>
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          To'lov turi:{" "}
          <span className="font-bold text-white-800">{paymentType}</span>
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Miqdori:{" "}
          <span className="font-bold text-white-800">
            {amount.toLocaleString("uz-UZ")}
          </span>{" "}
          so'm
        </p>

        <div className="flex justify-between items-center">
          <p className="text-xs text-white font-bold">{userId?.username}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
