import React from 'react'
import { asstets } from '../assets/Assets'

const Header = () => {


  return (

    <section id='Home' className="min-h-[38vw] sm:min-h-[34vw] my-8 bg-no-repeat bg-contain relative" style={{backgroundImage:`url(${asstets.header_image})`}}>
        
      <div className="absolute flex flex-col items-start gap-5 sm:gap-[1.5vw] max-w-[65%] sm:max-w-[50%] md:max-w-[45%] bottom-[8%] sm:bottom-[4.5%] left-5 sm:left-[2.5vw] animate-fadeIn">

        <h2 className='font-medium text-white text-[max(5vw,8px)] sm:text-[max(4.5vw,22px)]'>Your Trusted Partner for Safe Gas Solutions!</h2>

        <p className='hidden sm:block text-white text-[3vw] sm:text-[1.5vw] md:text-[1vw] leading-[25px] sm:leading-[30px]'>

          Welcome to GasByGas, your one-stop destination for all gas cylinder needs. Order, refill, and receive cylinders at your doorstep, ensuring safety and quality every step of the way!
          
        </p>

        <a href='#gas-request'  className='border-none  text-black font-medium py-[2vw] sm:py-[2vw] md:py-[1vw] px-[4vw] sm:px-[4vw] md:px-[2.3vw] bg-white text-[3vw] sm:text-[max(1.5vw,13px)] md:text-[max(1vw,13px)] rounded-full cursor-pointer'>Request Gas</a>

      </div>

    </section>

  )

}

export default Header