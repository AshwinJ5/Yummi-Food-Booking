import React from 'react'
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import banner_one from '../assets/home_slider_01.jpg'
import banner_two from '../assets/home_slider_02.jpg'
import banner_three from '../assets/home_slider_03.jpg'

function Carousal() {
  return (
    <>
         <MDBCarousel  interval={2000} showIndicators>
      <MDBCarouselItem itemId={1}>
        <img src={banner_one} className='d-block w-100' alt='...' />
        <MDBCarouselCaption  style={{marginBottom:'30vh'}} className='text-start'>
        <div className="row">
        <div className="col-lg-8">
          <h1 style={{fontWeight:'700',fontSize:'5rem'}}>Best Tuna Burger</h1>
          <p>Combines fresh, high-quality tuna with vibrant seasonings and a touch of citrus, offering a deliciously light and flavorful alternative to traditional beef patties. Grilled to perfection and served on a toasted bun with crisp lettuce, ripe tomatoes, and a tangy aioli, it creates a delightful balance of textures and tastes.</p>
          </div>
          </div>
        </MDBCarouselCaption>
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src={banner_two} className='d-block w-100' alt='...' />

        <MDBCarouselCaption  style={{marginBottom:'30vh'}} className='text-start'>
        <div className="row">
        <div className="col-lg-8">
          <h1 style={{fontWeight:'700',fontSize:'5rem'}}>Best Bacon Burger</h1>
          <p>A perfectly grilled, juicy beef patty topped with crispy, smoky bacon, melted cheddar cheese, fresh lettuce, and ripe tomato, all nestled in a toasted brioche bun. This mouthwatering combination of flavors and textures creates an unforgettable burger experience that satisfies every craving.</p>
          </div>
          </div>
        </MDBCarouselCaption>
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src={banner_three} className='d-block w-100' alt='...' />
        <MDBCarouselCaption style={{marginBottom:'30vh'}}  className='text-start '>
            <div className="row">
                <div className="col-lg-8">

                
          <h1 style={{fontWeight:'700',fontSize:'5rem'}}>Famous Crazy Chicken Burger</h1>
          <p>A mouthwatering delight, featuring a perfectly seasoned and crispy chicken fillet topped with fresh lettuce, tomatoes, and a tangy sauce. Its unique blend of spices and flavors makes it a standout choice for burger enthusiasts everywhere.</p>
          </div>
            </div>
        </MDBCarouselCaption>
      </MDBCarouselItem>
    </MDBCarousel>

    </>
  )
}

export default Carousal