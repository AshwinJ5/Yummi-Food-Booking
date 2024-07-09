import React from 'react'
import newsLogo from '../assets/yummy.png'
import './navbar.css'

function NewsLetter() {
  return (
    <>
        <div className="text-center newsletter">
            <img className='pt-3' src={newsLogo} height={80} alt="" />
            <h1 className='fw-bolder pt-3'>Stay informed about special offers
            </h1>
            <h5 className='py-3'>Subscribe to the newsletter</h5>
        <div className='d-flex justify-content-center'>
             <input placeholder='Enter your Email Address' type="text" />
            <div className='subscribe_button' >SUBSCRIBE</div>
        </div>
           
        </div>
        
        <div className='container my-4'>
          <h4>Yummi India - Online Food Delivery</h4>
          <p>
          Welcome to Yummi, your ultimate destination for gourmet burgers that tantalize your taste buds and leave you craving more. At Yummi, we pride ourselves on creating a warm and inviting atmosphere where you can enjoy the best burger experience in town. Our chefs craft each burger with passion and precision, using only the freshest, locally sourced ingredients to ensure every bite is bursting with flavor.

Quality is at the heart of everything we do at Yummi. From our premium, grass-fed beef patties to our house-made buns and sauces, we go the extra mile to guarantee a delicious and satisfying meal every time.</p>
<p> Whether you’re dining in or ordering online, you can trust that Yummi’s commitment to excellence shines through in every burger we serve. Join us and discover why Yummi is the top choice for burger lovers everywhere!
          </p>
        </div>
    </>
  )
}

export default NewsLetter