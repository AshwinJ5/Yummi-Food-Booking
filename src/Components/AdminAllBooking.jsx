import React, { useEffect, useState } from 'react'
import { getAllBookingsAPI } from '../Services/allAPIS'
import AdminMoreBookingModal from './AdminMoreBookingModal'

function AdminAllBooking() {
    const[allBookings,setAllBooking]=useState([])

    const getAllBookingData=async()=>{
        const email=sessionStorage.getItem('email')
        const token=sessionStorage.getItem('token')
        if(email && token){
            const reqHeader = {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }     
        try {
            const result=await  getAllBookingsAPI(reqHeader)
            setAllBooking(result.data);
        } catch (error) {
            console.log(error)     
        }}
    }
    useEffect(()=>{
        getAllBookingData()
    },[])

    const totalRevenue = allBookings.reduce((sum, booking) => sum + booking.grandTotal, 0);
    // console.log(allBookings);

  return (
    <>
        <div  className="cart_main pb-5 mx-auto">
        <div className='text-center heading  py-2'>Bookings</div>
        {allBookings.length > 0 ?

        <div className='text-end me-5 py-2'>Total Revenue By Bookings: <span className='fw-bolder text-danger'>{totalRevenue}</span></div>
        :null}
        <div className="container p-5 bg-light" style={{ overflowX: 'auto' }}>
        {allBookings.length > 0 ?
          <div className="container py-2 cart_table row text-light text-center">
            <div className="col-2 fs-4">No.</div>
            <div className="col-3 fs-4">Booking Id</div>
            <div className="col-5 fs-4">Products</div>
            <div className="col-2 fs-4">Total Amount</div>
          </div>:
          null}
          {allBookings.length > 0 ? allBookings.map((user, index) =>
            <div key={index}>
              <div className="container row text-center">
                <div className="col-2 my-auto">
                  {index+1}
                </div>
                <div className="col-3">
                    {user._id}
                </div>
                <div className="col-5 my-auto"> 
                <AdminMoreBookingModal products={user} />
                    {JSON.parse(user.cart).length > 1 ? (
                        <>
                            {JSON.parse(user.cart)[0].productName}
                            <span className='text-danger small ms-2'>& more..</span>
                        </>
                    ) : (
                        <>
                            {JSON.parse(user.cart)[0].productName}
                        </>
                    )}
                </div>
                <div className="col-2 my-auto">
                    {user.grandTotal}
                </div>
              </div>
              <hr />
            </div>)
            : <p>No Bookings</p>}
        </div>
      </div> 
    </>
  )
}

export default AdminAllBooking