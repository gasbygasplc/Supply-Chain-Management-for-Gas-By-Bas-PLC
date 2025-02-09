import React from 'react'

const DeliveryShedule = () => {
  return (
    
    <section className='w-full min-h-screen'>

      <form className='w-full flex flex-col md:flex-row mt-6 gap-6 text-gray-700 text-base'>

        {/* ====================================== Left ========================================= */}
        <div className='w-full md:w-1/2'>

          <h1 className='font-semibold py-2 text-2xl md:text-3xl my-4' >Delivery Information</h1>

          <div className='w-full flex flex-col gap-6'>

            <div className = ' flex flex-col md:grid md:grid-cols-2 gap-4 w-full'>

              <div className='w-full flex flex-col gap-2'>

                <label className='block' htmlFor="first-name">First name</label>

                <input type="text" className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary' placeholder='Diyath' id='first-name'/>

              </div>

              <div className='w-full flex flex-col gap-2'>

                <label className='block' htmlFor="last-name">Last name</label>

                <input type="text" className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary' placeholder='Shahan' id='last-name'/>
              </div>

            </div>

            <div className = ' flex flex-col md:grid md:grid-cols-2 gap-4 w-full'>

              <div className='w-full flex flex-col md:col-span-1 gap-2'>

                <label className='block' htmlFor="Email">Email</label>

                <input type="text" className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary' placeholder='Diyath@gmail.com' id='Email' />

              </div>
              <div className='w-full flex flex-col md:col-span-1 gap-2'>

                <label className='block' htmlFor="Phone">Phone number</label>

                <input type="text" className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary' placeholder='0761234567' id='Phone' />

              </div>

            </div>

            <div className = ' flex flex-col md:grid md:grid-cols-3 gap-4 w-full'>

              <div className='w-full flex flex-col md:col-span-1 gap-2'>

                <label className='block' htmlFor="Country">Country</label>

                <input type="text" className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary'  placeholder='Sri Lanka' id='Country' />

              </div>

              <div className='w-full flex flex-col md:col-span-1 gap-2'>

                <label className='block' htmlFor="State/Province">State/Province</label>

                <input type="text" className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary' placeholder='Western Province' id='State/Province' />

              </div>

              <div className='w-full flex flex-col md:col-span-1 gap-2'>

                <label className='block' htmlFor="Zip-Code">Zip-Code</label>

                <input type="number" className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary' placeholder='40000' id='Zip-Code' />

              </div>

            </div>


            <div className = ' flex flex-col md:grid md:grid-cols-2 gap-4 w-full'>

              <div className='w-full flex flex-col md:col-span-1 gap-2'>

                <label className='block' htmlFor="Address">Address</label>

                <input type="text" className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary' placeholder='Address' />

              </div>

              <div className='w-full flex flex-col md:col-span-1 gap-2'>

                <label className='block' htmlFor="City">City</label>

                <input type="text" className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary' placeholder='City' />

              </div>

            </div>
    
          </div>

        </div>

        {/* ====================================== Right ========================================= */}

        <div className='w-full md:w-1/2'>

          <h1 className='font-semibold py-2 text-2xl md:text-3xl' >Gas  Information</h1>

        </div>
      </form>

    </section>   
  )  
}  
             
export default DeliveryShedule          