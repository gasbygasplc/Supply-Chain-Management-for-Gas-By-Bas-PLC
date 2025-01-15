import React from 'react'
import { asstets } from '../assets/Assets'

const LoginPopUp = () => {

  return (

    <div className='absolute inset-0 z-10 bg-black bg-opacity-70 grid place-items-center'>
        
        <form className='bg-white flex flex-col gap-6 p-6 rounded-lg w-[90%] sm:w-[330px] md:w-[24vw] fadeIn'>



            <div className='flex justify-between items-center text-black'>

                <h2 className='text-lg font-semibold'>Sign In</h2>

                <img className='w-4 cursor-pointer' src={asstets.cross_icon} alt='closer' />

            </div>

            <div className='flex flex-col gap-4'>

                <input type="text" placeholder='Gas by Gas' className='outline-none  border border-primary p-2 rounded-md'/>
                <input type="email" placeholder='Gasbygas@gmail.com' className='outline-none  border border-primary p-2 rounded-md'/>
                <input type="password" placeholder='**********' className='outline-none  border border-primary p-2 rounded-md'/>
                <input type="text" placeholder='0094771234567' className='outline-none  border border-primary p-2 rounded-md'/>
                <select defaultValue={'User'} className='outline-none  border border-primary p-2 rounded-md'>

                    <option value="User">User</option>
                    <option value="Organization">Organization</option>

                </select>

            </div>

            <button className='bg-primary text-white py-2 rounded-md text-sm font-medium cursor-pointer'>Sign In</button>

            <div className='flex items-center gap-2 mt-4'>

                <input type="checkbox" />

                <p className='text-sm'>By Continuing, i agree to the terms of use & Privacy Policy</p>

            </div>

            <p className='text-sm'>Create a new Account? <span className='text-sm font-semibold cursor-pointer'>Click Here</span></p>


        </form>

    </div>

  )

}

export default LoginPopUp