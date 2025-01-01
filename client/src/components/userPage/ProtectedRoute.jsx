import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext, { checkTokenExpiration } from '../../context/UserContext';
import Cookies from "js-cookie"

const ProtectedRoute = ({Component}) => {
  let navigate = useNavigate();
  const { user} = useContext(UserContext);
  const [callBackend,setCallBackend] = useState(true);

  // if(Component){
  //   console.log("componrnt");
  // }else{
  //   console.log("hello");
    
  // }
  

  const ifSuspendedOrInactive=()=>{
    if(user.activationStatus.suspended){
      navigate(`/user/suspended/${user._id}`,{
        state:user  //{suspentionRemarks : user.activationStatus.suspentionRemarks}
      });
      return false;
    }
    if(!user.activationStatus.active){
      navigate(`/user/activeAccount/${user._id}`)
      return false;
    }
    return true;
  }
  
  // useEffect(() => {
  //   if(user.activationStatus.suspended){
  //       setCallBackend(false);
  //       navigate(`/user/suspended/${user._id}`,{
  //         state:user  //{suspentionRemarks : user.activationStatus.suspentionRemarks}
  //       });
  //     }
  //     else if(!user.activationStatus.active){
  //       setCallBackend(false);
  //       navigate(`/user/activeAccount/${user._id}`)
  //     }
  //     console.log('Dashboard useEffect is running')
  // }, [])
  
  return <Component ifSuspendedOrInactive={ifSuspendedOrInactive} />

}

export default ProtectedRoute