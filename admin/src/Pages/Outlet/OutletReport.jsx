import React, { useContext, useState } from 'react'
import { OutletContext } from '../../Context/OutletContext';

const OutletReport = () => {

  const [navbutton , setNavButton] = useState('Stock Report');

  const {outletStock} = useContext(OutletContext);

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

            <div className='w-full'>

              {Array.isArray(outletStock) && outletStock.length > 0 ? (
              <div className="text-gray-700 text-base mt-6 rounded-md py-6 md:px-6 bg-white border">
                <h1 className="font-semibold text-1xl md:text-2xl mb-4">Current Stock Details</h1>

                <div className="overflow-x-auto max-w-full">
                  <table className="min-w-full table-auto text-sm text-gray-700">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Gas Type</th>
                        <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Current Stock</th>
                        <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Max Capacity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {outletStock.map((stockItem) => (
                        <tr key={stockItem.gasType} className="border-t">
                          <td className="px-4 py-2 whitespace-nowrap">{stockItem.gasType}</td>
                          <td className="px-4 py-2 whitespace-nowrap font-semibold">{stockItem.currentStock}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{stockItem.maxCapacity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-4">No stock data available.</p>
            )}
            </div>

          </div>

        </div>
        
      </form>
    </>
  )
}

export default OutletReport