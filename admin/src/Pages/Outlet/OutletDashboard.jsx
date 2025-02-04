import React, { useContext, useEffect, useState } from 'react'
import { OutletContext } from '../../Context/OutletContext.jsx';

const OutletDashboard = () => {
    const [currentDate, setCurrentDate] = useState('');

    const {outletStock , allGasReq} = useContext(OutletContext);
  
    useEffect(() => {
      const today = new Date().toLocaleDateString();
      setCurrentDate(today);
    }, []);

  return (

    <>
    
      <div className='w-full'>
        
        <div className='flex flex-col items-center gap-4 md:text-start md:flex-row md:items-center md:gap-5'>
          <h1 className='font-semibold text-2xl md:text-3xl'>
            <span className='text-primary-700'>Outlet</span> Dashboard
          </h1>
          <p className='py-[5px] px-[13px] border bg-white text-gray-600 rounded-full'>{currentDate}</p>
        </div>

        <div className='w-full my-6'>

          <div className='flex flex-wrap w-full cursor-pointer gap-4'>

          <div className="flex flex-col w-full gap-2 border p-4 rounded border-primary-700 text-gray-600 md:w-60">
            <p className="font-semibold text-base">Current Stock</p>

            {outletStock && outletStock.length > 0 ? (
              <p className="text-lg font-semibold text-black">
                {outletStock
                  .map((gas) => `${gas.gasType.charAt(0).toUpperCase()} - ${gas.currentStock}`)
                  .join(" | ")}
              </p>
            ) : (
              <p className="text-lg font-semibold text-black">No Stock Data Available</p>
            )}

            <p className="text-sm text-gray-400">Since this month</p>
          </div>


            <div className='flex flex-col w-full gap-2 border p-4 rounded border-primary-700 text-gray-600 md:w-60'>
              <p className='font-semibold text-base'>Gas Request</p>
              <p className='text-lg font-semibold text-black'>{allGasReq.length}</p>
              <p className='text-sm text-gray-400'>Since this month</p>
            </div>

            <div className='flex flex-col w-full gap-2 border p-4 rounded border-primary-700 text-gray-600 md:w-60'>
              <p className='font-semibold text-base'>Stock Requests</p>
              <p className='text-lg font-semibold text-black'>12,000</p>
              <p className='text-sm text-gray-400'>Since this month</p>
            </div>

            <div className='flex flex-col w-full gap-2 border p-4 rounded border-primary-700 text-gray-600 md:w-60'>
              <p className='font-semibold text-base'>Delivery Scheduled</p>
              <p className='text-lg font-semibold text-black'>12,000</p>
              <p className='text-sm text-gray-400'>Since this month</p>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default OutletDashboard