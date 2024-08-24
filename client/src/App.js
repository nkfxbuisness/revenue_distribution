import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

//pages
import UserHomePage from "../src/pages/UserHomePage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminHomePage from "./pages/AdminHomePage";

// userComponents
import Dashboard from "./components/userPage/Dashboard";
import Referral from "./components/userPage/Referral";
import Wallet from "./components/userPage/Wallet";
import Withdraw from "./components/userPage/Withdraw";
import Teams from "./components/userPage/Teams";
import ActiveAccount from "./components/userPage/ActiveAccount";

// adminComponents
import AccountActivation from "./components/adminPage/AccountActivation";
import WithdrawlRequest from "./components/adminPage/WithdrawlRequests";
import ProfitUpdate from "./components/adminPage/ProfiltUpdate";
import UpdateDiposite from "./components/adminPage/UpdateDiposite";
import CreateAdmin from "./components/adminPage/CreateAdmins";
import ComissionDistribution from "./components/adminPage/ComissionDistribution";
import AccountActivationList from "./components/adminPage/AccountActivationList";
import LoginPage from "./pages/LoginPage";
import AdminLogin from "./pages/AdminLogin";
import UserContext, { checkTokenExpiration } from "./context/UserContext";
import { AdminProvider } from "./context/AdminContext";

function App() {
  const { user, setUser, token, setToken } = useContext(UserContext);
  const id = user?._id;

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" Component={UserHomePage} /> */}
        <Route path="/auth/register" Component={RegistrationPage} />
        <Route path="/auth/login" Component={LoginPage} />
        <Route path="/user" element={<UserHomePage />}>
          {user && user.active ? (
            <Route
              path=""
              element={<Navigate to={`/user/dashboard/${id}`} replace />}
            />
          ) : (
            <Route
              path=""
              element={<Navigate to={`/user/activeAccount/${id}`} replace />}
            />
          )}

          {/* Define your routes for various paths */}
          <Route path="dashboard/:id" element={<Dashboard />} />
          <Route path="wallet/:id" element={<Wallet />} />
          <Route path="withdraw/:id" element={<Withdraw />} />
          <Route path="referral/:id" element={<Referral />} />
          <Route path="team/:id" element={<Teams />} />
          <Route path="activeAccount/:id" element={<ActiveAccount />} />
        </Route>

        {/* Admin routes  */}
        <Route path="/admin/login" Component={AdminLogin} />
        <Route
          path="/admin"
          element={
            <AdminProvider>
              <AdminHomePage />
            </AdminProvider>
          }
        >
          {/* <Route path="/admin" element={<Navigate to="/admin/accountActivation" />} /> */}
          <Route path="accountActivation" element={<AccountActivationList />} />
          <Route path="accountActivation/:id" element={<AccountActivation />} />
          <Route path="withdrawRequest" element={<WithdrawlRequest />} />
          <Route path="profitUpdate" element={<ProfitUpdate />} />
          <Route path="updateDiposite" element={<UpdateDiposite />} />
          <Route path="createAdmin" element={<CreateAdmin />} />
          <Route
            path="ComissionDistribution"
            element={<ComissionDistribution />}
          />

          {/* <Route path="test" element={<Test />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
