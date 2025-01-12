import React, { useState } from 'react'
import { asstets } from '../assets/Assets'

const Price = () => {

    const [priceMenu , setPriceMenu] = useState('Gas Refill')

  return (

    <>

        <section id='pricing-cart' className='min-h-[80%] md:min-h-screen md:grid grid-cols-1 flex flex-col justify-center py-3 md:py-12 px-6'>

            <div className='text-center flex flex-col justify-items-center items-center gap-4'>

                <p className='py-1 px-3 bg-gray-200 rounded-full text-gray-700'> &#36; Pricing</p>

                <h1 className='font-bold text-4xl'> <span className='text-[#0D6EFD]'>GasByGas</span> Pricing Solutions</h1>

                <p className='text-[14.5px] text-gray-500'>No hidden fees, just simple and affordable plans tailored to your needs</p>

                <div className='flex gap-4 bg-gray-100 py-1 px-1.5 rounded-full'>

                    <button className={priceMenu === 'Gas Refill' ? "bg-white py-0.5 px-2 text-[15px] text-base text-gray-800 rounded-full" : "bg-transparent py-0.5 px-2 text-[15px] text-base text-gray-800"} onClick={() => setPriceMenu('Gas Refill')}>Gas Refill</button>
                    
                    <button className={priceMenu === 'Buy Gas' ? 'bg-white py-0.5 px-2 text-[15px] text-base text-gray-800 rounded-full' : 'bg-transparent py-0.5 px-2 text-[15px] text-base text-gray-800'} onClick={() => setPriceMenu('Buy Gas')}>Buy Gas</button>

                </div>

                <div className='grid grid-cols-1 w-full gap-10 mx-auto mt-4 md:grid-cols-3 '>

                    {/* =========================================== Small Gas ============================================== */}

                    <div  className='bg-white py-6  max-w-96 border rounded-md'>

                        <div>

                            <p>Small Gas</p>
                            <h1>LKR 820.94</h1>

                        </div>

                    </div>

                    <div className='bg-white py-6  max-w-96 border rounded-md'>

                        <div>

                            <p>Medium Gas</p>
                            <h1>LKR 800</h1>

                        </div>

                    </div>

                    <div className='bg-white py-6  max-w-96 border rounded-md'>

                        <div>

                            <p>Large Gas</p>
                            <h1>LKR 3922.24</h1>

                        </div>
                        
                    </div>

                </div>

            </div>



        </section>

    </>
    
  )

}

export default Price