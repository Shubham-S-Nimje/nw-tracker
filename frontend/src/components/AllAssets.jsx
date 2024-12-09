import React, { useEffect, useState, useMemo } from "react";
import { AssetsApi } from "../services/Assets";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import FormatToK from "../utils/FormatToK";

ChartJS.register(ArcElement, Tooltip, Legend);

const AllAssets = () => {
  const [assetsData, setAssetsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state?.global?.authData);

  // Calculating total expense, income, and assets
  const totals = useMemo(() => {
    if (!assetsData) return { total: 0, expense: 0, income: 0 };
    return assetsData.reduce(
      (acc, category) => {
        acc.total += parseFloat(category.total);
        if (category.type === "expense")
          acc.expense += parseFloat(category.total);
        if (category.type === "income")
          acc.income += parseFloat(category.total);
        return acc;
      },
      { total: 0, expense: 0, income: 0 }
    );
  }, [assetsData]);

  // Pie chart
  const chartsData = useMemo(() => {
    if (!assetsData) return null;
    return {
      labels: assetsData.map((category) => category.assetClass),
      datasets: [
        {
          data: assetsData.map((category) => parseFloat(category.total)),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
  }, [assetsData]);

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.save();
      ctx.font = "bold 16px Arial";
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Assets", width / 2, height / 2);
      ctx.restore();
    },
  };

  useEffect(() => {
    const fetchAssetsData = async () => {
      try {
        setLoading(true);
        const AssetsResponse = await AssetsApi.allassets();
        setAssetsData(AssetsResponse?.allAssets);
      } catch (error) {
        console.error("Error fetching Assets data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssetsData();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 bg-white shadow rounded-xl p-4 text-left flex justify-between items-center">
        <p>Last 30 days</p>
        <img
          src="/right-arrow-svgrepo-com.svg"
          alt="Networth Tracker Logo"
          className="w-6"
        />
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <div className="flex justify-between bg-white mb-6">
          <div className="text-left font-semibold">
            <h3 className="text-gray-500 text-sm">Expense</h3>
            <p className="text-red-600 font-bold">₹{totals.expense}</p>
          </div>
          <div className="text-left font-semibold">
            <h3 className="text-gray-500 text-sm">Income</h3>
            <p className="text-blue-600 font-bold">₹{totals.income}</p>
          </div>
          <div className="text-left font-semibold">
            <h3 className="text-gray-500 text-sm">Total</h3>
            <p className="text-green-600 font-bold">₹{totals.total}</p>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 mx-auto z-10">
          {chartsData && (
            <Pie
              data={chartsData}
              plugins={[centerTextPlugin]}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          )}
        </div>

        {/* Color-coded Labels */}
        <div className="mt-4 flex justify-center space-x-6">
          {chartsData?.labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor:
                    chartsData.datasets[0].backgroundColor[index],
                }}
              ></span>
              <span className="text-sm text-gray-600 z-50">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Categories */}
      {loading ? (
        <p>Loading assets...</p>
      ) : (
        assetsData?.map((category, index) => (
          <div key={index} className="mb-8 bg-white shadow rounded-lg p-4 ">
            <div className="flex justify-between text-lg font-semibold text-[#024695] mb-4">
              <p>{category.assetClass}</p>
              <p>₹{FormatToK(+category.total)}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-4 border rounded-xl p-2"
                >
                  <img
                    src={item.logo}
                    alt={`${item.assetName} Logo`}
                    className="w-12 h-12 rounded-full border"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.assetName}
                    </h3>
                    <p className="text-xs font-medium text-gray-500">
                      {item.accountNumber}
                    </p>
                  </div>
                  <p className="text-sm text-[#024695] font-bold">
                    ₹{FormatToK(+item.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllAssets;
