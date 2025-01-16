import React, { useContext, useState } from 'react'
import { asstets } from '../assets/Assets'
import { GasContext } from '../Context/GasContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopUp = ({setShowSignIn}) => {

    const [currentState , setCurrentState] = useState('Sign In');

    const {backendURL} = useContext(GasContext);

    const [data , setData] = useState({

        name: '',

        phone : '',

        nic : '',

        role : '',

        email : '',

        password : ''

    });

    //onchange handler function

    const onchangeHandler = (e) => {

        const name = e.target.name;

        const value = e.target.value;

        setData(previousData => ({...previousData , [name] : value}));

    };

    //onsubmit handler function

    const onSubmitHandler = async (e) => {

        e.preventDefault();

        const normalizedPhone  = data.phone.startsWith('94') ? data.phone : `94${data.phone.replace(/^0/, '')}`;

        const payLoad = {...data , phone : normalizedPhone};

        let localHost = 'http://localhost:4000';

        if(currentState === 'Sign In')
        {

            localHost += '/api/auth/login';
        }
        else
        {

            localHost += '/api/auth/register';

        }

        try
        {

            const response  = await axios.post(localHost , payLoad);

            if(response.status === 201)
            {

                toast.success(response.message);
                data.name = '';
                data.phone = '';
                data.nic = '';
                data.role = '';
                data.email = '';    
                data.password = '';

            }
            else
            {

                toast.error(response.message);
            }

        }
        catch(error)
        {

            console.error("Error submitting form:", error);
            toast.error("Error submitting form");

        }
        
    }

  return (

    <div className='absolute inset-0 z-10 bg-black bg-opacity-70 grid place-items-center'>
        
        <form onSubmit={onSubmitHandler} className='bg-white flex flex-col gap-6 p-6 rounded-lg w-[95%] sm:w-[330px] md:w-[24vw] fadeIn'>


            <div className='flex justify-between items-center text-black'>

                <h2 className='text-lg font-semibold'>{currentState}</h2>

                <img onClick={() => setShowSignIn(previous => previous ? false : true)} className='w-4 cursor-pointer' src={asstets.cross_icon} alt='closer' />

            </div>

            <div className='flex flex-col gap-4'>

                {currentState === 'Sign In' ? <></> : <>
                    
                <input onChange={onchangeHandler} value={data.name} name='name' type="text" placeholder='Mathumitha' className='outline-none  border border-primary p-2 rounded-md'/>
                <input onChange={onchangeHandler} value={data.phone} name='phone' type="text" placeholder='0094771234567' className='outline-none  border border-primary p-2 rounded-md'/>
                <input onChange={onchangeHandler} value={data.nic} name='nic' type="text" placeholder='200118706543V' className='outline-none  border border-primary p-2 rounded-md'/>
                <select onChange={onchangeHandler} value={data.role} name='role' className='outline-none  border border-primary p-2 rounded-md'>

                    <option value="User">User</option>
                    <option value="Organization">Organization</option>

                </select> </>}
                <input onChange={onchangeHandler} value={data.email} name='email' type="email" placeholder='Gasbygas@gmail.com' className='outline-none  border border-primary p-2 rounded-md'/>
                <input onChange={onchangeHandler} value={data.password} name='password' type="password" placeholder='**********' className='outline-none  border border-primary p-2 rounded-md'/>

            </div>

            <button type='submit' className='bg-primary text-white py-[10px] rounded-md text-sm font-medium cursor-pointer'>{currentState}</button>

            <div className='flex items-center gap-2'>

                <input type="checkbox" required/>

                <p className='text-sm'>By Continuing, i agree to the terms of use & Privacy Policy</p>

            </div>

            {
                currentState === "Sign In" ? 

                (<p className='text-sm'>Create a new account? <span  onClick={() => setCurrentState('Sign Up')} className='text-sm font-semibold cursor-pointer text-primary'>Click Here</span></p>) :

                (<p className='text-sm'>Sign In to your Account? <span onClick={() => setCurrentState('Sign In')} className='text-sm font-semibold cursor-pointer text-primary'>Click Here</span></p>)
            }


        </form>

    </div>

  )

}

export default LoginPopUp