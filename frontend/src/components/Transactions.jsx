import React, { useEffect, useState } from "react";
import { DashApi } from "../services/Dashboard";
import FormatToK from "../utils/FormatToK";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await DashApi.RecTxn();
        setTransactions(data?.recentTransactions);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    getTransactions(transactions);
  }, []);

  const handleSeeAllClick = () => {
    navigate("/all-transactions");
  };

  // console.log(transactions);

  return (
    <div className="mb-8 bg-white rounded-xl p-4">
      <div className="flex justify-between items-center font-bold text-[#024695]">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
        <button
          className="text-sm flex items-center"
          onClick={handleSeeAllClick}
        >
          See All
          <img
            src="/right-arrow-svgrepo-com.svg"
            alt="Networth Tracker Logo"
            className="w-6"
          />
        </button>
      </div>
      <ul className="my-4">
        {transactions.map((transaction, index) => (
          <li
            key={index}
            className="bg-white flex justify-between items-center border-b py-1"
          >
            <div>
              <p className="font-medium capitalize">{transaction.category}</p>
              <p className="text-sm uppercase text-gray-700">
                {transaction.assetName}{" "}
                <span className="text-xs">
                  * {transaction.accountNumber?.slice(-4)}
                </span>
              </p>
            </div>
            <p className="font-bold text-blue-600">
              ₹ {FormatToK(+transaction.amount)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
