import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { AdminContext } from '../../Context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddMainStock = () => {

  const [type , setType] = useState("");

  const [weight , setWeight] = useState("");

  const [price , setPrice] = useState("");

  const [stock , setStock] = useState(0);

  const [gasImg , setGasImg] = useState(false);

  const {backendURL , aToken } = useContext(AdminContext)


  //================================================= OnsubmitHandler =====================================================

  const onsubmitHandler = async(event) => {

    event.preventDefault();

    try 
    {

      if(!gasImg)
      {
    
        toast.error('Gas image does not selected.')
    
      }
    
      const formData = new FormData();
  
      formData.append('image' , gasImg);
  
      formData.append('type' , type);
  
      formData.append('weightKG' , Number(weight));
  
      formData.append('price' , Number(price));
  
      formData.append('totalStock' , Number(stock));

      formData.forEach((value , key) => {

        console.log(`${key} : ${value}`)
      });

      const {data} = await axios.post(backendURL + '/api/admin/add-gas' , formData , {headers:{aToken}});

      if(data.success)
      {
        toast.success(data.message);
      }
      else
      {
        toast.error(data.message)
      }
      
    } catch (error) 
    {

      toast.error(error)
      
    }




  }

  return (

    <div className=' w-full gap-4 bg-white my-3 border mx-2 py-5 px-5 rounded-md grid grid-cols-1 sm:grid-cols-7'>
      

      {/* ======================================= LEFT ==================================================== */}

      <div className='sm:col-span-4 border px-3 py-4 rounded-sm'>

        <h2 className='font-bold text-2xl text-black pb-6'>Add Stock </h2>

        <form onSubmit={onsubmitHandler} className='grid grid-cols-1 gap-3 sm:grid-cols-6'>

          <div className='sm:col-span-3'>

            <label className='block  text-gray-700 font-normal mb-3' htmlFor="type">Gas Type</label>

            <select onChange={(e) => setType(e.target.value)} value={type} className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' name="" id="type">

              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>

            </select>

          </div>

          <div className='sm:col-span-3'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="weight">Weight</label>

            <input onChange={(e) => setWeight(e.target.value)} value={weight} id='weight' className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="number" placeholder='Weight'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block  text-gray-700 font-normal mb-3' htmlFor="Price">Price</label>

            <input onChange={(e) => setPrice(e.target.value)} value={price} className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' id='Price' type="number" placeholder='Price'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="stock">Stock</label>

            <input onChange={(e) => setStock(e.target.value)} value={stock} className='border  border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' id='stock' type="Number" placeholder='Stock'/>

          </div>

          <div className='sm:col-span-6'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="Gas Image">Gas Image</label>

            <div className='relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary-700 bg-gray-50 px-4 py-4 sm:py-7.5'>

             <input onChange={(e) => setGasImg(e.target.files[0])} accept='image/*' className='absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none ' id='Gas Image'  type="file" placeholder='Gas Image'/>

             <div className='flex flex-col items-center justify-center space-y-3'>

              <span className='flex h-10 w-10 items-center justify-center rounded-full border border-strock bg-white'>

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z" fill="#3C50E0"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z" fill="#3C50E0"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z" fill="#3C50E0"></path>
                </svg>

              </span>

              <p className="text-sm font-medium"> <span className="text-primary">Click to upload</span> or drag and drop </p>

              <p className="mt-1.5 text-sm font-medium"> SVG, PNG, JPG or GIF </p>

             </div>

            </div>

          </div>


          <div className='sm:col-span-3'>

            <button type='button'  className='bg-white border border-gray-300 rounded-sm text-gray-700   py-2 w-full mt-3'>Clear</button>

          </div>


          <div className='sm:col-span-3'>

            <button type='submit' className='bg-primary-600 text-white rounded-sm py-2 w-full mt-3'>Add Stock</button>

          </div>
          
        </form>

      </div>

      {/* ======================================= Right ==================================================== */}

      <div className='sm:col-span-3 max-h-screen border px-3 py-4 rounded-sm'>

        <div className='grid grid-cols-1 gap-2 sm:grid-cols-6 items-center justify-items-center'>

          <p className='text-base md:col-span-3 font-medium text-gray-500'>Gas Size</p>
          <p className='text-base md:col-span-3 font-medium text-gray-500'>Current Stock</p>
          
          <hr className='w-full col-span-6 mt-2'/>

        </div>

          <div  className='grid py-2 grid-cols-1 gap-2 sm:grid-cols-6 items-center justify-items-center'>

            <p className='text-sm md:col-span-3 font-normal text-gray-500'>Small Gas</p>
            <p className='text-sm md:col-span-3 font-normal text-gray-500'>10000</p>
            
            <hr className='w-full col-span-6'/>

          </div>

      </div>

    </div>
  )
}

export default AddMainStock