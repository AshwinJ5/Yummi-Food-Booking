import React, { useState } from 'react'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
import { deleteAProductAPI } from '../Services/allAPIS';

function AdminProductDelete({product,getAllProducts}) {
    const [basicModal, setBasicModal] = useState(false);

    const toggleOpen = () => setBasicModal(!basicModal);
  
    const deleteProduct=async(id)=>{
        console.log(id);

        const token = sessionStorage.getItem("token");
        const email = sessionStorage.getItem("email");
    
        if(email&& token){
            const reqHeader = {
                "Authorization": `Bearer ${token}`
              }

              await deleteAProductAPI(id,reqHeader)
              toggleOpen()
              getAllProducts()
        }


    }

  return (
    <>
    <div style={{ cursor: 'pointer' }}   onClick={toggleOpen} className="col-1 my-auto">
          <i className="fa-solid fa-xmark"></i>
    </div>
         <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Delete Product</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                Do you want to delete <span className="text-danger fw-bold">
                    {product.productName}
                </span> from the list
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn onClick={()=>deleteProduct(product._id)} className='btn-danger'>Delete</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      
    </>
  )
}

export default AdminProductDelete