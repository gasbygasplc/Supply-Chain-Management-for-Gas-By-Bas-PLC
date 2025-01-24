import React, { useContext, useEffect, useState } from 'react';
import { asstets } from '../assets/Assets';
import { GasContext } from '../Context/GasContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { OutletContext } from '../Context/OutletContext';

const GasRequest = () => {
    const { gasDetails, handleGasSelection, gasQuantity, updateGasQuantity, userData, saveGasOrder, gasOrder } =
        useContext(GasContext);
    const { outletlocation, getOutletLocation, setDistricts, getCity, cities, outletName, getOutletName } =
        useContext(OutletContext);

    const [selectedType, setSelectedType] = useState('Small');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [uniqueDistricts, setUniqueDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedOutlet, setSelectedOutlet] = useState('');
    const [UniqueCity, setUniqueCity] = useState([]);
    const Navigate = useNavigate();

    const handleSaveOrder = async () => {
        if (!gasDetails) {
            toast.error("Please select a gas type.");
            return;
        }
    
        if (!selectedCity) {
            toast.warn("Please select your city.");
            return;
        }
    
        if (!selectedOutlet) {
            toast.warn("Please select your nearby outlet.");
            return;
        }
    
        const totalGasOrders = gasOrder.reduce((count, order) => count + order.quantity, 0);
        const maxGasesAllowed = userData.role === "Organization" ? 10 : 2;
    
        if (totalGasOrders + gasQuantity > maxGasesAllowed) {
            toast.error(`You cannot add more than ${maxGasesAllowed} gases.`);
            return;
        }
    
        const order = {
            type: selectedType,
            quantity: gasQuantity,
            price: gasDetails.price,
            totalPrice: (gasDetails.price * gasQuantity).toFixed(2),
            weightKG: gasDetails.weightKG,
            image: gasDetails.image,
            outletId: selectedOutlet,
            district: selectedLocation,
            city: selectedCity,
            outletName: outletName.find((outlet) => outlet._id === selectedOutlet)?.outletName || "",
        };
    
        await saveGasOrder(order);
        Navigate("/gas-cart");
    };       

    const selectedGas = (type) => {
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

    useEffect(() => {
        const cit = [...new Set(cities.map((city) => city.city))];
        setUniqueCity(cit);
    }, [cities]);

    const handleDistricts = (e) => {
        const selectedDistrict = e.target.value;
        setDistricts(selectedDistrict);
        setSelectedLocation(selectedDistrict);
        getCity(selectedDistrict);
    };

    const handleCitySelection = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        getOutletName(city);
    };

    const handleOutletSelection = (e) => {
        setSelectedOutlet(e.target.value);
    };

    return (
        <section id="gas-request" className="w-full">
            <h1 className="py-6 mt-4 text-2xl font-bold text-center text-gray-900 sm:text-4xl">
                <span className="text-primary">Refill</span> your gas Here
            </h1>
            <div className="flex flex-col w-full md:flex-row justify-between items-center sm:items-start gap-4 px-4 py-4 bg-white rounded-lg md:px-8 md:py-8 md:gap-8">
                {/* Gas type */}
                <div className="w-full">
                    <div className="bg-white border border-gray-300  h-72 md:h-96 rounded-lg flex justify-center items-center ">
                        <img
                            className="w-[450px] bg-cover"
                            src={gasDetails ? gasDetails.image : asstets.small_gas}
                        />
                    </div>
                    <div className="flex w-full justify-between items-center gap-4 mt-6">
                        <div
                            onClick={() => selectedGas('Small')}
                            className={`w-full py-4 bg-white border ${
                                selectedType === 'Small' ? 'border-primary' : 'border-gray-300'
                            } rounded-lg flex justify-center items-center cursor-pointer`}
                        >
                            <img className="w-full" src={asstets.small_gas} alt="" />
                        </div>
                        <div
                            onClick={() => selectedGas('Medium')}
                            className={`w-full py-4 bg-white border ${
                                selectedType === 'Medium' ? 'border-primary' : 'border-gray-300'
                            } rounded-lg flex justify-center items-center cursor-pointer`}
                        >
                            <img className="w-full" src={asstets.medium_gas} alt="" />
                        </div>
                        <div
                            onClick={() => selectedGas('Large')}
                            className={`w-full py-4 bg-white border ${
                                selectedType === 'Large' ? 'border-primary' : 'border-gray-300'
                            } rounded-lg flex justify-center items-center cursor-pointer`}
                        >
                            <img className="w-full" src={asstets.large_gas} alt="" />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <p>Weight</p>
                        <p>{gasDetails ? gasDetails.weightKG + 'Kg' : '12.5 Kg'}</p>
                    </div>

                    <div className="flex justify-between flex-row items-center">
                        <p>Quantity:</p>
                        <div className="flex flex-row sm:flex-row gap-4 py-[8px] px-[16px] bg-white rounded-full border border-gray-300">
                            <img
                                onClick={() => updateGasQuantity('-')}
                                className="w-[22px] cursor-pointer"
                                src={asstets.remove_icon}
                                alt=""
                            />
                            <p>{gasQuantity}</p>
                            <img
                                className="w-[22px] cursor-pointer"
                                onClick={() => {
                                    const maximumQuantity = userData.role === 'Organization' ? 10 : 2;
                                    if (gasQuantity < maximumQuantity) {
                                        updateGasQuantity('+');
                                    } else {
                                        toast.error(`You cannot add more than ${maximumQuantity} gases.`);
                                    }
                                }}
                                src={asstets.add}
                                alt=""
                            />
                        </div>
                        <p>{gasQuantity}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <p>LKR {gasDetails ? (gasDetails.price * gasQuantity).toFixed(2) : ''}</p>
                        <p>LKR {gasDetails ? (gasDetails.price * gasQuantity).toFixed(2) : ''}</p>
                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        <select
                            value={selectedLocation}
                            onChange={handleDistricts}
                            className="outline-none border border-primary p-3 rounded-md"
                        >
                            <option value="" disabled>
                                Choose Your District
                            </option>
                            {uniqueDistricts.map((district, index) => (
                                <option key={index} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>

                        {UniqueCity.length > 0 && (
                            <select
                                onChange={handleCitySelection}
                                value={selectedCity}
                                className="outline-none border border-primary p-3 rounded-md"
                            >
                                <option value="" disabled>
                                    Choose Your City
                                </option>
                                {UniqueCity.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        )}

                        {outletName.length > 0 && (
                            <select
                                onChange={handleOutletSelection}
                                value={selectedOutlet}
                                className="outline-none border border-primary p-3 rounded-md"
                            >
                                <option value="" disabled>
                                    Select Your Outlet
                                </option>
                                {outletName.map((outlet, index) => (
                                    <option key={index} value={outlet._id}>
                                        {outlet.outletName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                <div className="w-full flex flex-col gap-8">
                    <div className="flex flex-col justify-center gap-4">
                        <h1 className="text-2xl text-gray-700 font-bold">Gas By Gas</h1>
                        <p className="text-sm leading-6">
                            Gas By Gas is a brand who provides LPG gas cylinders for homes and organizations. Their
                            quality is much better than others.
                        </p>
                    </div>

                    <div className="flex flex-col justify-normal w-full gap-4 sm:flex-row sm:justify-between">
                        <button
                            onClick={handleSaveOrder}
                            className="bg-primary text-white py-[10px] px-[18px] w-full rounded-md"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GasRequest;
