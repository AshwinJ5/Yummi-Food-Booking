import React, { useEffect, useState } from 'react';
import './cart.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {
  addBookingDetailsAPI,
  deleteACartDetailsAPI,
  deleteAllCartProductsAPI,
  getAllUserCartAPI,
  paymentByRazorpay,
  updateACartDetailsAPI,
} from '../Services/allAPIS';

const Cart = () => {
  const [userCartItems, setUserCartItems] = useState([]);
  const [userAddress, setUserAddress] = useState({
    cart: [],
    addressName: '',
    addressHouse: '',
    addressStreet: '',
    addressPlace: 'Kottayam',
    addressPin: '',
    addressPhone: '',
    grandTotal: '',
    bookingTime: '',
    bookedYear: '',
    bookedMonth: '',
  });

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const userName = sessionStorage.getItem('username');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchCartItems = async () => {
      if (token && userName) {
        const reqHeader = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await getAllUserCartAPI(reqHeader);
          setUserCartItems(result.data);
          setUserAddress((prev) => ({ ...prev, cart: result.data }));
        } catch (err) {
          toast.error('Failed to fetch cart items');
        }
      }
    };

    fetchCartItems();
  }, [token, userName]);

  useEffect(() => {
    const grandTotal = calculateTotalAmount();
    setUserAddress((prev) => ({
      ...prev,
      grandTotal,
      bookingTime: datetime,
      bookedMonth: month,
      bookedYear: year,
    }));
  }, [userCartItems]);

  const updateQuantityById = (id, newQuantity) => {
    setUserCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedAmount = item.price * newQuantity;
          return { ...item, quantity: newQuantity, totalAmount: updatedAmount };
        }
        return item;
      })
    );
  };

  const incrementQuantity = (id, currentQuantity, pid) => {
    if (currentQuantity === 10) {
      toast.warning('Maximum 10 quantities per order');
    } else {
      const newQuantity = currentQuantity + 1;
      updateQuantityById(id, newQuantity);
      const updatedItem = userCartItems.find((item) => item.id === id);
      updateAnItemInCart(pid, { ...updatedItem, quantity: newQuantity, totalAmount: updatedItem.price * newQuantity });
    }
  };

  const decrementQuantity = (id, currentQuantity, pid) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantityById(id, newQuantity);
      const updatedItem = userCartItems.find((item) => item.id === id);
      updateAnItemInCart(pid, { ...updatedItem, quantity: newQuantity, totalAmount: updatedItem.price * newQuantity });
    } else {
      deleteACartItem(pid);
    }
  };

  const deleteACartItem = async (id) => {
    if (token && userName) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const result = await deleteACartDetailsAPI(id, reqHeader);
        if (result.status === 200) {
          getAllCartItems();
          toast.error('Item Deleted Successfully');
        }
      } catch (err) {
        toast.error('Failed to delete item');
      }
    }
  };

  const deleteAllCartItem = async () => {
    if (token && userName) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const bid = sessionStorage.getItem('userId');
        const result = await deleteAllCartProductsAPI(bid, reqHeader);
        if (result.status === 200) {
          getAllCartItems();
        }
      } catch (err) {
        toast.error(`Failed to delete ${userName}'s item`);
      }
    }
  };

  const updateAnItemInCart = async (pid, updatedItem) => {
    const reqBody = new FormData();
    reqBody.append('quantity', updatedItem.quantity);
    reqBody.append('totalAmount', updatedItem.totalAmount);

    if (token && userName) {
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await updateACartDetailsAPI(pid, reqBody, reqHeader);
        if (result.status === 200) {
          toast.success('Item updated successfully');
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        toast.info(err.response ? err.response.data : 'Error updating item');
      }
    }
  };

  const calculateTotalAmount = () => {
    return userCartItems.reduce((total, item) => total + item.totalAmount, 0);
  };

  const proceedToPay = async () => {
    const { cart, addressName, addressHouse, addressStreet, addressPlace, addressPin, addressPhone, grandTotal, bookingTime, bookedYear, bookedMonth } = userAddress;

    if (!cart.length) {
      return toast.info('Add any product in cart');
    }

    if (!addressHouse || !addressName || !addressPhone || !addressStreet || !addressPin || !addressPlace) {
      return toast.info('Missing Fields');
    }

    if (token && userName) {
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const order = await paymentByRazorpay(grandTotal * 100, 'INR', `receipt_${Math.random().toString(36).substring(7)}`);

        const options = {
          key: 'rzp_test_ETNHrYLVBSuAXf',
          amount: order.data.amount,
          currency: order.data.currency,
          name: 'YUMMI RESTAURANT',
          description: 'Food Order',
          order_id: order.data.id,
          handler: async function (response) {
            try {
              const reqBody = new FormData();
              reqBody.append('cart', JSON.stringify(cart));
              reqBody.append('addressName', addressName);
              reqBody.append('addressHouse', addressHouse);
              reqBody.append('addressStreet', addressStreet);
              reqBody.append('addressPlace', addressPlace);
              reqBody.append('addressPin', addressPin);
              reqBody.append('addressPhone', addressPhone);
              reqBody.append('userId', userId);
              reqBody.append('grandTotal', grandTotal);
              reqBody.append('bookingTime', bookingTime);
              reqBody.append('bookedMonth', bookedMonth);
              reqBody.append('bookedYear', bookedYear);

              const result = await addBookingDetailsAPI(reqBody, reqHeader);

              if (result.status === 200) {
                toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                navigate(`/myprofile`);
                deleteAllCartItem();
                setUserAddress({
                  cart: [],
                  addressName: '',
                  addressHouse: '',
                  addressStreet: '',
                  addressPlace: 'Kottayam',
                  addressPin: '',
                  addressPhone: '',
                  grandTotal: '',
                  bookingTime: '',
                });
                toast.success('Order Placed');
              } else {
                toast.warning(result.response.data);
              }
            } catch (error) {
              console.error('Error saving order details:', error);
              toast.error('Error saving order details');
            }
          },
          prefill: {
            name: userName,
            email: 'test@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#d7504a',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Error creating Razorpay order:', error);
        toast.error('Error creating Razorpay order');
      }
    }
  };

  const currentdate = new Date();
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const month = monthNames[currentdate.getMonth()];
  const day = currentdate.getDate();
  const year = currentdate.getFullYear();
  let hours = currentdate.getHours();
  const minutes = currentdate.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  const datetime = `${month} ${day} ${year} ${hours}:${minutes} ${ampm}`;

  return (
    <>
      <div className="cart_main py-5 mx-auto">
        {userCartItems.length > 0 && <div className="text-center heading py-5">Place Your Order</div>}
        <div className="container p-5 bg-light" style={{ overflowX: 'auto' }}>
          {userCartItems.length > 0 && (
            <>
              <div className="container cart_table row text-light text-center">
                <div className="col-5 fs-4">Product</div>
                <div className="col-2 fs-4">Price</div>
                <div className="col-3 fs-4">Quantity</div>
                <div className="col-2 fs-4">Subtotal</div>
              </div>
              {userCartItems.map((product, index) => (
                <div key={index}>
                  <div className="container row text-center">
                    <div style={{ cursor: 'pointer' }} onClick={() => deleteACartItem(product?._id)} className="col-1 my-auto">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="col-1">
                      <img src={product.productImage} width={'60%'} style={{ borderRadius: '100px' }} className="my-auto" alt="" />
                    </div>
                    <div className="col-3 my-auto">{product.productName}</div>
                    <div className="col-2 my-auto">₹ {product.price}</div>
                    <div className="col-3 my-auto cart_quantity d-flex justify-content-center">
                      <div onClick={() => decrementQuantity(product?.id, product.quantity, product?._id, index)} className="minus_quantity">-</div>
                      <input value={product.quantity} className="input_quantity" readOnly />
                      <div onClick={() => incrementQuantity(product?.id, product.quantity, product?._id, index)} className="plus_quantity">+</div>
                    </div>
                    <div className="col-2 my-auto">₹ {product.totalAmount}/-</div>
                  </div>
                  <hr />
                </div>
              ))}
              <h5 className="fw-bold">Cart Totals</h5>
              <hr />
              <div className="row">
                <div className="col-6 text-start">Delivery Charges</div>
                <div className="col-6 text-end">Free Delivery</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-6 text-start">Subtotal</div>
                <div className="col-6 text-end fw-bold">₹ {calculateTotalAmount()}/-</div>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer position="top-left" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition={Bounce} />
      {userCartItems.length > 0 && (
        <div className="cart_main py-5">
          <div className="container address_div px-5 py-3 bg-light" style={{ overflowX: 'auto' }}>
            <h5 className="fw-bold">Fill the address to which the package has to be delivered.</h5>
            <h6 className="text-danger text-end"><small>Delivery available around 10Kms of the shop</small></h6>
            <hr />
            <div className="row">
              <input onChange={(e) => setUserAddress((prev) => ({ ...prev, addressName: e.target.value }))} type="text" placeholder="Name" />
              <input onChange={(e) => setUserAddress((prev) => ({ ...prev, addressHouse: e.target.value }))} type="text" placeholder="House Name" />
              <input onChange={(e) => setUserAddress((prev) => ({ ...prev, addressStreet: e.target.value }))} type="text" placeholder="Street Name" />
              <input type="text" value="Kottayam" readOnly />
            </div>
            <div className="row text-center">
              <div className="col-6 me-auto">
                <input type="number" onChange={(e) => setUserAddress((prev) => ({ ...prev, addressPin: e.target.value }))} placeholder="PIN " />
              </div>
              <div className="col-6 me-auto">
                <input className="ms-auto" type="number" onChange={(e) => setUserAddress((prev) => ({ ...prev, addressPhone: e.target.value }))} placeholder="Mobile Number " />
              </div>
            </div>
            <hr />
            <div className="text-center">
              <button className="cart_button text-uppercase" onClick={proceedToPay}>Proceed To Pay</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
