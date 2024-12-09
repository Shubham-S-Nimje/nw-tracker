import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthApi } from "../services/Auth";
import { toast } from "react-toastify";
import { setAuthData } from "../redux/store";
import { storeUserInfo } from "../utils/storage";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const loading = useSelector((state) => state?.global?.loading);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsError("");

    try {
      if (email === "" || password === "") {
        throw new Error("Email and password are required.");
      }
      // console.log("Email:", email, "Password:", password);

      const data = await AuthApi.Login({
        email,
        password,
      });

      // console.log(data);

      if (data?.token) {
        storeUserInfo(data?.user, data?.token);
        dispatch(setAuthData(data?.user));
        navigate("/dashboard");
      }

      toast.success("Loged in Successfully!...");
    } catch (error) {
      console.error(error);
      setIsError(
        error?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  // console.log(loading);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm p-6 bg-white">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/login-banner.png"
            alt="Networth Tracker Logo"
            className="h-full"
          />
        </div>
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white rounded-lg font-medium ${
                loading
                  ? "bg-[#0890fe] cursor-not-allowed"
                  : "bg-[#024695] hover:bg-[#0890fe]"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Continue"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {isError && (
          <div className="my-4 text-red-500 text-sm text-center">{isError}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
