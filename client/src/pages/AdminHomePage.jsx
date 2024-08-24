import React, { useEffect, useState } from 'react'
import Navbar from '../components/adminPage/Navbar'
import Sidebar from '../components/adminPage/Sidebar'
import {Outlet, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import AdminContext, { checkTokenExpiration } from '../context/AdminContext'

const AdminHomePage = () => {
  let navigate = useNavigate();
  const { admin,setAdmin, token, setToken } = useContext(AdminContext);
  console.log(admin,token)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedAdmim = JSON.parse(localStorage.getItem("adminInfo"));
    const storedToken = localStorage.getItem("adminToken");
    if (!storedAdmim || !storedToken) {
      console.log("no admin or token found in localstorege / loggedout");
      navigate("/admin/login");
    } else if (!checkTokenExpiration(storedToken)) {
      console.log("token validation expired");
      navigate("/admin/login");
    } else if (storedAdmim && storedToken) {
      setAdmin(storedAdmim);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loading indicator
  }


  return (
    <>
      <Navbar/>
      <div className='flex relative'>
        <Sidebar/>
        <div className='mt-12 w-full mr-[280] min-h-screen bg-blue-50 ' style={{marginRight:280}}>
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default AdminHomePage