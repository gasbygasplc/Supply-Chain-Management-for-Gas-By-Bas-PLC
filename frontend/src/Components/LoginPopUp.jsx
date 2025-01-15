import React from 'react'
import { asstets } from '../assets/Assets'

const LoginPopUp = () => {

  return (

    <div className='absolute inset-0 z-10 bg-black bg-opacity-70 grid place-items-center'>
        
        <form className='bg-white flex flex-col gap-6 p-6 rounded-lg w-[90%] sm:w-[330px] md:w-[24vw] fadeIn'>


            <div >

                <h2>Sign In</h2>

                <img src={asstets.cross_icon} />

            </div>

            <div>

                <input type="text" />
                <input type="email" />
                <input type="password" />
                <input type="text" />
                <select defaultValue={'User'}>

                    <option value="User">User</option>
                    <option value="Organization">Organization</option>

                </select>

            </div>

            <button>Sign In</button>

            <div>

                <input type="checkbox" />

                <p>By Continuing, i agree to the terms of use & Privacy Policy</p>

            </div>

            <p>Create a new Account? <span>Click Here</span></p>


        </form>

    </div>

  )

}

export default LoginPopUp