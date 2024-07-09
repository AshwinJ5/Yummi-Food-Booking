import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { getHomeProductAPI } from '../Services/allAPIS'


function BestSellingLanding() {
    const[homeProducts,setHomeProducts]=useState([])

    const getHomeProducts = async () => {
        try {
            const result = await getHomeProductAPI()
            setHomeProducts(result.data);
        } catch (error) {
            console.log(error)     
        }
    }
    useEffect(()=>{
        getHomeProducts()
    },[])
    // console.log(homeProducts)

  return (
    <div className='best_selling' id='products'>
        <div className="text-center  container py-5">
            <div className="d-flex">
               <div className='text-start h2 fw-bolder py-4'>
                Our Best Selling Burgers
                </div> 
                <div className="text ms-auto my-auto">
                    <Link  className='text-decoration-none' to={'/products'}><div className="button_more">More</div></Link>
                </div>
            </div>
            
            <div className="row container">
                    {homeProducts.map((product) => (
                        <div className="col-lg-4 col-12 p-2" key={product._id}>
                            <div className="card">
                            <Link to={`/productdetails/${product._id}`}>

                                <img src={product.productImage}className="card-img-top card_landing" style={{cursor:'pointer'}} alt={product.productName} />
                                </Link>
                                <div className="card-body card_landing text-start">
                                    <h3 className="card-title fw-bolder">{product.productName}</h3>
                                    <p className="card-text">{product.productDescription.slice(0, 75)}....</p>
                                    <p>₹<span className='fw-bold'>{product.price}</span>/-</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    </div>
  )
}

export default BestSellingLanding