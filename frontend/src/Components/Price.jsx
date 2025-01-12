import React from 'react'
import { asstets } from '../assets/Assets'

const Price = () => {

  return (

    <>

        <section id='pricing-cart' className='min-h-screen flex justify-center py-12 px-6'>

            <div className='text-center flex flex-col justify-self-center items-center gap-2.5'>

                <div className='flex justify-center items-center w-auto text-base bg-gray-200 py-1 px-3 rounded-full'>

                    <img src={asstets.payment}/>

                    <p>Price</p>

                </div>

                <h1>Tailored Pricing Solutions</h1>

                <p>No hidden fees, just simple and affordable plans tailored to your needs</p>

                <div>

                    <button>Gas Refill</button>
                    
                    <button>Buy Cylinders</button>

                </div>

            </div>

            <div>

                {/* =========================================== Small Gas ============================================== */}

                <div>

                    <h2></h2>
                </div>
            </div>

        </section>

    </>
    
  )

}

export default Price