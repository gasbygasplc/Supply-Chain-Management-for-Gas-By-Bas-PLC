import React from 'react'

const GasRequestForm = () => {
  return (
    <form> 
    <div className='bg-white border my-4 px-6 py-6'>
        <p className='text-gray-800 text-lg pt-5 font-semibold pb-3'>Gas Request</p>
    
        <div className='grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-10'>
    
            <div className='sm:col-span-6'>
                <input 
                    className='w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-1 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' 
                    type="text" 
                    id='gas-request-input'
                />
            </div>
    
            <div className='sm:col-span-3'>
                <button 
                    type="submit" 
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Search
                </button>
            </div>

            <div className='sm:col-span-2'>
                <label 
                    className='mb-4 block text-base font-medium text-[#07074D]' 
                    htmlFor="payment-received"
                >
                    Payment Received
                </label>
                <select 
                    onChange={(e) => console.log(e.target.value)} 
                    value={0} 
                    className='w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' 
                    id="payment-received"
                >
                    {/* Options go here */}
                </select>
            </div>

            <div className='sm:col-span-2'>
                <label 
                    className='mb-4 block text-base font-medium text-[#07074D]' 
                    htmlFor="cylinder-received"
                >
                    Cylinder Received
                </label>
                <select 
                    onChange={(e) => console.log(e.target.value)} 
                    value={0} 
                    className='w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' 
                    id="cylinder-received"
                >
                    {/* Options go here */}
                </select>
            </div>

            <div className='sm:col-span-2'>
                <label 
                    className='mb-4 block text-base font-medium text-[#07074D]' 
                    htmlFor="collection-overdue"
                >
                    Collection Overdue
                </label>
                <select 
                    onChange={(e) => console.log(e.target.value)} 
                    value={0} 
                    className='w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' 
                    id="collection-overdue"
                >
                    {/* Options go here */}
                </select>
            </div>

            <div className='sm:col-span-3'>
                <label 
                    className='block text-gray-700 font-normal mb-3' 
                    htmlFor="district"
                >
                    District
                </label>
                <select 
                    name="district" 
                    id="district" 
                    onChange={(e) => console.log(e.target.value)} 
                    value={""}  
                    className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm'
                >
                    {/* Options go here */}
                </select>
            </div>
        </div>
    </div>
</form>
  )
}

export default GasRequestForm