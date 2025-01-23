import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../Context/AdminContext';
import { toast } from 'react-toastify';


const AddOutlet = () => {

  const [outletName , setOutletName] = useState("");

  const [city , setCity] = useState("");

  const [district , setDistrict] = useState("");

  const [email , setEmail] = useState("");

  const [password , setPassword] = useState("");

  const [phoneNumber , setPhoneNumber] = useState("");

  const [deliveryCapacity , setDeliveryCapacity] = useState(0);

  const [maxCapacity , setMaximumCapacity] = useState(0);

  const [currentStock , setCurrentStock] = useState(100);

  const [minimumRequestLevel , setMinimumRequestLevel] = useState(0);

  const {aToken , backendURL , outletStock , getOutletStock} = useContext(AdminContext)



  const clear = () => {

    setOutletName("");
    
    setCity("");

    setDistrict("");
    
    setEmail("");

    setPassword("");
    
    setPhoneNumber("");
    
    setDeliveryCapacity(0);
    
    setMaximumCapacity(0);
    
    setMinimumRequestLevel(0);

  }

  const onsubmitHandler = async (event) => {
  
    event.preventDefault();
  

    if (!outletName || !city || !district || !email || !password || !phoneNumber) 
    {
    
      toast.error("Please fill in all required fields");
    
      return;
      
    }

    const payload = {
    
        outletName,

        city,
      
        district,
      
        phoneNumber,
      
        email,
      
        password,
      
        deliveryCapacity,
      
        currentStock,
      
        maxCapacity,
      
        minimumRequestLevel,
      
    };

    try 
    {
      console.log("Payload:", payload);

      const { data } = await axios.post(`${backendURL}/api/admin/add-outlet`,payload, { headers:{aToken}});

      if (data.success) 
      {
      
        toast.success(data.message);
        
        clear();
        
        getOutletStock();
        
      } 
      else 
      {
      
        toast.error(data.message);
        
      }
    } 
    catch (error) 
    {
      
      console.error("Error:", error);

      toast.error(error.response?.data?.message || "An error occurred");

    }
};


  useEffect(() => {

    if(aToken)
    {

      getOutletStock();

    }

  }, [aToken])


  return (
    
    
    <div className=' w-full gap-4 bg-white my-3 border mx-2 py-5 px-5 rounded-md grid grid-cols-1 sm:grid-cols-7'>

      {/* ======================================= LEFT ==================================================== */}

      <div className='sm:col-span-4 border px-3 py-4 rounded-sm'>

        <form onSubmit={onsubmitHandler} className='grid grid-cols-1 gap-3 sm:grid-cols-6'>

          <div className='sm:col-span-3'>

            <label className='block  text-gray-700 font-normal mb-3' htmlFor="outletname">Outlet Name</label>

            <input onChange={(e) => setOutletName(e.target.value)} value={outletName} className='border font-normal border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="text" placeholder='OutletName'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block  text-gray-700 font-normal mb-3' htmlFor="District">District</label>

              <select name="District" id="District" onChange={(e) => setDistrict(e.target.value)} value={district}  className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm'>

                <option value="Ampara">Ampara</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Badulla">Badulla</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Colombo">Colombo</option>
                <option value="Galle">Galle</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Kegalle">Kegalle</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Mannar">Mannar</option>
                <option value="Matale">Matale</option>
                <option value="Matara">Matara</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Vavuniya">Vavuniya</option>

              </select>

            </div>

          <div className='sm:col-span-6'>

            <label className='block  text-gray-700 font-normal mb-3' htmlFor="email">Email</label>

            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="email" placeholder='Email'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="city">city</label>

            <input onChange={(e) => setCity(e.target.value)} value={city} className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="text" placeholder='City'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block  text-gray-700 font-normal mb-3' htmlFor="password">password</label>

            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="password" placeholder='password'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="PhoneNumber">PhoneNumber</label>

            <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} className='border  border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="text" placeholder='PhoneNumber'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="Delivery Capacity">Delivery Capacity</label>

            <input onChange={(e) => setDeliveryCapacity(e.target.value)} value={deliveryCapacity} className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' type="number" placeholder='Delivery Capacity'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="Maximum Capacity">Maximum Capacity</label>

            <input onChange={(e) => setMaximumCapacity(e.target.value)} value={maxCapacity} className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' id='Maximum Capacity' type="number" placeholder='Maximum Capacity'/>

          </div>

          <div className='sm:col-span-3'>

            <label className='block text-gray-700  font-normal mb-3' htmlFor="Minimum Request Level">Minimum Request Level</label>

            <input onChange={(e) => setMinimumRequestLevel(e.target.value)} value={minimumRequestLevel} className='border border-gray-400 focus:outline-gray-400 outline-0 py-1.5 px-2 w-full rounded-sm' id='Minimum Request Level' type="number" placeholder='Minimum Request Level'/>

          </div>


          <div className='sm:col-span-3'>

            <button type='button' onClick={clear} className='bg-white border border-gray-300 rounded-sm text-gray-700   py-2 w-full mt-3'>Clear</button>

          </div>


          <div className='sm:col-span-3'>

            <button type='submit' className='bg-primary-600 text-white rounded-sm py-2 w-full mt-3'>Create Outlet</button>

          </div>
          
        </form>

      </div>

      {/* ======================================= Right ==================================================== */}

      <div className='sm:col-span-3 max-h-screen border px-3 py-4 rounded-sm'>

        <div className='grid grid-cols-1 gap-2 sm:grid-cols-6 items-center justify-items-center'>

          <p className='text-base md:col-span-3 font-medium text-gray-500'>Outlet</p>
          <p className='text-base md:col-span-3 font-medium text-gray-500'>Stock</p>
          
          <hr className='w-full col-span-6 mt-2'/>

        </div>

        {

          outletStock.map((outlet , index) => (

            <div key={index} className='grid py-2 grid-cols-1 gap-2 sm:grid-cols-6 items-center justify-items-center'>

              <p className='text-sm md:col-span-3 font-normal text-gray-500'>{outlet.outletName}</p>
              <p className='text-sm md:col-span-3 font-normal text-gray-500'>{outlet.currentStock}</p>
            
              <hr className='w-full col-span-6'/>

            </div>

          ))

        }

      </div>

    </div>
  )
}

export default AddOutlet