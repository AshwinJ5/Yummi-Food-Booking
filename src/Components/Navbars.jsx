import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import mainLogo from '../assets/yummy.png'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { TokenAuthenResponseContext } from '../Context/TokenAuth';

function Navbars() {

  const{isUserAuthorized,setIsUserAuthorized,isAdminAuthorized,setIsAdminAuthorized}=useContext(TokenAuthenResponseContext)

  const navigate=useNavigate()

    const logOut=()=>{
      sessionStorage.clear()
      setIsUserAuthorized(false)
      setIsAdminAuthorized(false)
      setTimeout(()=>{
        navigate('/')
      },1000)
    }

  return (
    <>
        <Navbar expand="lg" style={{position:'sticky',top:"0",zIndex:"1"}} className="bg-body-tertiary">
      <Container >
        <Navbar.Brand href="/"><img src={mainLogo} height={60} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 navbar_link"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='fw-bold' href="/">HOME</Nav.Link>
            <Nav.Link className='fw-bold' href="/#about">ABOUT</Nav.Link>
            <Nav.Link className='fw-bold' href="/products">PRODUCTS</Nav.Link>
            {
              isUserAuthorized?
              <Nav.Link className='fw-bold' href="/myprofile">PROFILE</Nav.Link>
              :isAdminAuthorized?null:null

            }
            
          </Nav>
          <div className="d-flex me-2 ">
            <Link className='text-decoration-none' to={'/cart'} ><div className='me-5 m-auto cart_navbar'><i className="fa-solid fa-cart-shopping "></i></div></Link>
            {
              isUserAuthorized?
              <><div onClick={logOut}  className="nav_button ">LOGOUT</div></>
              : isAdminAuthorized?
              <><div onClick={logOut}  className="nav_button ">ADMIN LOGOUT</div></>

              :
            <Link className='text-decoration-none' to={'/login'}><div  className="nav_button ">LOGIN</div></Link>
            }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Navbars