import React, { useEffect, useState } from 'react'
import './cart.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProductsAPI } from '../Services/allAPIS';
import AdminProductDelete from './AdminProductDelete';

function AllProducts() {

    const[allProductItems,setAllProductItems]=useState({})

//    console.log(allProductItems);

    const getAllProducts = async () => {
        try {
            const result = await getAllProductsAPI()
            setAllProductItems(result.data);
        } catch (error) {
            console.log(error)     
        }
    }
    useEffect(()=>{
        getAllProducts()
    },[])

    // console.log(allProductItems);
    
  return (
    <>
         <div  className="cart_main pb-5 mx-auto">
        <div className='text-center heading  py-2'>Products</div>
        <div className="container p-5 bg-light" style={{ overflowX: 'auto' }}>
        {allProductItems.length > 0 ?
          <div className="container py-2 cart_table row text-light text-center">
            <div className="col-5 fs-4">Product</div>
            <div className="col-3 fs-4">Veg / Nonveg</div>
            <div className="col-2 fs-4">Type</div>
            <div className="col-2 fs-4">Price</div>
          </div>:
          null}
          {allProductItems.length > 0 ? allProductItems.map((product, index) =>
            <div key={index}>
              <div className="container row text-center">
                <AdminProductDelete getAllProducts={getAllProducts} product={product} />
                <div className="col-1">
                  <img src={product.productImage} width={'60%'} style={{ borderRadius: '100px' }} className='my-auto' alt="" />
                </div>
                <div className="col-3 my-auto">{product.productName}</div>
                <div className="col-3 my-auto">
                    {product.vegOrNonveg =="true"?
                    <>
                        Non-Veg
                    </>
                    :
                    <>
                        Veg
                    </>
                }
                    
                    </div>
                <div className="col-2  my-auto text-capitalize">
                  {product.type}
                </div>
                <div className="col-2 my-auto">₹ {product.price}/-</div>
              </div>
              <hr />
            </div>)
            : <p>No Products!</p>}
        </div>
      </div> 
      <ToastContainer
        position="top-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

    </>
  )
}

export default AllProducts