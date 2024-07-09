import React, { createContext, useState } from 'react'
export const userCartResponseContext=createContext()
export const userCartDetailsContext=createContext()

function ContextAPICart({children}) {

    const [userCartDetails,setUserCartDetails]= useState({
        productName:"",
        id:"",
        type:"",
        price:0,
        productDescription:"",
        vegOrNonveg:"",
        productImage:"",
        quantity:0,
        totalAmount:0,
        userId:""
  })

  return (
    <div>
         <userCartDetailsContext.Provider value={{userCartDetails,setUserCartDetails}}>
        {children}
        </userCartDetailsContext.Provider>
    </div>
  )
}

export default ContextAPICart