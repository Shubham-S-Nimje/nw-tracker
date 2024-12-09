import React from "react";

const Dashboard = React.lazy(() => import("./components/Dashboard"));

const Login = React.lazy(() => import("./components/Login"));

const routes = [
  { path: "/login", exact: true, name: "Login", element: Login },
  { path: "/dashboard", exact: true, name: "Dashboard", element: Dashboard },
];

export default routes;
