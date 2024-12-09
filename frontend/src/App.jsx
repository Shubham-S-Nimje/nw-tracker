import React, { Component, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LocalStorageRepository from "./utils/storage";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from "./redux/store";

const loading = (
  <div className="pt-3 text-center">
    <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Page404 = React.lazy(() => import("./pages/page404/Page404"));
const Page500 = React.lazy(() => import("./pages/page500/Page500"));

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const authData = useSelector((state) => state?.global);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = LocalStorageRepository.get("access_token");
    const user = LocalStorageRepository.get("user");

    if (accessToken) {
      setAuthenticated(true);
      dispatch(setAuthData(user));
    } else {
      setAuthenticated(false);
    }
  }, [authData]);

  // console.log(authData, authenticated);

  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          {!authenticated ? (
            <Route
              exact
              path="/login"
              name="Login"
              element={<Login setAuthenticated={setAuthenticated} />}
            />
          ) : null}
          {authenticated ? (
            <>
              <Route
                path="/dashboard"
                name="Dashboard"
                element={
                  <DefaultLayout
                    authenticated={authenticated}
                    pageTitle={"dashboard"}
                  />
                }
              />
              <Route
                path="/all-assets"
                name="All Assets"
                element={
                  <DefaultLayout
                    authenticated={authenticated}
                    pageTitle={"all-assets"}
                  />
                }
              />
              <Route
                path="/all-transactions"
                name="All Transactions"
                element={
                  <DefaultLayout
                    authenticated={authenticated}
                    pageTitle={"all-transactions"}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
