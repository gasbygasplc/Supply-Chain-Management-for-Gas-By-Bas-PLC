import React from 'react'

const GasRequest = () => {

  return (

    <section id='gas-request' className=' w-full'>

        <h1 className='py-4 mt-4 text-4xl font-bold text-center text-gray-900 sm:text-4xl'><span className='text-primary'>Refill</span> your gas Here </h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>


            {/* Gas type */}

            <div>

                <h1>img</h1>

            </div>

            {/* Gas quantity */}
            <div>

                <h1>img2</h1>

            </div>

            {/* payment option */}
            <div>

                <h1>img3</h1>

            </div>

        </div>

    </section>

  )

}

export default GasRequest