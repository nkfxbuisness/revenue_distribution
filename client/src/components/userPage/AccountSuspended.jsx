import React, { useContext } from 'react'
import UserContext from '../../context/UserContext';

const AccountSuspended = (state) => {
  const { user } = useContext(UserContext);
  console.log(user.activationStatus.suspentionRemarks);
  
  
  return (
    <>
        <div className='flex flex-col gap-3 items-center justify-center w-full min-h-screen h-full bg-red-200  text-red-600'>
           
          <p className=' font-bold text-2xl'>Your Account is suspended !!</p>
          <p className='font-thin text-xl'>Reason : {user.activationStatus?.suspentionRemarks}</p>
        </div>
    </>
  )
}

export default AccountSuspended