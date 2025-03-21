import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const BRApproval = () => {

    const [BrNumber , setBRNumber] = useState(0);

    const [image , setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSUbmit = async(e) => {
        e.preventDefault();

        if(!image || !BrNumber)
        {
            toast.error('Please upload an image and enter the BR number.');
            return;
        }

        const formData = new FormData();
        formData.append('image' , image);
        formData.append('BRNumber', BrNumber);

        try {

            const token = localStorage.getItem('token');
            const response  = await axios.post('https://mw.gasbygas.store/api/auth/add-br' , formData , {headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'multipart/form-data',}});

            if(response.status === 201 || response.status === 200)
            {
                toast.success(response.data.message || 'BR successfully submitted!');
                setBRNumber('');
                setImage(null);
            }
            else
            {
                toast.error('Unexpected response. Please try again.');
            }
            
        } catch (error) {
            console.error('Error submitting BR:', error);
            toast.error(error.response?.data?.message || 'Failed to submit BR. Please try again.');
        }
    }

  return (
    <>

        <div className='min-h-fit  w-full flex flex-col items-center'>

            <h1 className="py-6 mt-4 text-2xl font-bold text-center text-gray-900 sm:text-4xl">
                <span className="text-primary">Submit</span> your BR Here
            </h1>

            <form onSubmit={handleSUbmit} className='flex flex-col items-center gap-6 justify-center w-full md:w-1/2'>

                <label htmlFor="dropzone-file" className='flex flex-col items-center border-primary mt-8 justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50'>

                    <div className='flex flex-col items-center justify-center pt-5 pb-5'>

                        <svg className="w-8 h-8 mb-4 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">

                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            
                        </svg>

                        <p className='mb-2 text-sm text-gray-500'><span className='font-semibold'>Click to upload</span> or drag and drop</p>

                        <p className='text-xs text-gray-500'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>

                    </div>

                    <input type="file" accept="image/*" onChange={handleImageChange} id='dropzone-file' className='hidden'/>

                </label>

                <div className='w-full gap-2 flex flex-col text-gray-700 text-base'>

                    <label className='block' htmlFor="BR">BR number</label>

                    <input type="text" value={BrNumber} onChange={(e) => setBRNumber(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary' placeholder='Enter your BR number' id='BR' />

                </div>

                <button type='submit' className='w-full p-2 border-none rounded-md bg-primary text-white text-base'>Submit your BR</button>

            </form>

        </div>
    
    </>
  )
}

export default BRApproval