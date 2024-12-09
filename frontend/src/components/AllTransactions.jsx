import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import FormatToK from "../utils/FormatToK";
import { TxnApi } from "../services/Transactions";
import formatDate from "../utils/formatDate";

ChartJS.register(ArcElement, Tooltip, Legend);

const AllTransactions = () => {
  const [txnData, setTxnData] = useState(null);
  const [totalData, setTotalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state?.global?.authData);

  const totals = useMemo(() => {
    if (!totalData) return { total: 0, expense: 0, income: 0 };
    return totalData?.reduce(
      (acc, category) => {
        acc.total += parseFloat(category.totalDebitAmount);
        if (category.type === "expense")
          acc.expense += parseFloat(category.totalExpenses);
        if (category.type === "income")
          acc.income += parseFloat(category.totalIncome);
        return acc;
      },
      { total: 0, expense: 0, income: 0 }
    );
  }, [totalData]);

  const chartsData = useMemo(() => {
    if (!totalData) return null;

    return {
      labels: totalData.map((category) => category.category),
      datasets: [
        {
          data: totalData.map((category) => parseFloat(category.totalExpenses)),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#FF9F40",
            "#FFCD56",
            "#36A2EB",
            "#FF6384",
            "#4BC0C0",
            "#FF9F40",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#FF9F40",
            "#FFCD56",
            "#36A2EB",
            "#FF6384",
            "#4BC0C0",
            "#FF9F40",
          ],
        },
      ],
    };
  }, [totalData]);

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
        const TxnResponse = await TxnApi.alltxn();
        // console.log(TxnResponse);
        setTxnData(TxnResponse?.transactions);
        setTotalData(TxnResponse?.aggregates);
      } catch (error) {
        console.error("Error fetching Assets data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssetsData();
  }, []);

  console.log(totalData);

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 bg-white rounded-xl p-4 text-left flex justify-between items-center">
        <p>Last 30 days</p>
        <img
          src="/right-arrow-svgrepo-com.svg"
          alt="Networth Tracker Logo"
          className="w-6"
        />
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl p-4 mb-6">
        {/* Total Summary */}
        <div className="flex justify-between bg-white mb-6">
          <div className="text-left font-semibold">
            <h3 className="text-gray-500 text-sm">Expense</h3>
            <p className="text-red-600 font-bold">
              ₹{FormatToK(+totals?.expense)}
            </p>
          </div>
          <div className="text-left font-semibold">
            <h3 className="text-gray-500 text-sm">Income</h3>
            <p className="text-blue-600 font-bold">
              ₹{FormatToK(+totals?.income)}
            </p>
          </div>
          <div className="text-left font-semibold">
            <h3 className="text-gray-500 text-sm">Total</h3>
            <p className="text-green-600 font-bold">
              ₹{FormatToK(+totals?.total)}
            </p>
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
        <div className="mt-4 flex flex-wrap justify-start items-center gap-2">
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
        <div className="bg-white p-4 rounded-xl ">
          <div className="flex justify-between text-lg font-semibold text-[#024695] mb-4">
            <p>Transactions</p>
          </div>
          {txnData?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-4 border rounded-xl p-2 my-3"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.assetName}
                </h3>
                <p className="text-xs capitalize font-medium text-gray-500">
                  {item.transactionType} Card
                  <span className="text-xs">
                    {"  "}*{item.accountNumber?.slice(-4)}
                  </span>
                </p>
                <p className="text-xs font-semibol capitalize border  w-fit py-1 px-2 my-2 rounded-lg">
                  {item.category}
                </p>
              </div>
              <div className="w-1/2 text-right">
                <p
                  className={`text-xl ${
                    item.transactionType === "debit"
                      ? "text-red-600"
                      : "text-green-600"
                  } font-semibold`}
                >
                  ₹{FormatToK(+item.amount)}
                </p>
                <p className="text-sm font-semibold">{formatDate(item.date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTransactions;
