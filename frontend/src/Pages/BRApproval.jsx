import React from 'react'

const BRApproval = () => {
  return (
    <>

        <div className='h-screen w-full flex flex-col items-center'>

            <h1 className="py-6 mt-4 text-2xl font-bold text-center text-gray-900 sm:text-4xl">
                <span className="text-primary">Submit</span> your BR Here
            </h1>

            <div className='flex flex-col items-center justify-center w-full md:w-1/2'>

                <label htmlFor="dropzone-file" className='flex flex-col items-center border-primary mt-8 justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50'>

                    <div className='flex flex-col items-center justify-center pt-5 pb-5'>

                        <svg className="w-8 h-8 mb-4 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">

                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            
                        </svg>

                        <p className='mb-2 text-sm text-gray-500'><span className='font-semibold'>Click to upload</span> or drag and drop</p>

                        <p className='text-xs text-gray-500'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>

                    </div>

                    <input type="file" id='dropzone-file' className='hidden'/>

                </label>

                <div className='w-full gap-2 text-gray-700 text-base'>

                    <label className='block' htmlFor="Phone">Phone number</label>

                    <input type="text" className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary' placeholder='0761234567' id='Phone' />

                </div>

            </div>

        </div>
    
    </>
  )
}

export default BRApproval