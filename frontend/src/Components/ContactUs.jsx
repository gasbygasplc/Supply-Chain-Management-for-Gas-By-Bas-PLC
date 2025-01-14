import React from 'react'
import { asstets } from '../assets/Assets'

const ContactUs = () => {

  return (

    <section id='contact-us' className='py-3 md:py-8'>

        <div className='text-center flex flex-col gap-1 justify-center items-center'>

            <p className='py-[10px] px-[18px] bg-gray-200 rounded-full text-gray-700'><span className='text-lg'>&#9743; </span> Contact Us</p>

            <h1 className='font-bold py-4 text-4xl'> Get in touch <span className='text-primary'> with our team.</span></h1>


        </div>

        <div className='flex flex-col gap-2 items-center'>

            <img className='w-[60%] bg-white border border-primary rounded mt-4' src={asstets.contact_us} alt="" />

            <div>

                <div>

                    <img src="" alt="" />

                    <h6></h6>

                    <p></p>

                    <button></button>

                </div>

                <div>

                    <img src="" alt="" />

                    <h6></h6>

                    <p></p>

                    <button></button>

                </div>

                <div>

                    <img src="" alt="" />

                    <h6></h6>

                    <p></p>

                    <button></button>

                </div>

                <div>

                    <img src="" alt="" />

                    <h6></h6>

                    <p></p>

                    <button></button>

                </div>

            </div>

        </div>

    </section>

  )

}

export default ContactUs