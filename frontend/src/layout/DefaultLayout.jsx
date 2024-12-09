import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import AppContent from "../components/AppContent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AllAssets from "../components/AllAssets";
import AllTransactions from "../components/AllTransactions";

const DefaultLayout = ({ authenticated, pageTitle }) => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login", { replace: true });
    }
  }, [authenticated, navigate]);

  return (
    authenticated && (
      <div className="bg-gray-100 max-w-sm mx-auto">
        <Header pageTitle={pageTitle} />
        {pageTitle === "dashboard" ? (
          <Dashboard />
        ) : pageTitle === "all-assets" ? (
          <AllAssets />
        ) : pageTitle === "all-transactions" ? (
          <AllTransactions />
        ) : (
          <Dashboard />
        )}
        <ToastContainer />
        {showToast && (
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        )}
        <Footer />
      </div>
    )
  );
};

export default React.memo(DefaultLayout);
