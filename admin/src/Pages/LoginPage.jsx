import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../Context/AdminContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { OutletContext } from '../Context/OutletContext.jsx';

const LoginPage = () => {

    const [email , setEmail] = useState('');

    const [state , setState] = useState('Admin');

    const [password , setPassword] = useState('');

    const {aToken , SetAToken , backendURL} = useContext(AdminContext);

    const {Otoken , setOtoken} = useContext(OutletContext);

    const onsubmitHandler = async(event) => 
    {
        event.preventDefault();

        try 
        {

            if(state === "Admin")
            {

                const {data} = await axios.post(backendURL +'/api/admin/login' , {email , password});

                if(data.success)
                {
                    
                    localStorage.setItem('aToken' , data.atoken);

                    SetAToken(data.atoken);

                    console.log(aToken);


                }
                else
                {
                    toast.error(data.message);
                }

            }
            else
            {

                const {data} = await axios.post(backendURL + '/api/outlet/login' , {email , password});

                if(data.success)
                {

                    toast.success(data.message);

                    setOtoken(data.Otoken);

                    localStorage.setItem('Otoken' , data.Otoken);

                }
                else
                {

                    toast.error(data.message);

                }
                
            }
            
        } catch (error) 
        {
            
            console.error('Login error:', error);
            
            toast.error('An error occurred. Please try again later.');

        }
    }


  return (

    <>
    
        <section className="bg-gray-50">

            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">

                    <img className="w-[62px] h-[62px] mr-2" src={assets.FlameGas} alt="logo"/>
                    GasByGas    

                </a>

                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">

                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Signin as an {state === "Admin" ? "Admin" : "Outlet"}
                        </h1>

                        <form onSubmit={onsubmitHandler} className="space-y-4 md:space-y-6" action="#">

                            <div>

                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-primary-600 block w-full p-2.5 " placeholder="name@company.com" required=""/>

                            </div>

                            <div>

                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:outline-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>

                            </div>

                            <div className="flex items-start">

                                <div className="flex items-center h-5">

                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>

                                </div>

                                <div className="ml-3 text-sm">

                                    <label htmlFor="terms" className="font-light text-gray-500 ">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>

                                </div>

                            </div>

                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Signin to an account</button>

                        </form>

                        {state === "Admin" ?

                            <p className="mt-10 text-center text-sm/6 text-gray-500">

                                Sign in as an Outlet?

                                <a onClick={() => setState("Outlet")} href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">

                                    Outlet Signin

                                </a>

                            </p> 
                            
                            :

                            <p className="mt-10 text-center text-sm/6 text-gray-500">

                                Signin as an Admin?

                                <a href="#" onClick={ () => setState("Admin")} className="font-semibold text-indigo-600 hover:text-indigo-500">

                                Admin Signin  

                                </a>
                            </p>
                        } 

                    </div>

                </div>

            </div>

        </section>
    
    </>

  )

}

export default LoginPage