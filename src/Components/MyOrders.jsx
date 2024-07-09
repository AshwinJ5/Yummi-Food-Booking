import React, { useEffect, useState } from 'react'
import './cart.css'
import productOne from '../assets/product_02.png'
import productThree from '../assets/product_04.png'
import { getUsersAllBookingAPI } from '../Services/allAPIS'
import MoreOrderedProducts from './MoreOrderedProducts'

function MyOrders() {
  const [userBookings,setUserBookings]=useState({})

  // console.log(userBookings);

  const getUsersAllBookings=async()=>{
    const token = sessionStorage.getItem("token");
    const userName = sessionStorage.getItem("username");
    if (token && userName) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result=await getUsersAllBookingAPI(reqHeader)
        if(result.status===200){
          setUserBookings(result.data )
        }

      } catch (error) {
        console.log(`Failed to fetch Booked Items. Error: ${error}`);
      }
  }
  }

  useEffect(()=>{
    getUsersAllBookings()
  },[])
  return (
    <>
        <div className="cart_main w-100  ">
      <div className='text-center heading py-5'>My Orders </div>

        <div className="container p-5 bg-light  " style={{overflowX:'auto'}}>
         <div className="container cart_table row text-light text-center w-100">
          <div className="col-4 fs-4">
            Products
          </div>
          <div className="col-3 fs-4">
            Booked on
          </div>
          <div className="col-3 fs-4">
            Order Id
          </div>
          <div className="col-2 fs-4">
            Subtotal
          </div>
         </div>
         {userBookings.length>0?userBookings.map((booking,index)=>
          <>
         <div key={index} className="container row text-center w-100">
         <div className="col-1">
         <MoreOrderedProducts booking={booking} />
          </div>
         <div className="col-3 my-auto">
            {JSON.parse(booking.cart).length>1?
                <>
                {JSON.parse(booking.cart)[0].productName}<span className='text-danger small ms-2'>& more..</span>
                </>

                :
                <>
                {JSON.parse(booking.cart)[0].productName } 
                </>


            }
          </div>
          <div className="col-3 my-auto">
          {booking.bookingTime}
          </div>
          <div className="col-3 my-auto">
          {booking._id}
          </div>
          <div className="col-2 my-auto">
          ₹ {booking.grandTotal}/-
          </div>
         </div>
          <hr />
          </>
          ):<p className='text-danger text-center'>No Booking till now <a className='text-decoration-none' href="/products">Book now</a></p>
        }
        </div>
      </div>   
    </>
  )
}

export default MyOrders