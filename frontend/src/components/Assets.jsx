import React, { useEffect, useState } from "react";
import { DashApi } from "../services/Dashboard";
import FormatToK from "../utils/FormatToK";
import { useNavigate } from "react-router-dom";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const recAssets = await DashApi?.RecAssets();
        setAssets(recAssets?.recentAssets);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    getData();
  }, []);

  const handleSeeAllClick = () => {
    navigate("/all-assets");
  };

  // console.log(assets);

  return (
    assets && (
      <div className="mb-8 bg-white rounded-xl p-4">
        <div className="flex justify-between items-center font-bold text-[#024695]">
          <h2 className="text-lg font-bold">Assets</h2>
          <button
            className="text-sm flex items-center"
            onClick={handleSeeAllClick}
          >
            See All{" "}
            <img
              src="/right-arrow-svgrepo-com.svg"
              alt="Networth Tracker Logo"
              className="w-6"
            />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 my-2">
          {assets.map((asset, index) => (
            <div
              key={index}
              className="flex items-center justify-start gap-2 bg-white shadow hover:shadow-[#a4a3a3] border rounded-xl py-1 px-2"
            >
              <img
                src={
                  asset.assetClass === "Bank"
                    ? "/bank-svgrepo-com.svg"
                    : asset.assetClass === "Saving"
                    ? "/saving-svgrepo-com.svg"
                    : asset.assetClass === "Emi"
                    ? "/loan-svgrepo-com.svg"
                    : asset.assetClass === "Credit CArd"
                    ? "/card-svgrepo-com.svg"
                    : asset.assetClass === "Investments"
                    ? "/money-bag-svgrepo-com"
                    : asset.assetClass === "Investent"
                    ? "/financial-svgrepo-com.svg"
                    : "/bank-svgrepo-com.svg"
                }
                alt="Networth Tracker Logo"
                className="w-1/5"
              />
              <div>
                <p className="">{asset.assetClass}</p>
                <p className="font-bold">₹ {FormatToK(+asset.total)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Assets;
