import React, { useState } from 'react'
import { asstets } from '../assets/Assets'

const Price = () => {

    const [priceMenu , setPriceMenu] = useState('Gas Refill')

  return (

    <>

        <section id='pricing-cart' className='min-h-[80%] md:min-h-screen md:grid grid-cols-1 flex flex-col justify-center py-3 md:py-4 px-6'>

            <div className='text-center flex flex-col justify-items-center items-center gap-4'>

                <p className='py-1 px-3 bg-gray-200 rounded-full text-gray-700'> &#36; Pricing</p>

                <h1 className='font-bold text-4xl'> <span className='text-[#0D6EFD]'>GasByGas</span> Pricing Solutions</h1>

                <p className='text-[14.5px] text-gray-500'>No hidden fees, just simple and affordable plans tailored to your needs</p>

                <div className='flex gap-4 bg-gray-100 py-1 px-1.5 rounded-full'>

                    <button className={priceMenu === 'Gas Refill' ? "bg-white py-0.5 px-3 text-[15px] text-base text-gray-800 rounded-full" : "bg-transparent py-0.5 px-3 text-[15px] text-base text-gray-800"} onClick={() => setPriceMenu('Gas Refill')}>Refill Your Gas</button>
                    
                    <button className={priceMenu === 'Buy Gas' ? 'bg-white py-0.5 px-3 text-[15px] text-base text-gray-800 rounded-full' : 'bg-transparent py-0.5 px-3 text-[15px] text-base text-gray-800'} onClick={() => setPriceMenu('Buy Gas')}>Buy Your New Gas</button>

                </div>

                <div className='grid grid-cols-1 w-full gap-10 mx-auto mt-4 md:grid-cols-3 '>

                    {/* =========================================== Small Gas ============================================== */}

                    <div  className='bg-white py-4  max-w-96 border rounded-md shadow-sm'>

                        <div  className='flex flex-col gap-3 mb-6 text-center cursor-pointer'>

                            <p className='text-base font-semibold text-gray-700'>Small Gas</p>
                            <h1 className='text-2xl font-semibold text-gray-800'>LKR 820.94</h1>

                        </div>

                        <hr className='max-w-[80%] border mx-auto  mb-6'/>

                        <div className='flex flex-col gap-3 mb-6 text-center cursor-pointer'>

                            <h1 className='text-1xl  text-gray-800'>2.3Kg</h1>

                        </div>

                        <hr className='max-w-[80%] border mx-auto mb-6'/>

                        <div className='flex flex-col gap-3 justify-start items-start mx-auto ml-9'>

                            <p> <span className='text-primary'>&#10003;</span> Lightweight and portable </p>
                            <p> <span className='text-primary'>&#10003;</span> Easy to store in compact spaces</p>
                            <p> <span className='text-primary'>&#10003;</span> Affordable pricing for small users</p>
                            <p> <span className='text-primary'>&#10003;</span> Safe for indoor and outdoor use</p>
                            <p> <span className='text-primary'>&#10003;</span> 24/7 customer support included</p>

                        </div>

                        <button className='bg-primary mt-4 w-[80%] mx-auto py-2 rounded-md text-white hover:bg-transparent border hover:border-primary hover:text-gray-800 transition duration-300'>Start Your Purchase</button>

                    </div>

                    <div className='bg-white py-4  max-w-96 border rounded-md  shadow-sm'>

                        <div className='flex flex-col gap-3 text-center mb-6 cursor-pointer'>

                            <p className='text-base font-semibold text-gray-700'>Medium Gas</p>
                            <h1 className='text-2xl font-semibold text-gray-800'>LKR 800.59</h1>

                        </div>

                        <hr className='max-w-[80%] border mx-auto mb-6'/>

                        <div className='flex flex-col gap-3 mb-6 text-center cursor-pointer'>

                            <h1 className='text-1xl  text-gray-800'>5Kg</h1>

                        </div>

                        <hr className='max-w-[80%] border mx-auto mb-6'/>

                        <div className='flex flex-col gap-3 justify-start items-start mx-auto ml-9'>

                            <p> <span className='text-primary'>&#10003;</span> Balanced size for home cooking needs </p>
                            <p> <span className='text-primary'>&#10003;</span> 24/7 customer support included</p>
                            <p> <span className='text-primary'>&#10003;</span> Transparent pricing with no hidden costs</p>
                            <p> <span className='text-primary'>&#10003;</span> Standard compatibility</p>
                            <p> <span className='text-primary'>&#10003;</span> Great value for regular household use</p>

                        </div>

                        <button className='bg-primary mt-4 w-[80%] mx-auto py-2 rounded-md text-white  hover:bg-transparent border hover:border-primary hover:text-gray-800 transition duration-300'>Start Your Purchase</button>

                    </div>

                    <div className='bg-white py-4  max-w-96 border rounded-md  shadow-sm'>

                        <div className='flex flex-col gap-3 mb-6 text-center cursor-pointer'>

                            <p className='text-base font-semibold text-gray-700'>Large Gas</p>
                            <h1 className='text-2xl font-semibold text-gray-800'>LKR 3922.24</h1>

                        </div>

                        <hr className='max-w-[80%] border mx-auto mb-6'/>

                        <div className='flex flex-col gap-3 mb-6 text-center cursor-pointer'>

                            <h1 className='text-1xl text-gray-800'>12.5Kg</h1>

                        </div>

                        <hr className='max-w-[80%] border border-gray-200 mx-auto mb-6'/>

                        <div className='flex flex-col gap-3 justify-start items-start mx-auto ml-9'>

                            <p> <span className='text-primary'>&#10003;</span> High capacity for extended use </p>
                            <p> <span className='text-primary'>&#10003;</span> Express delivery for bulk orders</p>
                            <p> <span className='text-primary'>&#10003;</span> Durable design for long-term use</p>
                            <p> <span className='text-primary'>&#10003;</span> Eco-friendly and recyclable material</p>
                            <p> <span className='text-primary'>&#10003;</span> Compatible with most small stoves</p>

                        </div>

                        <button className='bg-primary mt-4 w-[80%] mx-auto py-2 rounded-md text-white hover:bg-transparent border hover:border-primary hover:text-gray-800 transition duration-300'>Start Your purchase</button>
                        
                    </div>

                </div>

            </div>



        </section>

    </>
    
  )

}

export default Price