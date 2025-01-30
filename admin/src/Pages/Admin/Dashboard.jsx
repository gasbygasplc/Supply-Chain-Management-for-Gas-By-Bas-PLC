import React, { useEffect, useState } from 'react'

const Dashboard = () => {

  const [currentDate , setCurrentDate] = useState('');

  useEffect(() => {

    const today = new Date().toLocaleDateString();
    setCurrentDate(today);
  },[])
  return (
    <>

      <div className='w-full'>

        <div className='flex flex-col items-center gap-4 md:text-start md:flex-row md:items-center md:gap-5'>

          <h1 className='font-semibold text-2xl md:text-3xl'><span className='text-primary-700' >Admin</span> Dashboard</h1>

          <p className='py-[5px] px-[13px] border bg-white text-gray-600 rounded-full '>{currentDate}</p>

        </div>

        <div className='flex flex-col gap-4'>

          <div className='flex flex-col border mt-4 p-5 gap-2 rounded text-gray-600'>

            <label className='font-medium'>Customers</label>
            <label className=''>12,000</label>
            <label className=''>Since this month</label>

          </div>

          <div className='flex flex-col border mt-4 p-5 gap-2 rounded text-gray-600'>

            <label className='font-medium'>Gas Requests</label>
            <label>1200</label>
            <label>Since this month</label>

          </div>

          <div className='flex flex-col border mt-4 p-5 gap-2 rounded text-gray-600'>

            <label className='font-medium'>Earnings</label>
            <label>32000</label>
            <label>Since this month</label>

          </div>

          <div className='flex flex-col border mt-4 p-5 gap-2 rounded text-gray-600'>

            <label className='font-medium'>Outlet Delivery Request</label>
            <label>20</label>
            <label>Since this month</label>
           
          </div>

        </div>

      </div>
    
    </>
  )
}

export default Dashboard