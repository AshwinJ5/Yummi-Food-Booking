import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import './navbar.css'
import NewsLetter from './NewsLetter';

function Footer() {
  return (
    <>
    <img className='overlay_image' src="https://img.freepik.com/premium-photo/fast-food-burger-drink-potato_69112-2886.jpg" alt="" />
    <div style={{position:"relative"}}>
    <NewsLetter/>
         <MDBFooter  className='text-center text-lg-start text-muted footer_main_div pt-1'>
      

      <section >
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase footer_heading fw-bold mb-4'>
                LET'S GET TOGETHER
              </h6>
              <p>
              <i className="fa-solid fa-location-dot me-2"></i> Central Junction Kottayam, Kerala
              </p>
              <p>
              <i className="fa-solid fa-clock me-2"></i> Mon-Sat: 11AM-11PM
              </p>
              <p>
              Sun:  11AM-12AM

              </p>
              <p>
              <i className="fa-solid fa-phone me-2"></i>+91-98765-43210
              </p>
              <p>
              <a href='/' className='me-4 text-reset '>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='/' className='me-4 text-reset '>
            <MDBIcon fab icon="twitter" />
          </a>
          
          <a href='/' className='me-4 text-reset '>
            <MDBIcon fab icon="instagram" />
          </a>
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase footer_heading fw-bold mb-4'>ABOUT US</h6>
              <p>
                Our Story
              </p>
              <p>
                Our Team
              </p>
              <p>
                Our Food
              </p>
              <p>
                Health Measures
              </p>
              <p>
                Job Opportunities
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase footer_heading fw-bold mb-4'>QUICK MENU</h6>
              <p>
                Chicken Burgers
              </p>
              <p>
                Beef Burgers
              </p>
              <p>
                Veg Burgers
              </p>
              <p>
                Drinks
              </p>
            </MDBCol>
          </MDBRow>
          <hr className='horizontal'/>

          <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>©2024 Yummi All rights reserved</span>
        </div>

        <div className='d-flex footer_other'>
          <a href="/">About</a>
          <a href="/">Delivery</a>
          <a href="/">Contact</a>
        </div>
      </section>
        </MDBContainer>
      </section>

      
    </MDBFooter>
    </div>
    </>
  )
}

export default Footer