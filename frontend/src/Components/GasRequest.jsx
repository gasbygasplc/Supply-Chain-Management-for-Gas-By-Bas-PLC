import React from 'react'
import { asstets } from '../assets/Assets'

const GasRequest = () => {

  return (

    <section id='gas-request' className='w-full'>

        <h1 className='py-6 mt-4 text-4xl font-bold text-center text-gray-900 sm:text-4xl'><span className='text-primary'>Refill</span> your gas Here </h1>

        <div className='flex flex-col w-full md:flex-row justify-between items-center sm:items-start gap-4 px-4 py-4 bg-white rounded-lg md:px-8 md:py-8 md:gap-8'>


            {/* Gas type */}
            
            <div className='w-full'>

                <div className='bg-white border border-gray-300  h-72 md:h-96 rounded-lg flex justify-center items-center '>
                    
                    <img className='w-[450px] bg-cover' src={asstets.small_gas} />

                </div>

                <div className='flex w-full  justify-between items-center gap-4 mt-6'>

                    <div  className='w-full py-4 bg-white border hover:border-primary border-gray-300  rounded-lg flex justify-center items-center cursor-pointer '>

                        <img  className='w-full' src={asstets.small_gas} alt="" />

                    </div>

                    <div className='w-full py-4 bg-white border  hover:border-primary border-gray-300 rounded-lg flex justify-center items-center cursor-pointer '>

                        <img className='w-full'  src={asstets.medium_gas} alt="" />

                    </div>

                    <div className='w-full py-4 bg-white border hover:border-primary  border-gray-300  rounded-lg flex justify-center items-center cursor-pointer '>

                        <img className='w-full'  src={asstets.large_gas} alt="" />

                    </div>

                </div>

            </div>

            {/* Gas quantity */}

            <div className='w-full flex flex-col gap-10'>

                <div className='flex justify-between items-center' >

                    <p>Weight</p>

                    <p>12.9 Kg</p>

                </div>

                <div className='flex justify-between'>

                    <p>Quantity:</p>

                    <div className='flex gap-2 items-center'>

                        <img src={asstets.remove_icon} alt="" />

                        <p>1</p>

                        <img src={asstets.add_icon} alt="" />

                    </div>

                    <p>1</p>


                </div>

                <div className='flex justify-between items-center'>

                    <p>3780.90</p>

                    <p>3780.90</p>

                </div>

            </div>

            {/* payment option */}

            <div className='w-full'>

                <div>

                    <h1>Gas By Gas</h1>

                    <p>Gas By Gas is a brand who's provide LPEG gas cylinder for home and organization they quality is much better than others.</p>
                    
                </div>

                <div>



                </div>

            </div>

        </div>

    </section>

  )

}

export default GasRequest