import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "../components/Cards";
import ExpenceChart from "../components/ChartForExpence";

import ExpenseForm from "../components/ExpenseForm";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_EXPENSES_STATISTICS } from "../graphql/queries/expense.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const { data } = useQuery(GET_EXPENSES_STATISTICS);
  const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);
  const [logout, { loading, client }] = useMutation(LOGOUT);
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

  useEffect(() => {
    console.log("Statistics Data:", data?.categoryStatisticsExpense);

    if (data?.categoryStatisticsExpense) {
      const categories = data.categoryStatisticsExpense.map(
        (stat) => stat.category
      );
      const totalAmounts = data.categoryStatisticsExpense.map(
        (stat) => stat.totalAmount
      );

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

  const handleLogout = async () => {
    try {
      await logout({
        refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
      });
      client.resetStore();
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Har lahzani qadrlang
          </p>
          {!loading && (
            <MdLogout
              className="mx-2 w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>

        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          {data?.categoryStatisticsExpense?.length > 0 && (
            <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
              <Doughnut data={chartData} />
            </div>
          )}

          <ExpenseForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
