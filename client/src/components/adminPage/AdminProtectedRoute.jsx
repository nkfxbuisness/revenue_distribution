import React, { useContext } from 'react'
import AdminContext from '../../context/AdminContext';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminProtectedRoute = ({Component}) => {
  const { admin } = useContext(AdminContext);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const arr = currentPath.split("/");
  console.log(arr[2]);
  
  

  const checkIfAllowed = () =>{
    if(!admin.roles.includes(arr[2])){
        if(admin.roles[0]!="superAdmin"){
          navigate(`/admin/${admin.roles[0]}`)
        }
        return false;
    }
    return true;
  } 
  return (
    <>
        <div>ProtectedRoute</div>
        <Component checkIfAllowed={checkIfAllowed} />
    </>
  )
}

export default AdminProtectedRoute ;