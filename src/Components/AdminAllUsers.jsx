import React, { useEffect, useState } from 'react'
import { getAllUsersAPI } from '../Services/allAPIS';

function AdminAllUsers() {

    const[allUsers,setAllUsers]=useState({})

    // console.log(allUsers);

    const totalUsers=allUsers.length

    const getAllUsers = async () => {
        const email=sessionStorage.getItem('email')
        const token=sessionStorage.getItem('token')
        if(email && token){
            const reqHeader = {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }     
        try {
            const result = await getAllUsersAPI(reqHeader)
            setAllUsers(result.data);
        } catch (error) {
            console.log(error)     
        }}
    }
    useEffect(()=>{
        getAllUsers()
    },[])

  return (
    <>
      <div  className="cart_main pb-5 mx-auto">
        <div className='text-center heading  py-2'>Users</div>
      {allUsers.length > 0 ?
      
        <div className='text-end me-5 py-2'>Total Users: <span className='fw-bolder text-danger'>{totalUsers}</span></div>
      :null
      }
        <div className="container p-5 bg-light" style={{ overflowX: 'auto' }}>
        {allUsers.length > 0 ?
          <div className="container py-2 cart_table row text-light text-center">
            <div className="col-2 fs-4">No.</div>
            <div className="col-3 fs-4">Username</div>
            <div className="col-4 fs-4">Email</div>
            <div className="col-3 fs-4">UserId</div>
          </div>:
          null}
          {allUsers.length > 0 ? allUsers.map((user, index) =>
            <div key={index}>
              <div className="container row text-center">
                <div className="col-2 my-auto">
                  {index+1}
                </div>
                <div className="col-3">
                    {user.username}
                </div>
                <div className="col-4 my-auto">{user.email}</div>
                <div className="col-3 my-auto">
                    {user._id}
                </div>
              </div>
              <hr />
            </div>)
            : <p>No Users</p>}
        </div>
      </div> 
    </>
  )
}

export default AdminAllUsers