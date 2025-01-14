import React from 'react'
import { asstets } from '../assets/Assets'

const ContactUs = () => {

  return (

    <section id='contact-us' className='py-3 md:py-5'>

        <div className='text-center flex flex-col gap-1 justify-center items-center'>

            <p className='py-[10px] px-[18px] bg-gray-200 rounded-full text-gray-700'><span className='text-lg'>&#9743; </span> Contact Us</p>

            <h1 className='font-bold py-2 text-4xl'> Get in touch <span className='text-primary'> with our team.</span></h1>


        </div>

        <div className='flex flex-col w-full gap-2 items-center'>

            <img className='w-full md:w-[60%]  bg-white border-2 rounded mt-4' src={asstets.contact_us} alt="" />

            <div className='flex flex-col w-full md:flex-row items-center gap-4 mt-3 text-sm'>

                <div className='w-[80%] gap-3 p-3 rounded-md cursor-pointer flex flex-col justify-center items-start white border-2 '>

                    <div className='p-1 bg-white border rounded-md'>

                        <img className='w-6' src={asstets.chat_to_purchase} alt="" />

                    </div>

                    <h6 className='text-sm font-semibold'>Chat to Purchase</h6>

                    <p className='text-gray-500'>Speak to our friendly team.</p>

                    <button className='bg-white py-2 w-full text-center border-2 px-3 rounded-md hover:bg-primary hover:text-white transition duration-300 hover:border-primary'>sales@gasbygas.com</button>

                </div>

                <div className='w-[80%] items-start gap-3 p-3 rounded-md cursor-pointer flex flex-col   bg-white border-2 text-sm'>

                    <div className='p-1 bg-white border rounded-md'>

                        <img className='w-6' src={asstets.chat_to_support} alt="" />

                    </div>

                    <h6 className='text-sm font-semibold'>Chat to support</h6>

                    <p className='text-gray-500'>we are here to help.</p>

                    <button className='bg-white py-2 w-full text-center border-2 px-3 rounded-md hover:bg-primary hover:text-white transition duration-300 hover:border-primary'>support@gasbygas.com</button>

                </div>

                <div className='w-[80%] items-start gap-3 p-3 rounded-md cursor-pointer flex flex-col   bg-white border-2 text-sm'>

                    <div className='p-1 bg-white border rounded-md'>

                        <img className='w-6' src={asstets.location} alt="" />

                    </div>

                    <h6 className='text-sm font-semibold'>Visit Us</h6>

                    <p className='text-gray-500'>Visit your near by Outlet</p>

                    <button className='bg-white py-2 w-full text-center border-2 px-3 rounded-md hover:bg-primary hover:text-white transition duration-300 hover:border-primary'>call to near outlet</button>

                </div>

                <div className='w-[80%] items-start gap-3 p-3 rounded-md cursor-pointer flex flex-col   bg-white border-2 text-sm'>

                    <div className='p-1 bg-white border rounded-md'>

                        <img className='w-6' src={asstets.call} alt="" />

                    </div>

                    <h6 className='text-sm font-semibold'>Call Us</h6>

                    <p className='text-gray-500'>Mon - Sun from 8am to 7pm</p>

                    <button className='bg-white py-2 w-full text-center border-2 px-3 rounded-md hover:bg-primary hover:text-white transition duration-300 hover:border-primary'>0094-76 413 2578</button>

                </div>

            </div>

        </div>

    </section>

  )

}

export default ContactUs