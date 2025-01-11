import React from 'react'
import { Link } from 'react-router-dom'
import { asstets } from '../assets/Assets'

const Navbar = () => {

  return (

    <div className='py-5 px-0 flex justify-between items-center bg-white'>

        <Link to={'/'}><img className='w-[150px]' src={asstets.logo} alt="" /></Link>

        <ul>

            <li>Home</li>

            <li>Gas Menu</li>

            <li>About Us</li>

            <li>ContactUs</li>
        
        </ul>

        <div>

            <div>

                <img src={asstets.bucket_icon} alt="" />

                <div></div>

            </div>

            <button>Sign In</button>
            
        </div>        

    </div>

  )

}

export default Navbar