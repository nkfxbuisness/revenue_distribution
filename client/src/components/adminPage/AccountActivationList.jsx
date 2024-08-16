import React from 'react'
import user from '../toast/user'
import { useNavigate } from 'react-router-dom'
const AccountActivationList = () => {
  let navigate = useNavigate();
  return (
    <>
        <div className='p-5 bg-green-200'>
            <p className='flex justify-center font-semibold text-2xl text-blue-600 pb-5'>Refer Someone</p>
            <div className='flex flex-col gap-2 w-full'>
              <div className='flex px-3 py-2 text-sm w-full  bg-white text-left rounded-md items-center'>
                  <p className='w-1/12'>1</p>
                  <p className='w-3/12'>Sunirmal Sasmal</p>
                  <p className='w-3/12'>9903442091</p>
                  <p className='w-2/12'>{user.createdOn}</p>
                  <span className='w-2/12 flex '><p className='bg-yellow-200 text-yellow-600 px-2 py-1  font-semibold rounded-md'>Pending</p></span>
                  <span className='w-1/12 flex cursor-pointer '><p className='bg-blue-600 text-white px-2 py-1  font-semibold rounded-md' onClick={()=>navigate("/admin/accountActivation/123")}>Activate</p></span>   
              </div>
              <div className='flex px-3 py-2 text-sm w-full  bg-white text-left rounded-md items-center'>
                  <p className='w-1/12'>1</p>
                  <p className='w-3/12'>Sunirmal Sasmal</p>
                  <p className='w-3/12'>9903442091</p>
                  <p className='w-2/12'>{user.createdOn}</p>
                  <span className='w-2/12 flex '><p className='bg-yellow-200 text-yellow-600 px-2 py-1  font-semibold rounded-md'>Pending</p></span>
                  <span className='w-1/12 flex cursor-pointer '><p className='bg-blue-600 text-white px-2 py-1  font-semibold rounded-md' onClick={()=>navigate("/admin/accountActivation/123")}>Activate</p></span>   
              </div>              
            </div>
        </div>
    </>
  )
}

export default AccountActivationList