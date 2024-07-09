import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { getAllBookingsAPI } from '../Services/allAPIS';

function AdminRevenueTab() {

    const[allBookings,setAllBooking]=useState([])
        const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);
    const [prevMonthRevenue, setPrevMonthRevenue] = useState(0);
    const [currentYearRevenue, setCurrentYearRevenue] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [monthPres, setMonthPres] = useState("");
    const [monthPrev, setMonthPrev] = useState("");
    const [presentYear, setPresentYear] = useState(0);


    const getAllBookingData=async()=>{
        const email=sessionStorage.getItem('email')
        const token=sessionStorage.getItem('token')
        if(email && token){
            const reqHeader = {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }     
        try {
            const result=await  getAllBookingsAPI(reqHeader)
            setAllBooking(result.data);
        } catch (error) {
            console.log(error)     
        }}
    }
    useEffect(()=>{
        getAllBookingData()
    },[])

useEffect(()=>{


    var currentdate = new Date();
    var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

    const monthPrevIndex = (currentdate.getMonth() - 1 + 12) % 12

    const monthPrev = monthNames[monthPrevIndex]
    const monthPres = monthNames[currentdate.getMonth()]
    const presentYear = currentdate.getFullYear()

    setMonthPres(monthPres)
    setMonthPrev(monthPrev)
    setPresentYear(presentYear)



        const yearFiltered=allBookings.filter(item =>item.bookedYear === presentYear);
        const currentYearRevenueCalculated=yearFiltered.reduce((sum, booking) => sum + booking.grandTotal, 0);
        setCurrentYearRevenue(currentYearRevenueCalculated)
  
        const dateFiltered = allBookings.filter(item => item.bookedMonth === monthPres && item.bookedYear === presentYear);


        const currentMonthRevenueCalculated = dateFiltered.reduce((sum, booking) => sum + booking.grandTotal, 0);
        setCurrentMonthRevenue(currentMonthRevenueCalculated);


        const prevMonthFiltered=allBookings.filter(item => item.bookedMonth === monthPrev && item.bookedYear === presentYear);
        const prevMonthRevenueCalculated = prevMonthFiltered.reduce((sum, booking) => sum + booking.grandTotal, 0);
        setPrevMonthRevenue(prevMonthRevenueCalculated)

  

    const totalRevenueCalculated = allBookings.reduce((sum, booking) => sum + booking.grandTotal, 0);
    setTotalRevenue(totalRevenueCalculated)

},[allBookings])


    // console.log(allBookings);


  return (
    <>
     <div  className="cart_main pb-5 mx-auto">
     <div className='text-center heading  py-2'>Revenue Earned</div>
     </div>
        <div className="row container">
            <div className="col-lg-5 revenue_table text-center">
            <div style={{fontSize:'2rem',fontWeight:"700",color:'#d7504a'}} className='text-center  py-2'>Present Month Revenue</div>
            <h1>₹<span style={{fontSize:"5rem"}} className='fw-bolder mx-2'>
            <CountUp
                end={currentMonthRevenue}
                duration={5}
                />
                </span>/-</h1>
                <p>Revenue of the Month {monthPres} {presentYear}</p>

            </div>
            <div className="col-lg-2">
 
             </div>
            <div className="col-lg-5 revenue_table  text-center">
            <div style={{fontSize:'2rem',fontWeight:"700",color:'#d7504a'}} className='text-center  py-2'>Last Month Revenue</div>
            <h1>₹<span style={{fontSize:"5rem"}} className='fw-bolder mx-2'>
                <CountUp
                end={prevMonthRevenue}
                duration={5}
                />
                </span>/-</h1>
                <p>Revenue of last Month {monthPrev} {presentYear}</p>

            </div>
        </div>
        <div className="row container justify-content-center pt-5 mx-auto">
            <div className="col-lg-6 revenue_table  text-center">
            <div style={{fontSize:'2rem',fontWeight:"700",color:'#d7504a'}} className='text-center  py-2'>This Year Revenue</div>
            <h1>₹<span style={{fontSize:"5rem"}} className='fw-bolder mx-2'>
                <CountUp
                end={currentYearRevenue}
                duration={5}
                />
                </span>/-</h1>
                <p>Revenue of the year {presentYear}</p>

            </div>
        </div>
        <div className="row container justify-content-center pt-5 mx-auto">
            <div className="col-lg-6 revenue_table  text-center">
            <div style={{fontSize:'2rem',fontWeight:"700",color:'#d7504a'}} className='text-center  py-2'>Total Revenue Till Now</div>
            <h1>₹<span style={{fontSize:"5rem"}} className='fw-bolder mx-2'>
                <CountUp
                end={totalRevenue}
                duration={5}
                />
                </span>/-</h1>
                <p>Revenue since now</p>
            </div>
        </div>
    </>
  )
}

export default AdminRevenueTab