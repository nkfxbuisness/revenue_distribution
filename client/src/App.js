import './App.css';
import { Route, Routes } from "react-router-dom";
import UserHomePage from '../src/pages/UserHomePage'
import RegistrationPage from './pages/RegistrationPage';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={UserHomePage} />
        <Route path="/auth/register" Component={RegistrationPage} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
