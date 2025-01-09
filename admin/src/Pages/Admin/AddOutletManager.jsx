import React, { useContext, useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../Context/AdminContext';

const AddOutletManager = () => {

  const [name  , setName] = useState('');

  const [outletName , setOutletName] = useState('');

  const [email , setEmail] = useState('');

  const [password , setPassword] = useState('');

  const [phoneNumber , setPhoneNumber] = useState('');

  const [userRole , setUserRole] = useState('');

  const {aToken , backendURL} = useContext(AdminContext)

  const onsubmitHandler = async(event) => {

    event.preventDefault();

    try 
    {

      const formData = new FormData();

      formData.append('name' , name );
      formData.append('outletName' ,  outletName );
      formData.append('email' ,  email  );
      formData.append('password' ,password );
      formData.append('phoneNumber' , phoneNumber );
      formData.append('userRole' , userRole  );

      const {data} = await axios.post(backendURL + '/api/admin/add-outlet-manager' , formData , {headers:{aToken}});

      if(data.success)
      {
        toast.success(data.message)
      }
      else
      {
        toast.error(data.message)
      }
      
    } catch (error) 
    {
      
    }
    
  }

  return (
    
    <div className='bg-white border my-5 mx-auto sm:mx-10 px-5 sm:px-[5%] sm:py-7 w-[80%]'>

      <form onSubmit={onsubmitHandler}>

        <p className='text-gray-800 text-lg pt-5 font-semibold pb-3'>Add Outlet Manager</p>

        <div className='grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-6'>

          <div className='sm:col-span-3'>

            <label className='mb-3 block text-base font-medium text-[#07074D]' htmlFor="Outlet-manager-name">Outlet Manager Name</label>

            <input onChange={(e) => setName(e.target.value)} value={name} className='w-full  rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' type="text" id='Outlet-manager-name'/>

          </div>


          <div className='sm:col-span-3'>

            <label className='mb-3 block text-base font-medium text-[#07074D]' htmlFor="Outlet-name">Outlet Name</label>

            <input onChange={(e) => setOutletName(e.target.value)} value={outletName} className='w-full  rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' type="text" id='Outlet-name'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='mb-3 block text-base font-medium text-[#07074D]' htmlFor="Email">Email</label>

            <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' type="email" id='Email'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='mb-3 block text-base font-medium text-[#07074D]' htmlFor="password">Password</label>

            <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' type="password" id='password'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='mb-3 block text-base font-medium text-[#07074D]' htmlFor="Phone-Number">Phone Number</label>

            <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber } className='w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' type="text" id='Phone-Number'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='mb-3 block text-base font-medium text-[#07074D]' htmlFor="User-Role">User Role</label>

            <select onChange={(e) => setUserRole(e.target.value)} value={userRole} className='w-full sm:w-[100%] rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]' name="" id="">

              <option value="Admin">Admin</option>
              <option value="Outlet Manager">Outlet Manager</option>

            </select>

          </div>

          <div className='sm:col-span-3 mt-5'>

            <button className='border border-gray-400 w-full text-black py-3 rounded'>Clear</button>

          </div>

          <div className='sm:col-span-3 mt-5'>

            <button type='submit' className='bg-[#FED500] w-full text-black py-3 rounded'>Add Outlet Manager</button>

          </div>

        </div>

      </form>

    </div>


  )

}

export default AddOutletManager