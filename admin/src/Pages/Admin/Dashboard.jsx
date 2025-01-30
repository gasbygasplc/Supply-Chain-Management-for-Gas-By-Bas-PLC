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

        <div className='w-full flex flex-col md:flex-row mt-6 gap-4'>

          <div className='w-full md:w-[40%] flex flex-col md:grid md:grid-cols-4 gap-4'>

            <div className='md:col-span-2 flex flex-col gap-2 border w-full p-4 rounded border-primary-700 text-gray-600'>

              <p className='font-semibold text-base'>Customers</p>
              <p className='text-lg font-semibold text-black'>12,000</p>
              <p className='text-sm text-gray-400'>Since this month</p>

            </div>
            <div className='md:col-span-2 flex flex-col gap-2 border w-full p-4 rounded border-primary-700 text-gray-600'>

              <p className='font-semibold text-base'>Gas Request</p>
              <p className='text-lg font-semibold text-black'>1000</p>
              <p className='text-sm text-gray-400'>Since this month</p>

            </div>
            <div className='md:col-span-2 flex flex-col gap-2 border w-full p-4 rounded border-primary-700 text-gray-600'>

              <p className='font-semibold text-base'>Earning</p>
              <p className='text-lg font-semibold text-black'>200000</p>
              <p className='text-sm text-gray-400'>Since this month</p>

            </div>
            <div className='md:col-span-2 flex flex-col gap-2 border w-full p-4 rounded border-primary-700 text-gray-600'>

              <p className='font-semibold text-base'>Outlet Request</p>
              <p className='text-lg font-semibold text-black'>20</p>
              <p className='text-sm text-gray-400'>Since this month</p>

            </div>
            
          </div>
          <div className='w-[60%]'>
            
          </div>

        </div>

      </div>
    
    </>
  )
}

export default Dashboard