import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
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
import UserContext from "./context/UserContext";
import { AdminProvider } from "./context/AdminContext";
import TotalBusiness from "./components/userPage/TotalBusiness";
import TeamBuisness from "./components/userPage/TeamBuisness";
import PostAnnouncement from "./components/adminPage/PostAnnouncement";
import Temp from "./components/auth/Temp";
import AccountSuspended from "./components/userPage/AccountSuspended";
import LandingPage from "./pages/LandingPage";
import SuspendAUser from "./components/adminPage/SuspendAUser";
import Rewards from "./components/userPage/Rewards";
import ClaimRewards from "./components/adminPage/ClaimRewards";
import Announcements from "./components/userPage/Announcements";
import ProtectedRoute from "./components/userPage/ProtectedRoute";
import AdminProtectedRoute from "./components/adminPage/AdminProtectedRoute";
import ReportGenerationPage from "./components/adminPage/comission/ReportGenerationPage";
import SetComissionPage from "./components/adminPage/comission/SetComissionPage";
import Distribution from "./components/adminPage/comission/Distribution";

function App() {
  const { user} = useContext(UserContext);
  // console.log("user",user);
  
  const id = user?._id;

  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/auth/register" Component={RegistrationPage} />
        <Route path="/auth/login" Component={LoginPage} />
        <Route path="/auth/temp" Component={Temp} />
        <Route path="/user" element={<UserHomePage />}>

          {user && user?.activationStatus?.suspended?
            <Route
            path=""
            element={<Navigate to={`/user/suspended/${id}`} replace />}
          />
          :<>
          {user && user?.activationStatus?.active ? (
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
          </> }

          {/* Define your routes for various paths */}
          <Route path="dashboard/:id" element={ <ProtectedRoute Component={ Dashboard} />} />
          <Route path="wallet/:id" element={< ProtectedRoute Component={ Wallet }/>} />
          <Route path="withdraw/:id" element={< ProtectedRoute Component={ Withdraw }/>} />
          <Route path="referral/:id" element={< ProtectedRoute Component={ Referral }/>} />
          <Route path="totalBusiness/:id" element={< ProtectedRoute Component={ TotalBusiness }/>} />
          <Route path="teamBusiness/:id" element={< ProtectedRoute Component={ TeamBuisness }/>} />
          <Route path="rewards/:id" element={< ProtectedRoute Component={ Rewards }/>} />
          <Route path="announcements/:id" element={<ProtectedRoute Component={  Announcements }/>} />
          <Route path="activeAccount/:id" element={< ActiveAccount />} />
          <Route path="suspended/:id" element={<AccountSuspended />} />
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
          <Route path="accountActivation" element={< AccountActivationList />} />
          <Route path="accountActivation/:id" element={<AccountActivation />} />
          <Route path="withdrawRequest" element={<WithdrawlRequest />} />
          <Route path="profitUpdate" element={<AdminProtectedRoute Component={ProfitUpdate} />} />
          <Route path="updateDiposite" element={<UpdateDiposite />} />
          <Route path="createAdmin" element={<CreateAdmin />} />
          <Route path="postAnnouncement" element={<PostAnnouncement />} />
          <Route path="rewards" element={<ClaimRewards />} />
          <Route path="suspendAUser" element={<SuspendAUser />} />
          <Route
            path="ComissionDistribution"
            element={<ComissionDistribution />}
          />
          <Route
            path="ComissionDistribution/report"
            element={<ReportGenerationPage />}
          />
          <Route
            path="ComissionDistribution/setComission"
            element={<SetComissionPage />}
          />
          <Route
            path="ComissionDistribution/startDistributing"
            element={<Distribution />}
          />

          {/* <Route path="test" element={<Test />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
