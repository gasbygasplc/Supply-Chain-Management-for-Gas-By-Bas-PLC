import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { asstets } from '../assets/Assets'
import { GasContext } from '../Context/GasContext';

const Navbar = ({setShowSignIn}) => {

    const [menu , setMenu] = useState('Home');

    const {token , setToken} = useContext(GasContext)

  return (

    <div className=' bg-white py-5 px-0 flex justify-between items-center'>

        <Link to={'/'}><img className='w-28 md:w-[150px] cursor-pointer' src={asstets.logo} alt="" /></Link>

        <ul className=' hidden md:flex list-none gap-6 text-[#49577e] text-lg'>

         <Link to={'/'} className={menu === 'Home' ? "pb-[1.5px] border-b-[3px] border-primary rounded-[2px]" : ""} onClick={() => setMenu('Home')}>Home</Link>

         <a href="#pricing-cart" className={menu === 'Price' ? "pb-[1.5px] border-b-[3px] border-primary rounded-[2px]" : ""} onClick={() => setMenu('Price')}>Price</a>

         <a href="#gas-request">Gas Request</a>

         <a href="#about-us">About Us</a>

         <a href="#contact-us">Contact Us</a>
         
        </ul>

        <div className='flex items-center justify-center gap-4 sm:gap-8 '>

            <div className='relative'>

                <img className='cursor-pointer w-6 sm:w-8' src={asstets.bucket_icon} alt="" />

                <div className='absolute min-w-[8px] min-h-[8px] bg-primary top-[-3px] right-[-3px] rounded-full'></div>

            </div>

            {

              token ? 

              <div className='flex items-center gap-2 cursor-pointer group relative'>
                
                <img className='w-12 rounded-full' src={asstets.user_icon} alt="" />

                <img className='w-3' src={asstets.drop_Down_Icon} alt="" />

                <div className='absolute top-0 right-0 pt-14 z-50 text-base font-normal text-[#49577e] hidden group-hover:block'>

                  <div className='min-w-48 bg-[#ffffff] border shadow-md flex flex-col gap-3 p-4 rounded-md'>

                    <p className='hover:text-primary'>My Profile</p>
                    <p className='hover:text-primary'>My Gas Orders</p>
                    <p className='hover:text-primary'>Notifications</p>
                    <p className='hover:text-primary'>Reset Password</p>
                    <p onClick={() => setToken(localStorage.removeItem('token'))} className='hover:text-red-700'>LogOut</p>

                  </div>

                </div>

              </div>

              :

              <button onClick={() => setShowSignIn(true)} className=' text-white bg-primary text-base font-medium border-2 hover:bg-transparent hover:border-primary hover:text-gray-800 transition duration-300 px-8 py-2.5 rounded-full cursor-pointer text-center'>Sign In</button>
            }
            
        </div>        

    </div>

  )

}

export default Navbar