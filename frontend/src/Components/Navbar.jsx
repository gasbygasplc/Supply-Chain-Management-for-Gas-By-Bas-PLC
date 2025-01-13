import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { asstets } from '../assets/Assets'

const Navbar = () => {

    const [menu , setMenu] = useState('Home');

  return (

    <div className=' bg-white py-5 px-0 flex justify-between items-center'>

        <Link to={'/'}><img className='w-28 md:w-[150px] cursor-pointer' src={asstets.logo} alt="" /></Link>

        <ul className=' hidden md:flex list-none gap-6 text-[#49577e] text-lg'>

            {/* <NavLink to='/'>


                <li className='py-1'>Home</li>

                <hr className='border-none outline-none h-0.5 bg-primary w-full m-auto hidden' />


            </NavLink>

            <NavLink to='/Pricing-Cart'>

                
                <li className='py-1'>Pricing</li>

                <hr className='border-none outline-none h-0.5 bg-primary w-full m-auto hidden' />

            </NavLink>

            <NavLink to='/shop'>

                <li className='py-1'>Shop</li>

                <hr className='border-none outline-none h-0.5 bg-primary w-full m-auto hidden' />

            </NavLink>

            <NavLink to='/Contact'>

                <li className='py-1'>Contact</li>

                <hr className='border-none outline-none h-0.5 bg-primary w-full m-auto hidden' />

            </NavLink>

            <NavLink to='/About-Us'>

                <li className='py-1'>About Us</li>

                <hr className='border-none outline-none h-0.5 bg-primary w-full m-auto hidden' />

            </NavLink>
         */}

         <Link to={'/'} className={menu === 'Home' ? "pb-[1.5px] border-b-[3px] border-primary rounded-[2px]" : ""} onClick={() => setMenu('Home')}>Home</Link>
         <a href="#pricing-cart" className={menu === 'Price' ? "pb-[1.5px] border-b-[3px] border-primary rounded-[2px]" : ""} onClick={() => setMenu('Price')}>Price</a>
         <a href="#gas-request">Gas Request</a>
         <a href="">About Us</a>
         <a href="">Contact Us</a>
        </ul>

        <div className='flex items-center gap-4 sm:gap-8 '>

            <div className='relative'>

                <img className='cursor-pointer w-6 sm:w-8' src={asstets.bucket_icon} alt="" />

                <div className='absolute min-w-[8px] min-h-[8px] bg-primary top-[-3px] right-[-3px] rounded-full'></div>

            </div>

            <button className=' text-white bg-primary text-base font-medium border-2 hover:bg-transparent hover:border-primary hover:text-gray-800 transition duration-300 px-8 py-2.5 rounded-full cursor-pointer text-center'>Sign In</button>
            
        </div>        

    </div>

  )

}

export default Navbar