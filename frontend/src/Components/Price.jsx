import React from 'react'
import { asstets } from '../assets/Assets'

const Price = () => {

  return (

    <>

        <section className='min-h-screen flex '>

            <div>

                <div>

                    <img src={asstets.payment}/>

                    <p>Price</p>

                </div>

                <h1>Tailored Pricing Solutions</h1>

                <p>No hidden fees, just simple and affordable plans tailored to your needs</p>

                <div>

                    <button>Gas Refill</button>
                    
                    <button>Buy Cylinders</button>

                </div>

            </div>

        </section>

    </>
    
  )

}

export default Price