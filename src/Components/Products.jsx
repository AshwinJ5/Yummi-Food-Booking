import React, { useContext, useEffect, useState } from 'react';
import './cart.css';
import Footer from './Footer';
import { addToUserCartAPI, getAProductAPI, getAllProductAPI } from '../Services/allAPIS';
import { Link, useNavigate } from 'react-router-dom';
import { userCartDetailsContext } from '../Context/ContextAPICart';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {
    const [allProducts, setAllProducts] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const { setUserCartDetails } = useContext(userCartDetailsContext);
    const navigate = useNavigate();

    const addToCart = async (productId) => {
        const token = sessionStorage.getItem("token");
        const userName = sessionStorage.getItem("username");

        if (!token || !userName) {
            toast.info('Please Login');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            return;
        }

        const userId = sessionStorage.getItem("userId");
        try {
            const productResponse = await getAProductAPI(productId);
            const product = productResponse.data;

            const {
                productName,
                _id: id,
                type,
                price,
                productDescription,
                vegOrNonveg,
                productImage
            } = product;

            const quantity = 1;
            const totalAmount = price;

            if (!productName || !id || !type || !price || !productDescription || !productImage || !quantity || !totalAmount) {
                toast.error("Incomplete product details.");
                return;
            }

            const reqBody = new FormData();
            reqBody.append("productName", productName);
            reqBody.append("id", id);
            reqBody.append("type", type);
            reqBody.append("price", price);
            reqBody.append("productDescription", productDescription);
            reqBody.append("vegOrNonveg", vegOrNonveg);
            reqBody.append("productImage", productImage);
            reqBody.append("quantity", quantity);
            reqBody.append("totalAmount", totalAmount);
            reqBody.append("userId", userId);

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            const result = await addToUserCartAPI(reqBody, reqHeader);
            if (result.status === 200) {
                toast.success("Item added to Cart");

                setUserCartDetails({
                    productName: "",
                    id: "",
                    type: "",
                    price: 0,
                    productDescription: "",
                    vegOrNonveg: "",
                    productImage: "",
                    quantity: 0,
                    totalAmount: 0,
                    userId: ""
                });
            } else {
                toast.warning(result.data);
            }
        } catch (error) {
            console.log(error);
            toast.info(error.response?.data || "An error occurred.");
        }
    }

    const getAllProducts = async () => {
        try {
            const result = await getAllProductAPI(searchKey);
            setAllProducts(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [searchKey]);

    return (
        <>
            <div className='product_main'>
                <div className='text-center pt-5'>Order & Enjoy</div>
                <div className="search_products text-center pt-3">
                    <input className='w-50' onChange={e => setSearchKey(e.target.value)} type="text" placeholder='Search our products here...' />
                </div>
                <div className="row mx-auto container justify-content-center py-5">
                    {allProducts.map((product) => (
                        <div className="col-lg-3 col-md-6 col-12 p-3" key={product._id}>
                            <div className="card all_product_card" style={{ height: '450px' }}>
                                <Link to={`/productdetails/${product._id}`}>
                                    <img src={product.productImage} style={{ height: '300px' }} className="card-img-top card_landing" alt="..." />
                                </Link>
                                <div className="card-body card_landing text-start">
                                    <h3 className="card-title fw-bolder">{product.productName}</h3>
                                    <div className='d-flex product_details'>
                                        <p>₹<span className='fw-bold'>{product.price}</span>/-</p>
                                        <p onClick={() => addToCart(product._id)} className='ms-auto'>
                                            <i className="fa-solid add_cart fa-bag-shopping"></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
            <Footer />
        </>
    );
}

export default Products;
