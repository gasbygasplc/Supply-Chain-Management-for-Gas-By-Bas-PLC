import React, { useState } from 'react'

const OutletReport = () => {

  const [navbutton , setNavButton] = useState('Stock Report');

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="text-gray-700 text-base">

        <div className='w-full flex flex-col gap-6 mx-auto border py-6 px-6 rounded'>

          <div className="flex w-full flex-col items-center gap-4 md:items-start md:gap-5">

            <h1 className='font-semibold text-2xl md:text-3xl'>
              <span className='text-primary-700'>Outlet Report</span> Section
            </h1>

            <div className='flex w-full flex-col justify-center items-center md:flex-row gap-4 bg-gray-100 py-1 px-1.5 rounded-e-lg md:rounded-full'>
              <button type="button" className={navbutton === 'Stock Report' ? "bg-white w-full md:w-fit py-[10px] px-[18px] text-[15px] text-primary-700 rounded-[100px]" : "bg-transparent py-[10px] px-[18px] text-[15px] text-gray-800"}  onClick={() => setNavButton('Stock Report')}>
                Stock Report
              </button>

              <button  type="button" className={navbutton === 'Gas Request' ? "bg-white w-full md:w-fit py-[10px] px-[18px] text-[15px] text-primary-700 rounded-[100px]" : "bg-transparent py-[10px] px-[18px] text-[15px] text-gray-800"} onClick={() => setNavButton('Gas Request')}>
                Total Gas Request
              </button>

              <button  type="button" className={navbutton === 'Stock Request' ? "bg-white w-full md:w-fit py-[10px] px-[18px] text-[15px] text-primary-700 rounded-[100px]" : "bg-transparent py-[10px] px-[18px] text-[15px] text-gray-800"} onClick={() => setNavButton('Stock Request')}>
                Total Stock Request
              </button>

              <button  type="button" className={navbutton === 'Total Registered Users' ? "bg-white w-full md:w-fit py-[10px] px-[18px] text-[15px] text-primary-700 rounded-[100px]" : "bg-transparent py-[10px] px-[18px] text-[15px] text-gray-800"} onClick={() => setNavButton('Total Registered Users')}>
                Total Registered Users
              </button>

            </div>

            

          </div>

        </div>
        
      </form>
    </>
  )
}

export default OutletReport