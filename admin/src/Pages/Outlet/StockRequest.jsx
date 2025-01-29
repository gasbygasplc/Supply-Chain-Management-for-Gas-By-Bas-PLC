import React, { useContext, useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { OutletContext } from '../../Context/OutletContext';

const StockRequest = () => {

  const [smallQty , setSmallQty] = useState(0);
  
  const [mediumQty , setMediumQty] = useState(0);

  const [largeQty , setLargeQty] = useState(0);

  const [expectedDate, setExpectedDate] = useState('');

  const {Otoken} = useContext(OutletContext);

  const handleSubmit = async(event) => {
    event.preventDefault();

    if(!smallQty || !mediumQty || !largeQty)
    {

      toast.warn("Please enter the Data");
      return;

    }

    if (smallGasQuantity <= 0 && mediumGasQuantity <= 0 && largeGasQuantity <= 0) {
      toast.warn('Please enter at least one gas quantity.');
      return;
    }

    const payload = {

      smallQty,
      mediumQty,
      largeQty,
      expectedDate
    }

    try {

      const response = await axios.post('http://localhost:4000/api/outlet/request-delivery' , payload , {headers:{Otoken}});
      
    } catch (error) {
      
    }

  }
  
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

          <table className='min-w-full table-auto text-sm text-gray-700'>

            <thead className='bg-gray-100'>

              <tr>
                <th className="px-4 py-2 font-medium text-left">Date of Request</th>
                <th className="px-4 py-2 font-medium text-left">Type of Cylinder</th>
                <th className="px-4 py-2 font-medium text-left">QTY per Type</th>
                <th className="px-4 py-2 font-medium text-left">Expected Date</th>
                <th className="px-4 py-2 font-medium text-left">Status</th>
                <th className="px-4 py-2 font-medium text-left">Delivery Scheduled</th>
                <th className="px-4 py-2 font-medium text-left">Delivery Date</th>
              </tr>

            </thead>

            <tbody>

              <tr className='border-t'>

                <td className="px-4 py-2">1/28/2025</td>
                <td className="px-4 py-2">Small</td>
                <td className="px-4 py-2">100</td>
                <td className="px-4 py-2">02/02/2025</td>
                <td className="px-4 py-2">Pending</td>
                <td className="px-4 py-2">Yes</td>
                <td className="px-4 py-2">30/01/2024</td>

              </tr>

              <tr className='border-t'>

                <td className="px-4 py-2">1/28/2025</td>
                <td className="px-4 py-2">Medium</td>
                <td className="px-4 py-2">200</td>
                <td className="px-4 py-2">02/04/2025</td>
                <td className="px-4 py-2">Approved</td>
                <td className="px-4 py-2">Yes</td>
                <td className="px-4 py-2">30/01/2024</td>
                
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    
    </div>
    
  )
}

export default StockRequest