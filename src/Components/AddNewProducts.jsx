import React, { useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewProductAPI } from '../Services/allAPIS';

function AddNewProducts() {
    const[newProducts,setNewProducts]=useState({
        productName:"",
        type:"",
        price:"",
        productDescription:"",
        vegOrNonveg:"",
        productImage:""
    })

    // console.log(newProducts);

    const addNewProduct=async()=>{
        const { productName, type, price, productDescription, vegOrNonveg, productImage} = newProducts;
 if (!productName || !type || !price || !productDescription || !vegOrNonveg || !productImage) {
      toast.info("Missing Fields");
    } else {
      const reqBody = new FormData();
      reqBody.append("productName",productName);
      reqBody.append("type", type);
      reqBody.append("price", price);
      reqBody.append("productDescription", productDescription);
      reqBody.append("vegOrNonveg", vegOrNonveg);
      reqBody.append("productImage", productImage);

    const token= sessionStorage.getItem('token')
    const email= sessionStorage.getItem('email')
      if (token && email) {
        const reqHeader = {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        };
        try {
          // console.log(reqBody);
          // console.log(reqHeader);
          const result = await addNewProductAPI(reqBody,reqHeader);
          if (result.status === 200) {
            toast.success('Product Added Successfully');
            setNewProducts({
                productName:"",
                type:"",
                price:"",
                productDescription:"",
                vegOrNonveg:"",
                productImage:""
            })
          } else {
            toast.warning(result.response.data);
          }
        } catch (error) {
          toast.info(error.response ? error.response.data : 'Error placing order');
        }
      }
    }

    }
  return (
    <>
        <div className="cart_main pb-5">
        <div className='text-center heading  py-2'>Add New Product</div>

        <div className="container address_div px-5 py-3 bg-light" style={{ overflowX: 'auto' }}>
          <div className="row">
            <input value={newProducts.productName} onChange={e => setNewProducts({ ...newProducts, productName: e.target.value })} type="text" placeholder='Product Name' />
            <input  value={newProducts.productImage}  onChange={e => setNewProducts({ ...newProducts, productImage: e.target.value })} type="text" placeholder='Product Image Link' />
            <input  value={newProducts.price}  onChange={e => setNewProducts({ ...newProducts, price: e.target.value })} type="number" placeholder='Price' />
            <input  value={newProducts.productDescription}  type="text"  onChange={e => setNewProducts({ ...newProducts, productDescription: e.target.value })} placeholder='Product Description' />
          </div>
          <div className="row text-center">
            <div className="col-6 me-auto">
            <select value={newProducts.vegOrNonveg}  onChange={e => setNewProducts({ ...newProducts, vegOrNonveg: e.target.value })} className="custom-select  mb-4 mx-auto " id="inputGroupSelect01">
                <option selected>Choose...</option>
                <option value="false" >Veg</option>
                <option value="true">Nonveg</option>
            </select>
              {/* <input type="number" onChange={e => setNewProducts({ ...newProducts, vegOrNonveg: e.target.value })} placeholder='Veg or Nonveg ' /> */}
            </div>
            <div className="col-6 me-auto">
            <select value={newProducts.type} onChange={e => setNewProducts({ ...newProducts, type: e.target.value })} className="custom-select  mb-4 mx-auto " id="inputGroupSelect02">
                <option selected>Choose...</option>
                <option value="burger" >Burger</option>
                <option value="beverages">Beverages</option>
                <option value="sides">Sides</option>
            </select>
              {/* <input className='ms-auto' type="number" onChange={e => setNewProducts({ ...newProducts, type: e.target.value })} placeholder='Food Type' /> */}
            </div>
          </div>
          <hr />
          <div className="text-center">
            <button className="cart_button text-uppercase" onClick={addNewProduct}>Add</button>
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
      </div>
    </>
  )
}

export default AddNewProducts