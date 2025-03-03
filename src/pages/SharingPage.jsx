import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import SharingCards from "../components/SharingCards";
import SharingForm from "../components/SharingForm";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

import { GET_SHARINGS_STATISTICS } from "../graphql/queries/sharing.query";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const SharingPage = () => {
  const { data } = useQuery(GET_SHARINGS_STATISTICS);
  const [isSharingFormOpen, setIsSharingFormOpen] = useState(false);
  const [totalSum, setTotalSum] = useState(0);
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

  const toggleSharingForm = () => {
    setIsSharingFormOpen(!isSharingFormOpen);
  };
  useEffect(() => {
    if (data?.categoryStatisticsSharing) {
      const categories = data.categoryStatisticsSharing.map(
        (stat) => stat.category
      );
      const totalAmounts = data.categoryStatisticsSharing.map(
        (stat) => stat.totalAmount
      );

      // Calculate total sum of all sharings
      const sum = totalAmounts.reduce((acc, curr) => acc + curr, 0);
      setTotalSum(sum);

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === "Rozimuhammad") {
          backgroundColors.push("rgba(75, 192, 192)");
          borderColors.push("rgba(75, 192, 192)");
        } else if (category === "Elmurod") {
          backgroundColors.push("rgba(255, 99, 132)");
          borderColors.push("rgba(255, 99, 132)");
        } else if (category === "Egamberdi") {
          backgroundColors.push("rgba(54, 162, 235)");
          borderColors.push("rgba(54, 162, 235)");
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

  // Helper function to get color for category
  const getCategoryColor = (category) => {
    if (category === "Rozimuhammad") return "rgba(75, 192, 192)";
    if (category === "Elmurod") return "rgba(255, 99, 132)";
    if (category === "Egamberdi") return "rgba(54, 162, 235)";
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
          {data?.categoryStatisticsSharing?.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-gray-800/20 rounded-lg shadow-lg">
              {/* <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]">
                <Doughnut data={chartData} />
              </div> */}

              {/* Data Information Panel */}
              <div className="w-full md:w-[360px] p-1 bg-gray-600/20 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  Ulushlar ma'lumoti
                </h3>

                {/* Total Sum */}
                <div className="flex items-center justify-center mb-4 p-3 bg-gray-800/20 rounded-lg">
                  <p className="text-white font-bold">Jami:</p>
                  <span className="text-white font-medium pl-5">
                    {totalSum.toLocaleString("uz-UZ")} so'm
                  </span>
                </div>

                {/* Category Table */}
                <div className="overflow-hidden rounded-lg">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800/30">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Ism
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Miqdori
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          %
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800/10 divide-y divide-gray-700">
                      {data?.categoryStatisticsSharing?.map((stat, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                                style={{
                                  backgroundColor: getCategoryColor(
                                    stat.category
                                  ),
                                }}
                              ></div>
                              <span className="text-white text-sm">
                                {stat.category}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-right text-sm text-white">
                            {stat.totalAmount.toLocaleString("uz-UZ")} so'm
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-right text-sm text-gray-300">
                            {calculatePercentage(stat.totalAmount)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          <div className="w-full max-w-2xl mx-auto">
            <div className="border-rounded-lg shadow-lg overflow-hidden">
              {/* Accordion Header */}
              <button
                onClick={toggleSharingForm}
                className="w-auto px-6 flex items-center border-blue-100 border-collapse justify-between text-white font-bold text-lg transition-all duration-300"
              >
                <span className="">
                  {isSharingFormOpen ? "Yopish" : "Yangi qo'shish"}
                </span>
                <span>
                  {isSharingFormOpen ? (
                    <FiMinusCircle className="h-6 w-6" />
                  ) : (
                    <FiPlusCircle className="h-6 w-6 pl-2" />
                  )}
                </span>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isSharingFormOpen
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6">
                  <SharingForm toggleSharingForm={toggleSharingForm} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SharingCards />
      </div>
    </>
  );
};

export default SharingPage;
