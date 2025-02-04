import React from 'react'

const OutletReport = () => {
  return (
    <>
      <form className="text-gray-700 text-base">

        <div className='w-full flex flex-col gap-6 mx-auto border py-6 px-6 rounded'>

          <div className="flex w-full flex-col items-center gap-4 md:items-start md:gap-5">

            <h1 className='font-semibold text-2xl md:text-3xl'>
              <span className='text-primary-700'>Outlet Report</span> Section
            </h1>

            <div className='w-full flex flex-col justify-center items-center'>

              <div className='p-6 bg-gray-100 rounded-md w-full flex items-end justify-center gap-2 md:gap-12'>

                <button className='py-[10px] px-[18px] bg-white rounded-full'>Stock</button>
                <button className='py-[10px] px-[18px] bg-white rounded-full'>Gas Stock</button>
                <button className='py-[10px] px-[18px] bg-white rounded-full'>Gas Request</button>
                <button className='py-[10px] px-[18px] bg-white rounded-full'>Total Users</button>

              </div>

            </div>

          </div>

        </div>
        
      </form>
    </>
  )
}

export default OutletReport