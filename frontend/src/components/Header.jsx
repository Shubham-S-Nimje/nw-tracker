import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ pageTitle }) => {
  const navigate = useNavigate();

  // console.log(pageTitle);
  const handleBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-between items-center rounded-b-3xl bg-white p-7">
      {pageTitle === "dashboard" ? (
        <p className="bg-[#024695] text-white rounded-full py-2 md:py-2 px-2.5 md:px-3 text-xs md:text-normal font-semibold">
          VS
        </p>
      ) : (
        <button onClick={handleBackClick}>
          <img
            src="/arrow-left-5-svgrepo-com.svg"
            alt="Networth Tracker Logo"
            className="w-6"
          />
        </button>
      )}
      <p className="font-semibold text-xl md:text-2xl">
        {pageTitle === "dashboard"
          ? "Networth"
          : pageTitle === "all-assets"
          ? "Assets Allocation"
          : pageTitle === "all-transactions"
          ? "Transactions"
          : "Networth"}
      </p>
      <div>
        {pageTitle === "dashboard" && (
          <img src="/user-logo.png" alt="Networth Tracker Logo" className="" />
        )}
      </div>
    </div>
  );
};

export default Header;
