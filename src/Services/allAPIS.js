import {commonAPI} from "./commonAPI"
import {SERVER_URL} from "./serverUrl"

//get home products
export const getHomeProductAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/homeproducts`)
}

//get all products
export const getAllProductAPI=async(search)=>{
    return await commonAPI("GET",`${SERVER_URL}/allproducts?search=${search}`)
}

//get all products
export const getAllProductsAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/allproduct`)
}

//get all users for admin
export const getAllUsersAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/allusers`,"",reqHeader)
}

//delete a  product by admin
export const deleteAProductAPI=async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/deleteadmin/${id}`,"",reqHeader)
}

//get a product detail
export const getAProductAPI=async(id)=>{
    return await commonAPI("GET",`${SERVER_URL}/product/${id}`)
}

//user register
export const userRegisterAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/user/register`,reqBody)
}

//user login
export const userLoginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/user/login`,reqBody)
}

//admin login
export const adminLoginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/admin/login`,reqBody)
}

//add to user cart
export const addToUserCartAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/addtocart`,reqBody,reqHeader)
}

//get a user's all cart products
export const getAllUserCartAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/cartitems`,"",reqHeader)
}

//delete a users cart product
export const deleteACartDetailsAPI=async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/deletecart/${id}`,"",reqHeader)
}

//empty user cart
export const deleteAllCartProductsAPI=async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/deleteall/${id}`,"",reqHeader)
}

//update cart quantity & total amount
export const updateACartDetailsAPI=async(id,reqbody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/updatecart/${id}`,reqbody,reqHeader)
}

//add booking data
export const addBookingDetailsAPI=async(reqbody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/booking`,reqbody,reqHeader)
}

//add new product data by admin
export const addNewProductAPI=async(reqbody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/addnew`,reqbody,reqHeader)
}

//get a user's all bookings
export const getUsersAllBookingAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/allbookings`,"",reqHeader)
}

//get all bookings for admin
export const getAllBookingsAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/allbookingsadmin`,"",reqHeader)
}


// payment
export const paymentByRazorpay= async(amount, currency, receipt)=>{
    return await commonAPI('POST',`${SERVER_URL}/create-order`,{
        amount,
        currency,
        receipt
    })
}

