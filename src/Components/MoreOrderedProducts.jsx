import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";

function MoreOrderedProducts({ booking }) {
  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);

  const Book = booking.cart;
  const details = JSON.parse(Book);
  return (
    <>
      <i
        onClick={toggleOpen}
        style={{ color: "#d7504a", cursor: "pointer" }}
        class="fa-solid fa-circle-info"
      ></i>

      <MDBModal
        open={basicModal}
        onClose={() => setBasicModal(false)}
        tabIndex="-1"
      >
        <MDBModalDialog size="xl">
          <MDBModalContent style={{ backgroundColor: "#f3e7c5" }}>
            <MDBModalHeader>
              <MDBModalTitle>Items Ordered</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="container cart_table row text-light text-center mx-auto w-100">
                <div className="col-1 fs-4">No</div>
                <div className="col-4 fs-4">Product</div>
                <div className="col-3 fs-4">Price</div>
                <div className="col-2 fs-4">Quantity</div>
                <div className="col-2 fs-4">Subtotal</div>
              </div>
              {details.map((food, index) => (
                <>
                  <div className="container row mx-auto text-center">
                    <div className="col-1 my-auto">{index + 1}</div>
                    <div className="col-1">
                      <img
                        src={food.productImage}
                        width={"60%"}
                        style={{ borderRadius: "100px" }}
                        className="my-auto"
                        alt=""
                      />
                    </div>
                    <div className="col-3 my-auto">{food.productName}</div>
                    <div className="col-3 my-auto">₹ {food.price}</div>
                    <div className="col-2 my-auto ">{food.quantity}</div>
                    <div className="col-2 my-auto">₹ {food.totalAmount}/-</div>
                  </div>
                  <hr />
                </>
              ))}
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default MoreOrderedProducts;
