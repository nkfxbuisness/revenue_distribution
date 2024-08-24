import React, { createContext, useState,useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';


// Create a Context
const AdminContext = createContext();

export const checkTokenExpiration = (token) => {
  if (!token) return false;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds

  if (decodedToken.exp < currentTime) {
    // Token has expired
    return false;
  }
  // Token is valid
  return true;
};

// Create a Provider Component
export const AdminProvider = ({ children }) => {
//   const [user,setUser] = useState("");
  const [token,setToken]=useState("");
  const [admin,setAdmin]=useState("");
  
  return (
    <AdminContext.Provider value={{ admin,setAdmin,token,setToken }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext