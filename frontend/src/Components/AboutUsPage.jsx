import React from 'react'
import { asstets } from '../assets/Assets'

const AboutUsPage = () => {

  return (

    <section id='about-us' className='min-h-[80%] gap-0 md:min-h-screen md:grid grid-cols-1 flex flex-col justify-center py-3 md:py-8 px-6'>

        {/* ============================================ Our Company ============================================== */}

        <div className='text-center p-0 m-0 h-auto'>

            <h1 className='font-bold text-4xl'><span className='text-[#0D6EFD]'>Our</span> Company</h1>

            <p className='text-sm text-gray-500 py-0'>Fueling Your Home, Business, and Beyond – Reliable Gas Cylinders Delivered and Refilled with Care. <br/> Let Us Power Your Everyday Moments!</p>

        </div>

        {/* =============================================== Image ================================================= */}

        <div className='min-h-[10vw] bg-center mt-0 sm:min-h-[10vw] bg-no-repeat bg-contain' style={{backgroundImage:`url(${asstets.about_us})`}}>
        


        </div>

        {/* ============================================ Work with Clients ========================================= */}

        <div>



        </div>

    </section>

  )
  
}

export default AboutUsPage