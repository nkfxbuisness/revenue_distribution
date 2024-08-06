import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import UserHomePage from '../src/pages/UserHomePage'
import RegistrationPage from './pages/RegistrationPage';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/userPage/Dashboard';
import Referral from './components/userPage/Referral';
import Wallet from './components/userPage/Wallet';
import Withdraw from './components/userPage/Withdraw';
import Teams from './components/userPage/Teams';
function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" Component={UserHomePage} /> */}
        <Route path="/auth/register" Component={RegistrationPage} />
        <Route path="/user" Component={UserHomePage} >
          <Route path="/user" element={<Navigate to="/user/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="wallet" element={<Wallet/>} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="referral" element={<Referral />} />
          <Route path="team" element={<Teams />} />
 
          {/* <Route path="test" element={<Test />} /> */}
        </Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
