import React, { useContext, useEffect, useState } from 'react';

import { asstets } from '../assets/Assets';

import { GasContext } from '../Context/GasContext';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import { OutletContext } from '../Context/OutletContext';

const GasRequest = () => {

    const 
    {

        gasDetails,

        handleGasSelection,

        gasQuantity,

        updateGasQuantity,

        userData,

        saveGasOrder,

    } = useContext(GasContext);

    const { outletlocation, getOutletLocation, setDistricts, getCity, cities } = useContext(OutletContext);

    const [selectedType, setSelectedType] = useState('Small');

    const [selectedLocation, setSelectedLocation] = useState('');

    const [uniqueDistricts, setUniqueDistricts] = useState([]);

    const [selectedCity, setSelectedCity] = useState('');

    const [isDistrictDisabled, setIsDistrictDisabled] = useState(false);

    const Navigate = useNavigate();

    //===================================== Handle Save Order ======================================================

    const handleSaveOrder = (paymentMethod) => 
    {
        if (!gasDetails) 
        {
        
            toast.error('Please select a gas type.');
        
            return;
        
        }

        if (!selectedCity) 
        {
        
            toast.warn('Please select a city.');
        
            return;
        
        }

        const order = {

            type: selectedType,

            quantity: gasQuantity,

            price: gasDetails.price,

            totalPrice: (gasDetails.price * gasQuantity).toFixed(2),

            weightKG: gasDetails.weightKG,

            image: gasDetails.image,

            locationId: selectedCity,

        };

        saveGasOrder(order);

        toast.success('Your Gas Added into Cart!');

        Navigate('/gas-cart');

    };

    const selectedGas = (type) => 
    {

        setSelectedType(type);

        handleGasSelection(type);

    };


    useEffect(() => {

        selectedGas('Small');

        getOutletLocation();

    }, []);


    useEffect(() => {

        const districts = [...new Set(outletlocation.map((location) => location.district))];

        setUniqueDistricts(districts);

    }, [outletlocation]);

    const handleDistricts = (e) => 
        {

        const selectedDistrict = e.target.value;

        setDistricts(selectedDistrict);

        setSelectedLocation(selectedDistrict);

        getCity(selectedDistrict);

        setIsDistrictDisabled(true); 
    };

    const handleCitySelection = (e) => 
    {
    
        setSelectedCity(e.target.value);

    };

    return (

        <section id="gas-request" className="w-full">

            <h1 className="py-6 mt-4 text-2xl font-bold text-center text-gray-900 sm:text-4xl">

                <span className="text-primary">Refill</span> your gas Here

            </h1>


            <div className="flex flex-col w-full md:flex-row justify-between items-center sm:items-start gap-4 px-4 py-4 bg-white rounded-lg md:px-8 md:py-8 md:gap-8">

                {/* Gas type */}

                <div className="w-full">

                    <div className="bg-white border border-gray-300 h-72 md:h-96 rounded-lg flex justify-center items-center">

                        <img className="w-[450px] bg-cover" src={gasDetails ? gasDetails.image : asstets.small_gas} />

                    </div>

                    <div className="flex w-full justify-between items-center gap-4 mt-6">

                        {['Small', 'Medium', 'Large'].map((type) => (

                            <div key={type} onClick={() => selectedGas(type)} className={`w-full py-4 bg-white border ${ selectedType === type ? 'border-primary' : 'border-gray-300'} rounded-lg flex justify-center items-center cursor-pointer`}>

                                <img className="w-full" src={type === 'Small' ? asstets.small_gas : type === 'Medium' ? asstets.medium_gas : asstets.large_gas} alt="" />

                            </div>

                        ))}

                    </div>

                </div>

                {/* Gas quantity */}
                <div className="w-full flex flex-col gap-5">

                    <div className="flex justify-between items-center">

                        <p>Weight</p>

                        <p>{gasDetails ? `${gasDetails.weightKG} Kg` : '12.5 Kg'}</p>

                    </div>

                    <div className="flex justify-between flex-row items-center">

                        <p>Quantity:</p>

                        <div className="flex flex-row sm:flex-row gap-4 py-[8px] px-[16px] bg-white rounded-full border border-gray-300">

                            <img onClick={() => updateGasQuantity('-')} className="w-[22px] cursor-pointer" src={asstets.remove_icon} alt="" />

                            <p>{gasQuantity}</p>

                            <img

                                onClick={() => {

                                    if (userData.role) 
                                    {

                                        const maxQty = userData.role === 'Organization' ? 10 : 2;

                                        if (gasQuantity < maxQty) 
                                        {

                                            updateGasQuantity('+');

                                        } 
                                        else 
                                        {

                                            toast.error(`You cannot add more than ${maxQty} gases.`);

                                        }

                                    } 
                                    else 
                                    {

                                        toast.warning('Please Sign In');

                                    }

                                }} className="w-[22px] cursor-pointer" src={asstets.add} 

                            />
                                
                        </div>

                    </div>

                    <div className="flex flex-col gap-4 w-full">

                        {/* District Selection */}

                        <select onChange={handleDistricts} value={selectedLocation} className={`outline-none border p-3 rounded-md ${ isDistrictDisabled ? 'bg-gray-100 cursor-not-allowed border-gray-400' : 'border-primary' }`} disabled={isDistrictDisabled}>

                            <option value="" disabled>

                                Select District

                            </option>

                            { uniqueDistricts.map(( district, index ) => (

                                <option key={index} value={district}>

                                    {district}

                                </option>

                            ))}

                        </select>

                        {/* City Selection */}

                        {cities.length > 0 && (

                            <select onChange={handleCitySelection} value={selectedCity} className="outline-none border border-primary p-3 rounded-md" >

                                <option value="" disabled>

                                    Select City

                                </option>

                                {cities.map((city, index) => (

                                    <option key={index} value={city._id}>

                                        {city.city}

                                    </option>

                                ))}

                            </select>

                        )}
                        
                    </div>

                </div>

            </div>

            {/* Save Button */}

            <div className="w-full flex flex-col gap-8">

                <div className="flex flex-col justify-center gap-4">

                    <h1 className="text-2xl text-gray-700 font-bold">Gas By Gas</h1>

                    <p className="text-sm leading-6">

                        Gas By Gas is a brand who's provide LPEG gas cylinder for home and organization they quality is much better than others.

                    </p>

                </div>

                <div className="flex flex-col justify-normal w-full gap-4 sm:flex-row sm:justify-between">

                    <button onClick={() => handleSaveOrder('Add To Cart')} className="bg-primary text-white py-[10px] px-[18px] w-full rounded-md" >

                        Add To Cart

                    </button>

                </div>

            </div>

        </section>

    );
    
};

export default GasRequest;
