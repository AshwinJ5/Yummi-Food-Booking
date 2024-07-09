import React, { useContext, useState } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaLock, FaUser } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io'
import heading from '../assets/yummy.png'
import Footer from '../Components/Footer'
import { adminLoginAPI, userLoginAPI, userRegisterAPI } from '../Services/allAPIS'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenAuthenResponseContext } from '../Context/TokenAuth'

function Authentications({register,adminlogin}) {
    const registerStatus=register?true:false
    const adminStatus=adminlogin?true:false
    const navigate=useNavigate()
    const[userData,setUserData]=useState({
        username:"",email:"",password:""
    })
    // console.log(userData);

    const{isUserAuthorized,setIsUserAuthorized,isAdminAuthorized,setIsAdminAuthorized}=useContext(TokenAuthenResponseContext)


    const userRegisterFn=async(e)=>{
        e.preventDefault()
        const{username,email,password}=userData

        if (!username || !email || !password ) {
            toast.info('Missing Fields')
        } else {

        const result=await userRegisterAPI(userData)
        console.log(result);
        if(result.status==200){
            setUserData({
                username:"",email:"",password:""
            })
            toast.info(`User ${userData.username} registered successfully`)
             
            setTimeout(()=>{
                navigate('/login')
            },2000)
           
        }else{
            toast.info(result.response.data)
            setUserData({
                email:"",password:"",username:""
              })
            setTimeout(()=>{
                navigate('/login')
            },2500)
        }
        }
        
    }
    const userLoginFn=async(e)=>{
        e.preventDefault()
        const{email,password}=userData
        if ( !email || !password) {
            toast.info('Missing Fields') 
        } else {
            const result = await userLoginAPI({email,password})
            // console.log(result);
            if(result.status===200){
                sessionStorage.setItem("username",result.data.existingUser.username)
                sessionStorage.setItem("token",result.data.token)
                sessionStorage.setItem("userId",result.data.existingUser._id)
                  setUserData({
                    email:"",password:""
                  })
                  toast.success(`User ${result.data.existingUser.username} successfully logged in`)
                  setIsUserAuthorized(true)
                  setTimeout(() => {
                    navigate('/')
                  }, 2500);
                
            }else{
                toast.info(result.data)
                setUserData({
                    email:"",password:""
                  })
            }
        }
    }
    const userAdminLoginFn=async(e)=>{
        e.preventDefault()
        const{email,password}=userData
        if ( !email || !password) {
            toast.info('Missing Fields') 
        } else {
            const result = await adminLoginAPI({email,password})
            // console.log(result);
            if(result.status===200){
                sessionStorage.setItem("email",result.data.existingAdmin.email)
                sessionStorage.setItem("token",result.data.token)
                sessionStorage.setItem("userId",result.data.existingAdmin._id)
                  setUserData({
                    email:"",password:""
                  })
                  toast.success(`Admin successfully logged in`)
                  setIsAdminAuthorized(true)
                    setUserData({
                        email:"",password:""
                    })
                  setTimeout(() => {
                    navigate('/admin')
                  }, 2500);
                
            }else{
                toast.info(result.data)
                
            }
        }

    }

  return (
    <>
          {/* <div className='text-end me-5'>Are you an<a style={{textDecoration:'none',fontWeight:'bolder',color:'#6bd4ac'}} href='/admin'> Admin</a>?</div>  */}
            
            <div className="w-100 body_auth">
        
                <div className="wrapper">
                    <form action="">
                        <Link to={'/'}>
                        <img src={heading} alt="" />
                        </Link>
                        {registerStatus? <div className="input-box">
                            <input type="text" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} placeholder='Username'  required/><FaUser className='icon' />
                        </div>
                        :null}
                        {adminStatus?
                        <span>
                        <div className="input-box">
                            <input type="text" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} placeholder='Email Address' required/><IoIosMail className='icon' />
                        </div>
                        <div className="input-box">
                            <input type="password" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}  placeholder='Password' required/><FaLock className='icon'/>
                        </div>
                        </span>
                        
                            :
                        
                        <span>
                        <div className="input-box">
                            <input type="text" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} placeholder='Email Address' required/><IoIosMail className='icon' />
                        </div>
                        <div className="input-box">
                            <input type="password" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}  placeholder='Password' required/><FaLock className='icon'/>
                        </div>
                        </span>
                        }
                        <span >

                        {registerStatus?
                        <span>
                        <button type='submit' onClick={userRegisterFn}  className='text-uppercase'>Register</button>
                        <div className="register-link">
                            <p> Already have an account? <a href="/login"> Login</a></p>
                        </div>
                        </span>

                            :adminStatus?
                        <span>
                            <button type='submit' onClick={userAdminLoginFn} className='text-uppercase'>Admin Login</button>
                            <div className="register-link">
                            <p> Already have an user? <a href="/login">User Login</a></p>
                        </div>
                        </span>
                        :
                        <span>
                        <button type='submit' onClick={userLoginFn} className='text-uppercase'>Login</button>
                        <div className="register-link">
                            <p>Do not have account? <a href="/register"> Register</a></p>
                        </div>
                        <div className="register-link">
                            <p>Are You an  <a href="/adminlogin">Admin</a>?</p>
                        </div>
                        </span>
                        }
                        {/* {registerStatus?
                        <div className="register-link">
                            <p> Already have an account? <a href="/login"> Login</a></p>
                        </div>
                    :
                    <span>
                        <div className="register-link">
                            <p>Do not have account? <a href="/register"> Register</a></p>
                        </div>
                        <div className="register-link">
                            <p>Are You an  <a href="/adminlogin">Admin</a>?</p>
                        </div>
                        </span>
                        } */}
                        </span>

                        
                    </form>
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
                <Footer/>
    </>
  )
}

export default Authentications