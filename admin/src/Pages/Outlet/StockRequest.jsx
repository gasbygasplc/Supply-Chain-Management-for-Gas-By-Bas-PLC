import React from 'react'

const StockRequest = () => {
  return (

    <div className='w-full flex flex-col'>

      <div className='w-full flex flex-col md:w-[60%] text-gray-700 text-base mt-6 rounded-md py-6 px-4  md:px-6 mx-4 md:mx-[2%] bg-white border'>

        <h1 className='font-semibold text-2xl md:text-2xl mb-4'>Delivery Shedule Stock Request</h1>

        <div className='w-full flex flex-col'>

          <div className='flex flex-col md:grid grid-cols-6 gap-4 md:gap-6'>

            <div className='w-full flex flex-col md:col-span-3 gap-2'>

              <label className='block' htmlFor="smallGas">Small Gas</label>

              <input className='w-full p-2 border border-gray-300 rounded-md focus:outline-1 focus:outline-primary-700' type="number" placeholder='Small Gas Quantity'/>

            </div>

            <div className='w-full flex flex-col md:col-span-3 gap-2'>

              <label htmlFor="smallGas">Medium Gas</label>

              <input className='w-full p-2 border border-gray-300 rounded-md focus:outline-1 focus:outline-primary-700' type="number" placeholder='Medium Gas Quantity'/>

            </div>

            <div className='w-full flex flex-col md:col-span-3 gap-2'>

              <label htmlFor="smallGas">Large Gas</label>

              <input className='w-full p-2 border border-gray-300 rounded-md focus:outline-1 focus:outline-primary-700' type="number" placeholder='Large Gas Quantity'/>

            </div>

            <div className='w-full flex flex-col md:col-span-3 gap-2'>

              <label htmlFor="smallGas">Expected Date</label>

              <input className='w-full cursor-pointer p-2 border border-gray-300 rounded-md focus:outline-1 focus:outline-primary-700' type="date"/>

            </div>

            <div className='w-full flex flex-col md:col-span-6 gap-2'>

              <button className='bg-[#2563EB] py-[10px] text-white text-base rounded-md'>Request Delivery Shedule</button>

            </div>

          </div>

        </div>

      </div>

      <div className=' text-gray-700 text-base mt-6 rounded-md py-6 px-4  md:px-6 mx-4 md:mx-[2%] bg-white border'>

        <h1 className="font-semibold text-2xl md:text-2xl mb-4">Your Delivery Shedule Request</h1>

        <div className='overflow-x-auto max-w-full'>


        </div>

      </div>
    
    </div>
    
  )
}

export default StockRequest