import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import user from './components/toast/user';

//pages
import UserHomePage from '../src/pages/UserHomePage'
import RegistrationPage from './pages/RegistrationPage';
import AdminHomePage from './pages/AdminHomePage';

// userComponents 
import Dashboard from './components/userPage/Dashboard';
import Referral from './components/userPage/Referral';
import Wallet from './components/userPage/Wallet';
import Withdraw from './components/userPage/Withdraw';
import Teams from './components/userPage/Teams';
import ActiveAccount from './components/userPage/ActiveAccount';

// adminComponents 
import AccountActivation from "./components/adminPage/AccountActivation"
import WithdrawlRequest from "./components/adminPage/WithdrawlRequests"
import ProfitUpdate from "./components/adminPage/ProfiltUpdate"
import UpdateDiposite from "./components/adminPage/UpdateDiposite"
import CreateAdmin from "./components/adminPage/CreateAdmins"
import ComissionDistribution from "./components/adminPage/ComissionDistribution"

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" Component={UserHomePage} /> */}
        <Route path="/auth/register" Component={RegistrationPage} />
        <Route path="/user" Component={UserHomePage} >

          {user && user.isActive?
          <Route path="/user" element={<Navigate to="/user/dashboard" />} />:
          <Route path="/user" element={<Navigate to="/user/activeAccount" />} />}

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="wallet" element={<Wallet/>} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="referral" element={<Referral />} />
          <Route path="team" element={<Teams />} />:
          <Route path="activeAccount" element={<ActiveAccount />} />
 
          {/* <Route path="test" element={<Test />} /> */}
        </Route>
        <Route path="/admin" Component={AdminHomePage} >
          {/* <Route path="/admin" element={<Navigate to="/admin/accountActivation" />} /> */}
          <Route path="accountActivation" element={<AccountActivation/>} />
          <Route path="withdrawRequest" element={<WithdrawlRequest/>} />
          <Route path="profitUpdate" element={<ProfitUpdate/>} />
          <Route path="updateDiposite" element={<UpdateDiposite />} />
          <Route path="createAdmin" element={<CreateAdmin />} />
          <Route path="ComissionDistribution" element={<ComissionDistribution />} />
 
          {/* <Route path="test" element={<Test />} /> */}
        </Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
