import React from 'react'

const AddMainStock = () => {
  return (
    <div className=' w-full gap-4 bg-white my-3 border mx-2 py-5 px-5 rounded-md grid grid-cols-1 sm:grid-cols-7'>
      

      {/* ======================================= LEFT ==================================================== */}

      <div className='sm:col-span-4 border px-3 py-4 rounded-sm'>

        <h2 className='font-bold text-2xl text-black pb-6'>Add Stock </h2>

        <form className='grid grid-cols-1 gap-3 sm:grid-cols-6'>

          <div className='sm:col-span-3'>

            <label className='block  text-gray-700 font-normal mb-3' htmlFor="outletname">Gas Type</label>

            <select className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' name="" id="">

              <option value="Small Gas">Small Gas</option>
              <option value="Medium Gas">Medium Gas</option>
              <option value="Large Gas">Large Gas</option>

            </select>

          </div>

          <div className='sm:col-span-3'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="Location">Location</label>

            <input  className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="text" placeholder='Location'/>

          </div>

          <div className='sm:col-span-3'>
            <label className='block  text-gray-700 font-normal mb-3' htmlFor="email">Email</label>

            <input  className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="email" placeholder='Email'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="PhoneNumber">PhoneNumber</label>

            <input  className='border  border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="text" placeholder='PhoneNumber'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="Delivery Capacity">Delivery Capacity</label>

            <input  className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="number" placeholder='Delivery Capacity'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="Maximum Capacity">Maximum Capacity</label>

            <input  className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' id='Maximum Capacity' type="number" placeholder='Maximum Capacity'/>

          </div>

          <div className='sm:col-span-6'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="Minimum Request Level">Minimum Request Level</label>

            <input className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' id='Minimum Request Level' type="number" placeholder='Minimum Request Level'/>

          </div>


          <div className='sm:col-span-3'>

            <button type='button'  className='bg-white border border-gray-300 rounded-sm text-gray-700   py-2 w-full mt-3'>Clear</button>

          </div>


          <div className='sm:col-span-3'>

            <button type='submit' className='bg-primary-600 text-white rounded-sm py-2 w-full mt-3'>Create Outlet</button>

          </div>
          
        </form>

      </div>

      {/* ======================================= Right ==================================================== */}

      <div className='sm:col-span-3 max-h-screen border px-3 py-4 rounded-sm'>

        <div className='grid grid-cols-1 gap-2 sm:grid-cols-6 items-center justify-items-center'>

          <p className='text-base md:col-span-3 font-medium text-gray-500'>Outlet</p>
          <p className='text-base md:col-span-3 font-medium text-gray-500'>Stock</p>
          
          <hr className='w-full col-span-6 mt-2'/>

        </div>

            <div  className='grid py-2 grid-cols-1 gap-2 sm:grid-cols-6 items-center justify-items-center'>

              <p className='text-sm md:col-span-3 font-normal text-gray-500'>Hello</p>
              <p className='text-sm md:col-span-3 font-normal text-gray-500'>Hello</p>
            
              <hr className='w-full col-span-6'/>

            </div>

      </div>

    </div>
  )
}

export default AddMainStock