import React from 'react'
// import banner from '../assets/banner123.jpg'
import bannerImage from '../assets/banner.png'
import './navbar.css'


function Banner() {
  return (
    <>
        <div className="w-100 banner_main_div text-center ">
            <div className="w-100">
                Delicious Burgers
            </div>
            <img src={bannerImage} width={"100%"} className='my-5 floating_image' alt="" />
            
            {/* <img src={banner} height={500} width={"100%"} alt="" /> */}
        </div>
    </>
  )
}

export default Banner