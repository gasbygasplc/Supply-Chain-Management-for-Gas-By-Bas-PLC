import React from 'react'

const AddOutlet = () => {
  return (
    <div className=' w-full gap-4 bg-white my-3 border mx-2 py-5 px-5 rounded-md grid grid-cols-1 sm:grid-cols-7'>

      {/* ======================================= LEFT ==================================================== */}

      <div className='sm:col-span-4 border px-3 py-4 rounded-sm'>

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-6'>

          <div className='sm:col-span-3'>

            <label className='block font-normal mb-3' htmlFor="outletname">Outlet Name</label>

            <input className='border font-normal border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="text" placeholder='OutletName'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block font-normal mb-3' htmlFor="Location">Location</label>

            <input className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="text" placeholder='Location'/>

          </div>
          
        </div>

      </div>

      {/* ======================================= Right ==================================================== */}

      <div className='sm:col-span-3 max-h-screen border px-3 py-4 rounded-sm'>

        hello

      </div>

    </div>
  )
}

export default AddOutlet