import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar, FaCalendarDays } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { DELETE_EXPENSE } from "../graphql/mutations/expense.mutation";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
};

const Card = ({ expense, authUser }) => {
  let { category, amount, date, paymentType, description, userId } = expense;
  const cardClass = categoryColorMap[category];
  const [deleteExpense, { loading }] = useMutation(DELETE_EXPENSE);

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
          <h2 className="text-lg font-bold text-white-900 bold">{category}</h2>
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
        <div className="text-white flex flex-col sm:flex-row w-full">
          <div className="flex items-start gap-1 sm:w-1/3">
            <span className="flex items-center mr-1">
              <BsCardText className="flex-shrink-0" />
            </span>
            <span className="font-normal flex-shrink-0">Xarajat haqida:</span>
          </div>
          <div className="sm:w-2/3 pl-6 sm:pl-0">
            <span className="text-gray-900  break-words w-full block">
              {description}
            </span>
          </div>
        </div>
        <div className="text-white flex flex-col sm:flex-row w-full">
          <div className="flex items-start gap-1 sm:w-1/3">
            <span className="flex items-center mr-1">
              <MdOutlinePayments className="flex-shrink-0" />
            </span>
            <span className="font-normal flex-shrink-0">To'lov turi:</span>
          </div>
          <div className="sm:w-2/3 pl-6 sm:pl-0">
            <span className=" text-gray-900  break-words w-full block">
              {paymentType}
            </span>
          </div>
        </div>
        <div className="text-white flex flex-col sm:flex-row w-full">
          <div className="flex items-start gap-1 sm:w-1/3">
            <span className="flex items-center mr-1">
              <FaSackDollar className="flex-shrink-0" />
            </span>
            <span className="font-normal flex-shrink-0">Miqdori:</span>
          </div>
          <div className="sm:w-2/3 pl-6 sm:pl-0 flex items-center">
            <span className=" text-gray-900 break-words">
              {amount.toLocaleString("uz-UZ")}
            </span>
            <span className="text-gray-900 ml-1">so'm</span>
          </div>
        </div>
        {/* <div className="text-white flex flex-col sm:flex-row w-full">
          <div className="flex items-start gap-1 sm:w-1/3">
            <span className="flex items-center mr-1">
              <FaCalendarDays className="flex-shrink-0" />
            </span>
            <span className="font-normal flex-shrink-0">Sana:</span>
          </div>
          <div className="sm:w-2/3 pl-6 sm:pl-0 flex items-center">
            <span className="text-gray-800 text-white-800 break-words">
              {date}
            </span>
          </div>
        </div> */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-xs break-words">{date}</span>
          <span className="text-gray-700 text-xs break-words">
            {userId?.username}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Card;
