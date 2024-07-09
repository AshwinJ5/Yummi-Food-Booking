import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './Pages/Landing'
import Navbars from './Components/Navbars'
import Products from './Components/Products'
import Admin from './Pages/Admin'
import ProductDetails from './Components/ProductDetails'
import Authentications from './Pages/Authentications'
import MyProfile from './Pages/MyProfile'
import Mycart from './Pages/Mycart'
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { TokenAuthenResponseContext } from './Context/TokenAuth'


function App() {
  const{isUserAuthorized,setIsUserAuthorized,isAdminAuthorized,setIsAdminAuthorized}=useContext(TokenAuthenResponseContext)

  return (
    <>
      <BrowserRouter>
      <Navbars/>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/cart' element={isUserAuthorized?<Mycart/>:<Landing/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/productdetails/:id' element={<ProductDetails/>}/>
          <Route path='/login' element={<Authentications/>}/>
          <Route path='/register' element={<Authentications register />}/>
          <Route path='/adminlogin' element={<Authentications adminlogin />}/>
          <Route path='/myprofile' element={isUserAuthorized?<MyProfile/>:<Landing/>}/>
          <Route path='/admin' element={isAdminAuthorized?<Admin/>:<Landing/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
