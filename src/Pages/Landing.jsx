import React from 'react'
import Banner from '../Components/Banner'
import BestSellingLanding from '../Components/BestSellingLanding'
import About from '../Components/About'
import Carousal from '../Components/Carousal'
import Footer from '../Components/Footer'

function Landing() {
  return (
    <>
        <Banner/>
        <Carousal/>
        <BestSellingLanding/>
        <About/>
        <Footer/>

    </>
  )
}

export default Landing