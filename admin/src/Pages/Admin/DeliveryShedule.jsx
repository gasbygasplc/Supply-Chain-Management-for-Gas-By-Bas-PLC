import React from 'react'

const DeliveryShedule = () => {
  return (
    
    <div className='w-full sm:w-[40%] bg-white my-8 border mx-8 rounded-md'>

      <form className='flex flex-col gap-4 px-8 py-8 text-gray-700 text-base'>

        <select className=' -ml-4 -mr-4 px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-primary'>

          <option value="Colombo">Colombo</option>

        </select>

        <div className='bg-white flex flex-col gap-4 border -mx-4 px-4 py-2 rounded-md'>

          <div className='flex justify-between'>

            <label className='font-semibold'>Outlet Name:</label>

            <label>Colombo</label>

          </div>

          <div className='flex justify-between'>

            <label className='font-semibold'>Total Gas Request:</label>

            <label>10</label>

          </div>

          <select name='Type' defaultValue="Select Gas Type" className='px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-primary'>

            <option disabled value="Select Gas Type">Select Gas Type</option>

            <option value="Small">Small</option>

            <option value="Medium">Medium</option>

            <option value="Large">Large</option>

          </select>

          <div>

            <input type="number" placeholder='Quantity' className='w-full px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-primary'/>

          </div>

          <div className='flex justify-between'>

            <label className='font-semibold'>Stock Allocation:</label>

            <label>XXXX</label>

          </div>

          <select name='Type' defaultValue="Select Gas Type" className='px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-primary'>

            <option disabled value="Select Gas Type">Select Gas Type</option>

            <option value="Small">Small</option>

            <option value="Medium">Medium</option>

            <option value="Large">Large</option>

          </select>

          <div>

            <input type="number" placeholder='Quantity' className='w-full px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-primary'/>

          </div>

          <div className='flex justify-between'>

            <label className='font-semibold'>Disply Total Stock:</label>

            <label>10000</label>

          </div>

        </div>

        <button className='bg-[#2563EB] -ml-4 -mr-4 rounded-md text-white font-medium py-[10px]'>Submit</button>

      </form>

    </div>

  )
}

export default DeliveryShedule