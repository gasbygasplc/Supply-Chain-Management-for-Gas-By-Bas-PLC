import React from 'react'

const AddOutletManager = () => {

  return (
    
    <div className='bg-white border my-5 mx-auto sm:mx-10 px-5 sm:px-[5%] sm:py-7 w-[80%]'>

      <p className='text-gray-800 text-lg pt-5 font-semibold pb-3'>Add Outlet Manager</p>

      <div className='grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-6'>

        <div className='sm:col-span-3'>

          <label className='mb-3 block text-base font-medium text-[#07074D]' htmlFor="Outlet-manager-name">Outlet Manager Name</label>

          <input className='w-full  rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' type="text" id='Outlet-manager-name'/>

        </div>


        <div className='sm:col-span-3'>

          <label className='mb-3 block text-base font-medium text-[#07074D]' htmlFor="Outlet-name">Outlet Name</label>

          <input className='w-full  rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' type="text" id='Outlet-name'/>

        </div>

        <div className='sm:col-span-3'>

          <label className='mb-3 block text-base font-medium text-[#07074D]' htmlFor="Email">Email</label>
b 
          <input className='w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' type="email" id='Email'/>

        </div>

        <div className='sm:col-span-3'>

          <label className='mb-3 block text-base font-medium text-[#07074D]' htmlFor="Phone-Number">Phone Number</label>

          <input className='w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' type="text" id='Phone-Number'/>

        </div>

        <div className='sm:col-span-6'>

          <label className='mb-3 block text-base font-medium text-[#07074D]' htmlFor="User-Role">User Role</label>

          <select className='w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' name="" id="">

            <option value="Admin">Admin</option>
            <option value="Outlet Manager">Outlet Manager</option>

          </select>

        </div>

        <div className='sm:col-span-3'>

          <button className='border border-gray-400 w-full text-black py-3 rounded'>Clear</button>

        </div>

        <div className='sm:col-span-3'>

          <button className='bg-[#FED500] w-full text-black py-3 rounded'>Add Outlet Manager</button>

        </div>

      </div>

    </div>


  )

}

export default AddOutletManager