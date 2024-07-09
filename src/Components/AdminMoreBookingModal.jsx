import React, { useState } from 'react'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
  } from 'mdb-react-ui-kit';
  

function AdminMoreBookingModal({products}) {

    const [basicModal, setBasicModal] = useState(false);

    const toggleOpen = () => setBasicModal(!basicModal);
  
// console.log(products);

const cart=JSON.parse(products.cart)
// console.log(cart);

const totalQuantity = cart.reduce((sum, booking) => sum + booking.quantity, 0);


  return (
    <>
    <i  onClick={toggleOpen} style={{color:'#d7504a',cursor:'pointer'}} class="fa-solid me-2 fa-circle-info"></i>

         <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog size='lg'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Booking Details</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <div className="row my-2">
                    <div className="col-6 text-start">
                        Booked By:
                    </div>
                    <div className="col-6 fw-bold text-end">
                        {products.userId}
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-6 text-start">
                        Ordered On:
                    </div>
                    <div className="col-6 fw-bold text-end">
                        {products.bookingTime}
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-6 text-start">
                        Total Quantity:
                    </div>
                    <div className="col-6 fw-bold text-end">
                        {totalQuantity}
                    </div>
                </div>
                <hr />
                <div className="row my-2">
                    <div className="col-4  fw-bold text-start">
                        Name
                    </div>
                    <div className="col-4 fw-bold text-center">
                        Quantity
                    </div>
                    <div className="col-4 fw-bold text-end">
                        Amount
                    </div>
                </div>
                <hr />
                {
                    cart.map(product=>
                        <div className="row my-2">
                    <div className="col-4  fw-bold text-start">
                        {product.productName}
                    </div>
                    <div className="col-4 fw-bold text-center">
                        {product.quantity}
                    </div>
                    <div className="col-4 fw-bold text-end">
                        {product.totalAmount}
                    </div>
                </div>

                    )

                }
                <hr />
                <div className="text-end">
                    Grand Total: ₹<span className="ms-2 fw-bolder fs-4">{products.grandTotal}</span>/-
                </div>

            </MDBModalBody>

            
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}

export default AdminMoreBookingModal