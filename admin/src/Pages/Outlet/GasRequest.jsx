import React, { useContext, useEffect } from 'react';
import { OutletContext } from '../../Context/OutletContext';
import GasRequestForm from '../../Components/Gas/GasRequestForm';
import GasRequestList from '../../Components/Gas/GasRequestList';

const GasRequest = () => {
  const { Otoken, getGasRequest, gasRequest } = useContext(OutletContext);

  useEffect(() => {
    if (Otoken) {
      getGasRequest();
    }
  }, [Otoken]);

  return (
    <div className=' mx-auto sm:mx-10 px-10 sm:px-[5%] sm:py-7 w-full'>
      <GasRequestForm />
     <GasRequestList gasRequest={gasRequest} />
    </div>
  );
};

export default GasRequest;
