import React from 'react'
import { asstets } from '../assets/Assets'

const PriceingCart = () => {
  return (
    <>
    
      <section id='Pricing-Cart' className='flex justify-center items-start min-h-screen'>

        <div className='py-8 px-4 grid grid-cols-1 max-w-screen-xl lg:py-16 lg:px-6 '>

          {/* ========================================= Upper Content =========================================== */}

          <div className='flex flex-col gap-2.5 mx-auto max-w-screen-md text-center mb-8 lg:mb-12'>

            <div className='flex items-center justify-center'>

              <img src={asstets.payment} alt="" />
              <p>Pricing</p>

            </div>

            <h2>Tailored Pricing Solutions</h2>

            <p>No hidden payments, just simple and affordable plans tailored to your needs</p>

            <div>

              <button>Gas Refill</button>

              <button>Purchase Gas</button>

            </div>

          </div>

          {/* ========================================= Lower Content =========================================== */}

          <div>


          </div>

        </div>

      </section>
    
    </>
  )
}

export default PriceingCart