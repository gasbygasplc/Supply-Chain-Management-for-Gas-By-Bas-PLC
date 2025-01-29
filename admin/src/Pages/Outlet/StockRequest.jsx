import React, { useContext, useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { OutletContext } from '../../Context/OutletContext';

const StockRequest = () => {

  const [smallQty , setSmallQty] = useState();
  
  const [mediumQty , setMediumQty] = useState();

  const [largeQty , setLargeQty] = useState();

  const [expectedDate, setExpectedDate] = useState('');

  const {Otoken , gasSheduleReq , fetchGasReq} = useContext(OutletContext);

  useEffect(() => {

    if(Otoken)
    {
        fetchGasReq();
    }
} , [Otoken])

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (smallQty <= 0 && mediumQty <= 0 && largeQty <= 0) {
      toast.warn('Please enter at least one gas quantity.');
      return;
    }

    const payload = {

      smallQty,
      mediumQty,
      largeQty,
      expectedDeliveryDate: new Date(expectedDate).toISOString(),
    }

    try {

      const response = await axios.post('http://localhost:4000/api/outlet/request-delivery' , payload , {headers:{Otoken}});

      if (response.data.success) {
        toast.success('Delivery request submitted successfully!');
      }

      
      
    } catch (error) {

      console.error('Error submitting delivery request:', error);
      alert('Failed to submit request. Please try again.');
      
    }

  }
  
  return (

    <div className='w-full flex flex-col'>

      <form onSubmit={handleSubmit} className='w-full flex flex-col md:w-[60%] text-gray-700 text-base mt-6 rounded-md py-6 px-4  md:px-6 mx-4 md:mx-[2%] bg-white border'>

        <h1 className='font-semibold text-2xl md:text-2xl mb-4'>Delivery Shedule Stock Request</h1>

        <div className='w-full flex flex-col'>

          <div className='flex flex-col md:grid grid-cols-6 gap-4 md:gap-6'>

            <div className='w-full flex flex-col md:col-span-3 gap-2'>

              <label className='block' htmlFor="smallGas">Small Gas</label>

              <input onChange={(e) => setSmallQty(Number(e.target.value))} value={smallQty} className='w-full p-2 border border-gray-300 rounded-md focus:outline-1 focus:outline-primary-700' type="number" placeholder='Small Gas Quantity'/>

            </div>

            <div className='w-full flex flex-col md:col-span-3 gap-2'>

              <label htmlFor="smallGas">Medium Gas</label>

              <input onChange={(e) => setMediumQty(Number(e.target.value))} value={mediumQty} className='w-full p-2 border border-gray-300 rounded-md focus:outline-1 focus:outline-primary-700' type="number" placeholder='Medium Gas Quantity'/>

            </div>

            <div className='w-full flex flex-col md:col-span-3 gap-2'>

              <label htmlFor="smallGas">Large Gas</label>

              <input onChange={(e) => setLargeQty(Number(e.target.value))} value={largeQty} className='w-full p-2 border border-gray-300 rounded-md focus:outline-1 focus:outline-primary-700' type="number" placeholder='Large Gas Quantity'/>

            </div>

            <div className='w-full flex flex-col md:col-span-3 gap-2'>

              <label htmlFor="smallGas">Expected Date</label>

              <input onChange={(e) => setExpectedDate(e.target.value)} value={expectedDate} className='w-full cursor-pointer p-2 border border-gray-300 rounded-md focus:outline-1 focus:outline-primary-700' type="date"/>

            </div>

            <div className='w-full flex flex-col md:col-span-6 gap-2'>

              <button type='submit' className='bg-[#2563EB] py-[10px] text-white text-base rounded-md'>Request Delivery Shedule</button>

            </div>

          </div>

        </div>

      </form>

      <div className=' text-gray-700 text-base mt-6 rounded-md py-6 px-4  md:px-6 mx-4 md:mx-[2%] bg-white border'>

        <h1 className="font-semibold text-2xl md:text-2xl mb-4">Your Delivery Shedule Request</h1>

        <div className='overflow-x-auto max-w-full'>

          <table className='min-w-full table-auto text-sm text-gray-700'>

            <thead className='bg-gray-100'>

              <tr>
                <th className="px-4 py-2 font-medium text-left">Date of Request</th>
                <th className="px-4 py-2 font-medium text-left">Type & QTY</th>
                <th className="px-4 py-2 font-medium text-left">Expected Date</th>
                <th className="px-4 py-2 font-medium text-left">Status</th>
                <th className="px-4 py-2 font-medium text-left">Delivery Scheduled</th>
              </tr>

            </thead>

            <tbody>

              {
                gasSheduleReq.map((req , index) => (

                  <tr key={index} className='border-t'>

                    <td className="px-4 py-2">{new Date(req.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2"> 
                      Small : {req.gasQuantity.Small} <br />
                      Medium : {req.gasQuantity.Medium} <br />
                      Large : {req.gasQuantity.Large}
                    </td>
                    <td className="px-4 py-2">{new Date(req.expectedDeliveryDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2"><span className={`text-xs font-medium me-2 px-[13px] py-[5px] rounded-full ${
                      req.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      req.status === "Approved" ? "bg-green-100 text-green-800" :
                      req.status === "Rejected" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                      }`}>

                      {req.status}
                        
                      </span>
                    </td>
                    <td className="px-4 py-2">{req.deliveryScheduled ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>
    
    </div>
    
  )
}

export default StockRequest