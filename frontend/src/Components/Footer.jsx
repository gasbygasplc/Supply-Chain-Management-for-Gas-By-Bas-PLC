import React from 'react'
import { asstets } from '../assets/Assets'

const Footer = () => {

  return (

    <footer className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm'>

      {/* ========================================= Left Side ================================================= */}

        <div>

          <img className='mb-5 w-30' src={asstets.logo} alt="" />

          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Gas by Gas is your trusted partner for reliable, affordable, and eco-friendly gas solutions. We’re committed to delivering exceptional service and top-quality products to meet your energy needs.</p>

        </div>

        {/* ========================================== Center Part ============================================= */}

        <div >

          <p className='text-xl font-medium mb-5 text-primary'>Gas By Gas</p>

          <ul className='flex flex-col gap-2 text-gray-600'>

            <li>Home</li>
            <li>price</li>
            <li>Gas Request</li>
            <li>About Us</li>
            <li>Contact Us</li>

          </ul>

        </div>

        {/* ============================================ Right SIde =========================================== */}

        <div>

          <p>Get in touch</p>

          <ul>

            <li>0750136869</li>
            <li>gasbygasplc@gmail.com</li>

          </ul>

        </div>

        {/* ============================================== Footer Copyrights ==================================== */}

        <div>

          <hr />

          <p>Copyright 2025@ GasByGas - All Rights Reserved</p>

        </div>

    </footer>

  )

}

export default Footer