import React from 'react'
import delivery from '../assets/delivery1.png'
import stay_home from '../assets/stay_home.png'

function About() {
  return (
    <div div className='about_main' id='about'>
        <div className="row about_delivery py-4 w-100">
            <div className="col-12 col-lg-6">
                <img src={delivery} width={'100%'} alt="" />    
            </div>
            <div className="col-12 col-lg-6 px-3 my-auto">
                <img src={stay_home}  />
                <h2 className='text-center'>
                    Delivery On All Days
                </h2>
                <div><span className='text-dark'>1. Choose Burger</span></div>
                <p>Select your favorite burger from our menu.</p>
                <div><span className='text-dark'>2. Delivery</span></div>
                <p>Provide your delivery details and confirm your order.</p>
                <div><span className='text-dark'>3. 
                Enjoy Burger</span></div>
                <p>Sit back, relax, and savor your delicious burger delivered to your door.</p>
            </div>
        </div>
    </div>
  )
}

export default About