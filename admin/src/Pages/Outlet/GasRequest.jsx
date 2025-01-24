import React, { useContext, useEffect } from 'react'
import { OutletContext } from '../../Context/OutletContext'

const GasRequest = () => {

  const {Otoken , getGasRequest} = useContext(OutletContext);

  useEffect(() => {

    if(Otoken)
    {

      getGasRequest();

    }
  }, [Otoken])

  return (
    <div>GasRequest</div>
  )
}

export default GasRequest