import React, { createContext, useEffect, useState } from 'react'
export const TokenAuthenResponseContext=createContext()


function TokenAuth({children}) {

    const[isUserAuthorized,setIsUserAuthorized]=useState(false)
    const[isAdminAuthorized,setIsAdminAuthorized]=useState(false)

    useEffect(()=>{
        if (sessionStorage.getItem("token")&& sessionStorage.getItem('username')) {
            setIsUserAuthorized(true)
        } else {
            setIsUserAuthorized(false)
        }
    },[isUserAuthorized])

    useEffect(()=>{
        if (sessionStorage.getItem("token")&& sessionStorage.getItem('email')) {
            setIsAdminAuthorized(true)
        } else {
            setIsAdminAuthorized(false)
        }
    },[isAdminAuthorized])
  return (
    <>
    <TokenAuthenResponseContext.Provider value={{isUserAuthorized,setIsUserAuthorized,isAdminAuthorized,setIsAdminAuthorized}}>
        {children}
    </TokenAuthenResponseContext.Provider>
    </>
  )
}

export default TokenAuth