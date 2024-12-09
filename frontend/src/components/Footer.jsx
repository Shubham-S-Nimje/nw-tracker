import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4">
      <div className="flex flex-col items-center justify-center gap-1">
        <img
          src="/home-4-svgrepo-com.svg"
          alt="Networth Tracker Logo"
          className="w-1/3 self-center"
        />
        <p className="text-sm font-semibold text-[#024695]">Dashboard</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <img
          src="/financial2-svgrepo-com.svg"
          alt="Networth Tracker Logo"
          className="w-1/3 self-center"
        />
        <p className="text-sm font-semibold text-[#024695]">Insighis</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <img
          src="/rupee-circle-svgrepo-com.svg"
          alt="Networth Tracker Logo"
          className="w-1/3 self-center"
        />
        <p className="text-sm font-semibold text-[#024695]">Cashflow</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <img
          src="/group-svgrepo-com.svg"
          alt="Networth Tracker Logo"
          className="w-1/3 self-center"
        />
        <p className="text-sm font-semibold text-[#024695]">Advisory</p>
      </div>
    </div>
  );
};

export default Footer;
