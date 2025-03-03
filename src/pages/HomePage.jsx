import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "../components/Cards";
import ExpenceChart from "../components/ChartForExpence";

import ExpenseForm from "../components/ExpenseForm";
import { MdLogout } from "react-icons/md";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_EXPENSES_STATISTICS } from "../graphql/queries/expense.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const { data } = useQuery(GET_EXPENSES_STATISTICS);

  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "so'm",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  // State to store total sum of all expenses
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    console.log("Statistics Data:", data?.categoryStatisticsExpense);

    if (data?.categoryStatisticsExpense) {
      const categories = data.categoryStatisticsExpense.map(
        (stat) => stat.category
      );
      const totalAmounts = data.categoryStatisticsExpense.map(
        (stat) => stat.totalAmount
      );

      // Calculate total sum of all expenses
      const sum = totalAmounts.reduce((acc, curr) => acc + curr, 0);
      setTotalSum(sum);

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === "Laminad") {
          backgroundColors.push("rgba(75, 192, 192)");
          borderColors.push("rgba(75, 192, 192)");
        } else if (category === "Mashina xarajatlari") {
          backgroundColors.push("rgba(255, 99, 132)");
          borderColors.push("rgba(255, 99, 132)");
        } else if (category === "Soliq") {
          backgroundColors.push("rgba(54, 162, 235)");
          borderColors.push("rgba(54, 162, 235)");
        } else if (category === "Elektr") {
          backgroundColors.push("rgba(122, 142, 200)");
          borderColors.push("rgba(122, 142, 200)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [data]);

  const toggleExpenseForm = () => {
    setIsExpenseFormOpen(!isExpenseFormOpen);
  };

  // Helper function to get color for category
  const getCategoryColor = (category) => {
    if (category === "Laminad") return "rgba(75, 192, 192)";
    if (category === "Mashina xarajatlari") return "rgba(255, 99, 132)";
    if (category === "Soliq") return "rgba(54, 162, 235)";
    if (category === "Elektr") return "rgba(122, 142, 200)";
    return "rgba(128, 128, 128)"; // Default gray
  };

  // Helper function to calculate percentage
  const calculatePercentage = (amount) => {
    if (totalSum === 0) return 0;
    return ((amount / totalSum) * 100).toFixed(1);
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          {data?.categoryStatisticsExpense?.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-gray-800/20 rounded-lg shadow-lg">
              {/* <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]">
                <Doughnut data={chartData} />
              </div> */}

              {/* Data Information Panel */}
              <div className="w-full md:w-[360px] p-1 bg-gray-600/20 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  Xarajatlar ma'lumoti
                </h3>

                {/* Total Sum */}
                <div className="flex items-center justify-center mb-4 p-3 bg-gray-800/20 rounded-lg">
                  <p className="text-white font-bold">Jami:</p>
                  <span className="text-white font-medium pl-5">
                    {totalSum.toLocaleString("uz-UZ")} so'm
                  </span>
                </div>

                {/* Category List */}
                <div className="space-y-3">
                  {data?.categoryStatisticsExpense?.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-gray-800/20 hover:bg-gray-700/40 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: getCategoryColor(stat.category),
                          }}
                        ></div>
                        <span className="text-white">{stat.category}:</span>
                      </div>
                      <div className="flex flex-row items-end">
                        <span className="text-xs text-white font-medium pl-5">
                          {stat.totalAmount.toLocaleString("uz-UZ")} so'm
                        </span>
                        <span className="text-xs pl-5 text-gray-300">
                          ({calculatePercentage(stat.totalAmount)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Expense Form Accordion */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="border-rounded-lg shadow-lg overflow-hidden">
              {/* Accordion Header */}
              <button
                onClick={toggleExpenseForm}
                className="w-auto px-6 flex items-center border-blue-100 border-collapse justify-between text-white font-bold text-lg transition-all duration-300"
              >
                <span className="">
                  {isExpenseFormOpen ? "Yopish" : "Yangi qo'shish"}
                </span>
                <span>
                  {isExpenseFormOpen ? (
                    <FiMinusCircle className="h-6 w-6" />
                  ) : (
                    <FiPlusCircle className="h-6 w-6 pl-2" />
                  )}
                </span>
              </button>

              {/* Accordion Content */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpenseFormOpen
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6">
                  <ExpenseForm toggleExpenseForm={toggleExpenseForm} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
