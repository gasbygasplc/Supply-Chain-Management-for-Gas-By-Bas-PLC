import React, { useContext, useEffect, useState } from 'react'
import { asstets } from '../assets/Assets'
import { GasContext } from '../Context/GasContext'

const GasRequest = () => {

    
    const {gasDetails , handleGasSelection} = useContext(GasContext);

    const [selectedType , setSelectedType] = useState('Small');


        const selectedGas = type => {

            setSelectedType(type);

            handleGasSelection(type)
        }

        useEffect(() => {

            selectedGas("Small");
        } , [])


  return (

    <section id='gas-request' className='w-full'>

        <h1 className='py-6 mt-4 text-4xl font-bold text-center text-gray-900 sm:text-4xl'><span className='text-primary'>Refill</span> your gas Here </h1>

        <div className='flex flex-col w-full md:flex-row justify-between items-center sm:items-start gap-4 px-4 py-4 bg-white rounded-lg md:px-8 md:py-8 md:gap-8'>


            {/* Gas type */}
            
            <div className='w-full'>

                <div className='bg-white border border-gray-300  h-72 md:h-96 rounded-lg flex justify-center items-center '>
            
                    <img className='w-[450px] bg-cover' src={ gasDetails ? gasDetails.image : asstets.small_gas} />

                </div>

                <div className='flex w-full  justify-between items-center gap-4 mt-6'>

                    <div onClick={() => selectedGas("Small")} className= {`w-full py-4 bg-white border ${selectedType === 'Small' ? 'border-primary' : 'border-gray-300'} rounded-lg flex justify-center items-center cursor-pointer`}>

                        <img  className='w-full' src={asstets.small_gas} alt="" />

                    </div>

                    <div onClick={() => selectedGas("Medium")} className={`w-full py-4 bg-white border ${selectedType === 'Medium' ? 'border-primary' : 'border-gray-300'} rounded-lg flex justify-center items-center cursor-pointer`}>

                        <img className='w-full'  src={asstets.medium_gas} alt="" />

                    </div>

                    <div onClick={() => selectedGas("Large")} className={`w-full py-4 bg-white border ${selectedType === 'Large' ? 'border-primary' : 'border-gray-300'} rounded-lg flex justify-center items-center cursor-pointer`}>

                        <img className='w-full'  src={asstets.large_gas} alt="" />

                    </div>

                </div>

            </div>

            {/* Gas quantity */}

            <div className='w-full flex flex-col gap-10'>

                <div className='flex justify-between items-center' >

                    <p>Weight</p>

                    <p>{gasDetails ? gasDetails.weightKG + "Kg" : "12.5 Kg"}</p>

                </div>

                <div className='flex justify-between'>

                    <p>Quantity:</p>

                    <div className='flex gap-4 items-center justify-center py-[10px] px-[18px] bg-gray-100 rounded-full border border-gray-300'>

                        <img className='w-[30px] cursor-pointer' src={asstets.remove_icon} alt="" />

                        <p>1</p>

                        <img className='w-[30px] cursor-pointer' src={asstets.add_icon} alt="" />

                    </div>

                    <p>1</p>


                </div>

                <div className='flex justify-between items-center'>

                    <p>LKR {gasDetails ? gasDetails.price : ""}</p>

                    <p>LKR {gasDetails ? gasDetails.price  : ""}</p>

                </div>

            </div>

            {/* payment option */}

            <div className='w-full flex flex-col gap-8'>

                <div className='flex flex-col justify-center gap-4'>

                    <h1 className='text-2xl text-gray-700 font-bold'>Gas By Gas</h1>

                    <p className='text-sm leading-6'>Gas By Gas is a brand who's provide LPEG gas cylinder for home and organization they quality is much better than others.</p>
                    
                </div>

                <div className='flex flex-col justify-normal w-full gap-4 sm:flex-row sm:justify-between'>

                    <button className='bg-primary text-white py-[10px] px-[18px] w-full rounded-md '>Buy Now</button>

                    <button className='bg-green-600 text-white py-[10px] px-[18px] w-full rounded-md'>Cash On Delivery</button>

                </div>

            </div>

        </div>

    </section>

  )

}

export default GasRequest