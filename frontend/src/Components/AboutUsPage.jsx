import React from 'react'
import { asstets } from '../assets/Assets'

const AboutUsPage = () => {

  return (

    <section id='about-us' className='py-3 md:py-8'>

      {/* ============================================ Our Company ============================================== */}

      <div className='text-center flex flex-col justify-items-center items-center'>

        <p className='py-[8px] px-[16px] md:py-[10px] md:px-[18px] bg-gray-200 rounded-full text-gray-700'> &#9432; About Us</p>

        <h1 className='font-bold py-4 text-2xl md:text-4xl'>Why <span className='text-[#0D6EFD]'>Choose</span> Our Company</h1>

        <p className='text-sm text-gray-500 py-0'>Fueling Your Home, Business, and Beyond – Reliable Gas Cylinders Delivered and Refilled with Care. <br/> Let Us Power Your Everyday Moments!</p>

      </div>

      {/* =============================================== Image ================================================= */}

      <div className='flex flex-col md:flex-row gap-12 my-10'>

        <img className='w-full md:max-w-[360px] rounded-md' src={asstets.about_us} alt="" />

        <div className=' flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-500'>

          <b className='text-primary text-lg'>Gas By Gas</b>

          <p>Welcome to Gas By Gas, your reliable partner for all your gas cylinder refill and purchase needs. At GasEase, we understand the importance of a steady and safe supply of cooking and industrial gas for your home or business. Our platform is designed to make ordering gas cylinders and scheduling refills seamless, ensuring convenience and safety every step of the way. With a commitment to quality and timely delivery, GasEase is here to simplify your gas management and keep your daily operations running smoothly</p>

          <p>GasEase is committed to excellence in gas supply and delivery services. We continually enhance our platform, incorporating the latest technologies to provide a seamless user experience and exceptional service. Whether you’re scheduling your first refill or managing recurring orders, GasEase is here to support you with reliable solutions every step of the way</p>

          <b className='text-primary text-lg'>Our Vision</b>

          <p>To revolutionize the way individuals and businesses access and manage their gas supply by providing a seamless, efficient, and eco-friendly platform that ensures safety, reliability, and convenience. We aim to be the most trusted name in gas cylinder refill and delivery services, fostering sustainability and innovation in every aspect of our operations.</p>

        </div>
        
      </div>

    </section>

  )
  
}

export default AboutUsPage