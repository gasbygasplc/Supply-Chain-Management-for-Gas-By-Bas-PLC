import React, { useContext, useEffect } from 'react';
import { OutletContext } from '../../Context/OutletContext';
import GasRequestForm from './GasRequestForm2';

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
    </div>
  );
};

export default GasRequest;
