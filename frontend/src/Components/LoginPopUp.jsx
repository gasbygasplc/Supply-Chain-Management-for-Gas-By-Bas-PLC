import React from 'react'
import { asstets } from '../assets/Assets'

const LoginPopUp = () => {

  return (

    <div>
        
        <form >


            <div>

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