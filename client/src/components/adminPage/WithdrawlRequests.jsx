import React,{useState} from 'react'
import { Switch } from '@headlessui/react'
import user from '../toast/user'
import { useNavigate } from 'react-router-dom'
import Dialog from './DialogComp'

const WithdrawlRequests = () => {
  const [enabled, setEnabled] = useState(false)
  let [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();
  let requests = [
    {
      name:"Sunirmal",
      amount:"$150.22",
      date:"6th Aug , 2024",
      paid:true
    },
    {
      name:"Subha",
      amount:"$150.22",
      date:"6th Aug , 2024",
      paid:false
    },
    {
      name:"Chandan",
      amount:"$150.22",
      date:"6th Aug , 2024",
      paid:false
    },

  ]
  const [name,setName]=useState();
  const [amount,setAmount]=useState();
  const [date,setDate]=useState();

  const handleDialog=(request)=>{
    setName(request.name)
    setAmount(request.amount)
    setDate(request.date)
    setIsOpen(true);
  }
  return (
    <>
      <div className='p-5 bg-green-200'>
        <div className='flex gap-5 items-center justify-center'>
          <p className='flex justify-center font-semibold text-2xl text-blue-600'>{enabled?"Stop ":"Start "} Accepting Withdrawl Requests</p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
        </div>

        <div className='flex flex-col gap-2 w-full mt-8'>
          {requests.map((request,index)=>(
            <div className='flex px-3 py-2 text-sm w-full  bg-white text-left rounded-md items-center'>
              <p className='w-1/12'>{index}</p>
              <p className='w-3/12'>{request.name}</p>
              <p className='w-2/12'>{request.amount}</p>
              <p className='w-2/12'>{request.date}</p>
              <span className='w-2/12 flex '><p className='bg-yellow-200 text-yellow-600 px-2 py-1  font-semibold rounded-md'>Pending</p></span>
              <span className='w-2/12 flex cursor-pointer '><p className='bg-blue-600 text-white px-2 py-1  font-semibold rounded-md' onClick={()=>handleDialog(request)}>Pay</p></span>   
            </div>
          ))}
        </div>

      </div>
      <Dialog 
        name={name}
        amount={amount}
        date={date}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}

export default WithdrawlRequests